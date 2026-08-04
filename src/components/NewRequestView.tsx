import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Globe,
  Smartphone,
  Paintbrush,
  Film,
  Layout,
  Plus,
  Zap,
  Clock,
  Calendar,
  CheckCircle2,
  Sparkles,
  Info,
  DollarSign
} from 'lucide-react';
import { ONBOARDING_IMAGES, SERVICE_CATEGORIES } from '../data/mockData';
import { NavigationTab } from '../types';

interface NewRequestViewProps {
  initialServiceId?: string;
  onNavigate: (tab: NavigationTab) => void;
  onSubmitRequest: (requestData: any) => void;
}

export const NewRequestView: React.FC<NewRequestViewProps> = ({
  initialServiceId = 'landing',
  onNavigate,
  onSubmitRequest,
}) => {
  const [step, setStep] = useState(1);
  const [selectedServiceId, setSelectedServiceId] = useState(initialServiceId);
  const [selectedUrgency, setSelectedUrgency] = useState('3 dias');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budgetRange, setBudgetRange] = useState('R$ 2.000 - R$ 5.000');

  const selectedService =
    SERVICE_CATEGORIES.find(s => s.id === selectedServiceId) || SERVICE_CATEGORIES[0];

  const urgencyOptions = [
    { id: 'Hoje', label: 'Hoje', icon: Zap },
    { id: '24 horas', label: '24 horas', icon: Clock },
    { id: '3 dias', label: '3 dias', icon: Calendar },
    { id: '7 dias', label: '7 dias', icon: Calendar },
  ];

  const budgetOptions = [
    'R$ 500 - R$ 2.000',
    'R$ 2.000 - R$ 5.000',
    'R$ 5.000 - R$ 10.000',
    'Acima de R$ 10.000',
  ];

  const handleNext = () => {
    if (step < 3) {
      setStep(prev => prev + 1);
    } else {
      onSubmitRequest({
        serviceId: selectedServiceId,
        serviceName: selectedService.name,
        urgency: selectedUrgency,
        title: title || `${selectedService.name} personalizada`,
        description: description || `Preciso de um projeto de ${selectedService.name} com foco em alta conversão e prazos ágeis.`,
        budgetRange,
      });
      onNavigate('radar');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    } else {
      onNavigate('home');
    }
  };

  const getServiceIconComponent = (id: string) => {
    switch (id) {
      case 'landing':
        return Globe;
      case 'app':
        return Smartphone;
      case 'logo':
        return Paintbrush;
      case 'video':
        return Film;
      case 'website':
        return Layout;
      default:
        return Plus;
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-28 px-4 md:px-8 max-w-[1120px] mx-auto animate-in fade-in duration-300">
      {/* Header Section */}
      <div className="w-full mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="font-headline text-2xl md:text-3xl font-extrabold text-[#1c1a25]">
              Nova Solicitação
            </h2>
            <p className="text-sm sm:text-base text-[#474556]">
              Configure os detalhes do seu novo projeto para começarmos.
            </p>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <div
                className={`h-2 rounded-full transition-all ${
                  step >= 1 ? 'w-8 bg-[#5b3df5]' : 'w-2 bg-[#c8c4d9]'
                }`}
              />
              <div
                className={`h-2 rounded-full transition-all ${
                  step >= 2 ? 'w-8 bg-[#5b3df5]' : 'w-2 bg-[#c8c4d9]'
                }`}
              />
              <div
                className={`h-2 rounded-full transition-all ${
                  step >= 3 ? 'w-8 bg-[#5b3df5]' : 'w-2 bg-[#c8c4d9]'
                }`}
              />
            </div>
            <span className="font-semibold text-xs text-[#4212de] ml-2">
              Passo {step} de 3
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Interactive Form Controls */}
        <div className="lg:col-span-7 space-y-8">
          {step === 1 && (
            <>
              {/* Section 1: Service Selection */}
              <section className="space-y-4">
                <label className="text-xs font-bold text-[#474556] uppercase tracking-wider block">
                  O QUE VAMOS CRIAR HOJE?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                  {SERVICE_CATEGORIES.map(service => {
                    const IconComp = getServiceIconComponent(service.id);
                    const isActive = selectedServiceId === service.id;
                    return (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => setSelectedServiceId(service.id)}
                        className={`flex flex-col items-start p-4 rounded-2xl border transition-all text-left active:scale-95 group ${
                          isActive
                            ? 'bg-[#f6f1ff] border-[#5b3df5] shadow-sm'
                            : 'bg-white border-[#c8c4d9]/70 hover:border-[#5b3df5]'
                        }`}
                      >
                        <div
                          className={`p-2.5 rounded-xl mb-3 transition-transform group-hover:scale-110 ${
                            isActive
                              ? 'bg-[#5b3df5] text-white'
                              : 'bg-[#f0ecfa] text-[#4212de]'
                          }`}
                        >
                          <IconComp className="w-5 h-5" />
                        </div>
                        <span className="font-headline font-bold text-sm text-[#1c1a25]">
                          {service.name}
                        </span>
                        <span className="text-[11px] text-[#474556] mt-0.5">
                          {service.subtitle}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Section 2: Deadline Urgency Selection */}
              <section className="space-y-4">
                <label className="text-xs font-bold text-[#474556] uppercase tracking-wider block">
                  QUAL A URGÊNCIA?
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {urgencyOptions.map(urg => {
                    const IconComp = urg.icon;
                    const isActive = selectedUrgency === urg.id;
                    return (
                      <button
                        key={urg.id}
                        type="button"
                        onClick={() => setSelectedUrgency(urg.id)}
                        className={`px-5 py-3 rounded-full border text-xs font-semibold flex items-center gap-2 transition-all active:scale-95 ${
                          isActive
                            ? 'bg-[#5b3df5] text-white border-[#5b3df5] shadow-md'
                            : 'bg-white border-[#c8c4d9] text-[#1c1a25] hover:bg-[#f6f1ff]'
                        }`}
                      >
                        <IconComp className="w-4 h-4" />
                        {urg.label}
                      </button>
                    );
                  })}
                </div>
              </section>
            </>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <section className="space-y-2">
                <label className="text-xs font-bold text-[#474556] uppercase tracking-wider block">
                  TÍTULO DO PROJETO
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={`Ex: Landing Page para ${selectedService.name}`}
                  className="w-full px-4 py-3.5 bg-white border border-[#c8c4d9] rounded-xl text-sm text-[#1c1a25] focus:ring-2 focus:ring-[#5b3df5] focus:outline-none"
                />
              </section>

              <section className="space-y-2">
                <label className="text-xs font-bold text-[#474556] uppercase tracking-wider block">
                  DESCRIÇÃO & ESCOPO
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descreva os objetivos, referências e público-alvo do seu projeto..."
                  className="w-full px-4 py-3.5 bg-white border border-[#c8c4d9] rounded-xl text-sm text-[#1c1a25] focus:ring-2 focus:ring-[#5b3df5] focus:outline-none leading-relaxed"
                />
              </section>

              <section className="space-y-3">
                <label className="text-xs font-bold text-[#474556] uppercase tracking-wider block">
                  FAIXA DE ORÇAMENTO ESTIMADO
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {budgetOptions.map(b => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBudgetRange(b)}
                      className={`p-3.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
                        budgetRange === b
                          ? 'bg-[#5b3df5] text-white border-[#5b3df5]'
                          : 'bg-white border-[#c8c4d9] text-[#1c1a25] hover:bg-[#f6f1ff]'
                      }`}
                    >
                      <span>{b}</span>
                      <DollarSign className="w-4 h-4 opacity-70" />
                    </button>
                  ))}
                </div>
              </section>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-[#f6f1ff] border border-[#5b3df5]/30 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-3 text-[#4212de]">
                  <Sparkles className="w-6 h-6 animate-bounce" />
                  <h3 className="font-headline font-bold text-lg text-[#1c1a25]">
                    Tudo pronto para conectar com a IA NEXO!
                  </h3>
                </div>
                <p className="text-sm text-[#474556] leading-relaxed">
                  Revisamos os detalhes do seu projeto. Ao prosseguir, nossa IA ativará o Radar de Especialistas para buscar consultores online compatíveis em menos de 1 minuto.
                </p>

                <div className="bg-white rounded-xl p-4 border border-[#c8c4d9]/50 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#787588]">Serviço:</span>
                    <span className="font-bold text-[#1c1a25]">{selectedService.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#787588]">Urgência:</span>
                    <span className="font-bold text-[#1c1a25]">{selectedUrgency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#787588]">Orçamento:</span>
                    <span className="font-bold text-[#4212de]">{budgetRange}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="pt-6 flex justify-between items-center border-t border-[#c8c4d9]/40">
            <button
              onClick={handleBack}
              className="px-6 py-3 text-xs font-bold text-[#474556] hover:text-[#4212de] transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </button>

            <button
              onClick={handleNext}
              className="px-8 py-3.5 bg-[#5b3df5] hover:bg-[#4212de] text-white rounded-xl text-xs font-bold shadow-md shadow-[#5b3df5]/20 active:scale-95 transition-all flex items-center gap-2"
            >
              {step === 3 ? 'Ativar Radar IA' : 'Próximo'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Side: Bento Style Summary & Expert Tip */}
        <div className="lg:col-span-5 space-y-6">
          {/* Summary Box */}
          <div className="bg-white border border-[#c8c4d9]/70 rounded-2xl p-6 relative overflow-hidden shadow-sm">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#5b3df5]/5 rounded-full blur-3xl pointer-events-none" />
            
            <h3 className="font-headline font-bold text-lg text-[#1c1a25] mb-5">
              Resumo
            </h3>

            <div className="space-y-5">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#5b3df5]/10 flex items-center justify-center text-[#4212de] flex-shrink-0">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#787588] uppercase tracking-wider">
                    PROJETO
                  </p>
                  <p className="font-semibold text-sm text-[#1c1a25]">
                    {selectedService.name}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800 flex-shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#787588] uppercase tracking-wider">
                    PRAZO ESTIMADO
                  </p>
                  <p className="font-semibold text-sm text-[#1c1a25]">
                    {selectedUrgency}
                  </p>
                </div>
              </div>

              {/* Status do Consultor */}
              <div className="p-4 bg-[#fcf8ff] rounded-xl border border-[#c8c4d9]/50 mt-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-[#1c1a25]">
                    Status do Consultor
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#42e09a] pulse-accent" />
                    <span className="text-[10px] font-extrabold text-emerald-700 uppercase">
                      ONLINE
                    </span>
                  </div>
                </div>
                <p className="text-xs text-[#474556] leading-relaxed">
                  Especialistas em design estratégico estão prontos para assumir sua demanda imediatamente após o envio.
                </p>
              </div>
            </div>
          </div>

          {/* Expert Tip Card */}
          <div className="bg-[#5b3df5] p-0.5 rounded-2xl shadow-sm">
            <div className="bg-white rounded-[14px] p-5 flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-[#c8c4d9]/40">
                <img
                  src={ONBOARDING_IMAGES.tipStudio}
                  alt="Estúdio do especialista NEXO"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-bold text-xs text-[#4212de] mb-1">
                  Dica de Especialista
                </p>
                <p className="text-xs text-[#474556] leading-relaxed">
                  Solicitações de Landing Pages com prazo de 3 dias têm 98% de taxa de aprovação na primeira entrega.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
