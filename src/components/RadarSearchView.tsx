import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  CheckCircle2,
  Star,
  Sparkles,
  MessageSquare,
  ArrowRight,
  MapPin,
  Bell,
  Navigation,
  Filter,
  SlidersHorizontal,
  ShieldCheck,
  Send,
  Zap,
  Globe,
  Layers,
  ChevronRight,
  Info,
  UserCheck,
  UserPlus,
  Briefcase,
  Smartphone
} from 'lucide-react';
import { SPECIALISTS } from '../data/mockData';
import { Specialist, NavigationTab, ServiceRequestPayload } from '../types';
import { UserLocation } from '../hooks/useGeolocation';

interface RadarSearchViewProps {
  onNavigate: (tab: NavigationTab) => void;
  onSelectSpecialist: (specialist: Specialist) => void;
  onOpenChatWith: (specialist: Specialist) => void;
  specialists?: Specialist[];
  lastRequest?: ServiceRequestPayload | null;
  userLocation?: UserLocation;
  onRequestGps?: () => void;
}

const SERVICE_STYLES = [
  { id: 'ALL', name: 'Todos os Estilos', icon: Layers },
  { id: 'landing', name: 'Landing Page & Web', icon: Globe },
  { id: 'app', name: 'Aplicativo Mobile', icon: Smartphone },
  { id: 'logo', name: 'Logo & Design', icon: Sparkles },
  { id: 'video', name: 'Vídeo & Motion', icon: Zap },
  { id: 'fullstack', name: 'Fullstack & Código', icon: SlidersHorizontal },
];

export const RadarSearchView: React.FC<RadarSearchViewProps> = ({
  onNavigate,
  onSelectSpecialist,
  onOpenChatWith,
  specialists: providedSpecialists,
  lastRequest,
  userLocation,
  onRequestGps,
}) => {
  const activeSpecialistsList = providedSpecialists && providedSpecialists.length > 0 ? providedSpecialists : SPECIALISTS;

  // View state: 'MAP' | 'RADAR' | 'LIST'
  const [viewMode, setViewMode] = useState<'MAP' | 'RADAR' | 'LIST'>('MAP');

  // Filters
  const [selectedStyle, setSelectedStyle] = useState<string>(lastRequest?.serviceId || 'ALL');
  const [maxRadiusKm, setMaxRadiusKm] = useState<number>(15);
  const [onlyOnline, setOnlyOnline] = useState<boolean>(false);
  const [hoveredPinId, setHoveredPinId] = useState<string | null>(null);
  const [activePinSpecialist, setActivePinSpecialist] = useState<Specialist | null>(null);

  // Notification states
  const [notificationDispatched, setNotificationDispatched] = useState<boolean>(false);
  const [notifiedCount, setNotifiedCount] = useState<number>(0);
  const [showProSimModal, setShowProSimModal] = useState<boolean>(false);

  // Radar Animation states
  const [activeStep, setActiveStep] = useState(0);
  const [foundCount, setFoundCount] = useState(3);

  const stages = [
    userLocation?.active
      ? `GPS Ativo: Lat ${userLocation.lat.toFixed(4)}, Lng ${userLocation.lng.toFixed(4)}...`
      : 'Obtendo localização GPS do cliente...',
    'Buscando profissionais cadastrados nas proximidades...',
    'Filtrando por compatibilidade de estilo de serviço...',
    'Especialistas mais próximos prontos para receber notificação!'
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setActiveStep(1), 1000);
    const timer2 = setTimeout(() => setActiveStep(2), 2200);
    const timer3 = setTimeout(() => {
      setActiveStep(3);
      setFoundCount(activeSpecialistsList.length);
    }, 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [activeSpecialistsList.length]);

  // Filter and sort specialists by distance and service style
  const filteredSpecialists = useMemo(() => {
    return activeSpecialistsList
      .filter((spec) => {
        // Distance check
        const distance = spec.distanceKm ?? 3.5;
        if (distance > maxRadiusKm) return false;

        // Online check
        if (onlyOnline && !spec.isOnline) return false;

        // Service Style matching
        if (selectedStyle !== 'ALL') {
          const styleLower = selectedStyle.toLowerCase();
          const roleLower = spec.role.toLowerCase();
          const skillsLower = spec.skills.map((s) => s.toLowerCase()).join(' ');

          if (styleLower === 'landing' && !roleLower.includes('ui/ux') && !roleLower.includes('web') && !skillsLower.includes('landing')) {
            // allow if has web/landing skills
            if (!skillsLower.includes('figma') && !skillsLower.includes('react')) return false;
          }
          if (styleLower === 'app' && !roleLower.includes('mobile') && !skillsLower.includes('react native') && !skillsLower.includes('flutter')) {
            return false;
          }
          if (styleLower === 'logo' && !roleLower.includes('brand') && !roleLower.includes('design') && !skillsLower.includes('identidade')) {
            return false;
          }
          if (styleLower === 'video' && !roleLower.includes('motion') && !skillsLower.includes('effects')) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => (a.distanceKm ?? 5) - (b.distanceKm ?? 5));
  }, [activeSpecialistsList, selectedStyle, maxRadiusKm, onlyOnline]);

  // Trigger dispatch notification
  const handleDispatchNotification = () => {
    const count = filteredSpecialists.length;
    setNotifiedCount(count);
    setNotificationDispatched(true);
  };

  return (
    <div className="min-h-screen pt-20 pb-28 px-4 md:px-8 max-w-[1240px] mx-auto space-y-6 animate-in fade-in duration-300 text-[#1c1a25]">
      {/* Top Header & Search Info */}
      <div className="bg-white border border-[#c8c4d9]/80 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#5b3df5]/10 text-[#4212de] text-[11px] font-extrabold uppercase px-3 py-1 rounded-full border border-[#5b3df5]/20 flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-[#5b3df5]" />
                Geofence GPS & Match Inteligente
              </span>
              {userLocation?.active ? (
                <span className="bg-emerald-50 text-emerald-800 text-[11px] font-extrabold px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Sinal GPS Conectado ({userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)})
                </span>
              ) : (
                <button
                  onClick={onRequestGps}
                  className="bg-amber-50 hover:bg-amber-100 text-amber-900 text-[11px] font-extrabold px-3 py-1 rounded-full border border-amber-200 flex items-center gap-1.5 transition-all"
                >
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  Clique para Ativar GPS de Navegação
                </button>
              )}
              {lastRequest && (
                <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-1 rounded-full">
                  Projeto: {lastRequest.title || lastRequest.serviceName}
                </span>
              )}
            </div>
            <h1 className="font-headline font-extrabold text-2xl md:text-3xl text-[#1c1a25] mt-2">
              Radar de Profissionais por Proximidade
            </h1>
            <p className="text-xs md:text-sm text-[#474556] mt-1">
              Localizando profissionais cadastrados perto de você e filtrados pelo estilo de serviço selecionado.
            </p>
          </div>

          {/* Mode View Switcher */}
          <div className="flex items-center bg-[#f6f1ff] p-1.5 rounded-2xl border border-[#5b3df5]/20 self-start md:self-auto">
            <button
              onClick={() => setViewMode('MAP')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'MAP'
                  ? 'bg-[#5b3df5] text-white shadow-sm'
                  : 'text-[#474556] hover:text-[#5b3df5]'
              }`}
            >
              <MapPin className="w-4 h-4" />
              Mapa GPS
            </button>
            <button
              onClick={() => setViewMode('RADAR')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'RADAR'
                  ? 'bg-[#5b3df5] text-white shadow-sm'
                  : 'text-[#474556] hover:text-[#5b3df5]'
              }`}
            >
              <Search className="w-4 h-4" />
              Varredura Radar
            </button>
            <button
              onClick={() => setViewMode('LIST')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'LIST'
                  ? 'bg-[#5b3df5] text-white shadow-sm'
                  : 'text-[#474556] hover:text-[#5b3df5]'
              }`}
            >
              <Layers className="w-4 h-4" />
              Lista ({filteredSpecialists.length})
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="pt-2 border-t border-[#e5e0ef] grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Service Style Pills */}
          <div className="md:col-span-8 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-bold text-[#787588] shrink-0 uppercase tracking-wider flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              Estilo:
            </span>
            {SERVICE_STYLES.map((style) => {
              const IconComp = style.icon;
              const isSelected = selectedStyle === style.id;
              return (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 border ${
                    isSelected
                      ? 'bg-[#5b3df5] text-white border-[#5b3df5] shadow-sm'
                      : 'bg-[#fcf8ff] text-[#474556] border-[#c8c4d9]/70 hover:border-[#5b3df5]'
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5" />
                  {style.name}
                </button>
              );
            })}
          </div>

          {/* Radius Selector */}
          <div className="md:col-span-4 flex items-center justify-between md:justify-end gap-3">
            <span className="text-xs font-bold text-[#474556]">Raio de busca:</span>
            <select
              value={maxRadiusKm}
              onChange={(e) => setMaxRadiusKm(Number(e.target.value))}
              className="px-3 py-1.5 bg-[#fcf8ff] border border-[#c8c4d9] rounded-xl text-xs font-bold text-[#1c1a25] focus:outline-none focus:ring-2 focus:ring-[#5b3df5]"
            >
              <option value={5}>Até 5 km (Muito perto)</option>
              <option value={10}>Até 10 km (Na cidade)</option>
              <option value={20}>Até 20 km (Região metropolitana)</option>
              <option value={50}>Até 50 km (Ampliado)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Dispatched Notification Toast Banner */}
      {notificationDispatched && (
        <div className="bg-emerald-600 text-white rounded-3xl p-5 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in slide-in-from-top-4 duration-300">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
              <Bell className="w-5 h-5 text-white animate-bounce" />
            </div>
            <div>
              <h4 className="font-headline font-bold text-sm">
                Proposta Notificada via Geofence!
              </h4>
              <p className="text-xs text-white/90 mt-0.5">
                {notifiedCount} especialistas a até {maxRadiusKm} km receberam o alerta no celular sobre a proposta "{lastRequest?.title || 'Serviço Solicitado'}".
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={() => setShowProSimModal(true)}
              className="bg-white text-emerald-900 hover:bg-emerald-50 font-extrabold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-1.5"
            >
              <Smartphone className="w-3.5 h-3.5" />
              Ver Visão do Profissional
            </button>
          </div>
        </div>
      )}

      {/* MAIN VIEW CONTENT */}
      {viewMode === 'MAP' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Interactive Simulated Map Canvas */}
          <div className="lg:col-span-8 bg-[#1e1b2e] rounded-3xl p-6 min-h-[480px] relative overflow-hidden shadow-xl flex flex-col justify-between border border-[#5b3df5]/30">
            {/* Map Background Grid Patterns & Roads simulation */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#5b3df5" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                {/* Simulated avenues */}
                <line x1="10%" y1="0" x2="90%" y2="100%" stroke="#4212de" strokeWidth="3" opacity="0.6" />
                <line x1="0" y1="40%" x2="100%" y2="60%" stroke="#5b3df5" strokeWidth="3" opacity="0.6" />
                <circle cx="50%" cy="50%" r="140" fill="none" stroke="#ffffff" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
                <circle cx="50%" cy="50%" r="220" fill="none" stroke="#ffffff" strokeWidth="1" strokeDasharray="4 4" opacity="0.2" />
              </svg>
            </div>

            {/* Map Header Status Overlay */}
            <div className="relative z-10 flex items-center justify-between gap-2 bg-black/40 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 max-w-fit">
              <span className="w-2.5 h-2.5 rounded-full bg-[#42e09a] animate-ping" />
              <span className="text-xs font-extrabold text-white tracking-wide uppercase">
                São Paulo, SP • {filteredSpecialists.length} Profissionais em {maxRadiusKm} km
              </span>
            </div>

            {/* MAP PINS AREA */}
            <div className="relative z-10 w-full flex-1 my-6 flex items-center justify-center">
              {/* Client Center Location Marker */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-30 pointer-events-none">
                <div className="relative flex items-center justify-center">
                  <span className="absolute w-12 h-12 bg-[#5b3df5]/40 rounded-full animate-ping" />
                  <div className="w-10 h-10 bg-[#5b3df5] text-white rounded-full flex items-center justify-center shadow-2xl border-2 border-white">
                    <Navigation className="w-5 h-5 fill-current" />
                  </div>
                </div>
                <span className="mt-1 bg-black/80 backdrop-blur-md text-white font-extrabold text-[10px] px-2.5 py-1 rounded-full border border-white/20 shadow-md">
                  Sua Localização (Cliente)
                </span>
              </div>

              {/* Specialist Location Pins around map */}
              {filteredSpecialists.map((spec, i) => {
                // Determine mock position around center
                const distance = spec.distanceKm ?? 3;
                const angles = [45, 135, 225, 315, 80, 170, 260, 350];
                const angleDeg = angles[i % angles.length];
                const angleRad = (angleDeg * Math.PI) / 180;

                // Scale radius visually inside map
                const mapRadius = Math.min(60 + distance * 12, 170);
                const x = Math.cos(angleRad) * mapRadius;
                const y = Math.sin(angleRad) * mapRadius;

                const isHovered = hoveredPinId === spec.id;
                const isSelectedPin = activePinSpecialist?.id === spec.id;

                return (
                  <div
                    key={spec.id}
                    onMouseEnter={() => setHoveredPinId(spec.id)}
                    onMouseLeave={() => setHoveredPinId(null)}
                    onClick={() => setActivePinSpecialist(spec)}
                    className={`absolute cursor-pointer transition-all duration-300 z-20 flex flex-col items-center group ${
                      isSelectedPin ? 'scale-125 z-40' : 'hover:scale-110'
                    }`}
                    style={{
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    }}
                  >
                    {/* Distance Pill Tooltip */}
                    <div
                      className={`mb-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold shadow-lg transition-all flex items-center gap-1 border ${
                        isSelectedPin
                          ? 'bg-[#42e09a] text-black border-white'
                          : 'bg-white text-[#1c1a25] border-[#5b3df5]'
                      }`}
                    >
                      <MapPin className="w-2.5 h-2.5 text-[#5b3df5]" />
                      {spec.distanceKm} km
                    </div>

                    {/* Specialist Avatar Pin */}
                    <div className="relative">
                      <img
                        src={spec.avatarUrl}
                        alt={spec.name}
                        className={`w-11 h-11 md:w-12 md:h-12 rounded-full object-cover border-2 shadow-2xl ${
                          isSelectedPin
                            ? 'border-[#42e09a] ring-4 ring-[#42e09a]/30'
                            : 'border-white group-hover:border-[#5b3df5]'
                        }`}
                      />
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#42e09a] rounded-full border border-white" />
                    </div>

                    <span className="text-[10px] font-bold text-white/90 bg-black/60 px-2 py-0.5 rounded mt-1 truncate max-w-[90px]">
                      {spec.name.split(' ')[0]}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Map Bottom Action Footer */}
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3 bg-black/50 backdrop-blur-md p-4 rounded-2xl border border-white/10">
              <div className="flex items-center gap-2 text-white text-xs">
                <Sparkles className="w-4 h-4 text-[#42e09a]" />
                <span>
                  {filteredSpecialists.length} profissionais validados a menos de {maxRadiusKm} km de você.
                </span>
              </div>

              <button
                onClick={handleDispatchNotification}
                className="w-full sm:w-auto px-5 py-2.5 bg-[#5b3df5] hover:bg-[#4212de] text-white font-extrabold text-xs rounded-xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Bell className="w-4 h-4" />
                Notificar {filteredSpecialists.length} Próximos
              </button>
            </div>
          </div>

          {/* Right Column: Selected Pin Card / Closest Professionals List */}
          <div className="lg:col-span-4 space-y-4">
            {activePinSpecialist ? (
              <div className="bg-white border-2 border-[#5b3df5] rounded-3xl p-5 shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between border-b border-[#e5e0ef] pb-3">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider bg-[#5b3df5]/10 text-[#4212de] px-2.5 py-1 rounded-md">
                    Profissional Selecionado no Mapa
                  </span>
                  <button
                    onClick={() => setActivePinSpecialist(null)}
                    className="text-xs text-[#787588] hover:text-[#1c1a25]"
                  >
                    Fechar
                  </button>
                </div>

                <div className="flex items-center gap-3.5">
                  <img
                    src={activePinSpecialist.avatarUrl}
                    alt={activePinSpecialist.name}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-[#5b3df5]"
                  />
                  <div>
                    <h3 className="font-headline font-bold text-base text-[#1c1a25]">
                      {activePinSpecialist.name}
                    </h3>
                    <p className="text-xs text-[#474556]">
                      {activePinSpecialist.role} • <span className="font-bold text-[#4212de]">{activePinSpecialist.level}</span>
                    </p>
                    <p className="text-xs font-bold text-emerald-700 mt-0.5">
                      📍 {activePinSpecialist.location}
                    </p>
                  </div>
                </div>

                <div className="bg-[#fcf8ff] p-3 rounded-xl text-xs space-y-1.5 border border-[#c8c4d9]/60">
                  <div className="flex justify-between">
                    <span className="text-[#787588]">Distância:</span>
                    <span className="font-bold text-[#4212de]">{activePinSpecialist.distanceKm} km de você</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#787588]">Tarifa / Hora:</span>
                    <span className="font-bold text-[#1c1a25]">{activePinSpecialist.hourlyRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#787588]">Tempo de Resposta:</span>
                    <span className="font-bold text-emerald-700">{activePinSpecialist.responseTime}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => onOpenChatWith(activePinSpecialist)}
                    className="flex-1 py-2.5 bg-[#f6f1ff] hover:bg-[#5b3df5] text-[#4212de] hover:text-white font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-1.5"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Chat Direto
                  </button>
                  <button
                    onClick={() => onSelectSpecialist(activePinSpecialist)}
                    className="flex-1 py-2.5 bg-[#5b3df5] hover:bg-[#4212de] text-white font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 shadow-md"
                  >
                    Ver Perfil
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-[#c8c4d9]/80 rounded-3xl p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-[#e5e0ef] pb-3">
                  <h3 className="font-headline font-bold text-sm text-[#1c1a25] flex items-center gap-2">
                    <Navigation className="w-4 h-4 text-[#5b3df5]" />
                    Mais Próximos por Ordem
                  </h3>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    GPS Ativo
                  </span>
                </div>

                <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                  {filteredSpecialists.slice(0, 5).map((spec) => (
                    <div
                      key={spec.id}
                      onClick={() => setActivePinSpecialist(spec)}
                      className="p-3 bg-[#fcf8ff] hover:bg-[#f6f1ff] border border-[#c8c4d9]/60 hover:border-[#5b3df5] rounded-2xl cursor-pointer transition-all flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={spec.avatarUrl}
                          alt={spec.name}
                          className="w-10 h-10 rounded-xl object-cover border border-[#5b3df5]"
                        />
                        <div>
                          <h4 className="font-headline font-bold text-xs text-[#1c1a25]">{spec.name}</h4>
                          <p className="text-[11px] text-[#474556]">{spec.role}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] font-extrabold bg-[#5b3df5]/10 text-[#4212de] px-2 py-0.5 rounded-full block">
                          {spec.distanceKm} km
                        </span>
                        <span className="text-[10px] font-bold text-emerald-700 mt-0.5 block">
                          {spec.hourlyRate}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* RADAR SWEEP VIEW */}
      {viewMode === 'RADAR' && (
        <div className="bg-[#5b3df5] text-white rounded-3xl p-8 md:p-12 relative overflow-hidden flex flex-col items-center text-center shadow-xl">
          <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center mb-8">
            <div className="absolute inset-0 rounded-full border border-white/20 animate-radar-ring" />
            <div className="absolute inset-8 rounded-full border border-white/15 animate-radar-ring" style={{ animationDelay: '0.6s' }} />
            <div className="absolute inset-16 rounded-full border border-white/10 animate-radar-ring" style={{ animationDelay: '1.2s' }} />

            <div className="relative z-20 w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center shadow-2xl">
              <Search className="w-8 h-8 text-[#4212de] animate-pulse" />
            </div>

            {filteredSpecialists.slice(0, 6).map((spec, i) => {
              const angles = [30, 120, 210, 300, 75, 165];
              const angleDeg = angles[i % angles.length];
              const angleRad = (angleDeg * Math.PI) / 180;
              const radius = 110 + (i % 2) * 25;

              const x = Math.cos(angleRad) * radius;
              const y = Math.sin(angleRad) * radius;

              return (
                <div
                  key={spec.id}
                  onClick={() => onSelectSpecialist(spec)}
                  className="absolute w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-white shadow-2xl overflow-hidden cursor-pointer hover:scale-125 transition-transform duration-300 z-30"
                  style={{
                    left: `calc(50% + ${x}px - 28px)`,
                    top: `calc(50% + ${y}px - 28px)`,
                  }}
                  title={`${spec.name} (${spec.distanceKm} km)`}
                >
                  <img src={spec.avatarUrl} alt={spec.name} className="w-full h-full object-cover" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#42e09a] rounded-full border border-white" />
                </div>
              );
            })}
          </div>

          <div className="space-y-3 max-w-md">
            <h3 className="font-headline font-extrabold text-2xl text-white">
              Varredura Radar IA Concluída
            </h3>
            <p className="text-xs text-white/90">
              {stages[activeStep]}
            </p>
          </div>
        </div>
      )}

      {/* EMPTY STATE WHEN NO SPECIALISTS REGISTERED */}
      {filteredSpecialists.length === 0 && (
        <div className="bg-white border-2 border-dashed border-[#c8c4d9] rounded-3xl p-8 md:p-12 text-center space-y-4 max-w-xl mx-auto my-6 animate-in fade-in duration-300">
          <div className="w-16 h-16 bg-[#5b3df5]/10 text-[#5b3df5] rounded-2xl flex items-center justify-center mx-auto">
            <UserPlus className="w-8 h-8" />
          </div>
          <h3 className="font-headline font-extrabold text-xl text-[#1c1a25]">
            Nenhum especialista cadastrado no momento
          </h3>
          <p className="text-xs text-[#474556] leading-relaxed max-w-md mx-auto">
            Os perfis de teste foram excluídos conforme solicitado. Cadastre seu perfil profissional para ser o primeiro a aparecer no Radar Geofence GPS!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('register-pro')}
              className="px-6 py-3 bg-[#5b3df5] hover:bg-[#4212de] text-white font-extrabold text-xs rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Briefcase className="w-4 h-4" />
              Cadastrar meu Perfil de Profissional
            </button>
            <button
              onClick={() => onNavigate('welcome')}
              className="px-5 py-3 bg-[#f6f1ff] hover:bg-[#e5e0ef] text-[#4212de] font-bold text-xs rounded-2xl transition-all"
            >
              Voltar para Página Inicial
            </button>
          </div>
        </div>
      )}

      {/* LIST VIEW */}
      {viewMode === 'LIST' && (
        <div className="space-y-3.5">
          {filteredSpecialists.map((spec) => (
            <div
              key={spec.id}
              className="bg-white border border-[#c8c4d9]/80 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm hover:shadow-md transition-all"
            >
              <div
                onClick={() => onSelectSpecialist(spec)}
                className="flex items-center gap-3.5 cursor-pointer flex-1"
              >
                <div className="relative">
                  <img
                    src={spec.avatarUrl}
                    alt={spec.name}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-[#5b3df5]"
                  />
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#42e09a] border-2 border-white rounded-full" />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-headline font-bold text-base text-[#1c1a25]">
                      {spec.name}
                    </h4>
                    <span className="bg-[#5b3df5]/10 text-[#4212de] text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-[#5b3df5]/20 flex items-center gap-1">
                      <MapPin className="w-2.5 h-2.5" />
                      {spec.distanceKm} km de você
                    </span>
                  </div>

                  <p className="text-xs text-[#474556] mt-0.5">
                    {spec.role} • <span className="font-bold text-[#4212de]">{spec.level}</span> • 📍 {spec.location}
                  </p>

                  <div className="flex items-center gap-2 mt-1.5 text-xs">
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
                  title="Conversar no Chat"
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
      )}

      {/* PRO SIMULATION MODAL */}
      {showProSimModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white border border-[#c8c4d9] rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 relative">
            <button
              onClick={() => setShowProSimModal(false)}
              className="absolute top-4 right-4 text-xs font-bold text-[#787588] hover:text-[#1c1a25]"
            >
              Fechar X
            </button>

            <div className="flex items-center gap-2 text-[#4212de]">
              <Smartphone className="w-5 h-5" />
              <h3 className="font-headline font-bold text-base text-[#1c1a25]">
                Simulação: Notificação Recebida no Celular do Profissional
              </h3>
            </div>

            {/* Mobile Notification Card Mock */}
            <div className="bg-[#1c1a25] text-white rounded-2xl p-4 shadow-xl border border-white/20 space-y-3">
              <div className="flex items-center justify-between text-[10px] text-white/70">
                <span className="flex items-center gap-1 font-bold text-[#42e09a]">
                  <Bell className="w-3 h-3" />
                  NEXO Pro Radar • AGORA
                </span>
                <span>a 1.2 km de distância</span>
              </div>

              <div>
                <h4 className="font-bold text-sm text-white">
                  ⚡ Nova Proposta de Projeto Recebida!
                </h4>
                <p className="text-xs text-white/80 mt-1">
                  Cliente <span className="font-bold text-white">Luiz (Contratante)</span> precisa de <span className="font-bold text-[#42e09a]">{lastRequest?.serviceName || 'Landing Page'}</span>.
                </p>
                <p className="text-[11px] text-white/60 italic mt-1">
                  "{lastRequest?.description || 'Preciso de um projeto com foco em alta conversão e prazos ágeis.'}"
                </p>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={() => {
                    setShowProSimModal(false);
                    onOpenChatWith(filteredSpecialists[0] || activeSpecialistsList[0]);
                  }}
                  className="w-full py-2.5 bg-[#5b3df5] hover:bg-[#4212de] text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  Aceitar Proposta & Responder no Chat
                </button>
              </div>
            </div>

            <p className="text-[11px] text-[#787588] text-center">
              Esta é uma demonstração em tempo real de como os profissionais mais próximos recebem o alerta de oportunidade.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
