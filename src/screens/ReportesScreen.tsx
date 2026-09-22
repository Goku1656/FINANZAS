import React, { useState } from 'react';
import { ScreenId, TransitionType } from '../types';

interface ReportesScreenProps {
  onNavigate: (screen: ScreenId, transition?: TransitionType) => void;
}

export const ReportesScreen: React.FC<ReportesScreenProps> = ({ onNavigate }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('mayo-2024');
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="flex flex-col w-full gap-space-xl pb-16">
      {/* Toast Alert */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0b1c30] text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-2">
          <span className="material-symbols-outlined text-[18px] text-tertiary-fixed">check_circle</span>
          <span className="text-body-sm font-medium">{notification}</span>
        </div>
      )}

      {/* Screen Title & Top Actions */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-base">
        <div className="flex flex-col gap-space-2xs">
          <div className="flex items-center gap-space-xs">
            <span className="font-label-xs text-label-xs text-primary font-bold uppercase tracking-widest">
              Business Intelligence & Auditoría
            </span>
            <span className="text-on-surface-variant">•</span>
            <span className="font-label-xs text-label-xs text-on-surface-variant font-medium">
              Indicadores de Riesgo y Liquidez
            </span>
          </div>
          <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight font-bold">
            Reportes y Analíticas de Cartera
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Métricas de rotación, índice de morosidad, flujo de caja proyectado por cobros de amortización y concentración crediticia.
          </p>
        </div>

        {/* Global Toolbar */}
        <div className="flex items-center gap-space-sm shrink-0 flex-wrap">
          <select
            className="bg-surface-container-low px-space-md py-space-sm rounded-lg text-body-sm font-semibold text-on-surface border border-[#e2e8f0] focus:outline-none"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option value="mayo-2024">Mayo 2024 (Mes Actual)</option>
            <option value="q2-2024">Segundo Trimestre (Q2)</option>
            <option value="anual-2024">Año Fiscal 2024</option>
          </select>

          <button
            className="flex items-center gap-space-xs bg-surface-container-lowest hover:bg-surface-container-low text-on-surface px-space-md py-space-sm rounded-lg font-label-md text-label-md transition-colors shadow-sm border border-[#e2e8f0]"
            type="button"
            onClick={() => showNotification('Descargando reporte contable en Excel (XLSX)')}
          >
            <span className="material-symbols-outlined text-[18px] text-tertiary">table_chart</span>
            <span>Descargar Excel</span>
          </button>
        </div>
      </div>

      {/* Row 1: KPI Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-base">
        <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-[#e2e8f0] flex flex-col justify-between">
          <div className="flex justify-between items-center text-on-surface-variant">
            <span className="font-label-xs text-label-xs uppercase font-semibold">Colocación Acumulada</span>
            <span className="material-symbols-outlined text-primary text-[20px]">payments</span>
          </div>
          <div className="mt-space-sm">
            <span className="font-headline-lg text-headline-lg font-bold text-on-surface tabular-nums">
              S/ 142,600.00
            </span>
            <div className="flex items-center gap-1 text-tertiary text-label-xs font-semibold mt-1">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              <span>+18.4% vs periodo anterior</span>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-[#e2e8f0] flex flex-col justify-between">
          <div className="flex justify-between items-center text-on-surface-variant">
            <span className="font-label-xs text-label-xs uppercase font-semibold">Tasa de Recupero (Efectividad)</span>
            <span className="material-symbols-outlined text-tertiary text-[20px]">verified</span>
          </div>
          <div className="mt-space-sm">
            <span className="font-headline-lg text-headline-lg font-bold text-tertiary tabular-nums">
              92.4%
            </span>
            <div className="flex items-center gap-1 text-on-surface-variant text-label-xs mt-1">
              <span>Meta bodega: &gt; 90.0%</span>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-[#e2e8f0] flex flex-col justify-between">
          <div className="flex justify-between items-center text-on-surface-variant">
            <span className="font-label-xs text-label-xs uppercase font-semibold">Índice PAR &gt; 30 (Mora Crítica)</span>
            <span className="material-symbols-outlined text-error text-[20px]">report</span>
          </div>
          <div className="mt-space-sm">
            <span className="font-headline-lg text-headline-lg font-bold text-error tabular-nums">
              3.5%
            </span>
            <div className="flex items-center gap-1 text-on-surface-variant text-label-xs mt-1">
              <span>S/ 1,500.00 en riesgo alto</span>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-[#e2e8f0] flex flex-col justify-between">
          <div className="flex justify-between items-center text-on-surface-variant">
            <span className="font-label-xs text-label-xs uppercase font-semibold">Días Calle Promedio (DSO)</span>
            <span className="material-symbols-outlined text-secondary text-[20px]">schedule</span>
          </div>
          <div className="mt-space-sm">
            <span className="font-headline-lg text-headline-lg font-bold text-on-surface tabular-nums">
              18.2 días
            </span>
            <div className="flex items-center gap-1 text-tertiary text-label-xs font-semibold mt-1">
              <span>Reducción de 2.4 días</span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Projected Cashflow & Risk Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
        {/* Left Column: Projected Cash Flow (7 cols) */}
        <div className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-space-xl shadow-sm border border-[#e2e8f0] flex flex-col justify-between">
          <div className="flex flex-col gap-space-xs pb-space-sm border-b border-[#e2e8f0]">
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Proyección de Flujo de Cobranza (Próximas 6 Semanas)
            </h2>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Ingresos de caja esperados por vencimiento de cuotas del cronograma francés.
            </span>
          </div>

          {/* SVG Cash Flow Bar Chart */}
          <div className="w-full h-64 pt-space-base pb-space-xs flex flex-col justify-between">
            <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 600 180">
              <line stroke="#e5eeff" strokeDasharray="3 3" x1="0" x2="600" y1="30" y2="30" />
              <line stroke="#e5eeff" strokeDasharray="3 3" x1="0" x2="600" y1="80" y2="80" />
              <line stroke="#e5eeff" strokeDasharray="3 3" x1="0" x2="600" y1="130" y2="130" />
              <line stroke="#dce9ff" strokeWidth="1.5" x1="0" x2="600" y1="160" y2="160" />

              {/* Bar 1 */}
              <rect fill="#2a45d8" height="90" rx="4" width="40" x="50" y="70" />
              {/* Bar 2 */}
              <rect fill="#2a45d8" height="120" rx="4" width="40" x="140" y="40" />
              {/* Bar 3 */}
              <rect fill="#2a45d8" height="75" rx="4" width="40" x="230" y="85" />
              {/* Bar 4 */}
              <rect fill="#2a45d8" height="105" rx="4" width="40" x="320" y="55" />
              {/* Bar 5 */}
              <rect fill="#2a45d8" height="85" rx="4" width="40" x="410" y="75" />
              {/* Bar 6 */}
              <rect fill="#2a45d8" height="60" rx="4" width="40" x="500" y="100" />
            </svg>

            <div className="grid grid-cols-6 text-center pt-space-xs text-label-xs font-label-xs">
              <div className="flex flex-col">
                <span className="font-semibold text-on-surface">Sem 1</span>
                <span className="text-on-surface-variant">S/ 8.4k</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-primary">Sem 2</span>
                <span className="text-on-surface-variant">S/ 12.1k</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-on-surface">Sem 3</span>
                <span className="text-on-surface-variant">S/ 7.2k</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-on-surface">Sem 4</span>
                <span className="text-on-surface-variant">S/ 9.8k</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-on-surface">Sem 5</span>
                <span className="text-on-surface-variant">S/ 8.1k</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-on-surface">Sem 6</span>
                <span className="text-on-surface-variant">S/ 5.6k</span>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-low p-space-sm rounded-xl flex items-center justify-between border border-[#e2e8f0] text-label-xs font-label-xs text-on-surface-variant">
            <span>Flujo proyectado total próximas 6 semanas: <strong className="text-on-surface">S/ 51,200.00</strong></span>
            <button
              onClick={() => onNavigate('cuentas-por-cobrar', 'push')}
              className="text-primary font-bold hover:underline"
            >
              Auditar cronogramas →
            </button>
          </div>
        </div>

        {/* Right Column: Risk & Demographics (5 cols) */}
        <div className="lg:col-span-5 bg-surface-container-lowest rounded-xl p-space-xl shadow-sm border border-[#e2e8f0] flex flex-col justify-between gap-space-md">
          <div className="flex flex-col gap-space-xs pb-space-sm border-b border-[#e2e8f0]">
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Segmentación de Cartera
            </h2>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Distribución por tipo de documento tributario
            </span>
          </div>

          {/* Segment 1: RUC Empresas */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-body-sm font-body-sm">
              <span className="font-semibold text-on-surface">Comercios & RUC (Minimarkets, Bodegas)</span>
              <span className="font-bold text-primary">62.5%</span>
            </div>
            <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full w-[62.5%]" />
            </div>
            <span className="text-label-xs font-label-xs text-on-surface-variant">
              S/ 26,675.00 en 18 cuentas corporativas
            </span>
          </div>

          {/* Segment 2: DNI Vecinos */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-body-sm font-body-sm">
              <span className="font-semibold text-on-surface">Vecinos & Clientes DNI (Consumo familiar)</span>
              <span className="font-bold text-secondary">37.5%</span>
            </div>
            <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
              <div className="h-full bg-secondary rounded-full w-[37.5%]" />
            </div>
            <span className="text-label-xs font-label-xs text-on-surface-variant">
              S/ 16,005.50 en 29 cuentas personales
            </span>
          </div>

          {/* Recommendation Box */}
          <div className="bg-primary-fixed/20 p-space-md rounded-xl border border-primary-fixed-dim flex flex-col gap-space-xs">
            <div className="flex items-center gap-2 text-primary font-bold text-label-md">
              <span className="material-symbols-outlined text-[18px]">lightbulb</span>
              <span>Recomendación Financiera Glori</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              El 84% de las cobranzas de mayo se realizaron a través de canales digitales (Yape / Transferencias BCP). Se recomienda continuar incentivando el pago por código QR para reducir la gestión presencial.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
