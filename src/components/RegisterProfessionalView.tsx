import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Star,
  User,
  Briefcase,
  DollarSign,
  Clock,
  MapPin,
  Globe,
  Upload,
  Plus,
  X,
  Layers,
  Award,
  Zap,
  Image as ImageIcon,
  Check
} from 'lucide-react';
import { Specialist, NavigationTab } from '../types';

interface RegisterProfessionalViewProps {
  onNavigate: (tab: NavigationTab) => void;
  onRegisterSpecialist: (specialist: Specialist) => void;
}

// Preset avatars for easy selection
const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
];

const PRESET_PORTFOLIO_IMAGES = [
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
];

const POPULAR_SKILLS = [
  'Figma',
  'React',
  'TypeScript',
  'Node.js',
  'Next.js',
  'Tailwind CSS',
  'Gemini AI',
  'Python',
  'React Native',
  'Flutter',
  'UI/UX Design',
  'Design System',
  'PostgreSQL',
  'GraphQL',
  'Docker',
  'Three.js',
  'Motion 3D',
  'SEO'
];

export const RegisterProfessionalView: React.FC<RegisterProfessionalViewProps> = ({
  onNavigate,
  onRegisterSpecialist,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Personal Info
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('São Paulo, SP');
  const [languages, setLanguages] = useState<string[]>(['Português (Nativo)', 'Inglês (Fluente)']);
  const [avatarUrl, setAvatarUrl] = useState(PRESET_AVATARS[0]);
  const [customAvatarInput, setCustomAvatarInput] = useState('');

  // Step 2: Professional Details
  const [role, setRole] = useState('Desenvolvedor Fullstack');
  const [level, setLevel] = useState<'Sênior' | 'Master' | 'Lead' | 'Pleno'>('Sênior');
  const [hourlyRate, setHourlyRate] = useState('160');
  const [responseTime, setResponseTime] = useState('5 minutos');
  const [skills, setSkills] = useState<string[]>(['React', 'TypeScript', 'Node.js', 'Figma']);
  const [newSkillInput, setNewSkillInput] = useState('');

  // Step 3: Bio & Portfolio
  const [bio, setBio] = useState(
    'Especialista focado em entregar produtos escaláveis e interfaces modernas. Tenho ampla experiência no desenvolvimento de aplicações web e mobile utilizando as melhores práticas do mercado.'
  );
  const [projectTitle, setProjectTitle] = useState('Plataforma SaaS de Alta Conversão');
  const [projectCategory, setProjectCategory] = useState('Fullstack Web & UI/UX');
  const [projectMetrics, setProjectMetrics] = useState('+180% em engajamento de usuários');
  const [projectDescription, setProjectDescription] = useState(
    'Desenvolvimento de ponta a ponta com arquitetura moderna, prototipagem no Figma e integração com APIs de IA para resposta em tempo real.'
  );
  const [projectImageUrl, setProjectImageUrl] = useState(PRESET_PORTFOLIO_IMAGES[0]);

  // Skill toggling
  const handleToggleSkill = (skill: string) => {
    if (skills.includes(skill)) {
      setSkills(skills.filter(s => s !== skill));
    } else {
      setSkills([...skills, skill]);
    }
  };

  const handleAddCustomSkill = () => {
    if (newSkillInput.trim() && !skills.includes(newSkillInput.trim())) {
      setSkills([...skills, newSkillInput.trim()]);
      setNewSkillInput('');
    }
  };

  // Submit Handler
  const handleSubmitRegistration = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedRate = hourlyRate.includes('R$') ? hourlyRate : `R$ ${hourlyRate}/h`;

    const newSpecialist: Specialist = {
      id: `spec-user-${Date.now()}`,
      name: name.trim() || 'Profissional Nexo',
      role: role.trim() || 'Especialista',
      level: level,
      rating: 5.0,
      reviewsCount: 1,
      avatarUrl: customAvatarInput.trim() || avatarUrl,
      isOnline: true,
      responseTime: responseTime || '5 minutos',
      hourlyRate: formattedRate,
      skills: skills.length > 0 ? skills : ['React', 'Figma'],
      bio: bio,
      completedProjects: 1,
      location: location,
      languages: languages,
      featuredProjectImg: projectImageUrl,
      portfolio: [
        {
          id: `port-${Date.now()}`,
          title: projectTitle || 'Projeto de Destaque',
          category: projectCategory || 'Design & Tech',
          imageUrl: projectImageUrl,
          metrics: projectMetrics || 'Entregue com excelência',
          description: projectDescription
        }
      ],
      reviews: [
        {
          id: `rev-1`,
          clientName: 'Startup Founder',
          clientRole: 'CEO / Contratante Verificado',
          clientAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
          rating: 5,
          date: 'Hoje',
          projectTitle: projectTitle,
          comment: 'Excelente profissional! Atendimento rápido, código impecável e alinhamento perfeito de escopo.'
        }
      ]
    };

    onRegisterSpecialist(newSpecialist);
  };

  return (
    <div className="min-h-screen pt-20 pb-28 px-4 md:px-8 max-w-[1040px] mx-auto space-y-8 animate-in fade-in duration-300 text-[#1c1a25]">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <button
          onClick={() => onNavigate('login')}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#474556] hover:text-[#5b3df5] bg-white border border-[#c8c4d9]/70 px-3.5 py-2 rounded-xl hover:bg-[#f6f1ff] transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para login
        </button>

        <div className="flex items-center gap-2">
          <span className="bg-[#5b3df5]/10 text-[#4212de] text-xs font-extrabold uppercase px-3 py-1.5 rounded-xl border border-[#5b3df5]/20 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#5b3df5]" />
            Cadastro de Especialista Pro
          </span>
        </div>
      </div>

      {/* Wizard Progress Bar */}
      <div className="bg-white border border-[#c8c4d9]/80 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-center text-xs font-bold text-[#474556]">
          <span className={step >= 1 ? 'text-[#5b3df5]' : ''}>1. Dados Pessoais</span>
          <span className={step >= 2 ? 'text-[#5b3df5]' : ''}>2. Especialidade & Skills</span>
          <span className={step >= 3 ? 'text-[#5b3df5]' : ''}>3. Portfólio & Apresentação</span>
          <span className={step >= 4 ? 'text-[#5b3df5]' : ''}>4. Revisão & Publicação</span>
        </div>

        <div className="w-full bg-[#f6f1ff] h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-[#5b3df5] h-full rounded-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Registration Form Step Views */}
      <div className="bg-white border border-[#c8c4d9]/80 rounded-3xl p-6 md:p-10 shadow-lg space-y-6">
        {/* STEP 1: PERSONAL INFO */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="font-headline font-extrabold text-2xl text-[#1c1a25]">
                Passo 1: Dados Pessoais & Foto de Perfil
              </h2>
              <p className="text-xs text-[#474556] mt-1">
                Configure como seu perfil aparecerá para os clientes no Radar IA do NEXO.
              </p>
            </div>

            {/* Avatar Selector */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-[#1c1a25] block">
                Escolha sua foto de perfil (ou cole um link personalizado)
              </label>

              <div className="flex items-center gap-4 flex-wrap">
                <img
                  src={customAvatarInput.trim() || avatarUrl}
                  alt="Preview Avatar"
                  className="w-20 h-20 rounded-2xl object-cover border-4 border-[#5b3df5] shadow-md"
                />

                <div className="flex-1 space-y-2">
                  <p className="text-[11px] font-bold text-[#787588] uppercase">Opções sugeridas:</p>
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {PRESET_AVATARS.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setAvatarUrl(img);
                          setCustomAvatarInput('');
                        }}
                        className={`relative w-11 h-11 rounded-xl overflow-hidden border-2 transition-all ${
                          avatarUrl === img && !customAvatarInput
                            ? 'border-[#5b3df5] ring-2 ring-[#5b3df5]/30'
                            : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt={`Preset ${idx}`} className="w-full h-full object-cover" />
                        {avatarUrl === img && !customAvatarInput && (
                          <span className="absolute inset-0 bg-[#5b3df5]/40 flex items-center justify-center text-white">
                            <Check className="w-4 h-4" />
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-1">
                <input
                  type="url"
                  value={customAvatarInput}
                  onChange={(e) => setCustomAvatarInput(e.target.value)}
                  placeholder="Ou cole a URL de uma imagem pública (https://...)"
                  className="w-full px-4 py-3 bg-[#fcf8ff] border border-[#c8c4d9]/70 rounded-xl text-xs text-[#1c1a25] focus:outline-none focus:ring-2 focus:ring-[#5b3df5]"
                />
              </div>
            </div>

            {/* Text Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1c1a25]">Nome Completo *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Gabriel Albuquerque"
                  className="w-full px-4 py-3 bg-[#fcf8ff] border border-[#c8c4d9]/70 rounded-xl text-xs text-[#1c1a25] focus:outline-none focus:ring-2 focus:ring-[#5b3df5]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1c1a25]">E-mail Profissional *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="gabriel@nexo.design"
                  className="w-full px-4 py-3 bg-[#fcf8ff] border border-[#c8c4d9]/70 rounded-xl text-xs text-[#1c1a25] focus:outline-none focus:ring-2 focus:ring-[#5b3df5]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1c1a25]">Cidade / Estado</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Ex: São Paulo, SP (ou Remoto)"
                  className="w-full px-4 py-3 bg-[#fcf8ff] border border-[#c8c4d9]/70 rounded-xl text-xs text-[#1c1a25] focus:outline-none focus:ring-2 focus:ring-[#5b3df5]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1c1a25]">Telefone / WhatsApp</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(11) 99888-7766"
                  className="w-full px-4 py-3 bg-[#fcf8ff] border border-[#c8c4d9]/70 rounded-xl text-xs text-[#1c1a25] focus:outline-none focus:ring-2 focus:ring-[#5b3df5]"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => {
                  if (!name.trim() || !email.trim()) {
                    alert('Por favor, informe ao menos seu nome e e-mail.');
                    return;
                  }
                  setStep(2);
                }}
                className="px-6 py-3.5 bg-[#5b3df5] hover:bg-[#4212de] text-white font-bold rounded-xl text-xs shadow-md transition-all flex items-center gap-2"
              >
                Próximo Passo: Especialidades <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: SPECIALTY & SKILLS */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="font-headline font-extrabold text-2xl text-[#1c1a25]">
                Passo 2: Especialidade, Nível & Skills
              </h2>
              <p className="text-xs text-[#474556] mt-1">
                Essas informações alimentam o algoritmo de matching do Radar IA.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold text-[#1c1a25]">Título / Cargo Principal *</label>
                <input
                  type="text"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Ex: Desenvolvedor Fullstack & IA / UI UX Designer"
                  className="w-full px-4 py-3 bg-[#fcf8ff] border border-[#c8c4d9]/70 rounded-xl text-xs text-[#1c1a25] focus:outline-none focus:ring-2 focus:ring-[#5b3df5]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1c1a25]">Nível de Experiência</label>
                <select
                  value={level}
                  onChange={(e: any) => setLevel(e.target.value)}
                  className="w-full px-4 py-3 bg-[#fcf8ff] border border-[#c8c4d9]/70 rounded-xl text-xs text-[#1c1a25] focus:outline-none focus:ring-2 focus:ring-[#5b3df5]"
                >
                  <option value="Sênior">Sênior (5+ anos)</option>
                  <option value="Master">Master / Especialista</option>
                  <option value="Lead">Tech Lead / Architect</option>
                  <option value="Pleno">Pleno (3-5 anos)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1c1a25]">Tarifa por Hora (R$)</label>
                <input
                  type="text"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                  placeholder="Ex: 150"
                  className="w-full px-4 py-3 bg-[#fcf8ff] border border-[#c8c4d9]/70 rounded-xl text-xs text-[#1c1a25] focus:outline-none focus:ring-2 focus:ring-[#5b3df5]"
                />
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold text-[#1c1a25]">Tempo Médio de Resposta</label>
                <select
                  value={responseTime}
                  onChange={(e) => setResponseTime(e.target.value)}
                  className="w-full px-4 py-3 bg-[#fcf8ff] border border-[#c8c4d9]/70 rounded-xl text-xs text-[#1c1a25] focus:outline-none focus:ring-2 focus:ring-[#5b3df5]"
                >
                  <option value="5 minutos">~5 minutos (Super rápido)</option>
                  <option value="15 minutos">~15 minutos</option>
                  <option value="1 hora">~1 hora</option>
                  <option value="Mesmo dia">No mesmo dia</option>
                </select>
              </div>
            </div>

            {/* Skills Tag Selector */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-bold text-[#1c1a25] block">
                Selecione suas Skills Técnicas e Ferramentas (Clique para adicionar/remover)
              </label>

              <div className="flex flex-wrap gap-2">
                {POPULAR_SKILLS.map((sk) => {
                  const isSelected = skills.includes(sk);
                  return (
                    <button
                      key={sk}
                      type="button"
                      onClick={() => handleToggleSkill(sk)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-[#5b3df5] text-white border-[#5b3df5] shadow-sm'
                          : 'bg-[#fcf8ff] text-[#474556] border-[#c8c4d9]/60 hover:border-[#5b3df5]'
                      }`}
                    >
                      {isSelected ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      {sk}
                    </button>
                  );
                })}
              </div>

              {/* Add custom skill tag input */}
              <div className="flex items-center gap-2 max-w-md pt-2">
                <input
                  type="text"
                  value={newSkillInput}
                  onChange={(e) => setNewSkillInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCustomSkill())}
                  placeholder="Outra skill (pressione Enter...)"
                  className="flex-1 px-3.5 py-2 bg-[#fcf8ff] border border-[#c8c4d9]/70 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#5b3df5]"
                />
                <button
                  type="button"
                  onClick={handleAddCustomSkill}
                  className="px-3.5 py-2 bg-[#f6f1ff] text-[#4212de] border border-[#5b3df5]/20 font-bold rounded-xl text-xs hover:bg-[#5b3df5] hover:text-white transition-all"
                >
                  Adicionar
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-5 py-3 border border-[#c8c4d9] text-[#474556] hover:bg-[#f6f1ff] font-bold rounded-xl text-xs transition-all"
              >
                Voltar
              </button>

              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-6 py-3.5 bg-[#5b3df5] hover:bg-[#4212de] text-white font-bold rounded-xl text-xs shadow-md transition-all flex items-center gap-2"
              >
                Próximo Passo: Portfólio <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: BIO & PORTFOLIO */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="font-headline font-extrabold text-2xl text-[#1c1a25]">
                Passo 3: Apresentação & Primeiro Case de Sucesso
              </h2>
              <p className="text-xs text-[#474556] mt-1">
                Profissionais com pelo menos 1 case cadastrado recebem 3x mais propostas diretas.
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#1c1a25]">Biografia / Metodologia de Trabalho</label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Conte sobre sua trajetória, metodologias ágeis e tipo de projeto que costuma entregar..."
                className="w-full px-4 py-3 bg-[#fcf8ff] border border-[#c8c4d9]/70 rounded-xl text-xs text-[#1c1a25] focus:outline-none focus:ring-2 focus:ring-[#5b3df5]"
              />
            </div>

            {/* Case Form Card */}
            <div className="bg-[#fcf8ff] border border-[#5b3df5]/20 rounded-2xl p-5 space-y-4">
              <h3 className="font-headline font-bold text-sm text-[#4212de] flex items-center gap-2">
                <Award className="w-4 h-4" />
                Case de Destaque no Portfólio
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#1c1a25]">Título do Projeto</label>
                  <input
                    type="text"
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    placeholder="Ex: App de Entregas SaaS"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#c8c4d9]/70 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#5b3df5]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#1c1a25]">Categoria do Case</label>
                  <input
                    type="text"
                    value={projectCategory}
                    onChange={(e) => setProjectCategory(e.target.value)}
                    placeholder="Ex: React Native & UX"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#c8c4d9]/70 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#5b3df5]"
                  />
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-bold text-[#1c1a25]">Métrica de Resultado / Destaque</label>
                  <input
                    type="text"
                    value={projectMetrics}
                    onChange={(e) => setProjectMetrics(e.target.value)}
                    placeholder="Ex: +150% de conversão ou Lançamento em 7 dias"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#c8c4d9]/70 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#5b3df5]"
                  />
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-bold text-[#1c1a25]">Descrição do Case</label>
                  <textarea
                    rows={2}
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    placeholder="Descreva brevemente o desafio e o que você construiu..."
                    className="w-full px-3.5 py-2.5 bg-white border border-[#c8c4d9]/70 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#5b3df5]"
                  />
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-bold text-[#1c1a25]">Imagem do Case</label>
                  <div className="flex items-center gap-3">
                    <img
                      src={projectImageUrl}
                      alt="Project Preview"
                      className="w-20 h-14 rounded-xl object-cover border border-[#c8c4d9]"
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2 overflow-x-auto pb-1">
                        {PRESET_PORTFOLIO_IMAGES.map((img, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setProjectImageUrl(img)}
                            className={`w-12 h-9 rounded-lg overflow-hidden border-2 shrink-0 ${
                              projectImageUrl === img ? 'border-[#5b3df5]' : 'border-transparent opacity-60'
                            }`}
                          >
                            <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-5 py-3 border border-[#c8c4d9] text-[#474556] hover:bg-[#f6f1ff] font-bold rounded-xl text-xs transition-all"
              >
                Voltar
              </button>

              <button
                type="button"
                onClick={() => setStep(4)}
                className="px-6 py-3.5 bg-[#5b3df5] hover:bg-[#4212de] text-white font-bold rounded-xl text-xs shadow-md transition-all flex items-center gap-2"
              >
                Revisar Perfil <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: REVIEW & PUBLISH */}
        {step === 4 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="font-headline font-extrabold text-2xl text-[#1c1a25]">
                Passo 4: Confirmar & Ativar Perfil
              </h2>
              <p className="text-xs text-[#474556] mt-1">
                Confira como seu perfil será exibido para clientes em todo o Brasil.
              </p>
            </div>

            {/* Profile Preview Card */}
            <div className="border border-[#5b3df5]/30 bg-[#fcf8ff] rounded-3xl p-6 space-y-4 shadow-sm relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-[#5b3df5] text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full">
                Preview de Perfil Ativo
              </div>

              <div className="flex items-center gap-4">
                <img
                  src={customAvatarInput.trim() || avatarUrl}
                  alt={name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-[#5b3df5] shadow-md"
                />
                <div>
                  <h3 className="font-headline font-bold text-lg text-[#1c1a25]">{name || 'Seu Nome'}</h3>
                  <p className="text-xs text-[#474556]">
                    {role} • <span className="font-bold text-[#4212de]">{level}</span>
                  </p>
                  <p className="text-xs text-emerald-700 font-bold mt-0.5">
                    R$ {hourlyRate}/h • Resposta em {responseTime}
                  </p>
                </div>
              </div>

              <p className="text-xs text-[#474556] italic">"{bio}"</p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {skills.map((sk) => (
                  <span
                    key={sk}
                    className="bg-white text-[#4212de] border border-[#5b3df5]/20 text-[10px] font-bold px-2.5 py-1 rounded-lg"
                  >
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            {/* Escrow Guarantee Statement */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs text-emerald-900">
                <p className="font-bold">Garantia de Recebimento por Custódia Seguro (Escrow)</p>
                <p className="mt-0.5 text-emerald-800/90">
                  Ao concluir o cadastro, seu perfil ganha o selo Verificado Pro. Todo projeto aceito conta com o valor depositado em conta garantia antes do início do trabalho.
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-5 py-3 border border-[#c8c4d9] text-[#474556] hover:bg-[#f6f1ff] font-bold rounded-xl text-xs transition-all"
              >
                Voltar
              </button>

              <button
                type="button"
                onClick={handleSubmitRegistration}
                className="px-8 py-4 bg-[#5b3df5] hover:bg-[#4212de] text-white font-extrabold rounded-2xl text-xs shadow-lg shadow-[#5b3df5]/30 active:scale-95 transition-all flex items-center gap-2"
              >
                <Zap className="w-4 h-4 fill-current" />
                Concluir Cadastro & Ir para Meu Perfil
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
