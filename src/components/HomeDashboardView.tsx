import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  Globe,
  Layout,
  Smartphone,
  Palette,
  Share2,
  Film,
  Plus,
  Star,
  ChevronRight,
  Clock,
  ArrowRight,
  TrendingUp,
  MessageSquare,
  Briefcase
} from 'lucide-react';
import { USER_PROFILE, SERVICE_CATEGORIES, SPECIALISTS, INITIAL_PROJECTS } from '../data/mockData';
import { NavigationTab, Specialist, Project } from '../types';

interface HomeDashboardViewProps {
  onNavigate: (tab: NavigationTab) => void;
  onSelectService: (serviceId: string) => void;
  onSelectSpecialist: (specialist: Specialist) => void;
  onSelectProject: (project: Project) => void;
  onOpenChatWith: (specialist: Specialist) => void;
  specialists?: Specialist[];
}

export const HomeDashboardView: React.FC<HomeDashboardViewProps> = ({
  onNavigate,
  onSelectService,
  onSelectSpecialist,
  onSelectProject,
  onOpenChatWith,
  specialists: providedSpecialists,
}) => {
  const activeSpecialists = providedSpecialists && providedSpecialists.length > 0 ? providedSpecialists : SPECIALISTS;
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate('radar');
    }
  };

  const getServiceIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'landing page':
        return <Globe className="w-6 h-6 text-[#4212de]" />;
      case 'website':
      case 'site':
        return <Layout className="w-6 h-6 text-[#0056c5]" />;
      case 'aplicativo':
        return <Smartphone className="w-6 h-6 text-[#4212de]" />;
      case 'design':
        return <Palette className="w-6 h-6 text-[#0056c5]" />;
      case 'social media':
        return <Share2 className="w-6 h-6 text-[#4212de]" />;
      case 'motion':
        return <Film className="w-6 h-6 text-[#0056c5]" />;
      default:
        return <Plus className="w-6 h-6 text-[#4212de]" />;
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-28 px-4 md:px-8 max-w-[1120px] mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Welcome Header */}
      <section className="pt-2">
        <h2 className="font-headline text-2xl sm:text-3xl font-bold text-[#1c1a25]">
          Bom dia, {USER_PROFILE.name}.
        </h2>
        <p className="font-body text-sm sm:text-base text-[#474556] mt-1">
          Pronto para acelerar seu próximo projeto com os melhores talentos?
        </p>
      </section>

      {/* AI Search Bar */}
      <section>
        <form onSubmit={handleSearchSubmit} className="relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#4212de]">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="O que você precisa hoje? (ex: Criar Landing Page SaaS ou App de entregas...)"
            className="w-full pl-12 pr-28 py-4 bg-white border border-[#c8c4d9] rounded-2xl shadow-sm text-sm sm:text-base text-[#1c1a25] placeholder:text-[#787588] focus:outline-none focus:ring-2 focus:ring-[#5b3df5] focus:border-transparent transition-all"
          />
          <div className="absolute inset-y-0 right-3 flex items-center">
            <button
              type="submit"
              className="bg-[#5b3df5] hover:bg-[#4212de] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all active:scale-95 shadow-sm flex items-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5" />
              Buscar
            </button>
          </div>
        </form>
      </section>

      {/* Nossos Serviços Section */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-headline font-bold text-lg text-[#1c1a25]">
            Nossos Serviços
          </h3>
          <button
            onClick={() => onNavigate('request')}
            className="text-xs font-bold text-[#4212de] hover:underline flex items-center gap-1"
          >
            Ver todos <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {[
            { id: 'landing', name: 'Landing Page' },
            { id: 'website', name: 'Website' },
            { id: 'app', name: 'Aplicativo' },
            { id: 'design', name: 'Design' },
            { id: 'social', name: 'Social Media' },
            { id: 'motion', name: 'Motion' },
          ].map((srv) => (
            <button
              key={srv.id}
              onClick={() => onSelectService(srv.id)}
              className="flex flex-col items-center p-4 bg-white border border-[#c8c4d9]/70 rounded-2xl hover:border-[#5b3df5] hover:shadow-md transition-all group text-center active:scale-95"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#5b3df5]/10 group-hover:bg-[#5b3df5] transition-colors mb-2">
                {React.cloneElement(getServiceIcon(srv.name), {
                  className: 'w-6 h-6 text-[#4212de] group-hover:text-white transition-colors',
                })}
              </div>
              <span className="font-semibold text-xs text-[#1c1a25]">
                {srv.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Projetos Recentes */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-headline font-bold text-lg text-[#1c1a25]">
            Projetos recentes
          </h3>
          <button
            onClick={() => onNavigate('projects')}
            className="text-xs font-bold text-[#4212de] hover:underline flex items-center gap-1"
          >
            Ver histórico <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {INITIAL_PROJECTS.slice(0, 2).map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="bg-white border border-[#c8c4d9]/70 rounded-2xl p-5 hover:border-[#5b3df5] hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span
                    className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md ${
                      project.status === 'EM ANDAMENTO'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {project.status}
                  </span>
                  <span className="text-xs text-[#787588] flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {project.updatedAt}
                  </span>
                </div>

                <h4 className="font-headline font-bold text-base text-[#1c1a25] group-hover:text-[#4212de] transition-colors mb-1">
                  {project.title}
                </h4>
                <p className="text-xs text-[#474556] line-clamp-2 mb-4 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#e5e0ef] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {project.assignedSpecialists.map((spec) => (
                      <img
                        key={spec.id}
                        src={spec.avatarUrl}
                        alt={spec.name}
                        className="w-7 h-7 rounded-full border-2 border-white object-cover"
                        title={spec.name}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-[#787588]">
                    Prazo: {project.deadline}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="flex items-center gap-2">
                  <div className="w-20 sm:w-28 h-2 bg-[#f0ecfa] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#5b3df5] rounded-full transition-all duration-500"
                      style={{ width: `${project.progressPercent}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-[#4212de]">
                    {project.progressPercent}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Profissionais Favoritos */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-headline font-bold text-lg text-[#1c1a25]">
            Profissionais favoritos
          </h3>
          <button
            onClick={() => onNavigate('radar')}
            className="text-xs font-bold text-[#4212de] hover:underline flex items-center gap-1"
          >
            Explorar mais <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeSpecialists.length === 0 ? (
            <div className="col-span-1 md:col-span-2 bg-white border border-dashed border-[#c8c4d9] rounded-2xl p-6 text-center space-y-3">
              <p className="text-xs font-bold text-[#1c1a25]">Nenhum especialista cadastrado no momento</p>
              <p className="text-[11px] text-[#787588]">Seja o primeiro profissional a se cadastrar e oferecer serviços no NEXO!</p>
              <button
                onClick={() => onNavigate('register-pro')}
                className="px-4 py-2.5 bg-[#5b3df5] hover:bg-[#4212de] text-white font-bold text-xs rounded-xl shadow-sm transition-all"
              >
                Cadastrar Perfil de Profissional
              </button>
            </div>
          ) : (
            activeSpecialists.slice(0, 4).map((spec) => (
              <div
                key={spec.id}
                className="bg-white border border-[#c8c4d9]/70 rounded-2xl p-4 flex items-center justify-between hover:border-[#5b3df5] hover:shadow-sm transition-all"
              >
                <div
                  onClick={() => onSelectSpecialist(spec)}
                  className="flex items-center gap-3.5 cursor-pointer flex-1"
                >
                  <div className="relative">
                    <img
                      src={spec.avatarUrl}
                      alt={spec.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-[#5b3df5]/20"
                    />
                    {spec.isOnline && (
                      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#42e09a] border-2 border-white rounded-full ring-1 ring-emerald-300" />
                    )}
                  </div>

                  <div>
                    <h5 className="font-headline font-bold text-sm text-[#1c1a25]">
                      {spec.name}
                    </h5>
                    <p className="text-xs text-[#474556]">
                      {spec.role} • <span className="font-semibold">{spec.level}</span>
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#4212de] bg-[#f6f1ff] px-2 py-0.5 rounded-md">
                        <Star className="w-3 h-3 fill-current" />
                        {spec.rating}
                      </span>
                      <span className="text-[11px] text-[#787588]">
                        {spec.responseTime} de resposta
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pl-2 border-l border-[#e5e0ef]">
                  <button
                    onClick={() => onOpenChatWith(spec)}
                    className="p-2.5 rounded-xl bg-[#f6f1ff] hover:bg-[#5b3df5] text-[#4212de] hover:text-white transition-all active:scale-90"
                    title="Conversar"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onSelectSpecialist(spec)}
                    className="px-3.5 py-2 rounded-xl bg-[#5b3df5] hover:bg-[#4212de] text-white text-xs font-bold transition-all active:scale-95 shadow-sm"
                  >
                    Contratar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Floating Call to Action banner */}
      <section className="bg-gradient-to-r from-[#5b3df5] to-[#4212de] rounded-2xl p-6 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="font-headline font-extrabold text-lg sm:text-xl">
            Precisa de um orçamento relâmpago?
          </h4>
          <p className="text-xs sm:text-sm text-white/80 max-w-lg">
            Nossa IA analisa sua demanda em menos de 30 segundos e sugere a equipe e o orçamento ideal sem compromisso.
          </p>
        </div>
        <button
          onClick={() => onNavigate('request')}
          className="whitespace-nowrap bg-white text-[#4212de] hover:bg-slate-100 font-bold px-6 py-3.5 rounded-xl text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center gap-2"
        >
          Criar Solicitação
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
};
