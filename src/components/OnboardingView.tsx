import React, { useState } from 'react';
import { ArrowRight, Gauge, Sparkles } from 'lucide-react';
import { ONBOARDING_IMAGES } from '../data/mockData';
import { NavigationTab } from '../types';

interface OnboardingViewProps {
  onNavigate: (tab: NavigationTab) => void;
  onStartRequest: () => void;
}

export const OnboardingView: React.FC<OnboardingViewProps> = ({
  onNavigate,
  onStartRequest,
}) => {
  const [slideIndex, setSlideIndex] = useState(0);

  const slides = [
    {
      badge: 'BOAS-VINDAS AO NEXO',
      title: 'Encontre especialistas em minutos.',
      subtitle:
        'Não perca horas procurando profissionais. Nossa inteligência conecta você aos melhores talentos instantaneamente.',
    },
    {
      badge: 'INTELIGÊNCIA EM MATCHING',
      title: 'Projetos sob medida com IA.',
      subtitle:
        'Descreva o que você precisa em linguagem natural e nossa IA filtra e aloca os melhores consultores em tempo real.',
    },
    {
      badge: 'ENTREGA GARANTIDA',
      title: 'Agilidade e satisfação total.',
      subtitle:
        'Acompanhe o progresso em tempo real com relatórios transparentes, protótipos interativos e suporte especializado.',
    },
  ];

  const handleNext = () => {
    if (slideIndex < slides.length - 1) {
      setSlideIndex(prev => prev + 1);
    } else {
      onNavigate('home');
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-28 px-4 md:px-8 flex flex-col items-center justify-center max-w-[1120px] mx-auto animate-in fade-in duration-300">
      <main className="w-full flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
        {/* Left Side: Hero Image & Dynamic Glassmorphism Overlays */}
        <div className="w-full md:w-1/2 flex justify-center items-center relative">
          <div className="relative w-full aspect-square max-w-[480px]">
            {/* Background Color Blurs */}
            <div className="absolute -top-8 -left-8 w-36 h-36 bg-[#5b3df5]/10 rounded-full blur-3xl animate-float" />
            <div
              className="absolute -bottom-8 -right-8 w-48 h-48 bg-[#0f6df3]/10 rounded-full blur-3xl animate-float"
              style={{ animationDelay: '-3s' }}
            />

            {/* Central Main Image Frame */}
            <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden shadow-md border border-[#c8c4d9]/40 bg-white">
              <img
                src={ONBOARDING_IMAGES.hero}
                alt="Profissional interagindo com interface inteligente NEXO"
                className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
              />

              {/* Top-Right Online Status Overlay Badge */}
              <div className="absolute top-5 right-5 flex items-center gap-2 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#c8c4d9]/60 shadow-sm">
                <span className="w-2.5 h-2.5 bg-[#42e09a] rounded-full ring-2 ring-emerald-200 animate-pulse" />
                <span className="text-xs font-semibold text-[#1c1a25]">
                  Especialistas Online
                </span>
              </div>

              {/* Bottom-Left Floating Stat Chip */}
              <div className="absolute bottom-8 left-6 p-3.5 sm:p-4 bg-white/90 backdrop-blur-md rounded-2xl border border-[#c8c4d9]/60 shadow-lg flex items-center gap-3.5 animate-float">
                <div className="bg-[#5b3df5]/10 p-2.5 rounded-xl text-[#4212de]">
                  <Gauge className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-[#474556]">
                    Resposta média
                  </p>
                  <p className="text-xs font-bold text-[#4212de]">
                    5 minutos
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Onboarding Content */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
          {/* Badge */}
          <div className="mb-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4212de] tracking-wider uppercase py-1.5 px-3.5 bg-[#5b3df5]/10 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              {slides[slideIndex].badge}
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1c1a25] mb-3 leading-tight">
            {slides[slideIndex].title}
          </h1>

          {/* Subtitle */}
          <p className="font-body text-base sm:text-lg text-[#474556] mb-8 max-w-md leading-relaxed">
            {slides[slideIndex].subtitle}
          </p>

          {/* Progress Dots */}
          <div className="flex items-center gap-2 mb-8">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setSlideIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  slideIndex === idx
                    ? 'w-10 bg-[#4212de]'
                    : 'w-3 bg-[#c8c4d9] hover:bg-[#5b3df5]/50'
                }`}
                title={`Ir para o slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row w-full max-w-md gap-3">
            <button
              onClick={handleNext}
              className="flex-1 bg-[#5b3df5] text-white px-6 py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#4212de] transition-all active:scale-95 shadow-md shadow-[#5b3df5]/25"
            >
              {slideIndex === slides.length - 1 ? 'Começar Agora' : 'Próximo'}
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('home')}
              className="flex-1 border border-[#c8c4d9] bg-white text-[#1c1a25] px-6 py-4 rounded-xl font-semibold text-sm hover:bg-[#f6f1ff] transition-all active:scale-95"
            >
              Pular
            </button>
          </div>

          {/* Footer Meta: Available Specialists */}
          <div className="mt-10 pt-6 border-t border-[#c8c4d9]/40 w-full max-w-md">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="flex -space-x-3 overflow-hidden">
                {ONBOARDING_IMAGES.avatars.map((avatar, i) => (
                  <img
                    key={i}
                    src={avatar}
                    alt={`Especialista ${i + 1}`}
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
              <p className="text-xs font-semibold text-[#474556]">
                <strong className="text-[#1c1a25]">+500 especialistas</strong> disponíveis agora
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
