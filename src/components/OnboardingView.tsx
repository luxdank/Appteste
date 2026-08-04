import React from 'react';
import {
  Building2,
  Briefcase,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
  MapPin,
  CheckCircle2,
  UserCheck,
  UserPlus,
  LogIn,
  Globe,
  Layers,
  Search,
  Star
} from 'lucide-react';
import { NavigationTab } from '../types';

interface OnboardingViewProps {
  onNavigate: (tab: NavigationTab) => void;
  onStartRequest: () => void;
  onSelectRole?: (role: 'CLIENT' | 'PROFESSIONAL') => void;
}

export const OnboardingView: React.FC<OnboardingViewProps> = ({
  onNavigate,
  onStartRequest,
  onSelectRole,
}) => {
  const handleChooseClientLogin = () => {
    if (onSelectRole) onSelectRole('CLIENT');
    onNavigate('login');
  };

  const handleChooseClientExplore = () => {
    if (onSelectRole) onSelectRole('CLIENT');
    onNavigate('home');
  };

  const handleChooseProLogin = () => {
    if (onSelectRole) onSelectRole('PROFESSIONAL');
    onNavigate('login');
  };

  const handleChooseProRegister = () => {
    if (onSelectRole) onSelectRole('PROFESSIONAL');
    onNavigate('register-pro');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f3eefc] via-[#fcf8ff] to-[#f6f1ff] text-[#1c1a25] flex flex-col justify-between selection:bg-[#5b3df5]/20">
      {/* Top Standalone Header Bar */}
      <header className="w-full bg-white/80 backdrop-blur-md border-b border-[#c8c4d9]/50 sticky top-0 z-40 px-4 md:px-8 py-3.5">
        <div className="max-w-[1120px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#5b3df5] to-[#42e09a] p-0.5 shadow-md shadow-[#5b3df5]/20">
              <div className="w-full h-full bg-[#1c1a25] rounded-[14px] flex items-center justify-center text-white">
                <Sparkles className="w-5 h-5 text-[#42e09a]" />
              </div>
            </div>
            <div>
              <span className="font-headline font-black text-xl tracking-tight text-[#1c1a25] flex items-center gap-1.5">
                NEXO
                <span className="text-[10px] font-black tracking-widest text-white bg-[#5b3df5] px-2 py-0.5 rounded-full uppercase">
                  IA & GPS
                </span>
              </span>
              <p className="text-[10px] text-[#787588] font-medium hidden sm:block">
                Plataforma On-Demand de Talentos Tecnológicos
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleChooseClientLogin}
              className="px-4 py-2 text-xs font-extrabold text-[#4212de] bg-[#f6f1ff] hover:bg-[#e5e0ef] rounded-xl border border-[#5b3df5]/20 transition-all flex items-center gap-1.5"
            >
              <LogIn className="w-3.5 h-3.5" />
              Já possui conta? Entrar
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1120px] w-full mx-auto px-4 md:px-8 py-8 md:py-12 flex flex-col justify-center items-center">
        {/* Hero Welcome Text */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-10 md:mb-12">
          <span className="inline-flex items-center gap-2 text-xs font-black tracking-widest text-[#4212de] uppercase px-4 py-1.5 bg-[#5b3df5]/10 rounded-full border border-[#5b3df5]/20">
            <Sparkles className="w-3.5 h-3.5 text-[#5b3df5]" />
            Portal de Acesso Inicial NEXO
          </span>

          <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1c1a25] leading-tight tracking-tight">
            Como você deseja utilizar a plataforma hoje?
          </h1>

          <p className="text-sm md:text-base text-[#474556] max-w-2xl mx-auto leading-relaxed">
            Selecione seu perfil abaixo para acessar o ambiente personalizado. Conectamos empresas e contratantes a profissionais de tecnologia validados por geolocalização.
          </p>
        </div>

        {/* 2 Main Portal Selection Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-5xl mx-auto items-stretch">
          {/* CLIENT / CONTRATANTE CARD */}
          <div className="bg-white border-2 border-[#5b3df5]/30 hover:border-[#5b3df5] rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-36 h-36 bg-[#5b3df5]/5 rounded-bl-full pointer-events-none group-hover:bg-[#5b3df5]/10 transition-colors" />

            <div className="space-y-6 relative z-10">
              {/* Badge & Role Header */}
              <div className="flex items-center justify-between">
                <span className="bg-[#f6f1ff] text-[#4212de] text-xs font-black px-3.5 py-1.5 rounded-xl border border-[#5b3df5]/20 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-[#5b3df5]" />
                  PERFIL DE CLIENTE
                </span>
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-200">
                  Contratante
                </span>
              </div>

              {/* Title & Scope */}
              <div>
                <h2 className="font-headline font-extrabold text-2xl md:text-3xl text-[#1c1a25] group-hover:text-[#4212de] transition-colors">
                  Sou Cliente / Empresa
                </h2>
                <p className="text-xs md:text-sm text-[#474556] mt-2 leading-relaxed">
                  Quero publicar demandas ou buscar especialistas locais para projetos de Landing Pages, Mobile Apps, Sistemas Web ou IA.
                </p>
              </div>

              {/* Benefits list */}
              <div className="space-y-2.5 pt-4 border-t border-[#e5e0ef]">
                <div className="flex items-center gap-2.5 text-xs text-[#1c1a25] font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-[#42e09a] shrink-0" />
                  <span>Publicação rápida de projetos com estimativa por IA</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#1c1a25] font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-[#42e09a] shrink-0" />
                  <span>Busca de profissionais próximos com Radar GPS</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#1c1a25] font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-[#42e09a] shrink-0" />
                  <span>Pagamento seguro com garantia de entrega</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-8 relative z-10">
              <button
                onClick={handleChooseClientLogin}
                className="w-full bg-[#5b3df5] hover:bg-[#4212de] text-white font-extrabold py-3.5 px-6 rounded-2xl text-xs md:text-sm shadow-md shadow-[#5b3df5]/20 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <UserCheck className="w-4.5 h-4.5" />
                Entrar / Logar como Cliente
                <ArrowRight className="w-4 h-4 ml-auto" />
              </button>

              <button
                onClick={handleChooseClientExplore}
                className="w-full bg-[#f6f1ff] hover:bg-[#e5e0ef] text-[#4212de] font-bold py-3 px-6 rounded-2xl text-xs transition-all flex items-center justify-center gap-1.5"
              >
                <Search className="w-3.5 h-3.5" />
                Entrar sem Logar (Explorar Painel de Projetos)
              </button>
            </div>
          </div>

          {/* PROFESSIONAL / ESPECIALISTA CARD */}
          <div className="bg-gradient-to-br from-[#1c1a25] via-[#2a263a] to-[#121019] text-white border-2 border-[#5b3df5]/40 hover:border-[#42e09a] rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-36 h-36 bg-[#42e09a]/10 rounded-bl-full pointer-events-none group-hover:bg-[#42e09a]/20 transition-colors" />

            <div className="space-y-6 relative z-10">
              {/* Badge & Role Header */}
              <div className="flex items-center justify-between">
                <span className="bg-white/15 text-[#42e09a] text-xs font-black px-3.5 py-1.5 rounded-xl border border-white/20 flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-[#42e09a]" />
                  PERFIL DE PROFISSIONAL
                </span>
                <span className="text-[11px] font-extrabold text-[#42e09a] bg-[#42e09a]/20 px-2.5 py-1 rounded-full border border-[#42e09a]/30">
                  Prestador Pro
                </span>
              </div>

              {/* Title & Scope */}
              <div>
                <h2 className="font-headline font-extrabold text-2xl md:text-3xl text-white group-hover:text-[#42e09a] transition-colors">
                  Sou Profissional / Especialista
                </h2>
                <p className="text-xs md:text-sm text-white/80 mt-2 leading-relaxed">
                  Quero disponibilizar meu perfil, definir minha tarifa por hora e ser notificado sobre demandas de clientes na minha região.
                </p>
              </div>

              {/* Benefits list */}
              <div className="space-y-2.5 pt-4 border-t border-white/15">
                <div className="flex items-center gap-2.5 text-xs text-white/90 font-semibold">
                  <Zap className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>Notificação instantânea de propostas por geofence</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-white/90 font-semibold">
                  <MapPin className="w-4 h-4 text-[#42e09a] shrink-0" />
                  <span>Exibição prioritária no Radar de Proximidade GPS</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-white/90 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-[#42e09a] shrink-0" />
                  <span>Atendimento direto ao cliente com repasse integral</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-8 relative z-10">
              <button
                onClick={handleChooseProLogin}
                className="w-full bg-[#42e09a] hover:bg-[#32c986] text-[#1c1a25] font-extrabold py-3.5 px-6 rounded-2xl text-xs md:text-sm shadow-md shadow-[#42e09a]/20 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <UserCheck className="w-4.5 h-4.5" />
                Entrar / Logar como Profissional
                <ArrowRight className="w-4 h-4 ml-auto" />
              </button>

              <button
                onClick={handleChooseProRegister}
                className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-2xl text-xs border border-white/15 transition-all flex items-center justify-center gap-1.5"
              >
                <UserPlus className="w-3.5 h-3.5 text-[#42e09a]" />
                Criar Novo Cadastro de Profissional (4 Passos)
              </button>
            </div>
          </div>
        </div>

        {/* Platform Trust Guarantee Bar */}
        <div className="mt-12 w-full max-w-5xl bg-white border border-[#c8c4d9]/80 rounded-2xl p-4 md:p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#474556]">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[#5b3df5] shrink-0" />
            <div>
              <p className="font-bold text-[#1c1a25]">Segurança Garantida NEXO Custódia Escrow</p>
              <p className="text-[11px] text-[#787588]">Os valores do projeto ficam protegidos na plataforma e só são liberados após aprovação final da entrega.</p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="bg-[#f6f1ff] text-[#4212de] font-extrabold px-3 py-1.5 rounded-xl text-[11px] border border-[#5b3df5]/20">
              100% Protegido
            </span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 text-center text-[11px] text-[#787588] border-t border-[#c8c4d9]/40 bg-white/50">
        © {new Date().getFullYear()} NEXO Inteligência & Geofence • Conectando Talentos Locais em Tempo Real.
      </footer>
    </div>
  );
};
