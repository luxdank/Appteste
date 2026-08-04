import React, { useState } from 'react';
import { Sparkles, Bell, Search, User, ChevronRight, MapPin, Navigation, RefreshCw } from 'lucide-react';
import { USER_PROFILE } from '../data/mockData';
import { NavigationTab } from '../types';
import { UserLocation } from '../hooks/useGeolocation';

interface HeaderProps {
  currentTab: NavigationTab;
  onNavigate: (tab: NavigationTab) => void;
  onOpenSearch?: () => void;
  userLocation?: UserLocation;
  onRequestGps?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  onOpenSearch,
  userLocation,
  onRequestGps,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showGpsDetails, setShowGpsDetails] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'Especialistas Encontrados!',
      desc: 'Beatriz Silva e Ricardo Lima aceitaram sua solicitação de orçamentos.',
      time: 'Há 10 min',
      read: false,
    },
    {
      id: '2',
      title: 'Projeto E-commerce v2',
      desc: 'A entrega da etapa "Protótipo de Checkout" está pronta para revisão.',
      time: 'Há 2 horas',
      read: false,
    },
    {
      id: '3',
      title: 'Dica da IA NEXO',
      desc: 'Seu projeto tem 98% de chance de ser concluído 1 dia antes do prazo.',
      time: 'Ontem',
      read: true,
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const isRadarTab = currentTab === 'radar';

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        isRadarTab
          ? 'bg-[#5b3df5]/90 backdrop-blur-md border-b border-white/10 text-white'
          : 'bg-[#fcf8ff]/95 backdrop-blur-md border-b border-[#c8c4d9]/40 text-[#1c1a25]'
      }`}
    >
      <div className="max-w-[1120px] mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        {/* Logo NEXO */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 group focus:outline-none text-left"
        >
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm ${
              isRadarTab
                ? 'bg-white text-[#5b3df5]'
                : 'bg-[#5b3df5] text-white'
            }`}
          >
            {/* Nexo Logo Mark */}
            <svg
              className="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span
              className={`font-headline text-2xl font-black tracking-tighter leading-none ${
                isRadarTab ? 'text-white' : 'text-[#4212de]'
              }`}
            >
              NEXO
            </span>
            <span
              className={`text-[9px] font-semibold uppercase tracking-widest leading-none mt-0.5 ${
                isRadarTab ? 'text-white/70' : 'text-[#787588]'
              }`}
            >
              Intelligence
            </span>
          </div>
        </button>

        {/* Right Action Icons */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* GPS Live Status Badge */}
          <div className="relative">
            <button
              onClick={() => setShowGpsDetails(!showGpsDetails)}
              className={`px-2.5 py-1.5 rounded-xl text-[11px] font-extrabold transition-all flex items-center gap-1.5 active:scale-95 ${
                userLocation?.active
                  ? isRadarTab
                    ? 'bg-emerald-500/20 text-[#42e09a] border border-[#42e09a]/40'
                    : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : isRadarTab
                    ? 'bg-white/10 text-white/80 border border-white/20'
                    : 'bg-[#f6f1ff] text-[#4212de] border border-[#5b3df5]/20'
              }`}
              title="Status do GPS Geofence"
            >
              <span className="relative flex h-2 w-2">
                {userLocation?.active ? (
                  <>
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </>
                ) : (
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                )}
              </span>
              <Navigation className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {userLocation?.active ? 'GPS Ativo' : 'Ativar GPS'}
              </span>
            </button>

            {/* GPS Popover details */}
            {showGpsDetails && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-[#c8c4d9] p-4 text-[#1c1a25] z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#e5e0ef]">
                  <div className="flex items-center gap-1.5 text-xs font-black text-[#1c1a25]">
                    <MapPin className="w-4 h-4 text-[#5b3df5]" />
                    Sinal GPS Geofence
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      userLocation?.active
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {userLocation?.active ? 'Conectado' : 'Aguardando'}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-[#474556]">
                  <div className="flex justify-between">
                    <span className="text-[#787588]">Latitude:</span>
                    <span className="font-mono font-bold text-[#1c1a25]">
                      {userLocation?.lat.toFixed(5)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#787588]">Longitude:</span>
                    <span className="font-mono font-bold text-[#1c1a25]">
                      {userLocation?.lng.toFixed(5)}
                    </span>
                  </div>
                  {userLocation?.accuracy && (
                    <div className="flex justify-between">
                      <span className="text-[#787588]">Precisão:</span>
                      <span className="font-bold text-emerald-700">
                        ±{userLocation.accuracy}m
                      </span>
                    </div>
                  )}
                  <p className="text-[11px] text-[#787588] pt-1 border-t border-[#e5e0ef]">
                    O GPS é utilizado para calcular distâncias exatas até os profissionais no Radar IA.
                  </p>
                </div>

                <button
                  onClick={() => {
                    if (onRequestGps) onRequestGps();
                    setShowGpsDetails(false);
                  }}
                  className="w-full mt-3 py-2 bg-[#5b3df5] hover:bg-[#4212de] text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Atualizar Posição GPS
                </button>
              </div>
            )}
          </div>

          {/* Quick Login/Role Button */}
          <button
            onClick={() => onNavigate('login')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 ${
              isRadarTab
                ? 'bg-white/20 hover:bg-white/30 text-white'
                : 'bg-[#5b3df5]/10 hover:bg-[#5b3df5]/20 text-[#4212de]'
            }`}
            title="Entrar / Alternar Conta (Cliente ou Profissional)"
          >
            <User className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Entrar</span>
          </button>

          {/* Quick Search Button */}
          <button
            onClick={onOpenSearch || (() => onNavigate('radar'))}
            className={`p-2 rounded-full transition-all active:scale-90 ${
              isRadarTab
                ? 'hover:bg-white/15 text-white'
                : 'hover:bg-[#ebe6f5] text-[#474556]'
            }`}
            title="Buscar especialistas com IA"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Notifications Dropdown Container */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className={`p-2 rounded-full relative transition-all active:scale-90 ${
                isRadarTab
                  ? 'hover:bg-white/15 text-white'
                  : 'hover:bg-[#ebe6f5] text-[#474556]'
              }`}
              title="Notificações"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#42e09a] rounded-full ring-2 ring-[#fcf8ff] pulse-accent" />
              )}
            </button>

            {/* Notifications Popover */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-[#c8c4d9] p-4 text-[#1c1a25] z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#e5e0ef]">
                  <div className="flex items-center gap-2">
                    <h4 className="font-headline font-bold text-sm">Notificações</h4>
                    {unreadCount > 0 && (
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-[#5b3df5]/10 text-[#4212de] rounded-full">
                        {unreadCount} novas
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs font-semibold text-[#4212de] hover:underline"
                    >
                      Marcar lidas
                    </button>
                  )}
                </div>

                <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                  {notifications.map(n => (
                    <div
                      key={n.id}
                      className={`p-3 rounded-xl transition-colors ${
                        n.read ? 'bg-slate-50' : 'bg-[#f6f1ff] border border-[#5b3df5]/20'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-semibold text-xs text-[#1c1a25]">{n.title}</span>
                        <span className="text-[10px] text-[#787588]">{n.time}</span>
                      </div>
                      <p className="text-xs text-[#474556] leading-relaxed">{n.desc}</p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setShowNotifications(false);
                    onNavigate('projects');
                  }}
                  className="w-full mt-3 pt-2 text-center text-xs font-bold text-[#4212de] hover:underline flex items-center justify-center gap-1"
                >
                  Ver todos os projetos <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* User Profile Avatar */}
          <button
            onClick={() => onNavigate('profile')}
            className="flex items-center gap-2.5 p-1 rounded-full hover:bg-black/5 transition-all focus:outline-none"
            title="Seu Perfil"
          >
            <div className="relative">
              <img
                src={USER_PROFILE.avatarUrl}
                alt={USER_PROFILE.name}
                className="w-9 h-9 rounded-full object-cover border-2 border-[#5b3df5]"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#42e09a] rounded-full border-2 border-white" />
            </div>
            <span
              className={`hidden sm:inline-block font-semibold text-xs ${
                isRadarTab ? 'text-white' : 'text-[#1c1a25]'
              }`}
            >
              {USER_PROFILE.name}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
