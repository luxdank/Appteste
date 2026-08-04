import React, { useState } from 'react';
import {
  Briefcase,
  Clock,
  CheckCircle2,
  Calendar,
  DollarSign,
  MessageSquare,
  Plus,
  ChevronRight,
  FileText,
  X
} from 'lucide-react';
import { INITIAL_PROJECTS, SPECIALISTS } from '../data/mockData';
import { Project, NavigationTab, Specialist } from '../types';

interface ProjectsViewProps {
  onNavigate: (tab: NavigationTab) => void;
  onOpenNewRequest: () => void;
  onOpenChatWith: (specialist: Specialist) => void;
  selectedProjectFromHome?: Project | null;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  onNavigate,
  onOpenNewRequest,
  onOpenChatWith,
  selectedProjectFromHome,
}) => {
  const [filter, setFilter] = useState<'TODOS' | 'EM ANDAMENTO' | 'REVISÃO' | 'CONCLUÍDO'>('TODOS');
  const [selectedProject, setSelectedProject] = useState<Project | null>(selectedProjectFromHome || null);

  const filteredProjects = INITIAL_PROJECTS.filter(p => {
    if (filter === 'TODOS') return true;
    return p.status === filter;
  });

  const getDeliverables = (projId: string) => [
    { title: 'Briefing e Alinhamento Estratégico', done: true, date: '14 Out' },
    { title: 'Protótipo de Baixa Fidelidade & UX Flow', done: true, date: '16 Out' },
    { title: 'Design System & Componentes UI em Figma', done: true, date: '18 Out' },
    { title: 'Desenvolvimento Frontend React & Tailwind', done: projId !== 'proj-1', date: '20 Out' },
    { title: 'Testes de Responsividade e Lançamento', done: projId === 'proj-3', date: '22 Out' },
  ];

  return (
    <div className="min-h-screen pt-20 pb-28 px-4 md:px-8 max-w-[1120px] mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-headline text-2xl md:text-3xl font-extrabold text-[#1c1a25]">
            Meus Projetos
          </h2>
          <p className="text-sm text-[#474556] mt-0.5">
            Acompanhe a evolução, entregáveis e prazos em tempo real.
          </p>
        </div>

        <button
          onClick={onOpenNewRequest}
          className="bg-[#5b3df5] hover:bg-[#4212de] text-white px-5 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Novo Projeto
        </button>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {(['TODOS', 'EM ANDAMENTO', 'REVISÃO', 'CONCLUÍDO'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              filter === tab
                ? 'bg-[#5b3df5] text-white shadow-sm'
                : 'bg-white border border-[#c8c4d9] text-[#474556] hover:bg-[#f6f1ff]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white border border-[#c8c4d9]/70 rounded-2xl p-6 shadow-sm hover:border-[#5b3df5] hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-3">
                <span
                  className={`px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-md ${
                    project.status === 'EM ANDAMENTO'
                      ? 'bg-emerald-100 text-emerald-800'
                      : project.status === 'REVISÃO'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {project.status}
                </span>
                <span className="text-xs text-[#787588] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {project.updatedAt}
                </span>
              </div>

              <h3 className="font-headline font-bold text-lg text-[#1c1a25] mb-1">
                {project.title}
              </h3>
              <p className="text-xs text-[#474556] line-clamp-2 mb-4 leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="space-y-4">
              {/* Progress Bar */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1.5 font-bold">
                  <span className="text-[#474556]">Progresso Geral</span>
                  <span className="text-[#4212de]">{project.progressPercent}%</span>
                </div>
                <div className="w-full h-2 bg-[#f0ecfa] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#5b3df5] rounded-full transition-all duration-500"
                    style={{ width: `${project.progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Footer Meta & Actions */}
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
                  <span className="text-xs font-semibold text-[#1c1a25]">
                    {project.budget}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedProject(project)}
                  className="text-xs font-bold text-[#4212de] hover:bg-[#f6f1ff] px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                >
                  Detalhes <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Modal Drawer */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 space-y-6 text-[#1c1a25] relative shadow-2xl">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-[#787588] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="px-3 py-1 text-[10px] font-extrabold uppercase bg-[#f6f1ff] text-[#4212de] rounded-md inline-block mb-2">
                {selectedProject.category}
              </span>
              <h3 className="font-headline font-extrabold text-2xl text-[#1c1a25]">
                {selectedProject.title}
              </h3>
              <p className="text-xs text-[#474556] mt-2 leading-relaxed">
                {selectedProject.description}
              </p>
            </div>

            {/* Status & Metrics Grid */}
            <div className="grid grid-cols-3 gap-3 bg-[#fcf8ff] p-4 rounded-2xl border border-[#c8c4d9]/50 text-center">
              <div>
                <p className="text-[10px] font-bold text-[#787588] uppercase">Status</p>
                <p className="font-bold text-xs text-[#4212de] mt-0.5">{selectedProject.status}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-[#787588] uppercase">Prazo</p>
                <p className="font-bold text-xs text-[#1c1a25] mt-0.5">{selectedProject.deadline}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-[#787588] uppercase">Orçamento</p>
                <p className="font-bold text-xs text-emerald-700 mt-0.5">{selectedProject.budget}</p>
              </div>
            </div>

            {/* Assigned Experts Section */}
            <div>
              <h4 className="font-headline font-bold text-sm text-[#1c1a25] mb-3">
                Especialistas Alocados
              </h4>
              <div className="space-y-2.5">
                {selectedProject.assignedSpecialists.map((spec) => (
                  <div
                    key={spec.id}
                    className="flex items-center justify-between p-3 rounded-xl border border-[#c8c4d9]/50 bg-white"
                  >
                    <div className="flex items-center gap-3">
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
                      onClick={() => {
                        setSelectedProject(null);
                        onOpenChatWith(spec);
                      }}
                      className="px-3 py-1.5 bg-[#f6f1ff] hover:bg-[#5b3df5] text-[#4212de] hover:text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      Chat
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Deliverables Checklist */}
            <div>
              <h4 className="font-headline font-bold text-sm text-[#1c1a25] mb-3">
                Checklist de Entregáveis
              </h4>
              <div className="space-y-2">
                {getDeliverables(selectedProject.id).map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#fcf8ff] border border-[#c8c4d9]/40 text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2
                        className={`w-4 h-4 ${
                          item.done ? 'text-emerald-500 fill-emerald-100' : 'text-[#c8c4d9]'
                        }`}
                      />
                      <span className={item.done ? 'text-[#1c1a25] font-semibold' : 'text-[#787588]'}>
                        {item.title}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#787588] font-mono">{item.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-2 flex justify-end gap-3">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2.5 bg-[#5b3df5] text-white font-bold rounded-xl text-xs hover:bg-[#4212de] transition-colors"
              >
                Concluído
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
