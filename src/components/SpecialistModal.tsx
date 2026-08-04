import React from 'react';
import { X, Star, Clock, CheckCircle2, MessageSquare, Briefcase, Award, Zap } from 'lucide-react';
import { Specialist } from '../types';

interface SpecialistModalProps {
  specialist: Specialist | null;
  onClose: () => void;
  onOpenChatWith: (specialist: Specialist) => void;
  onHire: (specialist: Specialist) => void;
  onOpenFullProfile?: (specialist: Specialist) => void;
}

export const SpecialistModal: React.FC<SpecialistModalProps> = ({
  specialist,
  onClose,
  onOpenChatWith,
  onHire,
  onOpenFullProfile,
}) => {
  if (!specialist) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 space-y-6 text-[#1c1a25] relative shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-[#787588] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Profile Section */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <div className="relative">
            <img
              src={specialist.avatarUrl}
              alt={specialist.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-[#5b3df5]/20 shadow-md"
            />
            {specialist.isOnline && (
              <span className="absolute bottom-1 right-1 w-4 h-4 bg-[#42e09a] border-2 border-white rounded-full ring-2 ring-emerald-300" />
            )}
          </div>

          <div className="text-center sm:text-left space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h3 className="font-headline font-extrabold text-2xl text-[#1c1a25]">
                {specialist.name}
              </h3>
              <span className="bg-[#5b3df5]/10 text-[#4212de] text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md">
                {specialist.level}
              </span>
            </div>
            <p className="text-sm font-semibold text-[#474556]">{specialist.role}</p>

            <div className="flex items-center justify-center sm:justify-start gap-3 pt-1 text-xs">
              <span className="inline-flex items-center gap-1 font-bold text-[#4212de] bg-[#f6f1ff] px-2.5 py-1 rounded-lg">
                <Star className="w-3.5 h-3.5 fill-current" />
                {specialist.rating} ({specialist.reviewsCount})
              </span>
              <span className="text-[#787588] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {specialist.responseTime}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 bg-[#fcf8ff] p-4 rounded-2xl border border-[#c8c4d9]/50 text-center">
          <div>
            <p className="text-[10px] font-bold text-[#787588] uppercase">Projetos</p>
            <p className="font-extrabold text-base text-[#1c1a25] mt-0.5">
              {specialist.completedProjects}+
            </p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-[#787588] uppercase">Aprovação</p>
            <p className="font-extrabold text-base text-emerald-700 mt-0.5">99%</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-[#787588] uppercase">Tarifa Média</p>
            <p className="font-extrabold text-base text-[#4212de] mt-0.5">
              {specialist.hourlyRate}
            </p>
          </div>
        </div>

        {/* Bio */}
        <div>
          <h4 className="font-headline font-bold text-sm text-[#1c1a25] mb-1.5">
            Sobre o Profissional
          </h4>
          <p className="text-xs sm:text-sm text-[#474556] leading-relaxed">
            {specialist.bio}
          </p>
        </div>

        {/* Skills */}
        <div>
          <h4 className="font-headline font-bold text-sm text-[#1c1a25] mb-2">
            Especialidades & Tech Stack
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {specialist.skills.map(skill => (
              <span
                key={skill}
                className="bg-[#f6f1ff] text-[#4212de] text-xs font-bold px-3 py-1 rounded-lg border border-[#5b3df5]/10"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Featured Project Preview if available */}
        {specialist.featuredProjectImg && (
          <div>
            <h4 className="font-headline font-bold text-sm text-[#1c1a25] mb-2">
              Destaque do Portfólio
            </h4>
            <div className="rounded-2xl overflow-hidden border border-[#c8c4d9]/50 aspect-video relative group">
              <img
                src={specialist.featuredProjectImg}
                alt="Projeto em destaque"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="bg-white text-[#1c1a25] text-xs font-bold px-4 py-2 rounded-xl shadow-md">
                  Ver Projeto Completo
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col gap-2">
          {onOpenFullProfile && (
            <button
              onClick={() => {
                const s = specialist;
                onClose();
                onOpenFullProfile(s);
              }}
              className="w-full py-2.5 bg-[#f6f1ff] hover:bg-[#5b3df5]/10 text-[#4212de] rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border border-[#5b3df5]/20"
            >
              <Award className="w-4 h-4 text-[#5b3df5]" />
              Ver Página Completa do Profissional (Portfólio & Avaliações)
            </button>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                onClose();
                onOpenChatWith(specialist);
              }}
              className="flex-1 py-3.5 bg-[#f6f1ff] hover:bg-[#5b3df5] text-[#4212de] hover:text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              Enviar Mensagem
            </button>

            <button
              onClick={() => {
                onClose();
                onHire(specialist);
              }}
              className="flex-1 py-3.5 bg-[#5b3df5] hover:bg-[#4212de] text-white rounded-xl text-xs font-bold shadow-md shadow-[#5b3df5]/20 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4" />
              Contratar Agora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
