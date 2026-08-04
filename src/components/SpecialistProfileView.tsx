import React, { useState } from 'react';
import {
  ArrowLeft,
  Star,
  Clock,
  MapPin,
  Globe,
  CheckCircle2,
  MessageSquare,
  Zap,
  Heart,
  Share2,
  Briefcase,
  Award,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Layers,
  ThumbsUp,
  Calculator,
  Send
} from 'lucide-react';
import { Specialist, NavigationTab } from '../types';
import { SPECIALISTS } from '../data/mockData';

interface SpecialistProfileViewProps {
  specialist: Specialist | null;
  onNavigate: (tab: NavigationTab) => void;
  onSelectSpecialist: (specialist: Specialist) => void;
  onOpenChatWith: (specialist: Specialist) => void;
  onHire: (specialist: Specialist) => void;
  onStartRequestWithSpecialist?: (specialist: Specialist) => void;
}

export const SpecialistProfileView: React.FC<SpecialistProfileViewProps> = ({
  specialist: currentSpecialist,
  onNavigate,
  onSelectSpecialist,
  onOpenChatWith,
  onHire,
  onStartRequestWithSpecialist,
}) => {
  // Default to first specialist if none passed
  const activeSpecialist = currentSpecialist || SPECIALISTS[0];

  const [activeTab, setActiveTab] = useState<'ABOUT' | 'PORTFOLIO' | 'REVIEWS' | 'ESTIMATOR'>('ABOUT');
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Estimator state
  const [selectedServiceType, setSelectedServiceType] = useState<string>('Landing Page');
  const [urgencyOption, setUrgencyOption] = useState<'48h' | '5dias' | '10dias'>('5dias');

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Calculate quick estimate
  const getBaseRateNumber = () => {
    const match = activeSpecialist.hourlyRate.match(/\d+/);
    return match ? parseInt(match[0], 10) : 150;
  };

  const rate = getBaseRateNumber();
  const estimatedHours = selectedServiceType === 'Landing Page' ? 20 : selectedServiceType === 'App Mobile' ? 45 : 30;
  const multiplier = urgencyOption === '48h' ? 1.3 : urgencyOption === '5dias' ? 1.0 : 0.85;
  const estimatedPrice = Math.round(rate * estimatedHours * multiplier);

  return (
    <div className="min-h-screen pt-16 pb-32 px-4 md:px-8 max-w-[1120px] mx-auto space-y-6 animate-in fade-in duration-300 text-[#1c1a25]">
      {/* Top Header Controls & Specialist Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4">
        <button
          onClick={() => onNavigate('radar')}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#474556] hover:text-[#5b3df5] bg-white border border-[#c8c4d9]/70 px-3.5 py-2 rounded-xl hover:bg-[#f6f1ff] transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para Radar IA
        </button>

        {/* Quick Specialist Selector Bar */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 scrollbar-none">
          <span className="text-[11px] font-bold text-[#787588] whitespace-nowrap">
            Outros especialistas:
          </span>
          {SPECIALISTS.map(s => (
            <button
              key={s.id}
              onClick={() => onSelectSpecialist(s)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                s.id === activeSpecialist.id
                  ? 'bg-[#5b3df5] text-white shadow-sm'
                  : 'bg-white border border-[#c8c4d9] text-[#474556] hover:bg-[#f6f1ff]'
              }`}
            >
              <img
                src={s.avatarUrl}
                alt={s.name}
                className="w-4 h-4 rounded-full object-cover"
              />
              {s.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Profile Header Card */}
      <div className="bg-white border border-[#c8c4d9]/80 rounded-3xl overflow-hidden shadow-sm relative">
        {/* Banner Cover Background */}
        <div className="h-32 md:h-44 bg-gradient-to-r from-[#5b3df5] via-[#4212de] to-[#1c1a25] relative p-6 flex justify-end items-start">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_50%)]" />

          <div className="relative z-10 flex items-center gap-2">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`p-2.5 rounded-xl backdrop-blur-md transition-all shadow-sm ${
                isFavorite
                  ? 'bg-rose-500 text-white'
                  : 'bg-white/20 hover:bg-white/30 text-white'
              }`}
              title="Salvar nos favoritos"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={handleShare}
              className="p-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition-all shadow-sm relative"
              title="Compartilhar perfil"
            >
              <Share2 className="w-4 h-4" />
              {copied && (
                <span className="absolute -bottom-8 right-0 bg-[#1c1a25] text-white text-[10px] font-bold px-2 py-1 rounded-md whitespace-nowrap shadow-md">
                  Link copiado!
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Profile Details Container */}
        <div className="px-6 pb-6 pt-0 relative -mt-12 md:-mt-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
            <div className="relative">
              <img
                src={activeSpecialist.avatarUrl}
                alt={activeSpecialist.name}
                className="w-24 h-24 md:w-32 md:h-32 rounded-3xl object-cover border-4 border-white shadow-xl bg-white"
              />
              {activeSpecialist.isOnline && (
                <span className="absolute bottom-2 right-2 w-5 h-5 bg-[#42e09a] border-2 border-white rounded-full ring-4 ring-emerald-300" />
              )}
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="font-headline font-extrabold text-2xl md:text-3xl text-[#1c1a25]">
                  {activeSpecialist.name}
                </h1>
                <span className="bg-[#5b3df5]/10 text-[#4212de] text-xs font-extrabold uppercase px-2.5 py-1 rounded-lg border border-[#5b3df5]/20 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {activeSpecialist.level} Pro
                </span>
              </div>

              <p className="text-sm font-bold text-[#474556]">
                {activeSpecialist.role}
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-[#787588] pt-1 font-semibold">
                {activeSpecialist.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#5b3df5]" />
                    {activeSpecialist.location}
                  </span>
                )}
                {activeSpecialist.languages && (
                  <span className="flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-[#5b3df5]" />
                    {activeSpecialist.languages.join(' • ')}
                  </span>
                )}
                <span className="flex items-center gap-1 text-[#4212de] font-bold">
                  <Clock className="w-3.5 h-3.5" />
                  Responde em ~{activeSpecialist.responseTime}
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-2.5 w-full md:w-auto">
            <button
              onClick={() => onOpenChatWith(activeSpecialist)}
              className="px-5 py-3 bg-[#f6f1ff] hover:bg-[#5b3df5] text-[#4212de] hover:text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border border-[#5b3df5]/20"
            >
              <MessageSquare className="w-4 h-4" />
              Conversar
            </button>

            <button
              onClick={() => onHire(activeSpecialist)}
              className="px-6 py-3 bg-[#5b3df5] hover:bg-[#4212de] text-white rounded-xl text-xs font-bold shadow-md shadow-[#5b3df5]/20 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4" />
              Contratar ({activeSpecialist.hourlyRate})
            </button>
          </div>
        </div>

        {/* Quick Highlights Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-t border-[#e5e0ef] divide-x divide-[#e5e0ef] bg-[#fcf8ff]">
          <div className="p-4 text-center">
            <p className="text-[10px] font-bold text-[#787588] uppercase tracking-wider">Avaliação Geral</p>
            <p className="font-headline font-extrabold text-lg text-[#4212de] mt-0.5 flex items-center justify-center gap-1">
              <Star className="w-4 h-4 fill-current text-amber-500" />
              {activeSpecialist.rating} <span className="text-xs text-[#787588] font-normal">({activeSpecialist.reviewsCount})</span>
            </p>
          </div>

          <div className="p-4 text-center">
            <p className="text-[10px] font-bold text-[#787588] uppercase tracking-wider">Projetos Concluídos</p>
            <p className="font-headline font-extrabold text-lg text-[#1c1a25] mt-0.5">
              {activeSpecialist.completedProjects}+
            </p>
          </div>

          <div className="p-4 text-center">
            <p className="text-[10px] font-bold text-[#787588] uppercase tracking-wider">Taxa de Sucesso</p>
            <p className="font-headline font-extrabold text-lg text-emerald-700 mt-0.5">
              99.8%
            </p>
          </div>

          <div className="p-4 text-center">
            <p className="text-[10px] font-bold text-[#787588] uppercase tracking-wider">Tarifa de Hora</p>
            <p className="font-headline font-extrabold text-lg text-[#5b3df5] mt-0.5">
              {activeSpecialist.hourlyRate}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-[#c8c4d9]/60 gap-4 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('ABOUT')}
          className={`pb-3 px-2 text-xs font-bold transition-all relative whitespace-nowrap ${
            activeTab === 'ABOUT'
              ? 'text-[#5b3df5]'
              : 'text-[#787588] hover:text-[#1c1a25]'
          }`}
        >
          Sobre & Competências
          {activeTab === 'ABOUT' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5b3df5] rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('PORTFOLIO')}
          className={`pb-3 px-2 text-xs font-bold transition-all relative whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'PORTFOLIO'
              ? 'text-[#5b3df5]'
              : 'text-[#787588] hover:text-[#1c1a25]'
          }`}
        >
          Portfólio & Cases
          <span className="bg-[#5b3df5]/10 text-[#4212de] text-[10px] px-1.5 py-0.2 rounded-full font-extrabold">
            {activeSpecialist.portfolio?.length || 1}
          </span>
          {activeTab === 'PORTFOLIO' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5b3df5] rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('REVIEWS')}
          className={`pb-3 px-2 text-xs font-bold transition-all relative whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'REVIEWS'
              ? 'text-[#5b3df5]'
              : 'text-[#787588] hover:text-[#1c1a25]'
          }`}
        >
          Avaliações
          <span className="bg-amber-100 text-amber-800 text-[10px] px-1.5 py-0.2 rounded-full font-extrabold">
            {activeSpecialist.reviewsCount}
          </span>
          {activeTab === 'REVIEWS' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5b3df5] rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('ESTIMATOR')}
          className={`pb-3 px-2 text-xs font-bold transition-all relative whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'ESTIMATOR'
              ? 'text-[#5b3df5]'
              : 'text-[#787588] hover:text-[#1c1a25]'
          }`}
        >
          <Calculator className="w-3.5 h-3.5" />
          Simulador de Orçamento
          {activeTab === 'ESTIMATOR' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5b3df5] rounded-full" />
          )}
        </button>
      </div>

      {/* TAB CONTENT: ABOUT */}
      {activeTab === 'ABOUT' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Bio & Methodology */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white border border-[#c8c4d9]/70 rounded-3xl p-6 space-y-4 shadow-sm">
              <h3 className="font-headline font-bold text-lg text-[#1c1a25] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#5b3df5]" />
                Biografia & Apresentação
              </h3>
              <p className="text-sm text-[#474556] leading-relaxed">
                {activeSpecialist.bio}
              </p>
              <p className="text-sm text-[#474556] leading-relaxed">
                Trabalho com metodologias ágeis de entrega contínua, garantindo prototipagem rápida, feedbacks constantes e entregas organizadas no Figma e repositórios Git com alta cobertura de testes e padrões de mercado.
              </p>
            </div>

            {/* Skills & Tech Stack */}
            <div className="bg-white border border-[#c8c4d9]/70 rounded-3xl p-6 space-y-4 shadow-sm">
              <h3 className="font-headline font-bold text-lg text-[#1c1a25] flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#5b3df5]" />
                Stack Técnica & Ferramentas
              </h3>
              <div className="flex flex-wrap gap-2">
                {activeSpecialist.skills.map(skill => (
                  <div
                    key={skill}
                    className="bg-[#f6f1ff] border border-[#5b3df5]/15 px-3.5 py-2 rounded-xl text-xs font-bold text-[#4212de] flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#5b3df5]" />
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            {/* Garantias & Certificações NEXO */}
            <div className="bg-[#fcf8ff] border border-[#5b3df5]/20 rounded-3xl p-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#5b3df5] text-white rounded-2xl">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-headline font-bold text-base text-[#1c1a25]">
                    Garantia de Entrega NEXO
                  </h4>
                  <p className="text-xs text-[#474556]">
                    Seu pagamento fica seguro em custódia (Escrow) e só é liberado para o especialista após sua aprovação final de cada etapa do projeto.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Info Card */}
          <div className="space-y-4">
            <div className="bg-white border border-[#c8c4d9]/70 rounded-3xl p-6 space-y-4 shadow-sm">
              <h4 className="font-headline font-bold text-base text-[#1c1a25]">
                Informações de Atendimento
              </h4>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between py-2 border-b border-[#e5e0ef]">
                  <span className="text-[#787588]">Disponibilidade</span>
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    Imediata
                  </span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-[#e5e0ef]">
                  <span className="text-[#787588]">Tempo Médio de Projeto</span>
                  <span className="font-bold text-[#1c1a25]">3 a 7 dias</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-[#e5e0ef]">
                  <span className="text-[#787588]">Nível de Experiência</span>
                  <span className="font-bold text-[#4212de]">{activeSpecialist.level}</span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <span className="text-[#787588]">Suporte pós-entrega</span>
                  <span className="font-bold text-[#1c1a25]">15 dias grátis</span>
                </div>
              </div>

              <button
                onClick={() => onHire(activeSpecialist)}
                className="w-full py-3.5 bg-[#5b3df5] hover:bg-[#4212de] text-white font-bold rounded-xl text-xs transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
              >
                Solicitar Proposta Direta
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: PORTFOLIO */}
      {activeTab === 'PORTFOLIO' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-headline font-bold text-lg text-[#1c1a25]">
                Destaques do Portfólio
              </h3>
              <p className="text-xs text-[#474556]">
                Projetos reais entregues por {activeSpecialist.name} através do NEXO.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeSpecialist.portfolio && activeSpecialist.portfolio.length > 0 ? (
              activeSpecialist.portfolio.map(item => (
                <div
                  key={item.id}
                  className="bg-white border border-[#c8c4d9]/70 rounded-3xl overflow-hidden shadow-sm hover:border-[#5b3df5] transition-all flex flex-col justify-between"
                >
                  <div className="relative aspect-video overflow-hidden group">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-[#1c1a25]/80 backdrop-blur-md text-white text-[10px] font-extrabold px-2.5 py-1 rounded-lg">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#4212de]">
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{item.metrics}</span>
                    </div>

                    <h4 className="font-headline font-bold text-base text-[#1c1a25]">
                      {item.title}
                    </h4>

                    <p className="text-xs text-[#474556] leading-relaxed">
                      {item.description}
                    </p>

                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => onHire(activeSpecialist)}
                        className="text-xs font-bold text-[#4212de] hover:underline inline-flex items-center gap-1"
                      >
                        Quero um projeto parecido <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 bg-white border border-[#c8c4d9]/70 rounded-3xl p-8 text-center space-y-3">
                <img
                  src={activeSpecialist.featuredProjectImg || activeSpecialist.avatarUrl}
                  alt="Projeto"
                  className="w-full max-h-64 object-cover rounded-2xl mx-auto"
                />
                <h4 className="font-headline font-bold text-base text-[#1c1a25]">
                  Projeto de Destaque - {activeSpecialist.role}
                </h4>
                <p className="text-xs text-[#474556] max-w-lg mx-auto">
                  Este profissional possui {activeSpecialist.completedProjects} projetos concluídos na plataforma com taxa de satisfação de 99%.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB CONTENT: REVIEWS */}
      {activeTab === 'REVIEWS' && (
        <div className="space-y-6">
          <div className="bg-white border border-[#c8c4d9]/70 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-[#f6f1ff] text-[#4212de] rounded-2xl text-center">
                <p className="font-headline font-extrabold text-3xl">
                  {activeSpecialist.rating}
                </p>
                <div className="flex justify-center text-amber-500 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-headline font-bold text-base text-[#1c1a25]">
                  {activeSpecialist.reviewsCount} Avaliações Verificadas
                </h4>
                <p className="text-xs text-[#474556] mt-0.5">
                  100% de clientes recomendam {activeSpecialist.name.split(' ')[0]} para novos projetos.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {activeSpecialist.reviews && activeSpecialist.reviews.length > 0 ? (
              activeSpecialist.reviews.map(rev => (
                <div
                  key={rev.id}
                  className="bg-white border border-[#c8c4d9]/70 rounded-3xl p-6 space-y-3 shadow-sm"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <img
                        src={rev.clientAvatar}
                        alt={rev.clientName}
                        className="w-10 h-10 rounded-full object-cover border border-[#5b3df5]"
                      />
                      <div>
                        <p className="font-bold text-xs text-[#1c1a25]">{rev.clientName}</p>
                        <p className="text-[11px] text-[#787588]">{rev.clientRole}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 bg-amber-50 text-amber-900 px-2.5 py-1 rounded-lg text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      {rev.rating}.0
                    </div>
                  </div>

                  <div className="bg-[#fcf8ff] p-3 rounded-xl border border-[#c8c4d9]/40 text-xs">
                    <span className="font-bold text-[#4212de]">Projeto: </span>
                    <span className="text-[#1c1a25] font-medium">{rev.projectTitle}</span>
                  </div>

                  <p className="text-xs text-[#474556] leading-relaxed italic">
                    "{rev.comment}"
                  </p>

                  <p className="text-[10px] text-[#787588] text-right font-mono">
                    {rev.date}
                  </p>
                </div>
              ))
            ) : (
              <div className="bg-white border border-[#c8c4d9]/70 rounded-3xl p-6 space-y-3 text-xs text-[#474556]">
                <p className="font-bold text-sm text-[#1c1a25]">Avaliação recente de cliente:</p>
                <p className="italic">"Excelente comunicação, cumpriu o prazo à risca e entregou código muito bem estruturado!"</p>
                <p className="text-[10px] text-[#787588]">— Projeto verificado pelo sistema NEXO</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB CONTENT: ESTIMATOR */}
      {activeTab === 'ESTIMATOR' && (
        <div className="bg-white border border-[#c8c4d9]/70 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
          <div>
            <h3 className="font-headline font-bold text-xl text-[#1c1a25]">
              Simulador de Estimativa Direta
            </h3>
            <p className="text-xs text-[#474556] mt-0.5">
              Calcule o valor e tempo aproximado para seu projeto com {activeSpecialist.name}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#1c1a25] mb-2">
                  Qual o tipo do projeto?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Landing Page', 'App Mobile', 'Design System'] as const).map(type => (
                    <button
                      key={type}
                      onClick={() => setSelectedServiceType(type)}
                      className={`p-3 rounded-xl text-xs font-bold border text-center transition-all ${
                        selectedServiceType === type
                          ? 'bg-[#5b3df5] text-white border-[#5b3df5] shadow-sm'
                          : 'bg-[#fcf8ff] text-[#474556] border-[#c8c4d9]/60 hover:border-[#5b3df5]'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1c1a25] mb-2">
                  Nível de Urgência
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setUrgencyOption('48h')}
                    className={`p-3 rounded-xl text-xs font-bold border text-center transition-all ${
                      urgencyOption === '48h'
                        ? 'bg-[#5b3df5] text-white border-[#5b3df5]'
                        : 'bg-[#fcf8ff] text-[#474556] border-[#c8c4d9]/60'
                    }`}
                  >
                    ⚡ Express (48h)
                  </button>
                  <button
                    onClick={() => setUrgencyOption('5dias')}
                    className={`p-3 rounded-xl text-xs font-bold border text-center transition-all ${
                      urgencyOption === '5dias'
                        ? 'bg-[#5b3df5] text-white border-[#5b3df5]'
                        : 'bg-[#fcf8ff] text-[#474556] border-[#c8c4d9]/60'
                    }`}
                  >
                    📅 Padrão (5 dias)
                  </button>
                  <button
                    onClick={() => setUrgencyOption('10dias')}
                    className={`p-3 rounded-xl text-xs font-bold border text-center transition-all ${
                      urgencyOption === '10dias'
                        ? 'bg-[#5b3df5] text-white border-[#5b3df5]'
                        : 'bg-[#fcf8ff] text-[#474556] border-[#c8c4d9]/60'
                    }`}
                  >
                    🌱 Flexível (10 dias)
                  </button>
                </div>
              </div>
            </div>

            {/* Price Result Box */}
            <div className="bg-[#fcf8ff] border border-[#5b3df5]/30 rounded-2xl p-6 flex flex-col justify-between space-y-4">
              <div>
                <p className="text-xs font-bold text-[#787588] uppercase">Estimativa Calculada</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="font-headline font-extrabold text-3xl text-[#4212de]">
                    R$ {estimatedPrice.toLocaleString('pt-BR')}
                  </span>
                  <span className="text-xs text-[#787588]">/ valor estimado</span>
                </div>
                <p className="text-xs text-[#474556] mt-2">
                  Inclui briefing, entregáveis em Figma/Código e suporte de 15 dias.
                </p>
              </div>

              <button
                onClick={() => onHire(activeSpecialist)}
                className="w-full py-3.5 bg-[#5b3df5] hover:bg-[#4212de] text-white font-bold rounded-xl text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Iniciar Projeto com este Orçamento
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
