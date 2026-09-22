import React, { useState } from 'react';
import { ScreenId, TransitionType } from '../types';

interface DashboardScreenProps {
  onNavigate: (screen: ScreenId, transition?: TransitionType) => void;
  onOpenQuickPayment?: (clientName: string, doc: string, quota: string, amount: number) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  onNavigate,
  onOpenQuickPayment,
}) => {
  const [selectedQuickClient, setSelectedQuickClient] = useState<{
    name: string;
    doc: string;
    quota: string;
    amount: string;
  } | null>(null);

  const [notificationToast, setNotificationToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setNotificationToast(msg);
    setTimeout(() => setNotificationToast(null), 3500);
  };

  const handleCobrarClick = (name: string, doc: string, quota: string, amount: string) => {
    if (onOpenQuickPayment) {
      onOpenQuickPayment(name, doc, quota, parseFloat(amount));
    } else {
      setSelectedQuickClient({ name, doc, quota, amount });
    }
  };

  return (
    <div className="flex flex-col w-full gap-space-xl pb-16">
      {/* Toast Notification */}
      {notificationToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0b1c30] text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-2">
          <span className="material-symbols-outlined text-[18px] text-tertiary-fixed">check_circle</span>
          <span className="text-body-sm font-medium">{notificationToast}</span>
        </div>
      )}

      {/* Top Banner / Operational Context Bar */}
      <div 
        onClick={() => onNavigate('configuracion', 'none')} 
        className="bg-surface-container-low rounded-xl p-space-md flex flex-col md:flex-row items-start md:items-center justify-between gap-space-sm border border-[#e2e8f0]/60 cursor-pointer hover:bg-surface-container transition-colors"
      >
        <div className="flex items-center gap-space-sm">
          <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shrink-0">
            <span className="material-symbols-outlined text-[18px]">verified</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-md text-label-md text-on-surface">
              Configuración Operativa: Bodegas Gloria
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Tasa compensatoria y moratoria 0.00% aplicada automáticamente a todas las notas de venta al crédito.
            </span>
          </div>
        </div>
        <div className="flex items-center gap-space-xs self-end md:self-auto bg-surface-container-lowest px-space-sm py-space-2xs rounded-lg shadow-sm border border-[#e2e8f0]">
          <span className="w-2 h-2 rounded-full bg-tertiary" />
          <span className="font-label-xs text-label-xs text-tertiary uppercase tracking-wider font-semibold">
            Regla Comercial Activa
          </span>
        </div>
      </div>

      {/* Page Header Area */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-base">
        <div className="flex flex-col gap-space-2xs">
          <div className="flex items-center gap-space-xs">
            <span className="font-label-xs text-label-xs text-primary font-bold uppercase tracking-widest">
              SaaS Contable • Cartera Activa
            </span>
            <span className="text-on-surface-variant">•</span>
            <span className="font-label-xs text-label-xs text-on-surface-variant font-medium">
              Lima, Perú • Periodo Activo: Mayo 2024
            </span>
          </div>
          <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight font-bold">
            Panel General de Créditos y Cobranzas
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Control central de amortización francesa simplificada, vencimientos inmediatos y prelación de pagos.
          </p>
        </div>

        {/* Quick Action Toolbelt */}
        <div className="flex items-center gap-space-sm shrink-0 flex-wrap">
          <button
            className="flex items-center gap-space-xs bg-surface-container-lowest hover:bg-surface-container-low text-on-surface px-space-md py-space-sm rounded-lg font-label-md text-label-md transition-colors shadow-sm border border-[#e2e8f0]"
            type="button"
            onClick={() => onNavigate('reportes-y-analiticas', 'none')}
          >
            <span className="material-symbols-outlined text-[18px] text-secondary">file_download</span>
            <span>Exportar Resumen</span>
          </button>
          <button
            className="flex items-center gap-space-xs bg-primary-container hover:bg-primary text-on-primary px-space-md py-space-sm rounded-lg font-label-md text-label-md font-semibold transition-all shadow-md"
            type="button"
            onClick={() => onNavigate('ventas-al-credito', 'slide_up')}
          >
            <span className="material-symbols-outlined text-[18px]">post_add</span>
            <span>+ Registrar Venta al Crédito</span>
          </button>
        </div>
      </div>

      {/* Row 1: 6 Metric/KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-space-base">
        {/* Card 1 */}
        <div 
          onClick={() => onNavigate('ventas-al-credito', 'slide_up')}
          className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-[#e2e8f0] flex flex-col justify-between gap-space-xs hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="font-label-xs text-label-xs text-on-surface-variant font-semibold uppercase tracking-wider">
              Ventas Crédito (Mes)
            </span>
            <span className="material-symbols-outlined text-[18px] text-primary">shopping_bag</span>
          </div>
          <div className="flex flex-col mt-space-2xs">
            <span className="font-headline-lg text-headline-lg text-on-surface font-display-lg tabular-nums">
              S/ 28,450.00
            </span>
            <div className="flex items-center gap-space-2xs mt-1">
              <span className="material-symbols-outlined text-[14px] text-tertiary">trending_up</span>
              <span className="font-label-xs text-label-xs text-tertiary font-semibold">+14.2%</span>
              <span className="font-label-xs text-label-xs text-on-surface-variant">(38 ventas)</span>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div 
          onClick={() => onNavigate('cuentas-por-cobrar', 'push')}
          className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-[#e2e8f0] flex flex-col justify-between gap-space-xs hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="font-label-xs text-label-xs text-on-surface-variant font-semibold uppercase tracking-wider">
              Total por Cobrar
            </span>
            <span className="material-symbols-outlined text-[18px] text-primary">account_balance_wallet</span>
          </div>
          <div className="flex flex-col mt-space-2xs">
            <span className="font-headline-lg text-headline-lg text-primary font-display-lg tabular-nums">
              S/ 42,680.50
            </span>
            <div className="flex items-center gap-space-2xs mt-1">
              <span className="font-label-xs text-label-xs text-on-surface-variant">Activo en cartera</span>
            </div>
          </div>
        </div>

        {/* Card 3 (Mora/Vencido - Red emphasis) */}
        <div 
          onClick={() => onNavigate('cuentas-por-cobrar', 'push')}
          className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-red-200 flex flex-col justify-between gap-space-xs hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="font-label-xs text-label-xs text-on-surface-variant font-semibold uppercase tracking-wider">
              Monto Vencido
            </span>
            <span className="material-symbols-outlined text-[18px] text-error">warning</span>
          </div>
          <div className="flex flex-col mt-space-2xs">
            <span className="font-headline-lg text-headline-lg text-error font-display-lg tabular-nums">
              S/ 6,840.00
            </span>
            <div className="flex items-center gap-space-2xs mt-1">
              <span className="bg-error-container text-on-error-container font-label-xs text-label-xs px-1.5 py-0.5 rounded font-bold">
                16.0% mora
              </span>
              <span className="font-label-xs text-label-xs text-error font-medium">Atención</span>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div 
          onClick={() => onNavigate('pagos', 'push')}
          className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-[#e2e8f0] flex flex-col justify-between gap-space-xs hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="font-label-xs text-label-xs text-on-surface-variant font-semibold uppercase tracking-wider">
              Cobros de Mayo
            </span>
            <span className="material-symbols-outlined text-[18px] text-tertiary">check_circle</span>
          </div>
          <div className="flex flex-col mt-space-2xs">
            <span className="font-headline-lg text-headline-lg text-on-surface font-display-lg tabular-nums">
              S/ 19,230.00
            </span>
            <div className="flex items-center gap-space-2xs mt-1">
              <span className="font-label-xs text-label-xs text-tertiary font-semibold">84 cuotas</span>
              <span className="font-label-xs text-label-xs text-on-surface-variant">liquidadas</span>
            </div>
          </div>
        </div>

        {/* Card 5 */}
        <div 
          onClick={() => onNavigate('clientes', 'none')}
          className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-[#e2e8f0] flex flex-col justify-between gap-space-xs hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="font-label-xs text-label-xs text-on-surface-variant font-semibold uppercase tracking-wider">
              Clientes con Deuda
            </span>
            <span className="material-symbols-outlined text-[18px] text-secondary">groups</span>
          </div>
          <div className="flex flex-col mt-space-2xs">
            <span className="font-headline-lg text-headline-lg text-on-surface font-display-lg tabular-nums">
              47 Clientes
            </span>
            <div className="flex items-center gap-space-2xs mt-1">
              <span className="font-label-xs text-label-xs text-on-surface-variant">de 112 regs (42%)</span>
            </div>
          </div>
        </div>

        {/* Card 6 */}
        <div 
          onClick={() => onNavigate('cuentas-por-cobrar', 'push')}
          className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-[#e2e8f0] flex flex-col justify-between gap-space-xs hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="font-label-xs text-label-xs text-on-surface-variant font-semibold uppercase tracking-wider">
              Vence en 7 Días
            </span>
            <span className="material-symbols-outlined text-[18px] text-on-surface-variant">event_upcoming</span>
          </div>
          <div className="flex flex-col mt-space-2xs">
            <span className="font-headline-lg text-headline-lg text-on-surface font-display-lg tabular-nums">
              S/ 8,420.00
            </span>
            <div className="flex items-center gap-space-2xs mt-1">
              <span className="font-label-xs text-label-xs text-secondary font-semibold">18 cuotas</span>
              <span className="font-label-xs text-label-xs text-on-surface-variant">por recaudar</span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Visual Analytics Section (Dual Column) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-base items-stretch">
        {/* Left Column: Primary Trend Chart (8 cols on lg) */}
        <div className="lg:col-span-8 bg-surface-container-lowest rounded-xl p-space-xl shadow-sm border border-[#e2e8f0] flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pb-space-base">
            <div className="flex flex-col">
              <div className="flex items-center gap-space-xs">
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  Evolución de Ventas al Crédito vs Cobranza Mensual
                </h2>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Comparativo de colocación crediticia versus recuperación efectiva (Ene - May 2024)
              </span>
            </div>
            {/* Chart Controls and Metric Indicators */}
            <div className="flex items-center gap-space-md">
              <div className="flex items-center gap-space-xs">
                <span className="w-3 h-3 rounded-full bg-primary-container" />
                <span className="font-label-xs text-label-xs text-on-surface-variant">Venta Crédito</span>
              </div>
              <div className="flex items-center gap-space-xs">
                <span className="w-3 h-3 rounded-full bg-tertiary-fixed-dim" />
                <span className="font-label-xs text-label-xs text-on-surface-variant">Cobranza Real</span>
              </div>
              <div className="bg-surface-container-low px-space-sm py-1 rounded-lg border border-[#e2e8f0]">
                <span className="font-label-xs text-label-xs text-primary font-semibold">
                  Recupero Medio: 18 días
                </span>
              </div>
            </div>
          </div>

          {/* Financial Chart (Native SVG) */}
          <div className="w-full h-64 pt-space-md pb-space-xs flex flex-col justify-between">
            <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 700 200">
              <line className="text-surface-container-high" stroke="#e5eeff" strokeDasharray="3 3" x1="0" x2="700" y1="20" y2="20" />
              <line className="text-surface-container-high" stroke="#e5eeff" strokeDasharray="3 3" x1="0" x2="700" y1="70" y2="70" />
              <line className="text-surface-container-high" stroke="#e5eeff" strokeDasharray="3 3" x1="0" x2="700" y1="120" y2="120" />
              <line className="text-surface-container-high" stroke="#dce9ff" strokeWidth="1.5" x1="0" x2="700" y1="170" y2="170" />

              <defs>
                <linearGradient id="cobranzaArea" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#68dba9" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#68dba9" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="ventasBarGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#2a45d8" />
                  <stop offset="100%" stopColor="#334ddf" />
                </linearGradient>
              </defs>

              <path d="M 60 145 L 200 130 L 340 105 L 480 85 L 620 55 L 620 170 L 60 170 Z" fill="url(#cobranzaArea)" />
              <path d="M 60 145 L 200 130 L 340 105 L 480 85 L 620 55" stroke="#006545" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />

              {/* Month 1: Ene */}
              <rect className="transition-all hover:opacity-85" fill="url(#ventasBarGradient)" height="70" rx="4" width="36" x="42" y="100" />
              <circle cx="60" cy="145" fill="#ffffff" r="4.5" stroke="#006545" strokeWidth="2.5" />

              {/* Month 2: Feb */}
              <rect className="transition-all hover:opacity-85" fill="url(#ventasBarGradient)" height="80" rx="4" width="36" x="182" y="90" />
              <circle cx="200" cy="130" fill="#ffffff" r="4.5" stroke="#006545" strokeWidth="2.5" />

              {/* Month 3: Mar */}
              <rect className="transition-all hover:opacity-85" fill="url(#ventasBarGradient)" height="95" rx="4" width="36" x="322" y="75" />
              <circle cx="340" cy="105" fill="#ffffff" r="4.5" stroke="#006545" strokeWidth="2.5" />

              {/* Month 4: Abr */}
              <rect className="transition-all hover:opacity-85" fill="url(#ventasBarGradient)" height="110" rx="4" width="36" x="462" y="60" />
              <circle cx="480" cy="85" fill="#ffffff" r="4.5" stroke="#006545" strokeWidth="2.5" />

              {/* Month 5: May (Peak) */}
              <rect className="transition-all hover:opacity-85" fill="url(#ventasBarGradient)" height="135" rx="4" width="36" x="602" y="35" />
              <circle cx="620" cy="55" fill="#ffffff" r="5" stroke="#006545" strokeWidth="3" />
            </svg>

            {/* X-Axis Labels and Monthly Figures */}
            <div className="grid grid-cols-5 text-center pt-space-xs">
              <div className="flex flex-col">
                <span className="font-label-xs text-label-xs text-on-surface font-semibold">Enero</span>
                <span className="font-label-xs text-label-xs text-on-surface-variant">S/ 14.8k / 11.2k</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-xs text-label-xs text-on-surface font-semibold">Febrero</span>
                <span className="font-label-xs text-label-xs text-on-surface-variant">S/ 18.2k / 13.5k</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-xs text-label-xs text-on-surface font-semibold">Marzo</span>
                <span className="font-label-xs text-label-xs text-on-surface-variant">S/ 21.0k / 16.8k</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-xs text-label-xs text-on-surface font-semibold">Abril</span>
                <span className="font-label-xs text-label-xs text-on-surface-variant">S/ 24.5k / 18.9k</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-xs text-label-xs text-primary font-bold">Mayo (Activo)</span>
                <span className="font-label-xs text-label-xs text-on-surface-variant">S/ 28.4k / 19.2k</span>
              </div>
            </div>
          </div>

          <div className="pt-space-md mt-space-sm bg-surface-container-low rounded-xl p-space-sm flex flex-col sm:flex-row items-center justify-between gap-space-sm border border-[#e2e8f0]">
            <div className="flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-[20px] text-tertiary">health_and_safety</span>
              <span className="font-body-sm text-body-sm text-on-surface">
                Tasa de cumplimiento promedio en primera cuota: <strong className="text-on-surface">88.4%</strong>
              </span>
            </div>
            <span className="font-label-xs text-label-xs text-on-surface-variant">
              Cierre contable sugerido: 31 de Mayo
            </span>
          </div>
        </div>

        {/* Right Column: Dual Diagnostic Widgets (4 cols on lg) */}
        <div className="lg:col-span-4 flex flex-col gap-space-base justify-between">
          {/* Widget A: Distribución Cartera */}
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-[#e2e8f0] flex flex-col justify-between flex-1">
            <div className="flex items-center justify-between pb-space-xs">
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Estado de Cartera</h3>
              <span className="font-label-xs text-label-xs text-on-surface-variant font-semibold">S/ 42,680.50</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-sm">
              Clasificación dinámica por madurez de cuotas.
            </p>

            <div className="w-full h-3 bg-surface-container-high rounded-full overflow-hidden flex mb-space-md">
              <div className="bg-tertiary-container h-full" style={{ width: '64%' }} title="Al Día: 64%" />
              <div className="bg-secondary h-full" style={{ width: '20%' }} title="Por Vencer: 20%" />
              <div className="bg-error h-full" style={{ width: '16%' }} title="Vencido: 16%" />
            </div>

            <div className="flex flex-col gap-space-sm">
              <div className="flex items-center justify-between bg-surface-container-low p-space-xs rounded-lg border border-[#e2e8f0]/40">
                <div className="flex items-center gap-space-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-tertiary-container" />
                  <span className="font-body-sm text-body-sm text-on-surface font-medium">Al Día (Normal)</span>
                </div>
                <div className="flex items-center gap-space-sm">
                  <span className="font-label-xs text-label-xs text-tertiary font-semibold">64%</span>
                  <span className="font-tabular-numeric-md text-tabular-numeric-md text-on-surface font-semibold">
                    S/ 27,315.50
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between bg-surface-container-low p-space-xs rounded-lg border border-[#e2e8f0]/40">
                <div className="flex items-center gap-space-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
                  <span className="font-body-sm text-body-sm text-on-surface font-medium">Próximo a vencer (≤7 días)</span>
                </div>
                <div className="flex items-center gap-space-sm">
                  <span className="font-label-xs text-label-xs text-secondary font-semibold">20%</span>
                  <span className="font-tabular-numeric-md text-tabular-numeric-md text-on-surface font-semibold">
                    S/ 8,525.00
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between bg-surface-container-low p-space-xs rounded-lg border border-[#e2e8f0]/40">
                <div className="flex items-center gap-space-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-error" />
                  <span className="font-body-sm text-body-sm text-on-surface font-medium">Vencido / Mora</span>
                </div>
                <div className="flex items-center gap-space-sm">
                  <span className="font-label-xs text-label-xs text-error font-semibold">16%</span>
                  <span className="font-tabular-numeric-md text-tabular-numeric-md text-error font-semibold">
                    S/ 6,840.00
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Widget B: Composición de Deuda Vencida por Días */}
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-[#e2e8f0] flex flex-col justify-between flex-1">
            <div className="flex items-center justify-between pb-space-xs">
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Antigüedad de Mora</h3>
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant">hourglass_bottom</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-sm">
              Segmentación de los S/ 6,840.00 en riesgo de impago.
            </p>

            <div className="flex flex-col gap-space-xs">
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-label-xs font-label-xs">
                  <span className="text-on-surface font-medium">1 a 15 días (Mora leve)</span>
                  <span className="font-semibold text-on-surface">S/ 3,200.00 (46.7%)</span>
                </div>
                <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-secondary rounded-full" style={{ width: '46.7%' }} />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-label-xs font-label-xs">
                  <span className="text-on-surface font-medium">16 a 30 días (Seguimiento activo)</span>
                  <span className="font-semibold text-on-surface">S/ 2,140.00 (31.3%)</span>
                </div>
                <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-error rounded-full opacity-70" style={{ width: '31.3%' }} />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-label-xs font-label-xs">
                  <span className="text-on-surface font-medium">&gt; 30 días (Cobranza crítica)</span>
                  <span className="font-semibold text-error">S/ 1,500.00 (22.0%)</span>
                </div>
                <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-error rounded-full" style={{ width: '22.0%' }} />
                </div>
              </div>
            </div>

            <div className="pt-space-xs mt-space-xs flex justify-between items-center text-label-xs font-label-xs text-on-surface-variant border-t border-[#e2e8f0]/40">
              <span>Área de gestión: Bodega Principal</span>
              <button 
                onClick={() => onNavigate('reportes-y-analiticas', 'none')}
                className="text-primary font-semibold hover:underline"
              >
                Ver auditoría →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Priority Operations Queues */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-space-xl">
        {/* Queue 1: Próximos Vencimientos (7 Días) */}
        <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-[#e2e8f0] flex flex-col overflow-hidden">
          <div className="p-space-lg bg-surface-container-low flex items-center justify-between border-b border-[#e2e8f0]">
            <div className="flex items-center gap-space-sm">
              <div className="w-8 h-8 rounded-lg bg-secondary-container flex items-center justify-center text-on-secondary-container">
                <span className="material-symbols-outlined text-[18px]">calendar_clock</span>
              </div>
              <div className="flex flex-col">
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  Próximos Vencimientos (7 Días)
                </h3>
                <span className="font-label-xs text-label-xs text-on-surface-variant">
                  18 cuotas por liquidar esta semana
                </span>
              </div>
            </div>
            <span className="bg-surface-container-lowest text-primary font-label-xs text-label-xs font-semibold px-space-sm py-1 rounded-full shadow-sm border border-[#e2e8f0]">
              Total: S/ 8,420.00
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-body-sm text-body-sm">
              <thead className="bg-surface-container-lowest text-on-surface-variant font-label-xs text-label-xs uppercase tracking-wider border-b border-[#e2e8f0]">
                <tr>
                  <th className="py-space-sm px-space-md">Cliente • Identidad</th>
                  <th className="py-space-sm px-space-sm">Fecha Venc.</th>
                  <th className="py-space-sm px-space-sm text-center">N° Cuota</th>
                  <th className="py-space-sm px-space-sm text-right">Monto</th>
                  <th className="py-space-sm px-space-sm text-center">Estado</th>
                  <th className="py-space-sm px-space-md text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e2e8f0]/40">
                {/* Row 1 */}
                <tr className="hover:bg-surface-container-low transition-colors">
                  <td className="py-space-sm px-space-md">
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md text-on-surface font-semibold">Rosa Elvira Quispe</span>
                      <span className="font-label-xs text-label-xs text-on-surface-variant">DNI 09482711</span>
                    </div>
                  </td>
                  <td className="py-space-sm px-space-sm font-label-xs text-label-xs text-on-surface">15 May 2024</td>
                  <td className="py-space-sm px-space-sm text-center">
                    <span className="bg-surface-container px-2 py-0.5 rounded font-label-xs text-label-xs text-on-surface font-medium">
                      Cuota 2/4
                    </span>
                  </td>
                  <td className="py-space-sm px-space-sm text-right font-tabular-numeric-md font-bold text-on-surface">
                    S/ 450.00
                  </td>
                  <td className="py-space-sm px-space-sm text-center">
                    <span className="inline-flex items-center gap-1 bg-secondary-fixed text-on-secondary-fixed-variant px-2 py-0.5 rounded-full font-label-xs text-label-xs font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                      Por Vencer
                    </span>
                  </td>
                  <td className="py-space-sm px-space-md text-right">
                    <button
                      className="bg-primary-container hover:bg-primary text-on-primary px-space-sm py-1 rounded font-label-xs text-label-xs font-semibold transition-colors shadow-sm cursor-pointer"
                      onClick={() => handleCobrarClick('Rosa Elvira Quispe', 'DNI 09482711', 'Cuota 2/4', '450.00')}
                      type="button"
                    >
                      Cobrar
                    </button>
                  </td>
                </tr>

                {/* Row 2 */}
                <tr className="hover:bg-surface-container-low transition-colors">
                  <td className="py-space-sm px-space-md">
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md text-on-surface font-semibold">Minimarket El Sol S.A.C.</span>
                      <span className="font-label-xs text-label-xs text-on-surface-variant">RUC 20601827391</span>
                    </div>
                  </td>
                  <td className="py-space-sm px-space-sm font-label-xs text-label-xs text-on-surface">16 May 2024</td>
                  <td className="py-space-sm px-space-sm text-center">
                    <span className="bg-surface-container px-2 py-0.5 rounded font-label-xs text-label-xs text-on-surface font-medium">
                      Cuota 1/3
                    </span>
                  </td>
                  <td className="py-space-sm px-space-sm text-right font-tabular-numeric-md font-bold text-on-surface">
                    S/ 1,200.00
                  </td>
                  <td className="py-space-sm px-space-sm text-center">
                    <span className="inline-flex items-center gap-1 bg-secondary-fixed text-on-secondary-fixed-variant px-2 py-0.5 rounded-full font-label-xs text-label-xs font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                      Por Vencer
                    </span>
                  </td>
                  <td className="py-space-sm px-space-md text-right">
                    <button
                      className="bg-primary-container hover:bg-primary text-on-primary px-space-sm py-1 rounded font-label-xs text-label-xs font-semibold transition-colors shadow-sm cursor-pointer"
                      onClick={() => handleCobrarClick('Minimarket El Sol S.A.C.', 'RUC 20601827391', 'Cuota 1/3', '1200.00')}
                      type="button"
                    >
                      Cobrar
                    </button>
                  </td>
                </tr>

                {/* Row 3 */}
                <tr className="hover:bg-surface-container-low transition-colors">
                  <td className="py-space-sm px-space-md">
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md text-on-surface font-semibold">Carlos Manuel Benavides</span>
                      <span className="font-label-xs text-label-xs text-on-surface-variant">DNI 44810294</span>
                    </div>
                  </td>
                  <td className="py-space-sm px-space-sm font-label-xs text-label-xs text-on-surface">18 May 2024</td>
                  <td className="py-space-sm px-space-sm text-center">
                    <span className="bg-surface-container px-2 py-0.5 rounded font-label-xs text-label-xs text-on-surface font-medium">
                      Cuota 3/3
                    </span>
                  </td>
                  <td className="py-space-sm px-space-sm text-right font-tabular-numeric-md font-bold text-on-surface">
                    S/ 380.00
                  </td>
                  <td className="py-space-sm px-space-sm text-center">
                    <span className="inline-flex items-center gap-1 bg-secondary-fixed text-on-secondary-fixed-variant px-2 py-0.5 rounded-full font-label-xs text-label-xs font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                      Por Vencer
                    </span>
                  </td>
                  <td className="py-space-sm px-space-md text-right">
                    <button
                      className="bg-primary-container hover:bg-primary text-on-primary px-space-sm py-1 rounded font-label-xs text-label-xs font-semibold transition-colors shadow-sm cursor-pointer"
                      onClick={() => handleCobrarClick('Carlos Manuel Benavides', 'DNI 44810294', 'Cuota 3/3', '380.00')}
                      type="button"
                    >
                      Cobrar
                    </button>
                  </td>
                </tr>

                {/* Row 4 */}
                <tr className="hover:bg-surface-container-low transition-colors">
                  <td className="py-space-sm px-space-md">
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md text-on-surface font-semibold">Panadería Santa Catalina</span>
                      <span className="font-label-xs text-label-xs text-on-surface-variant">RUC 20554109823</span>
                    </div>
                  </td>
                  <td className="py-space-sm px-space-sm font-label-xs text-label-xs text-on-surface">20 May 2024</td>
                  <td className="py-space-sm px-space-sm text-center">
                    <span className="bg-surface-container px-2 py-0.5 rounded font-label-xs text-label-xs text-on-surface font-medium">
                      Cuota 2/6
                    </span>
                  </td>
                  <td className="py-space-sm px-space-sm text-right font-tabular-numeric-md font-bold text-on-surface">
                    S/ 890.00
                  </td>
                  <td className="py-space-sm px-space-sm text-center">
                    <span className="inline-flex items-center gap-1 bg-secondary-fixed text-on-secondary-fixed-variant px-2 py-0.5 rounded-full font-label-xs text-label-xs font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                      Por Vencer
                    </span>
                  </td>
                  <td className="py-space-sm px-space-md text-right">
                    <button
                      className="bg-primary-container hover:bg-primary text-on-primary px-space-sm py-1 rounded font-label-xs text-label-xs font-semibold transition-colors shadow-sm cursor-pointer"
                      onClick={() => handleCobrarClick('Panadería Santa Catalina', 'RUC 20554109823', 'Cuota 2/6', '890.00')}
                      type="button"
                    >
                      Cobrar
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* EXACT XPATH MATCH: //a[contains(., 'Ver cronograma completo')] → Cuentas por Cobrar y Cronograma Francés (push transition) */}
          <div className="p-space-md bg-surface-container-lowest flex items-center justify-between text-on-surface-variant border-t border-[#e2e8f0]">
            <span className="font-label-xs text-label-xs">Mostrando 4 de 18 próximas cuotas</span>
            <a
              href="#cuentas-por-cobrar"
              className="font-label-md text-label-md text-primary font-semibold hover:underline flex items-center gap-1 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('cuentas-por-cobrar', 'push');
              }}
            >
              <span>Ver cronograma completo</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </a>
          </div>
        </div>

        {/* Queue 2: Alerta de Deudas Vencidas */}
        <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-red-200 flex flex-col overflow-hidden">
          <div className="p-space-lg bg-error-container text-on-error-container flex items-center justify-between border-b border-red-200">
            <div className="flex items-center gap-space-sm">
              <div className="w-8 h-8 rounded-lg bg-error text-on-error flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">report_problem</span>
              </div>
              <div className="flex flex-col">
                <h3 className="font-headline-sm text-headline-sm font-semibold">Alerta de Deudas Vencidas</h3>
                <span className="font-label-xs text-label-xs opacity-90">Prioridad 1 para gestión de cobranza</span>
              </div>
            </div>
            <span className="bg-error text-on-error font-label-xs text-label-xs font-bold px-space-sm py-1 rounded-full">
              Total Mora: S/ 6,840.00
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-body-sm text-body-sm">
              <thead className="bg-surface-container-lowest text-on-surface-variant font-label-xs text-label-xs uppercase tracking-wider border-b border-[#e2e8f0]">
                <tr>
                  <th className="py-space-sm px-space-md">Cliente • Contacto</th>
                  <th className="py-space-sm px-space-sm text-center">Atraso</th>
                  <th className="py-space-sm px-space-sm text-right">Capital</th>
                  <th className="py-space-sm px-space-sm text-right">Int. Mora</th>
                  <th className="py-space-sm px-space-sm text-right">Total</th>
                  <th className="py-space-sm px-space-md text-right">Gestión Rápida</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e2e8f0]/40">
                {/* Row 1 */}
                <tr className="hover:bg-error-container/30 transition-colors">
                  <td className="py-space-sm px-space-md">
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md text-on-surface font-semibold">Ferretería Los Andes</span>
                      <span className="font-label-xs text-label-xs text-on-surface-variant">RUC 20491823901</span>
                    </div>
                  </td>
                  <td className="py-space-sm px-space-sm text-center">
                    <span className="bg-error text-on-error px-2 py-0.5 rounded-full font-label-xs text-label-xs font-bold whitespace-nowrap">
                      24 días
                    </span>
                  </td>
                  <td className="py-space-sm px-space-sm text-right font-tabular-numeric-md font-medium text-on-surface">
                    S/ 2,450.00
                  </td>
                  <td className="py-space-sm px-space-sm text-right font-tabular-numeric-md text-on-surface-variant">
                    S/ 0.00
                  </td>
                  <td className="py-space-sm px-space-sm text-right font-tabular-numeric-md font-bold text-error">
                    S/ 2,450.00
                  </td>
                  <td className="py-space-sm px-space-md text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        className="p-1 rounded bg-surface-container text-tertiary-container hover:bg-tertiary-container hover:text-on-tertiary transition-colors"
                        onClick={() => showToast('Recordatorio WhatsApp enviado a Ferretería Los Andes por S/ 2,450.00 (24 días mora)')}
                        title="Enviar Recordatorio WhatsApp"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[16px]">chat</span>
                      </button>
                      <button
                        className="bg-error hover:bg-on-error-container text-on-error px-space-xs py-1 rounded font-label-xs text-label-xs font-semibold transition-colors cursor-pointer"
                        onClick={() => handleCobrarClick('Ferretería Los Andes', 'RUC 20491823901', 'Deuda Vencida', '2450.00')}
                        type="button"
                      >
                        Liquidar
                      </button>
                    </div>
                  </td>
                </tr>

                {/* Row 2 */}
                <tr className="hover:bg-error-container/30 transition-colors">
                  <td className="py-space-sm px-space-md">
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md text-on-surface font-semibold">Jorge Luis Paredes</span>
                      <span className="font-label-xs text-label-xs text-on-surface-variant">DNI 10293847</span>
                    </div>
                  </td>
                  <td className="py-space-sm px-space-sm text-center">
                    <span className="bg-error text-on-error px-2 py-0.5 rounded-full font-label-xs text-label-xs font-bold whitespace-nowrap">
                      14 días
                    </span>
                  </td>
                  <td className="py-space-sm px-space-sm text-right font-tabular-numeric-md font-medium text-on-surface">
                    S/ 1,890.00
                  </td>
                  <td className="py-space-sm px-space-sm text-right font-tabular-numeric-md text-on-surface-variant">
                    S/ 0.00
                  </td>
                  <td className="py-space-sm px-space-sm text-right font-tabular-numeric-md font-bold text-error">
                    S/ 1,890.00
                  </td>
                  <td className="py-space-sm px-space-md text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        className="p-1 rounded bg-surface-container text-tertiary-container hover:bg-tertiary-container hover:text-on-tertiary transition-colors"
                        onClick={() => showToast('Recordatorio WhatsApp enviado a Jorge Luis Paredes por S/ 1,890.00 (14 días mora)')}
                        title="Enviar Recordatorio WhatsApp"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[16px]">chat</span>
                      </button>
                      <button
                        className="bg-error hover:bg-on-error-container text-on-error px-space-xs py-1 rounded font-label-xs text-label-xs font-semibold transition-colors cursor-pointer"
                        onClick={() => handleCobrarClick('Jorge Luis Paredes', 'DNI 10293847', 'Deuda Vencida', '1890.00')}
                        type="button"
                      >
                        Liquidar
                      </button>
                    </div>
                  </td>
                </tr>

                {/* Row 3 */}
                <tr className="hover:bg-error-container/30 transition-colors">
                  <td className="py-space-sm px-space-md">
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md text-on-surface font-semibold">Comercial Huascarán E.I.R.L.</span>
                      <span className="font-label-xs text-label-xs text-on-surface-variant">RUC 20119284719</span>
                    </div>
                  </td>
                  <td className="py-space-sm px-space-sm text-center">
                    <span className="bg-error text-on-error px-2 py-0.5 rounded-full font-label-xs text-label-xs font-bold whitespace-nowrap">
                      8 días
                    </span>
                  </td>
                  <td className="py-space-sm px-space-sm text-right font-tabular-numeric-md font-medium text-on-surface">
                    S/ 2,500.00
                  </td>
                  <td className="py-space-sm px-space-sm text-right font-tabular-numeric-md text-on-surface-variant">
                    S/ 0.00
                  </td>
                  <td className="py-space-sm px-space-sm text-right font-tabular-numeric-md font-bold text-error">
                    S/ 2,500.00
                  </td>
                  <td className="py-space-sm px-space-md text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        className="p-1 rounded bg-surface-container text-tertiary-container hover:bg-tertiary-container hover:text-on-tertiary transition-colors"
                        onClick={() => showToast('Recordatorio WhatsApp enviado a Comercial Huascarán por S/ 2,500.00 (8 días mora)')}
                        title="Enviar Recordatorio WhatsApp"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[16px]">chat</span>
                      </button>
                      <button
                        className="bg-error hover:bg-on-error-container text-on-error px-space-xs py-1 rounded font-label-xs text-label-xs font-semibold transition-colors cursor-pointer"
                        onClick={() => handleCobrarClick('Comercial Huascarán E.I.R.L.', 'RUC 20119284719', 'Deuda Vencida', '2500.00')}
                        type="button"
                      >
                        Liquidar
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-space-md bg-surface-container-lowest flex items-center justify-between text-on-surface-variant border-t border-[#e2e8f0]">
            <span className="font-label-xs text-label-xs flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-primary">info</span>
              Regla Bodega: Interés moratorio configurado a 0.00%
            </span>
            <button
              onClick={() => onNavigate('cuentas-por-cobrar', 'push')}
              className="font-label-md text-label-md text-error font-semibold hover:underline"
            >
              Gestionar carteras en mora →
            </button>
          </div>
        </div>
      </div>

      {/* Row 4: Operational Ledger Shortcuts */}
      {/* EXACT XPATH MATCH: //button[contains(., 'Registrar Cobranza Rápida')] → Pagos y Prelación Legal (push transition) */}
      <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-[#e2e8f0] flex flex-col md:flex-row items-center justify-between gap-space-base">
        <div className="flex items-center gap-space-md">
          <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary shrink-0">
            <span className="material-symbols-outlined text-[24px]">receipt_long</span>
          </div>
          <div className="flex flex-col">
            <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Prelación y Amortización de Pagos
            </h4>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Los abonos se aplican automáticamente: primero a la cuota más antigua según el método francés de cuota nivelada.
            </span>
          </div>
        </div>
        <div className="flex items-center gap-space-sm shrink-0">
          <button
            className="flex items-center gap-space-xs bg-tertiary-container hover:bg-tertiary text-on-tertiary px-space-md py-space-sm rounded-lg font-label-md text-label-md font-semibold transition-colors shadow-sm cursor-pointer"
            type="button"
            onClick={() => onNavigate('pagos', 'push')}
          >
            <span className="material-symbols-outlined text-[18px]">payments</span>
            <span>Registrar Cobranza Rápida</span>
          </button>
        </div>
      </div>

      {/* Quick Payment Modal in-place if triggered */}
      {selectedQuickClient && (
        <div className="fixed inset-0 bg-[#0b1c30]/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl max-w-md w-full shadow-2xl overflow-hidden flex flex-col border border-[#e2e8f0]">
            <div className="p-space-lg bg-surface-container-low flex items-center justify-between border-b border-[#e2e8f0]">
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-tertiary text-[24px]">payments</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  Registrar Cobranza Rápida
                </h3>
              </div>
              <button
                className="text-on-surface-variant hover:text-on-surface p-1 rounded-lg"
                onClick={() => setSelectedQuickClient(null)}
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form
              className="p-space-lg flex flex-col gap-space-base"
              onSubmit={(e) => {
                e.preventDefault();
                showToast(`Pago de S/ ${selectedQuickClient.amount} liquidado para ${selectedQuickClient.name}`);
                setSelectedQuickClient(null);
              }}
            >
              <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col gap-space-2xs border border-[#e2e8f0]/60">
                <span className="font-label-xs text-label-xs text-on-surface-variant uppercase">Deudor / Entidad</span>
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  {selectedQuickClient.name}
                </span>
                <div className="flex justify-between items-center text-label-xs font-label-xs text-on-surface-variant pt-1">
                  <span>{selectedQuickClient.doc}</span>
                  <span className="bg-surface-container px-2 py-0.5 rounded font-semibold text-primary">
                    {selectedQuickClient.quota}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label-xs text-label-xs text-on-surface-variant uppercase font-semibold">
                  Monto Recibido
                </label>
                <div className="flex items-center bg-surface-container-low rounded-lg overflow-hidden border border-[#e2e8f0]">
                  <span className="px-space-md py-space-sm bg-surface-container-high text-on-surface font-semibold text-body-sm">
                    S/
                  </span>
                  <input
                    className="w-full bg-transparent px-space-sm py-space-sm font-headline-lg text-headline-lg text-on-surface font-bold focus:outline-none"
                    defaultValue={selectedQuickClient.amount}
                    required
                    step="0.10"
                    type="number"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label-xs text-label-xs text-on-surface-variant uppercase font-semibold">
                  Método de Cobro
                </label>
                <div className="grid grid-cols-3 gap-space-xs">
                  <label className="flex flex-col items-center justify-center p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors text-center border border-[#e2e8f0]">
                    <input defaultChecked className="hidden" name="payment_channel" type="radio" value="efectivo" />
                    <span className="material-symbols-outlined text-[20px] text-primary">payments</span>
                    <span className="font-label-xs text-label-xs font-semibold mt-1">Efectivo</span>
                  </label>
                  <label className="flex flex-col items-center justify-center p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors text-center border border-[#e2e8f0]">
                    <input className="hidden" name="payment_channel" type="radio" value="yape" />
                    <span className="material-symbols-outlined text-[20px] text-secondary">phone_android</span>
                    <span className="font-label-xs text-label-xs font-semibold mt-1">Yape/Plin</span>
                  </label>
                  <label className="flex flex-col items-center justify-center p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors text-center border border-[#e2e8f0]">
                    <input className="hidden" name="payment_channel" type="radio" value="transferencia" />
                    <span className="material-symbols-outlined text-[20px] text-tertiary">account_balance</span>
                    <span className="font-label-xs text-label-xs font-semibold mt-1">Bancario</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center gap-space-sm pt-space-xs">
                <button
                  className="w-1/2 py-space-sm bg-surface-container hover:bg-surface-container-high text-on-surface rounded-lg font-label-md text-label-md transition-colors"
                  onClick={() => setSelectedQuickClient(null)}
                  type="button"
                >
                  Cancelar
                </button>
                <button
                  className="w-1/2 py-space-sm bg-primary-container hover:bg-primary text-on-primary rounded-lg font-label-md text-label-md font-semibold transition-colors shadow-md"
                  type="submit"
                >
                  Emitir Recibo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
