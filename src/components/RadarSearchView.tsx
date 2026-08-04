import React, { useState, useEffect } from 'react';
import { Search, CheckCircle2, Star, Sparkles, MessageSquare, ArrowRight, UserCheck } from 'lucide-react';
import { SPECIALISTS } from '../data/mockData';
import { Specialist, NavigationTab } from '../types';

interface RadarSearchViewProps {
  onNavigate: (tab: NavigationTab) => void;
  onSelectSpecialist: (specialist: Specialist) => void;
  onOpenChatWith: (specialist: Specialist) => void;
  specialists?: Specialist[];
}

export const RadarSearchView: React.FC<RadarSearchViewProps> = ({
  onNavigate,
  onSelectSpecialist,
  onOpenChatWith,
  specialists: providedSpecialists,
}) => {
  const activeSpecialists = providedSpecialists && providedSpecialists.length > 0 ? providedSpecialists : SPECIALISTS;
  const [activeStep, setActiveStep] = useState(0);
  const [foundCount, setFoundCount] = useState(0);
  const [showResultsList, setShowResultsList] = useState(false);

  // Radar stages
  const stages = [
    'Analisando escopo do projeto com IA NEXO...',
    'Verificando agenda e reputação dos especialistas...',
    'Filtrando consultores com avaliação 4.8+ estrelas...',
    '8 Especialistas encontrados com sucesso!'
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setActiveStep(1);
      setFoundCount(3);
    }, 1200);

    const timer2 = setTimeout(() => {
      setActiveStep(2);
      setFoundCount(6);
    }, 2800);

    const timer3 = setTimeout(() => {
      setActiveStep(3);
      setFoundCount(8);
    }, 4200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="min-h-screen pt-20 pb-28 px-4 bg-[#5b3df5] text-white flex flex-col items-center justify-center relative overflow-hidden animate-in fade-in duration-300">
      {/* Background Animated Orbs */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#4212de] rounded-full blur-3xl animate-float" style={{ animationDelay: '-2s' }} />
      </div>

      {/* Main Radar Core Area */}
      {!showResultsList ? (
        <div className="relative z-10 w-full max-w-lg flex flex-col items-center text-center">
          {/* Radar Visualisation Rings */}
          <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center mb-8">
            {/* Concentric Pulse Rings */}
            <div className="absolute inset-0 rounded-full border border-white/20 animate-radar-ring" />
            <div className="absolute inset-8 rounded-full border border-white/15 animate-radar-ring" style={{ animationDelay: '0.6s' }} />
            <div className="absolute inset-16 rounded-full border border-white/10 animate-radar-ring" style={{ animationDelay: '1.2s' }} />
            <div className="absolute inset-24 rounded-full border border-white/10 animate-radar-ring" style={{ animationDelay: '1.8s' }} />

            {/* Radar Scan Sweep Line */}
            <div className="absolute inset-0 rounded-full animate-radar-scan opacity-60 pointer-events-none" />

            {/* Central Search Icon Core */}
            <div className="relative z-20 w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center shadow-2xl">
              <Search className="w-8 h-8 text-[#4212de] animate-pulse" />
            </div>

            {/* Floating Specialist Avatars Popping Up */}
            {activeSpecialists.slice(0, Math.min(foundCount, activeSpecialists.length)).map((spec, i) => {
              // Position avatars around the rings
              const angles = [30, 120, 210, 300, 75, 165, 255, 345];
              const angleDeg = angles[i % angles.length];
              const angleRad = (angleDeg * Math.PI) / 180;
              const radius = 100 + (i % 2) * 30; // Radius distance

              const x = Math.cos(angleRad) * radius;
              const y = Math.sin(angleRad) * radius;

              return (
                <div
                  key={spec.id}
                  onClick={() => onSelectSpecialist(spec)}
                  className="absolute w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-white shadow-2xl overflow-hidden cursor-pointer hover:scale-125 transition-transform duration-300 z-30 animate-in zoom-in-50 duration-500"
                  style={{
                    left: `calc(50% + ${x}px - 28px)`,
                    top: `calc(50% + ${y}px - 28px)`,
                  }}
                  title={`${spec.name} (${spec.role})`}
                >
                  <img
                    src={spec.avatarUrl}
                    alt={spec.name}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#42e09a] rounded-full border border-white" />
                </div>
              );
            })}
          </div>

          {/* Status Text Area */}
          <div className="space-y-4 max-w-md">
            <h2 className="font-headline font-bold text-2xl md:text-3xl text-white tracking-tight animate-pulse">
              Buscando especialistas...
            </h2>

            <div className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-[#42e09a] animate-ping" />
              <p className="text-xs font-bold uppercase tracking-widest text-white/90">
                {stages[activeStep]}
              </p>
            </div>
          </div>

          {/* Bottom Insights Card */}
          <div className="mt-8 w-full max-w-md bg-white/15 backdrop-blur-xl border border-white/25 p-4 rounded-2xl flex items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2.5">
                {activeSpecialists.slice(0, 3).map((spec) => (
                  <img
                    key={spec.id}
                    src={spec.avatarUrl}
                    alt={spec.name}
                    className="w-8 h-8 rounded-full border-2 border-[#5b3df5] object-cover"
                  />
                ))}
              </div>
              <p className="text-xs font-bold text-white text-left">
                Encontramos {activeSpecialists.length} especialistas disponíveis.
              </p>
            </div>

            <button
              onClick={() => setShowResultsList(true)}
              className="bg-white text-[#4212de] hover:bg-slate-100 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-md transition-all active:scale-95 whitespace-nowrap"
            >
              Ver Lista <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        /* Results List View when clicked */
        <div className="w-full max-w-3xl space-y-6 z-10 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-headline text-2xl font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-[#42e09a]" />
                Especialistas Selecionados
              </h2>
              <p className="text-xs text-white/80 mt-1">
                A IA NEXO selecionou {activeSpecialists.length} consultores validados para o seu projeto.
              </p>
            </div>

            <button
              onClick={() => setShowResultsList(false)}
              className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg text-white font-semibold transition-all"
            >
              Voltar ao Radar
            </button>
          </div>

          {/* Specialists List */}
          <div className="space-y-3.5 max-h-[60vh] overflow-y-auto pr-1">
            {activeSpecialists.map((spec) => (
              <div
                key={spec.id}
                className="bg-white text-[#1c1a25] rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg hover:shadow-xl transition-all"
              >
                <div
                  onClick={() => onSelectSpecialist(spec)}
                  className="flex items-center gap-3.5 cursor-pointer flex-1"
                >
                  <div className="relative">
                    <img
                      src={spec.avatarUrl}
                      alt={spec.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-[#5b3df5]"
                    />
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#42e09a] border-2 border-white rounded-full" />
                  </div>

                  <div>
                    <h4 className="font-headline font-bold text-base text-[#1c1a25]">
                      {spec.name}
                    </h4>
                    <p className="text-xs text-[#474556]">
                      {spec.role} • <span className="font-bold text-[#4212de]">{spec.level}</span>
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-xs">
                      <span className="flex items-center gap-1 font-bold text-[#4212de]">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        {spec.rating}
                      </span>
                      <span className="text-[#787588]">({spec.reviewsCount} avaliações)</span>
                      <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                        {spec.hourlyRate}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-[#e5e0ef]">
                  <button
                    onClick={() => onOpenChatWith(spec)}
                    className="p-2.5 rounded-xl bg-[#f6f1ff] hover:bg-[#5b3df5] text-[#4212de] hover:text-white transition-all"
                    title="Conversar"
                  >
                    <MessageSquare className="w-4.5 h-4.5" />
                  </button>
                  <button
                    onClick={() => onSelectSpecialist(spec)}
                    className="px-4 py-2.5 rounded-xl bg-[#5b3df5] hover:bg-[#4212de] text-white text-xs font-bold transition-all active:scale-95 shadow-sm"
                  >
                    Contratar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
