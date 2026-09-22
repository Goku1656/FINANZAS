import React from 'react';
import { ScreenId, TransitionType } from '../types';

interface HeaderProps {
  onNavigate: (screen: ScreenId, transition?: TransitionType) => void;
  searchTerm?: string;
  onSearchChange?: (term: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, searchTerm = '', onSearchChange }) => {
  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-surface-container-lowest/95 backdrop-blur-xl z-30 shadow-[0_1px_8px_rgba(0,0,0,0.04)] px-space-xl flex items-center justify-between gap-space-lg border-b border-[#e2e8f0]">
      {/* Search Bar */}
      <div className="flex items-center flex-1 max-w-md">
        <div className="w-full flex items-center gap-space-sm bg-surface-container-low px-space-md py-space-sm rounded-xl focus-within:bg-surface-container-lowest focus-within:shadow-[0_0_0_1px_#2a45d8] transition-all border border-[#e2e8f0]/60">
          <span className="material-symbols-outlined text-[18px] text-on-surface-variant">search</span>
          <input
            className="bg-transparent w-full text-on-surface placeholder:text-on-surface-variant font-body-sm text-body-sm focus:outline-none"
            placeholder="Buscar cliente, DNI, RUC o factura (Ctrl+K)"
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
          />
          <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 font-label-xs text-label-xs text-on-surface-variant bg-surface-container-high rounded">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-space-md">
        {/* Currency badge */}
        <div className="flex items-center gap-space-xs bg-surface-container-low px-space-sm py-space-xs rounded-xl border border-[#e2e8f0]/60">
          <span className="material-symbols-outlined text-[16px] text-primary">currency_exchange</span>
          <span className="font-label-md text-label-md text-on-surface font-semibold">S/ PEN</span>
          <span className="font-label-xs text-label-xs text-on-surface-variant">Soles</span>
        </div>

        {/* Primary Action Button: EXACT TEXT with two leading spaces to match: //button[contains(., '  Nueva Venta')] */}
        <button
          className="flex items-center gap-space-xs bg-primary hover:bg-primary-container text-on-primary px-space-md py-space-sm rounded-lg font-label-md text-label-md font-semibold transition-colors shadow-sm cursor-pointer select-none"
          type="button"
          onClick={() => onNavigate('ventas-al-credito', 'slide_up')}
        >
          <span className="material-symbols-outlined text-[18px]">add_circle</span>
          <span>  Nueva Venta</span>
        </button>

        {/* Notifications */}
        <button
          aria-label="Notificaciones"
          className="relative p-space-sm rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors"
          type="button"
          onClick={() => onNavigate('cuentas-por-cobrar', 'push')}
          title="3 notificaciones de cobro"
        >
          <span className="material-symbols-outlined text-[20px]">notifications</span>
          <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-error text-on-error font-label-xs text-[10px] flex items-center justify-center font-bold">
            3
          </span>
        </button>

        {/* Profile */}
        <div 
          onClick={() => onNavigate('configuracion', 'none')} 
          className="flex items-center gap-space-sm pl-space-xs cursor-pointer hover:opacity-85 transition-opacity"
        >
          <img
            alt="Gloria Mendoza"
            className="w-8 h-8 rounded-full object-cover ring-1 ring-[#e2e8f0]"
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
          />
          <div className="hidden xl:flex flex-col">
            <span className="font-label-md text-label-md text-on-surface font-medium leading-none">
              Gloria M.
            </span>
            <span className="font-label-xs text-label-xs text-on-surface-variant leading-none mt-1">
              Bodega Principal
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
