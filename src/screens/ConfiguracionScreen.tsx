import React, { useState } from 'react';
import { ScreenId, TransitionType, StoreConfig } from '../types';
import { INITIAL_CONFIG } from '../data/mockData';

interface ConfiguracionScreenProps {
  onNavigate: (screen: ScreenId, transition?: TransitionType) => void;
  config?: StoreConfig;
  onUpdateConfig?: (cfg: StoreConfig) => void;
}

export const ConfiguracionScreen: React.FC<ConfiguracionScreenProps> = ({
  onNavigate,
  config = INITIAL_CONFIG,
  onUpdateConfig,
}) => {
  const [storeName, setStoreName] = useState(config.storeName);
  const [ruc, setRuc] = useState(config.ruc);
  const [ownerName, setOwnerName] = useState(config.ownerName);
  const [address, setAddress] = useState(config.address);
  const [phone, setPhone] = useState(config.phone);
  const [email, setEmail] = useState(config.email);
  const [defaultCompensatoryRate, setDefaultCompensatoryRate] = useState(config.defaultCompensatoryRate);
  const [defaultMoratoryRate, setDefaultMoratoryRate] = useState(config.defaultMoratoryRate);
  const [defaultTermsDays, setDefaultTermsDays] = useState(config.defaultTermsDays);
  const [maxCreditPerClient, setMaxCreditPerClient] = useState(config.maxCreditPerClient);
  const [globalCreditLimit, setGlobalCreditLimit] = useState(config.globalCreditLimit);
  const [receiptSeries, setReceiptSeries] = useState(config.receiptSeries);
  const [autoSendWhatsApp, setAutoSendWhatsApp] = useState(config.autoSendWhatsApp);

  const [notification, setNotification] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: StoreConfig = {
      storeName,
      ruc,
      ownerName,
      address,
      phone,
      email,
      defaultCompensatoryRate,
      defaultMoratoryRate,
      defaultTermsDays,
      maxCreditPerClient,
      globalCreditLimit,
      receiptSeries,
      autoSendWhatsApp,
      activeCommercialRule: true,
    };
    if (onUpdateConfig) {
      onUpdateConfig(updated);
    }
    setNotification('Configuración del establecimiento guardada con éxito.');
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
              Ajustes de Negocio
            </span>
            <span className="text-on-surface-variant">•</span>
            <span className="font-label-xs text-label-xs text-on-surface-variant font-medium">
              Datos Comerciales & Parámetros Financieros
            </span>
          </div>
          <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight font-bold">
            Configuración del Establecimiento
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Administra los datos fiscales de tu comercio, políticas de otorgamiento de crédito, topes de endeudamiento y numeración de recibos.
          </p>
        </div>

        {/* Global Toolbar */}
        <div className="flex items-center gap-space-sm shrink-0">
          <button
            className="flex items-center gap-space-xs bg-primary-container hover:bg-primary text-on-primary px-space-md py-space-sm rounded-lg font-label-md text-label-md font-semibold transition-colors shadow-sm cursor-pointer"
            type="button"
            onClick={handleSave}
          >
            <span className="material-symbols-outlined text-[18px]">save</span>
            <span>Guardar Configuración</span>
          </button>
        </div>
      </div>

      <form className="flex flex-col gap-space-xl" onSubmit={handleSave}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
          {/* Left Column: Identidad del Comercio (6 cols) */}
          <div className="lg:col-span-6 bg-surface-container-lowest rounded-xl p-space-xl shadow-sm border border-[#e2e8f0] flex flex-col gap-space-base">
            <div className="flex items-center gap-space-sm pb-space-sm border-b border-[#e2e8f0]">
              <span className="material-symbols-outlined text-primary text-[22px]">storefront</span>
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                Datos Fiscales y Comerciales
              </h2>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-label-xs text-label-xs text-on-surface-variant uppercase font-semibold">
                Nombre Comercial del Comercio *
              </label>
              <input
                className="bg-surface-container-low px-space-md py-space-sm rounded-lg text-body-sm font-semibold text-on-surface border border-[#e2e8f0] focus:outline-none focus:ring-1 focus:ring-primary"
                required
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-space-sm">
              <div className="flex flex-col gap-1">
                <label className="font-label-xs text-label-xs text-on-surface-variant uppercase font-semibold">
                  RUC del Establecimiento *
                </label>
                <input
                  className="bg-surface-container-low px-space-md py-space-sm rounded-lg text-body-sm font-mono text-on-surface border border-[#e2e8f0] focus:outline-none"
                  required
                  type="text"
                  value={ruc}
                  onChange={(e) => setRuc(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label-xs text-label-xs text-on-surface-variant uppercase font-semibold">
                  Administrador / Titular
                </label>
                <input
                  className="bg-surface-container-low px-space-md py-space-sm rounded-lg text-body-sm text-on-surface border border-[#e2e8f0] focus:outline-none"
                  type="text"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-label-xs text-label-xs text-on-surface-variant uppercase font-semibold">
                Dirección Física
              </label>
              <input
                className="bg-surface-container-low px-space-md py-space-sm rounded-lg text-body-sm text-on-surface border border-[#e2e8f0] focus:outline-none"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-space-sm">
              <div className="flex flex-col gap-1">
                <label className="font-label-xs text-label-xs text-on-surface-variant uppercase font-semibold">
                  Teléfono / WhatsApp de Cobranza
                </label>
                <input
                  className="bg-surface-container-low px-space-md py-space-sm rounded-lg text-body-sm text-on-surface border border-[#e2e8f0] focus:outline-none"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label-xs text-label-xs text-on-surface-variant uppercase font-semibold">
                  Serie de Recibos de Caja
                </label>
                <input
                  className="bg-surface-container-low px-space-md py-space-sm rounded-lg text-body-sm font-mono text-on-surface border border-[#e2e8f0] focus:outline-none"
                  type="text"
                  value={receiptSeries}
                  onChange={(e) => setReceiptSeries(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Parámetros Financieros (6 cols) */}
          <div className="lg:col-span-6 bg-surface-container-lowest rounded-xl p-space-xl shadow-sm border border-[#e2e8f0] flex flex-col gap-space-base">
            <div className="flex items-center gap-space-sm pb-space-sm border-b border-[#e2e8f0]">
              <span className="material-symbols-outlined text-primary text-[22px]">tune</span>
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                Políticas Comerciales de Crédito
              </h2>
            </div>

            {/* Default Rates */}
            <div className="grid grid-cols-2 gap-space-sm">
              <div className="flex flex-col gap-1">
                <label className="font-label-xs text-label-xs text-on-surface-variant uppercase font-semibold">
                  Tasa Compensatoria Base (%)
                </label>
                <input
                  className="bg-surface-container-low px-space-md py-space-sm rounded-lg text-body-sm font-bold text-on-surface border border-[#e2e8f0] focus:outline-none"
                  max={50}
                  min={0}
                  step={0.1}
                  type="number"
                  value={defaultCompensatoryRate}
                  onChange={(e) => setDefaultCompensatoryRate(parseFloat(e.target.value) || 0)}
                />
                <span className="font-label-xs text-label-xs text-tertiary">0.00% = Crédito Bodega Estándar</span>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label-xs text-label-xs text-on-surface-variant uppercase font-semibold">
                  Tasa Moratoria Diaria (%)
                </label>
                <input
                  className="bg-surface-container-low px-space-md py-space-sm rounded-lg text-body-sm font-bold text-on-surface border border-[#e2e8f0] focus:outline-none"
                  max={10}
                  min={0}
                  step={0.1}
                  type="number"
                  value={defaultMoratoryRate}
                  onChange={(e) => setDefaultMoratoryRate(parseFloat(e.target.value) || 0)}
                />
                <span className="font-label-xs text-label-xs text-on-surface-variant">Gastos adicionales por día de retraso</span>
              </div>
            </div>

            {/* Limits */}
            <div className="grid grid-cols-2 gap-space-sm">
              <div className="flex flex-col gap-1">
                <label className="font-label-xs text-label-xs text-on-surface-variant uppercase font-semibold">
                  Límite por Cliente (S/)
                </label>
                <input
                  className="bg-surface-container-low px-space-md py-space-sm rounded-lg text-body-sm font-bold text-on-surface border border-[#e2e8f0] focus:outline-none"
                  min={500}
                  step={500}
                  type="number"
                  value={maxCreditPerClient}
                  onChange={(e) => setMaxCreditPerClient(parseFloat(e.target.value) || 0)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label-xs text-label-xs text-on-surface-variant uppercase font-semibold">
                  Límite Global de Cartera (S/)
                </label>
                <input
                  className="bg-surface-container-low px-space-md py-space-sm rounded-lg text-body-sm font-bold text-primary border border-[#e2e8f0] focus:outline-none"
                  min={5000}
                  step={1000}
                  type="number"
                  value={globalCreditLimit}
                  onChange={(e) => setGlobalCreditLimit(parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>

            {/* Notification Checkbox */}
            <div className="bg-surface-container-low p-space-md rounded-xl flex items-center justify-between border border-[#e2e8f0]">
              <div className="flex flex-col">
                <span className="font-label-md text-label-md font-semibold text-on-surface">
                  Notificaciones WhatsApp de Cobranza
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Enviar recordatorio de cuota 2 días antes del vencimiento.
                </span>
              </div>
              <input
                checked={autoSendWhatsApp}
                className="w-5 h-5 accent-primary cursor-pointer"
                type="checkbox"
                onChange={(e) => setAutoSendWhatsApp(e.target.checked)}
              />
            </div>

            {/* Save Button */}
            <button
              className="py-space-md bg-primary-container hover:bg-primary text-on-primary rounded-xl font-label-md text-label-md font-bold transition-all shadow-md mt-space-sm flex items-center justify-center gap-2 cursor-pointer"
              type="submit"
            >
              <span className="material-symbols-outlined text-[20px]">save</span>
              <span>Guardar Cambios</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
