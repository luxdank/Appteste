import React from 'react';
import { LayoutGrid, Compass, Briefcase, User, Plus } from 'lucide-react';
import { NavigationTab } from '../types';

interface BottomNavProps {
  currentTab: NavigationTab;
  onNavigate: (tab: NavigationTab) => void;
  onOpenNewRequest: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onNavigate,
  onOpenNewRequest,
}) => {
  const isRadar = currentTab === 'radar';

  return (
    <nav
      className={`fixed bottom-0 left-0 w-full z-50 transition-colors duration-300 border-t ${
        isRadar
          ? 'bg-[#5b3df5]/95 backdrop-blur-xl border-white/10 text-white'
          : 'bg-white/95 backdrop-blur-xl border-[#c8c4d9]/50 text-[#474556]'
      } px-4 py-2 shadow-lg`}
    >
      <div className="max-w-md mx-auto flex items-center justify-around relative">
        {/* Home Tab */}
        <button
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-full transition-all active:scale-95 ${
            currentTab === 'home'
              ? isRadar
                ? 'bg-white/20 text-white font-bold'
                : 'bg-[#5b3df5] text-white font-bold shadow-sm'
              : 'hover:text-[#4212de]'
          }`}
        >
          <LayoutGrid className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Home</span>
        </button>

        {/* Search/Radar Tab */}
        <button
          onClick={() => onNavigate('radar')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-full transition-all active:scale-95 ${
            currentTab === 'radar'
              ? isRadar
                ? 'bg-white/20 text-white font-bold'
                : 'bg-[#5b3df5] text-white font-bold shadow-sm'
              : 'hover:text-[#4212de]'
          }`}
        >
          <Compass className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Search</span>
        </button>

        {/* Center Floating Action Button (+ Request) */}
        <button
          onClick={onOpenNewRequest}
          className="flex flex-col items-center justify-center -mt-5 bg-gradient-to-r from-[#4212de] to-[#5b3df5] text-white p-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all ring-4 ring-[#fcf8ff]"
          title="Nova Solicitação de Projeto"
        >
          <Plus className="w-6 h-6" />
        </button>

        {/* Projects Tab */}
        <button
          onClick={() => onNavigate('projects')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-full transition-all active:scale-95 ${
            currentTab === 'projects'
              ? isRadar
                ? 'bg-white/20 text-white font-bold'
                : 'bg-[#5b3df5] text-white font-bold shadow-sm'
              : 'hover:text-[#4212de]'
          }`}
        >
          <Briefcase className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Projects</span>
        </button>

        {/* Profile Tab */}
        <button
          onClick={() => onNavigate('profile')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-full transition-all active:scale-95 ${
            currentTab === 'profile'
              ? isRadar
                ? 'bg-white/20 text-white font-bold'
                : 'bg-[#5b3df5] text-white font-bold shadow-sm'
              : 'hover:text-[#4212de]'
          }`}
        >
          <User className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">Profile</span>
        </button>
      </div>
    </nav>
  );
};
