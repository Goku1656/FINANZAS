import React from 'react';
import { ScreenId, TransitionType } from '../types';

interface SidebarProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId, transition?: TransitionType) => void;
}

export const NavigationSidebar: React.FC<SidebarProps> = ({ currentScreen, onNavigate }) => {
  // Navigation item helper
  const isSelected = (screen: ScreenId) => currentScreen === screen;

  const getLinkClasses = (active: boolean) =>
    active
      ? 'flex items-center gap-space-md px-space-md py-space-sm transition-colors bg-primary-container text-on-primary font-semibold rounded-lg shadow-sm'
      : 'flex items-center gap-space-md px-space-md py-space-sm rounded-lg text-on-surface-variant font-body-sm text-body-sm hover:bg-surface-container hover:text-on-surface transition-colors';

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-surface-container-lowest flex flex-col justify-between z-40 shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-r border-[#e2e8f0]">
      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* Brand header */}
        <div 
          onClick={() => onNavigate('inicio', 'none')} 
          className="h-16 px-space-base flex items-center gap-space-sm cursor-pointer select-none"
        >
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-on-primary font-display-lg text-lg font-bold shadow-xs">
            G
          </div>
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-primary tracking-tight leading-none">
              Glori
            </span>
            <span className="font-label-xs text-label-xs text-on-surface-variant font-medium mt-0.5">
              Créditos y Cobranzas
            </span>
          </div>
        </div>

        {/* Store badge */}
        <div className="px-space-base pb-space-sm">
          <div 
            onClick={() => onNavigate('configuracion', 'none')} 
            className="bg-surface-container-low rounded-xl p-space-sm flex items-center justify-between cursor-pointer hover:bg-surface-container transition-colors"
          >
            <div className="flex items-center gap-space-sm overflow-hidden">
              <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[18px]">storefront</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-md text-label-md text-on-surface truncate">Bodegas Gloria</span>
                <span className="font-label-xs text-label-xs text-on-surface-variant truncate">RUC 10458291024</span>
              </div>
            </div>
            <span className="w-2 h-2 rounded-full bg-tertiary shrink-0 mr-space-2xs animate-pulse" title="Operativo" />
          </div>
        </div>

        {/* Navigation Menu */}
        <nav
          className="flex flex-col gap-space-2xs px-space-base py-space-xs"
          data-active-classes="bg-primary-container text-on-primary font-semibold rounded-lg shadow-sm"
        >
          {/* 1. Inicio */}
          <a
            href="#inicio"
            data-path="inicio"
            aria-current={isSelected('inicio') ? 'page' : undefined}
            className={getLinkClasses(isSelected('inicio'))}
            onClick={(e) => {
              e.preventDefault();
              onNavigate('inicio', 'none');
            }}
          >
            <span className="material-symbols-outlined text-[20px]">space_dashboard</span>
            <span>Inicio</span>
          </a>

          {/* 2. Clientes */}
          <a
            href="#clientes"
            data-path="clientes"
            aria-current={isSelected('clientes') ? 'page' : undefined}
            className={getLinkClasses(isSelected('clientes'))}
            onClick={(e) => {
              e.preventDefault();
              onNavigate('clientes', 'none');
            }}
          >
            <span className="material-symbols-outlined text-[20px]">group</span>
            <span>Clientes</span>
          </a>

          {/* 3. Ventas al Crédito */}
          <a
            href="#ventas-al-credito"
            data-path="ventas-al-credito"
            aria-current={isSelected('ventas-al-credito') ? 'page' : undefined}
            className={getLinkClasses(isSelected('ventas-al-credito'))}
            onClick={(e) => {
              e.preventDefault();
              onNavigate('ventas-al-credito', 'none');
            }}
          >
            <span className="material-symbols-outlined text-[20px]">add_card</span>
            <span>Ventas al Crédito</span>
          </a>

          {/* 4. Cuentas por Cobrar */}
          <a
            href="#cuentas-por-cobrar"
            data-path="cuentas-por-cobrar"
            aria-current={isSelected('cuentas-por-cobrar') ? 'page' : undefined}
            className={getLinkClasses(isSelected('cuentas-por-cobrar'))}
            onClick={(e) => {
              e.preventDefault();
              onNavigate('cuentas-por-cobrar', 'none');
            }}
          >
            <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
            <span>Cuentas por Cobrar</span>
          </a>

          {/* Alias for cronogramas-frances */}
          <a
            href="#cronogramas-frances"
            data-path="cronogramas-frances"
            className={getLinkClasses(false)}
            onClick={(e) => {
              e.preventDefault();
              onNavigate('cuentas-por-cobrar', 'none');
            }}
          >
            <span className="material-symbols-outlined text-[20px]">calendar_month</span>
            <span>Cronogramas (Francés)</span>
          </a>

          {/* Alias for cuotas-y-cronogramas if requested */}
          <a
            href="#cuotas-y-cronogramas"
            data-path="cuotas-y-cronogramas"
            className="hidden"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('cuentas-por-cobrar', 'none');
            }}
          >
            <span>Cuotas y Cronogramas</span>
          </a>

          {/* 5. Pagos y Prelación (alias pagos & pagos-y-prelacion) */}
          <a
            href="#pagos"
            data-path="pagos"
            aria-current={isSelected('pagos') ? 'page' : undefined}
            className={getLinkClasses(isSelected('pagos'))}
            onClick={(e) => {
              e.preventDefault();
              onNavigate('pagos', 'none');
            }}
          >
            <span className="material-symbols-outlined text-[20px]">payments</span>
            <span>Pagos y Prelación</span>
          </a>

          {/* Alias for pagos-y-prelacion */}
          <a
            href="#pagos-y-prelacion"
            data-path="pagos-y-prelacion"
            className="hidden"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('pagos', 'none');
            }}
          >
            <span>Pagos y Prelación Legal</span>
          </a>

          {/* 6. Reportes y Analíticas */}
          <a
            href="#reportes-y-analiticas"
            data-path="reportes-y-analiticas"
            aria-current={isSelected('reportes-y-analiticas') ? 'page' : undefined}
            className={getLinkClasses(isSelected('reportes-y-analiticas'))}
            onClick={(e) => {
              e.preventDefault();
              onNavigate('reportes-y-analiticas', 'none');
            }}
          >
            <span className="material-symbols-outlined text-[20px]">query_stats</span>
            <span>Reportes y Analíticas</span>
          </a>

          {/* 7. Configuración */}
          <a
            href="#configuracion"
            data-path="configuracion"
            aria-current={isSelected('configuracion') ? 'page' : undefined}
            className={getLinkClasses(isSelected('configuracion'))}
            onClick={(e) => {
              e.preventDefault();
              onNavigate('configuracion', 'none');
            }}
          >
            <span className="material-symbols-outlined text-[20px]">settings</span>
            <span>Configuración</span>
          </a>
        </nav>
      </div>

      {/* Footer info & Profile */}
      <div className="p-space-base flex flex-col gap-space-sm bg-surface-container-lowest border-t border-[#e2e8f0]">
        <div className="bg-surface-container-low rounded-xl p-space-sm flex flex-col gap-space-2xs">
          <div className="flex items-center justify-between">
            <span className="font-label-xs text-label-xs text-on-surface-variant font-medium uppercase">
              Límite de Cartera
            </span>
            <span className="font-label-xs text-label-xs text-primary font-semibold">78%</span>
          </div>
          <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full w-[78%]" />
          </div>
          <div className="flex justify-between items-center text-on-surface-variant">
            <span className="font-label-xs text-label-xs">Plan Pyme Oro</span>
            <span className="font-label-xs text-label-xs font-semibold">S/. 42.8k / 50k</span>
          </div>
        </div>

        <div className="flex items-center gap-space-sm pt-space-xs">
          <div className="relative shrink-0">
            <img
              alt="Gloria Mendoza"
              className="w-8 h-8 rounded-full object-cover"
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-tertiary ring-2 ring-surface-container-lowest" />
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="font-label-md text-label-md text-on-surface truncate">Gloria Mendoza</span>
            <span className="font-label-xs text-label-xs text-on-surface-variant truncate">Administradora</span>
          </div>
          <button
            className="text-on-surface-variant hover:text-on-surface p-space-2xs rounded-lg hover:bg-surface-container transition-colors"
            title="Configuración"
            type="button"
            onClick={() => onNavigate('configuracion', 'none')}
          >
            <span className="material-symbols-outlined text-[18px]">settings</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
