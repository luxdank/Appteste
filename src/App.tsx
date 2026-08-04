import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { OnboardingView } from './components/OnboardingView';
import { HomeDashboardView } from './components/HomeDashboardView';
import { NewRequestView } from './components/NewRequestView';
import { RadarSearchView } from './components/RadarSearchView';
import { ProjectsView } from './components/ProjectsView';
import { ProfileView } from './components/ProfileView';
import { SpecialistProfileView } from './components/SpecialistProfileView';
import { LoginView } from './components/LoginView';
import { RegisterProfessionalView } from './components/RegisterProfessionalView';
import { SpecialistModal } from './components/SpecialistModal';
import { ChatModal } from './components/ChatModal';

import { NavigationTab, Specialist, Project, ServiceRequestPayload } from './types';
import { SPECIALISTS } from './data/mockData';
import { useGeolocation } from './hooks/useGeolocation';

export default function App() {
  const { userLocation, requestGps } = useGeolocation();
  const [currentTab, setCurrentTab] = useState<NavigationTab>('welcome');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('landing');
  const [lastRequestData, setLastRequestData] = useState<ServiceRequestPayload | null>(null);
  const [loginRole, setLoginRole] = useState<'CLIENT' | 'PROFESSIONAL'>('CLIENT');
  const [specialists, setSpecialists] = useState<Specialist[]>(() => {
    try {
      const saved = localStorage.getItem('nexo_specialists');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Filter out old test dummy profiles if present
          const clean = parsed.filter(s => s && typeof s.id === 'string' && !s.id.startsWith('spec-1') && !s.id.startsWith('spec-2') && !s.id.startsWith('spec-3') && !s.id.startsWith('spec-4') && !s.id.startsWith('spec-5') && !s.id.startsWith('spec-6'));
          return clean;
        }
      }
    } catch (e) {
      console.error('Error loading specialists from localStorage:', e);
    }
    return SPECIALISTS;
  });
  const [selectedSpecialist, setSelectedSpecialist] = useState<Specialist | null>(null);
  const [chatSpecialist, setChatSpecialist] = useState<Specialist | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalSpecialist, setModalSpecialist] = useState<Specialist | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync specialists to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('nexo_specialists', JSON.stringify(specialists));
    } catch (e) {
      console.error('Error saving specialists to localStorage:', e);
    }
  }, [specialists]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleRegisterSpecialist = (newSpec: Specialist) => {
    const updated = [newSpec, ...specialists];
    setSpecialists(updated);
    setSelectedSpecialist(newSpec);
    showToast(`Parabéns, ${newSpec.name}! Seu perfil de especialista foi cadastrado com sucesso.`);
    setCurrentTab('specialist');
  };

  const handleSelectService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setCurrentTab('request');
  };

  const handleOpenNewRequest = () => {
    setSelectedServiceId('landing');
    setCurrentTab('request');
  };

  const handleSelectSpecialistProfile = (spec: Specialist) => {
    setSelectedSpecialist(spec);
    setCurrentTab('specialist');
  };

  const handleHireSpecialist = (spec: Specialist) => {
    showToast(`Proposta de projeto enviada com sucesso para ${spec.name}!`);
    setCurrentTab('projects');
  };

  const handleSubmitRequest = (requestData: any) => {
    setLastRequestData(requestData);
    showToast(`Solicitação "${requestData.title}" criada! Filtrando especialistas mais próximos no Radar IA...`);
  };

  const handleLoginSuccess = (userRole: 'CLIENT' | 'PROFESSIONAL', userData?: any) => {
    if (userRole === 'CLIENT') {
      showToast(`Bem-vindo(a) de volta, ${userData?.name || 'Cliente'}! Conectado como Contratante.`);
      setCurrentTab('home');
    } else {
      showToast(`Acesso concedido! Conectado na área do Profissional (${userData?.name || 'Especialista'}).`);
      if (userData?.id) {
        setSelectedSpecialist(userData);
        setCurrentTab('specialist');
      } else {
        setSelectedSpecialist(SPECIALISTS[0]);
        setCurrentTab('specialist');
      }
    }
  };

  const showAppShell = currentTab !== 'welcome';

  return (
    <div className="min-h-screen bg-[#fcf8ff] text-[#1c1a25] flex flex-col font-body selection:bg-[#5b3df5]/20 relative">
      {/* Top Header - hidden on standalone welcome landing page */}
      {showAppShell && (
        <Header
          currentTab={currentTab}
          onNavigate={setCurrentTab}
          onOpenSearch={() => setCurrentTab('radar')}
          userLocation={userLocation}
          onRequestGps={requestGps}
        />
      )}

      {/* Main Content Router View */}
      <main className="flex-1 w-full">
        {currentTab === 'welcome' && (
          <OnboardingView
            onNavigate={setCurrentTab}
            onStartRequest={handleOpenNewRequest}
            onSelectRole={setLoginRole}
          />
        )}

        {currentTab === 'home' && (
          <HomeDashboardView
            onNavigate={setCurrentTab}
            onSelectService={handleSelectService}
            onSelectSpecialist={handleSelectSpecialistProfile}
            onSelectProject={(proj) => {
              setSelectedProject(proj);
              setCurrentTab('projects');
            }}
            onOpenChatWith={setChatSpecialist}
            specialists={specialists}
          />
        )}

        {currentTab === 'request' && (
          <NewRequestView
            initialServiceId={selectedServiceId}
            onNavigate={setCurrentTab}
            onSubmitRequest={handleSubmitRequest}
          />
        )}

        {currentTab === 'radar' && (
          <RadarSearchView
            onNavigate={setCurrentTab}
            onSelectSpecialist={handleSelectSpecialistProfile}
            onOpenChatWith={setChatSpecialist}
            specialists={specialists}
            lastRequest={lastRequestData}
            userLocation={userLocation}
            onRequestGps={requestGps}
          />
        )}

        {currentTab === 'projects' && (
          <ProjectsView
            onNavigate={setCurrentTab}
            onOpenNewRequest={handleOpenNewRequest}
            onOpenChatWith={setChatSpecialist}
            selectedProjectFromHome={selectedProject}
          />
        )}

        {currentTab === 'profile' && (
          <ProfileView
            onNavigate={setCurrentTab}
            onSelectSpecialist={handleSelectSpecialistProfile}
            onOpenChatWith={setChatSpecialist}
          />
        )}

        {currentTab === 'specialist' && (
          <SpecialistProfileView
            specialist={selectedSpecialist || specialists[0] || null}
            onNavigate={setCurrentTab}
            onSelectSpecialist={setSelectedSpecialist}
            onOpenChatWith={setChatSpecialist}
            onHire={handleHireSpecialist}
          />
        )}

        {currentTab === 'login' && (
          <LoginView
            onNavigate={setCurrentTab}
            onLoginSuccess={handleLoginSuccess}
            onRegisterSpecialist={handleRegisterSpecialist}
            currentRole={loginRole}
          />
        )}

        {currentTab === 'register-pro' && (
          <RegisterProfessionalView
            onNavigate={setCurrentTab}
            onRegisterSpecialist={handleRegisterSpecialist}
          />
        )}
      </main>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-[#1c1a25] text-[#fcf8ff] px-5 py-3 rounded-2xl shadow-2xl border border-[#5b3df5]/40 text-xs font-bold flex items-center gap-2.5 animate-in fade-in slide-in-from-top-3 duration-200">
          <span className="w-2.5 h-2.5 bg-[#42e09a] rounded-full animate-ping" />
          {toastMessage}
        </div>
      )}

      {/* Modals & Drawers */}
      <SpecialistModal
        specialist={modalSpecialist}
        onClose={() => setModalSpecialist(null)}
        onOpenChatWith={setChatSpecialist}
        onHire={handleHireSpecialist}
        onOpenFullProfile={handleSelectSpecialistProfile}
      />

      <ChatModal
        specialist={chatSpecialist}
        onClose={() => setChatSpecialist(null)}
      />

      {/* Bottom Navigation */}
      {showAppShell && (
        <BottomNav
          currentTab={currentTab}
          onNavigate={setCurrentTab}
          onOpenNewRequest={handleOpenNewRequest}
        />
      )}
    </div>
  );
}
