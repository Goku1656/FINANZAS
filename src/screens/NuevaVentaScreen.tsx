import React, { useState, useMemo } from 'react';
import { ScreenId, TransitionType, Client } from '../types';
import { INITIAL_CLIENTS, calculateFrenchSchedule } from '../data/mockData';

interface NuevaVentaScreenProps {
  onNavigate: (screen: ScreenId, transition?: TransitionType) => void;
  preselectedClient?: Client | null;
}

export const NuevaVentaScreen: React.FC<NuevaVentaScreenProps> = ({
  onNavigate,
  preselectedClient,
}) => {
  const [selectedClientId, setSelectedClientId] = useState<string>(
    preselectedClient ? preselectedClient.id : INITIAL_CLIENTS[0].id
  );
  const [saleAmount, setSaleAmount] = useState<number>(1200);
  const [initialPayment, setInitialPayment] = useState<number>(0);
  const [installmentsCount, setInstallmentsCount] = useState<number>(4);
  const [frequency, setFrequency] = useState<'Mensual' | 'Quincenal' | 'Semanal'>('Mensual');
  const [monthlyInterestRate, setMonthlyInterestRate] = useState<number>(0.0); // Bodega standard 0%
  const [notes, setNotes] = useState<string>('Venta de abarrotes al por mayor (Arroz, Azúcar, Aceite)');

  const selectedClient = INITIAL_CLIENTS.find((c) => c.id === selectedClientId) || INITIAL_CLIENTS[0];

  // Net principal financed
  const netPrincipal = Math.max(0, saleAmount - initialPayment);

  // Calculate live French schedule
  const generatedSchedule = useMemo(() => {
    return calculateFrenchSchedule(netPrincipal, monthlyInterestRate, installmentsCount, frequency);
  }, [netPrincipal, monthlyInterestRate, installmentsCount, frequency]);

  const quotaAmount = generatedSchedule.length > 0 ? generatedSchedule[0].installmentAmount : 0;
  const totalInterest = generatedSchedule.reduce((sum, item) => sum + item.interest, 0);
  const totalFinancedCost = netPrincipal + totalInterest;

  const handleConfirmSale = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate with push to Cuentas por Cobrar y Cronograma Francés
    onNavigate('cuentas-por-cobrar', 'push');
  };

  const handleCancel = () => {
    // Navigate with push_back to Inicio - Dashboard Glori
    onNavigate('inicio', 'push_back');
  };

  return (
    <div className="flex flex-col w-full gap-space-xl pb-16">
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-base">
        <div className="flex flex-col gap-space-2xs">
          <div className="flex items-center gap-space-xs">
            <span className="font-label-xs text-label-xs text-primary font-bold uppercase tracking-widest">
              Originación de Crédito
            </span>
            <span className="text-on-surface-variant">•</span>
            <span className="font-label-xs text-label-xs text-on-surface-variant font-medium">
              Amortización Francesa Simplificada
            </span>
          </div>
          <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight font-bold">
            Nueva Venta al Crédito
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Registra una venta diferida, establece cuotas niveladas y genera el cronograma de amortización comercial.
          </p>
        </div>

        {/* Global Toolbar Buttons: EXACT MATCH for //button[contains(., 'Cancelar')] */}
        <div className="flex items-center gap-space-sm shrink-0">
          <button
            className="flex items-center gap-space-xs bg-surface-container hover:bg-surface-container-high text-on-surface px-space-md py-space-sm rounded-lg font-label-md text-label-md font-semibold transition-colors border border-[#e2e8f0] cursor-pointer"
            type="button"
            onClick={handleCancel}
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
            <span>Cancelar</span>
          </button>
        </div>
      </div>

      <form className="flex flex-col gap-space-xl" onSubmit={handleConfirmSale}>
        {/* Main Grid: Inputs (Left 5 cols) & Live Schedule Preview (Right 7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
          {/* Left Column: Form Controls (5 cols) */}
          <div className="lg:col-span-5 bg-surface-container-lowest rounded-xl p-space-xl shadow-sm border border-[#e2e8f0] flex flex-col gap-space-lg">
            <div className="flex items-center gap-space-sm pb-space-sm border-b border-[#e2e8f0]">
              <span className="material-symbols-outlined text-primary text-[22px]">add_card</span>
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                Datos de la Venta y Condiciones
              </h2>
            </div>

            {/* Client Picker */}
            <div className="flex flex-col gap-1">
              <label className="font-label-xs text-label-xs text-on-surface-variant uppercase font-semibold">
                Cliente Autorizado
              </label>
              <select
                className="bg-surface-container-low px-space-md py-space-sm rounded-lg text-body-sm text-on-surface border border-[#e2e8f0] focus:outline-none focus:ring-1 focus:ring-primary"
                value={selectedClientId}
                onChange={(e) => setSelectedClientId(e.target.value)}
              >
                {INITIAL_CLIENTS.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.documentType} {c.documentNumber}) - Límite: S/ {c.creditLimit.toFixed(2)}
                  </option>
                ))}
              </select>

              {/* Client Credit Balance Snippet */}
              <div className="bg-surface-container-low p-space-sm rounded-lg flex justify-between items-center text-label-xs font-label-xs mt-1 border border-[#e2e8f0]/60">
                <span className="text-on-surface-variant">Línea disponible:</span>
                <span className="font-bold text-tertiary">
                  S/ {(selectedClient.creditLimit - selectedClient.creditUsed).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Sale Total & Initial Payment */}
            <div className="grid grid-cols-2 gap-space-sm">
              <div className="flex flex-col gap-1">
                <label className="font-label-xs text-label-xs text-on-surface-variant uppercase font-semibold">
                  Monto Total Venta (S/)
                </label>
                <div className="flex items-center bg-surface-container-low rounded-lg overflow-hidden border border-[#e2e8f0]">
                  <span className="px-space-sm py-space-sm bg-surface-container-high text-on-surface font-bold text-body-sm">
                    S/
                  </span>
                  <input
                    className="w-full bg-transparent px-space-sm py-space-sm font-headline-sm text-headline-sm font-bold text-on-surface focus:outline-none"
                    min={10}
                    step="0.10"
                    type="number"
                    value={saleAmount}
                    onChange={(e) => setSaleAmount(parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label-xs text-label-xs text-on-surface-variant uppercase font-semibold">
                  Inicial / Anticipo (S/)
                </label>
                <div className="flex items-center bg-surface-container-low rounded-lg overflow-hidden border border-[#e2e8f0]">
                  <span className="px-space-sm py-space-sm bg-surface-container-high text-on-surface font-bold text-body-sm">
                    S/
                  </span>
                  <input
                    className="w-full bg-transparent px-space-sm py-space-sm font-headline-sm text-headline-sm font-bold text-on-surface focus:outline-none"
                    max={saleAmount}
                    min={0}
                    step="0.10"
                    type="number"
                    value={initialPayment}
                    onChange={(e) => setInitialPayment(parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>
            </div>

            {/* Installments and Frequency */}
            <div className="grid grid-cols-2 gap-space-sm">
              <div className="flex flex-col gap-1">
                <label className="font-label-xs text-label-xs text-on-surface-variant uppercase font-semibold">
                  N° de Cuotas
                </label>
                <select
                  className="bg-surface-container-low px-space-md py-space-sm rounded-lg text-body-sm font-bold text-on-surface border border-[#e2e8f0] focus:outline-none"
                  value={installmentsCount}
                  onChange={(e) => setInstallmentsCount(parseInt(e.target.value, 10))}
                >
                  <option value={2}>2 Cuotas</option>
                  <option value={3}>3 Cuotas</option>
                  <option value={4}>4 Cuotas</option>
                  <option value={6}>6 Cuotas</option>
                  <option value={8}>8 Cuotas</option>
                  <option value={12}>12 Cuotas</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label-xs text-label-xs text-on-surface-variant uppercase font-semibold">
                  Frecuencia de Pago
                </label>
                <select
                  className="bg-surface-container-low px-space-md py-space-sm rounded-lg text-body-sm font-bold text-on-surface border border-[#e2e8f0] focus:outline-none"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value as 'Mensual' | 'Quincenal' | 'Semanal')}
                >
                  <option value="Semanal">Semanal (7 días)</option>
                  <option value="Quincenal">Quincenal (15 días)</option>
                  <option value="Mensual">Mensual (30 días)</option>
                </select>
              </div>
            </div>

            {/* Commercial Interest Rule */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <label className="font-label-xs text-label-xs text-on-surface-variant uppercase font-semibold">
                  Tasa Periódica de Interés (%)
                </label>
                <span className="font-label-xs text-label-xs text-tertiary font-bold">
                  {monthlyInterestRate === 0 ? 'Sin Interés (0.00% Bodega)' : `${monthlyInterestRate}%`}
                </span>
              </div>
              <div className="flex items-center gap-space-sm">
                <input
                  className="w-full accent-primary cursor-pointer"
                  max={5}
                  min={0}
                  step={0.5}
                  type="range"
                  value={monthlyInterestRate}
                  onChange={(e) => setMonthlyInterestRate(parseFloat(e.target.value))}
                />
                <span className="font-mono text-body-sm font-bold text-on-surface w-14 text-right">
                  {monthlyInterestRate.toFixed(1)}%
                </span>
              </div>
              <span className="font-label-xs text-label-xs text-on-surface-variant">
                Regla comercial activa: financiamiento sin recargo para clientes habituales de la bodega.
              </span>
            </div>

            {/* Notes */}
            <div className="flex flex-col gap-1">
              <label className="font-label-xs text-label-xs text-on-surface-variant uppercase font-semibold">
                Detalle / Glosa de Mercadería
              </label>
              <textarea
                className="bg-surface-container-low px-space-md py-space-sm rounded-lg text-body-sm text-on-surface border border-[#e2e8f0] focus:outline-none"
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>

          {/* Right Column: Live French Schedule Simulation (7 cols) */}
          <div className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-space-xl shadow-sm border border-[#e2e8f0] flex flex-col justify-between">
            <div className="flex flex-col gap-space-xs pb-space-sm border-b border-[#e2e8f0]">
              <div className="flex items-center justify-between">
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  Simulación de Cronograma Francés
                </h2>
                <span className="bg-primary-container text-on-primary font-label-xs text-label-xs px-2.5 py-0.5 rounded-full font-bold">
                  Cuota Nivelada: S/ {quotaAmount.toFixed(2)}
                </span>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Cálculo instantáneo según la fórmula R = P × [i(1+i)ⁿ] / [(1+i)ⁿ - 1]
              </span>
            </div>

            {/* Summary Metrics Bar */}
            <div className="grid grid-cols-3 gap-space-sm my-space-md">
              <div className="bg-surface-container-low p-space-sm rounded-xl flex flex-col border border-[#e2e8f0]">
                <span className="font-label-xs text-label-xs text-on-surface-variant uppercase">Capital Neto</span>
                <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                  S/ {netPrincipal.toFixed(2)}
                </span>
              </div>
              <div className="bg-surface-container-low p-space-sm rounded-xl flex flex-col border border-[#e2e8f0]">
                <span className="font-label-xs text-label-xs text-on-surface-variant uppercase">Total Intereses</span>
                <span className="font-headline-sm text-headline-sm font-bold text-secondary">
                  S/ {totalInterest.toFixed(2)}
                </span>
              </div>
              <div className="bg-surface-container-low p-space-sm rounded-xl flex flex-col border border-[#e2e8f0]">
                <span className="font-label-xs text-label-xs text-on-surface-variant uppercase">Total a Pagar</span>
                <span className="font-headline-sm text-headline-sm font-bold text-primary">
                  S/ {totalFinancedCost.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Table of Simulated Installments */}
            <div className="overflow-x-auto rounded-xl border border-[#e2e8f0] flex-1">
              <table className="w-full text-left font-body-sm text-body-sm">
                <thead className="bg-surface-container text-on-surface font-label-xs text-label-xs uppercase tracking-wider border-b border-[#e2e8f0]">
                  <tr>
                    <th className="py-space-sm px-space-sm text-center">N°</th>
                    <th className="py-space-sm px-space-sm">Vencimiento</th>
                    <th className="py-space-sm px-space-sm text-right">Saldo Inicial</th>
                    <th className="py-space-sm px-space-sm text-right">Interés</th>
                    <th className="py-space-sm px-space-sm text-right">Amortización</th>
                    <th className="py-space-sm px-space-sm text-right font-bold text-primary">Cuota (R)</th>
                    <th className="py-space-sm px-space-sm text-right">Saldo Final</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e2e8f0]/40">
                  {generatedSchedule.map((inst) => (
                    <tr key={inst.number} className="hover:bg-surface-container-low transition-colors">
                      <td className="py-space-sm px-space-sm text-center font-bold">
                        <span className="bg-surface-container px-2 py-0.5 rounded font-mono text-label-xs">
                          {inst.number}
                        </span>
                      </td>
                      <td className="py-space-sm px-space-sm font-medium text-on-surface">{inst.dueDate}</td>
                      <td className="py-space-sm px-space-sm text-right font-tabular-numeric-md text-on-surface-variant">
                        S/ {inst.initialBalance.toFixed(2)}
                      </td>
                      <td className="py-space-sm px-space-sm text-right font-tabular-numeric-md text-secondary">
                        S/ {inst.interest.toFixed(2)}
                      </td>
                      <td className="py-space-sm px-space-sm text-right font-tabular-numeric-md text-on-surface font-medium">
                        S/ {inst.amortization.toFixed(2)}
                      </td>
                      <td className="py-space-sm px-space-sm text-right font-tabular-numeric-md font-bold text-primary">
                        S/ {inst.installmentAmount.toFixed(2)}
                      </td>
                      <td className="py-space-sm px-space-sm text-right font-tabular-numeric-md text-on-surface-variant">
                        S/ {inst.finalBalance.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Confirmation Action: EXACT MATCH for //button[contains(., 'Confirmar y Generar Venta al Crédito')] */}
            <div className="pt-space-md mt-space-md border-t border-[#e2e8f0] flex flex-col sm:flex-row items-center justify-between gap-space-base">
              <div className="flex items-center gap-space-sm text-label-xs font-label-xs text-on-surface-variant">
                <span className="material-symbols-outlined text-primary text-[18px]">security</span>
                <span>Se emitirá nota de venta al crédito y cronograma francés de cobro.</span>
              </div>

              <button
                className="w-full sm:w-auto px-space-xl py-space-md bg-primary-container hover:bg-primary text-on-primary rounded-xl font-label-md text-label-md font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                type="submit"
              >
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
                <span>Confirmar y Generar Venta al Crédito</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
