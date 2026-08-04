import React from 'react';
import {
  User,
  CreditCard,
  Heart,
  Settings,
  Bell,
  HelpCircle,
  LogOut,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Star,
  MessageSquare
} from 'lucide-react';
import { USER_PROFILE, SPECIALISTS } from '../data/mockData';
import { NavigationTab, Specialist } from '../types';

interface ProfileViewProps {
  onNavigate: (tab: NavigationTab) => void;
  onSelectSpecialist: (specialist: Specialist) => void;
  onOpenChatWith: (specialist: Specialist) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  onNavigate,
  onSelectSpecialist,
  onOpenChatWith,
}) => {
  return (
    <div className="min-h-screen pt-20 pb-28 px-4 md:px-8 max-w-[1120px] mx-auto space-y-6 animate-in fade-in duration-300 text-[#1c1a25]">
      {/* Profile Card Header */}
      <div className="bg-white border border-[#c8c4d9]/70 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col md:flex-row items-center gap-5 text-center md:text-left">
          <div className="relative">
            <img
              src={USER_PROFILE.avatarUrl}
              alt={USER_PROFILE.fullName}
              className="w-20 h-20 rounded-full object-cover border-4 border-[#5b3df5]"
            />
            <span className="absolute bottom-1 right-1 p-1 bg-[#5b3df5] text-white rounded-full">
              <ShieldCheck className="w-3.5 h-3.5" />
            </span>
          </div>

          <div>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <h2 className="font-headline font-extrabold text-2xl">
                {USER_PROFILE.fullName}
              </h2>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                Cliente Pro
              </span>
            </div>
            <p className="text-xs text-[#474556] mt-0.5">{USER_PROFILE.email}</p>
            <p className="text-xs text-[#787588] mt-1 font-semibold">
              {USER_PROFILE.role} • Membro desde 2024
            </p>
          </div>
        </div>

        {/* Quick Numbers */}
        <div className="flex gap-4 border-t md:border-t-0 md:border-l border-[#e5e0ef] pt-4 md:pt-0 md:pl-6 w-full md:w-auto justify-center">
          <div className="text-center px-3">
            <p className="font-headline font-extrabold text-2xl text-[#4212de]">
              {USER_PROFILE.activeProjectsCount}
            </p>
            <p className="text-[10px] font-bold text-[#787588] uppercase">Ativos</p>
          </div>
          <div className="text-center px-3 border-l border-[#e5e0ef]">
            <p className="font-headline font-extrabold text-2xl text-emerald-700">
              {USER_PROFILE.completedProjectsCount}
            </p>
            <p className="text-[10px] font-bold text-[#787588] uppercase">Concluídos</p>
          </div>
        </div>
      </div>

      {/* Saved Favorites Section */}
      <div className="bg-white border border-[#c8c4d9]/70 rounded-2xl p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-headline font-bold text-base flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#4212de] fill-[#4212de]/10" />
            Especialistas Salvos
          </h3>
          <span className="text-xs font-bold text-[#787588]">
            {SPECIALISTS.slice(0, 3).length} favoritos
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {SPECIALISTS.slice(0, 3).map((spec) => (
            <div
              key={spec.id}
              className="p-3.5 rounded-xl border border-[#c8c4d9]/50 bg-[#fcf8ff] flex items-center justify-between gap-3"
            >
              <div
                onClick={() => onSelectSpecialist(spec)}
                className="flex items-center gap-3 cursor-pointer flex-1"
              >
                <img
                  src={spec.avatarUrl}
                  alt={spec.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#5b3df5]"
                />
                <div>
                  <p className="font-bold text-xs text-[#1c1a25]">{spec.name}</p>
                  <p className="text-[11px] text-[#474556]">{spec.role}</p>
                </div>
              </div>

              <button
                onClick={() => onOpenChatWith(spec)}
                className="p-2 rounded-lg bg-white border border-[#c8c4d9] text-[#4212de] hover:bg-[#5b3df5] hover:text-white transition-all"
                title="Mensagem"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Become a Specialist Banner */}
      <div className="bg-gradient-to-r from-[#5b3df5] via-[#4212de] to-[#1c1a25] rounded-3xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        <div className="space-y-1 text-center sm:text-left">
          <span className="bg-white/20 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md">
            Área do Especialista
          </span>
          <h4 className="font-headline font-extrabold text-lg sm:text-xl pt-1">
            Quer oferecer seus serviços no NEXO?
          </h4>
          <p className="text-xs text-white/80 max-w-lg">
            Cadastre suas habilidades, defina sua tarifa por hora e comece a receber propostas de clientes validados pelo Radar IA.
          </p>
        </div>
        <button
          onClick={() => onNavigate('register-pro')}
          className="whitespace-nowrap bg-white text-[#4212de] hover:bg-slate-100 font-bold px-5 py-3 rounded-xl text-xs shadow-md transition-all active:scale-95 flex items-center gap-2"
        >
          <Briefcase className="w-4 h-4" />
          Cadastrar meu Perfil Pro
        </button>
      </div>

      {/* Account Settings List */}
      <div className="bg-white border border-[#c8c4d9]/70 rounded-2xl overflow-hidden divide-y divide-[#e5e0ef]">
        <button
          onClick={() => onNavigate('login')}
          className="w-full p-4 flex items-center justify-between bg-[#f6f1ff]/60 hover:bg-[#5b3df5]/10 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#5b3df5] text-white">
              <User className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-xs text-[#4212de]">Alternar Tipo de Conta / Login</p>
              <p className="text-[11px] text-[#474556]">Acessar como Profissional ou Cliente</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#4212de]" />
        </button>

        <button
          onClick={() => onNavigate('projects')}
          className="w-full p-4 flex items-center justify-between hover:bg-[#fcf8ff] transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#5b3df5]/10 text-[#4212de]">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-xs text-[#1c1a25]">Histórico de Contratações</p>
              <p className="text-[11px] text-[#787588]">Veja recibos, contratos e relatórios</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#787588]" />
        </button>

        <div className="w-full p-4 flex items-center justify-between hover:bg-[#fcf8ff] transition-colors text-left cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-xs text-[#1c1a25]">Métodos de Pagamento</p>
              <p className="text-[11px] text-[#787588]">Cartões cadastrados e Faturamento PIX</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#787588]" />
        </div>

        <div className="w-full p-4 flex items-center justify-between hover:bg-[#fcf8ff] transition-colors text-left cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#5b3df5]/10 text-[#4212de]">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-xs text-[#1c1a25]">Preferências de Notificação</p>
              <p className="text-[11px] text-[#787588]">Alertas de radar, prazos e mensagens</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#787588]" />
        </div>

        <div className="w-full p-4 flex items-center justify-between hover:bg-[#fcf8ff] transition-colors text-left cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-100 text-blue-800">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-xs text-[#1c1a25]">Suporte Especializado NEXO</p>
              <p className="text-[11px] text-[#787588]">Fale com nossa equipe de concierge 24/7</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#787588]" />
        </div>
      </div>
    </div>
  );
};
