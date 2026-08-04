import React, { useState } from 'react';
import {
  User,
  Briefcase,
  Lock,
  Mail,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Eye,
  EyeOff,
  CheckCircle2,
  Building2,
  Zap,
  Github,
  Linkedin,
  Star,
  Laptop,
  Code,
  Palette,
  Bot
} from 'lucide-react';
import { NavigationTab, Specialist } from '../types';
import { SPECIALISTS, USER_PROFILE } from '../data/mockData';

interface LoginViewProps {
  onNavigate: (tab: NavigationTab) => void;
  onLoginSuccess: (userRole: 'CLIENT' | 'PROFESSIONAL', userData?: any) => void;
  onRegisterSpecialist?: (specialist: Specialist) => void;
  currentRole?: 'CLIENT' | 'PROFESSIONAL';
}

export const LoginView: React.FC<LoginViewProps> = ({
  onNavigate,
  onLoginSuccess,
  onRegisterSpecialist,
  currentRole = 'CLIENT',
}) => {
  const [role, setRole] = useState<'CLIENT' | 'PROFESSIONAL'>(currentRole);
  const [mode, setMode] = useState<'LOGIN' | 'REGISTER'>('LOGIN');

  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [companyOrTitle, setCompanyOrTitle] = useState('');
  const [hourlyRate, setHourlyRate] = useState('R$ 150/h');
  const [specialty, setSpecialty] = useState('UI/UX Design');

  // Demo accounts options
  const handleQuickDemoLogin = (demoType: 'client' | 'pro-ui' | 'pro-dev' | 'pro-ai') => {
    if (demoType === 'client') {
      onLoginSuccess('CLIENT', USER_PROFILE);
    } else if (demoType === 'pro-ui') {
      onLoginSuccess('PROFESSIONAL', SPECIALISTS[0]);
    } else if (demoType === 'pro-dev') {
      onLoginSuccess('PROFESSIONAL', SPECIALISTS[1]);
    } else if (demoType === 'pro-ai') {
      onLoginSuccess('PROFESSIONAL', SPECIALISTS[2]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'LOGIN') {
      const user = role === 'CLIENT'
        ? { name: fullName || 'Carlos Silva', email: email || 'carlos@empresa.com.br', role: 'Cliente Pro' }
        : { name: fullName || 'Beatriz Lima', email: email || 'beatriz@nexo.design', role: specialty || 'Especialista UI/UX' };

      onLoginSuccess(role, user);
    } else {
      if (role === 'PROFESSIONAL' && onRegisterSpecialist) {
        const formattedRate = hourlyRate.includes('R$') ? hourlyRate : `R$ ${hourlyRate}/h`;
        const newSpec: Specialist = {
          id: `spec-user-${Date.now()}`,
          name: fullName || 'Novo Profissional',
          role: specialty || 'Especialista Pro',
          level: 'Sênior',
          rating: 5.0,
          reviewsCount: 1,
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
          isOnline: true,
          responseTime: '5 minutos',
          hourlyRate: formattedRate,
          skills: [specialty, 'Figma', 'React', 'Node.js'],
          bio: 'Profissional especialista focado em entregas de alto impacto com qualidade técnica e cumprimento rigoroso de prazos.',
          completedProjects: 1,
          location: 'São Paulo, SP',
          languages: ['Português (Nativo)', 'Inglês (Intermediário)'],
          featuredProjectImg: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
          portfolio: [
            {
              id: `port-${Date.now()}`,
              title: 'Projeto Inicial de Destaque',
              category: specialty,
              imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
              metrics: 'Entrega verificada pelo NEXO',
              description: 'Projeto construído e entregue com aprovação do cliente.'
            }
          ]
        };
        onRegisterSpecialist(newSpec);
      } else {
        const newUser = role === 'CLIENT'
          ? { name: fullName || 'Novo Cliente', email: email || 'contato@startup.com', role: companyOrTitle || 'Empresa' }
          : { name: fullName || 'Novo Profissional', email: email || 'pro@freelancer.com', role: specialty, hourlyRate };

        onLoginSuccess(role, newUser);
      }
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-28 px-4 md:px-8 max-w-[1120px] mx-auto flex flex-col items-center justify-center animate-in fade-in duration-300 text-[#1c1a25]">
      {/* Container Card */}
      <div className="w-full max-w-4xl bg-white border border-[#c8c4d9]/80 rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Left Informational Hero Banner */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#5b3df5] via-[#4212de] to-[#1c1a25] p-8 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_60%)] pointer-events-none" />

          {/* Top Logo branding */}
          <div className="relative z-10 space-y-2">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20">
              <Sparkles className="w-4 h-4 text-[#42e09a]" />
              <span className="text-xs font-black tracking-widest text-white uppercase">
                Plataforma NEXO
              </span>
            </div>

            <h2 className="font-headline font-black text-2xl md:text-3xl leading-tight pt-3">
              {role === 'CLIENT'
                ? 'Encontre os melhores talentos para seu projeto.'
                : 'Conecte-se a projetos de alto valor e receba via IA.'}
            </h2>

            <p className="text-xs text-white/80 leading-relaxed pt-1">
              {role === 'CLIENT'
                ? 'Publique demandas em segundos e receba orçamentos de especialistas validados pelo radar de inteligência artificial.'
                : 'Acesse um fluxo contínuo de clientes corporativos e startups com pagamentos em custódia garantidos.'}
            </p>
          </div>

          {/* Key Advantages list */}
          <div className="relative z-10 space-y-3 my-6">
            <div className="flex items-center gap-3 text-xs bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/15">
              <ShieldCheck className="w-5 h-5 text-[#42e09a] shrink-0" />
              <div>
                <p className="font-bold text-white">Pagamentos em Custódia (Escrow)</p>
                <p className="text-[10px] text-white/70">O dinheiro só é liberado após a aprovação da entrega.</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/15">
              <Zap className="w-5 h-5 text-amber-300 shrink-0" />
              <div>
                <p className="font-bold text-white">Radar IA de Triagem Instantânea</p>
                <p className="text-[10px] text-white/70">Matching inteligente por skill, histórico e prazos.</p>
              </div>
            </div>
          </div>

          {/* Footer test quote */}
          <div className="relative z-10 border-t border-white/15 pt-4 text-[11px] text-white/70 flex items-center gap-2">
            <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300 shrink-0" />
            <span>Mais de 10.000 projetos entregues com 99.8% de satisfação.</span>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="lg:col-span-7 p-6 md:p-10 space-y-6 flex flex-col justify-between">
          <div>
            {/* Account Role Selector Tabs */}
            <div className="space-y-2 mb-6">
              <label className="text-xs font-extrabold uppercase tracking-wider text-[#787588]">
                Selecione o tipo de acesso:
              </label>

              <div className="grid grid-cols-2 gap-2 bg-[#f6f1ff] p-1.5 rounded-2xl border border-[#5b3df5]/15">
                <button
                  type="button"
                  onClick={() => setRole('CLIENT')}
                  className={`py-3 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    role === 'CLIENT'
                      ? 'bg-white text-[#5b3df5] shadow-md border border-[#5b3df5]/20'
                      : 'text-[#474556] hover:text-[#1c1a25]'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  Sou Cliente
                </button>

                <button
                  type="button"
                  onClick={() => setRole('PROFESSIONAL')}
                  className={`py-3 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    role === 'PROFESSIONAL'
                      ? 'bg-[#5b3df5] text-white shadow-md'
                      : 'text-[#474556] hover:text-[#1c1a25]'
                  }`}
                >
                  <Briefcase className="w-4 h-4" />
                  Sou Profissional
                </button>
              </div>
            </div>

            {/* Mode Switcher Header */}
            <div className="flex items-center justify-between pb-2 border-b border-[#e5e0ef]">
              <div>
                <h3 className="font-headline font-extrabold text-xl text-[#1c1a25]">
                  {mode === 'LOGIN'
                    ? role === 'CLIENT' ? 'Acessar Conta de Cliente' : 'Acessar Área do Profissional'
                    : role === 'CLIENT' ? 'Criar Conta de Contratante' : 'Cadastrar-se como Especialista'}
                </h3>
                <p className="text-xs text-[#474556] mt-0.5">
                  {mode === 'LOGIN'
                    ? 'Informe seus dados para entrar no painel do NEXO.'
                    : 'Preencha os campos abaixo para iniciar imediatamente.'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setMode(mode === 'LOGIN' ? 'REGISTER' : 'LOGIN')}
                className="text-xs font-extrabold text-[#4212de] hover:underline bg-[#f6f1ff] px-3 py-1.5 rounded-lg"
              >
                {mode === 'LOGIN' ? 'Criar conta' : 'Já tem conta?'}
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              {mode === 'REGISTER' && (
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#1c1a25]">Nome Completo</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={role === 'CLIENT' ? 'Ex: Carlos Silva' : 'Ex: Beatriz Lima'}
                    className="w-full px-4 py-3 bg-[#fcf8ff] border border-[#c8c4d9]/70 rounded-xl text-xs text-[#1c1a25] focus:outline-none focus:ring-2 focus:ring-[#5b3df5]"
                  />
                </div>
              )}

              {mode === 'REGISTER' && role === 'PROFESSIONAL' && (
                <div className="bg-[#fcf8ff] border border-[#5b3df5]/30 p-3.5 rounded-2xl space-y-2 mb-2">
                  <div className="flex items-center gap-2 text-[#4212de] font-bold text-xs">
                    <Sparkles className="w-4 h-4" />
                    <span>Cadastro Completo com Radar IA</span>
                  </div>
                  <p className="text-[11px] text-[#474556]">
                    Cadastre suas skills, tarifa/hora, cidade, biografia e 1º case de portfólio.
                  </p>
                  <button
                    type="button"
                    onClick={() => onNavigate('register-pro')}
                    className="w-full py-2.5 bg-[#5b3df5] hover:bg-[#4212de] text-white font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2"
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    Abrir Formulário Completo de Cadastro Pro
                  </button>
                </div>
              )}

              {mode === 'REGISTER' && role === 'PROFESSIONAL' && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#1c1a25]">Especialidade Principal</label>
                    <select
                      value={specialty}
                      onChange={(e) => setSpecialty(e.target.value)}
                      className="w-full px-3 py-3 bg-[#fcf8ff] border border-[#c8c4d9]/70 rounded-xl text-xs text-[#1c1a25] focus:outline-none focus:ring-2 focus:ring-[#5b3df5]"
                    >
                      <option value="UI/UX Design">UI/UX Design</option>
                      <option value="Desenvolvedor Fullstack">Dev Fullstack</option>
                      <option value="Especialista em IA">Especialista IA</option>
                      <option value="Desenvolvedor Mobile">Dev Mobile</option>
                      <option value="Motion & 3D">Motion & 3D</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#1c1a25]">Tarifa por Hora</label>
                    <input
                      type="text"
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(e.target.value)}
                      placeholder="Ex: R$ 140/h"
                      className="w-full px-4 py-3 bg-[#fcf8ff] border border-[#c8c4d9]/70 rounded-xl text-xs text-[#1c1a25] focus:outline-none focus:ring-2 focus:ring-[#5b3df5]"
                    />
                  </div>
                </div>
              )}

              {mode === 'REGISTER' && role === 'CLIENT' && (
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#1c1a25]">Empresa ou Nome Fantasia</label>
                  <input
                    type="text"
                    value={companyOrTitle}
                    onChange={(e) => setCompanyOrTitle(e.target.value)}
                    placeholder="Ex: PayFlow Fintech / Startup"
                    className="w-full px-4 py-3 bg-[#fcf8ff] border border-[#c8c4d9]/70 rounded-xl text-xs text-[#1c1a25] focus:outline-none focus:ring-2 focus:ring-[#5b3df5]"
                  />
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1c1a25]">E-mail Profissional</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#787588] absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={role === 'CLIENT' ? 'cliente@empresa.com.br' : 'profissional@nexo.design'}
                    className="w-full pl-10 pr-4 py-3 bg-[#fcf8ff] border border-[#c8c4d9]/70 rounded-xl text-xs text-[#1c1a25] focus:outline-none focus:ring-2 focus:ring-[#5b3df5]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-[#1c1a25]">Senha</label>
                  {mode === 'LOGIN' && (
                    <button
                      type="button"
                      className="text-[11px] text-[#4212de] hover:underline font-semibold"
                    >
                      Esqueceu a senha?
                    </button>
                  )}
                </div>

                <div className="relative">
                  <Lock className="w-4 h-4 text-[#787588] absolute left-3.5 top-3.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 bg-[#fcf8ff] border border-[#c8c4d9]/70 rounded-xl text-xs text-[#1c1a25] focus:outline-none focus:ring-2 focus:ring-[#5b3df5]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-[#787588] hover:text-[#1c1a25]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#5b3df5] hover:bg-[#4212de] text-white font-bold rounded-xl text-xs shadow-md shadow-[#5b3df5]/20 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                {mode === 'LOGIN' ? 'Entrar na Conta' : 'Concluir Cadastro Gratuito'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick Demo Access Bar */}
            <div className="mt-6 pt-5 border-t border-[#e5e0ef] space-y-3">
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#787588] text-center">
                Acesso Rápido de Demonstração (1 Clique)
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('client')}
                  className="p-2.5 bg-[#f6f1ff] hover:bg-[#5b3df5]/10 border border-[#5b3df5]/20 rounded-xl text-center text-[11px] font-bold text-[#4212de] transition-all"
                >
                  🏢 Cliente Pro
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('pro-ui')}
                  className="p-2.5 bg-[#f6f1ff] hover:bg-[#5b3df5]/10 border border-[#5b3df5]/20 rounded-xl text-center text-[11px] font-bold text-[#4212de] transition-all"
                >
                  🎨 Pro: UI/UX
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('pro-dev')}
                  className="p-2.5 bg-[#f6f1ff] hover:bg-[#5b3df5]/10 border border-[#5b3df5]/20 rounded-xl text-center text-[11px] font-bold text-[#4212de] transition-all"
                >
                  💻 Pro: Dev
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('pro-ai')}
                  className="p-2.5 bg-[#f6f1ff] hover:bg-[#5b3df5]/10 border border-[#5b3df5]/20 rounded-xl text-center text-[11px] font-bold text-[#4212de] transition-all"
                >
                  🤖 Pro: IA
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
