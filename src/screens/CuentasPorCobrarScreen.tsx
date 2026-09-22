import React, { useState } from 'react';
import { ScreenId, TransitionType, CreditAccount } from '../types';
import { INITIAL_ACCOUNTS, calculateFrenchSchedule } from '../data/mockData';

interface CuentasPorCobrarScreenProps {
  onNavigate: (screen: ScreenId, transition?: TransitionType) => void;
  onSelectAccountForPayment?: (account: CreditAccount) => void;
}

export const CuentasPorCobrarScreen: React.FC<CuentasPorCobrarScreenProps> = ({
  onNavigate,
  onSelectAccountForPayment,
}) => {
  const [filterTab, setFilterTab] = useState<'todos' | 'al-dia' | 'por-vencer' | 'vencido'>('todos');
  const [selectedAccount, setSelectedAccount] = useState<CreditAccount>(INITIAL_ACCOUNTS[0]);
  const [notification, setNotification] = useState<string | null>(null);

  // Filter accounts
  const filteredAccounts = INITIAL_ACCOUNTS.filter((acc) => {
    if (filterTab === 'todos') return true;
    return acc.status === filterTab;
  });

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleQuickPay = (acc: CreditAccount) => {
    if (onSelectAccountForPayment) {
      onSelectAccountForPayment(acc);
    }
    onNavigate('pagos', 'push');
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
              Finanzas & Cobranzas
            </span>
            <span className="text-on-surface-variant">•</span>
            <span className="font-label-xs text-label-xs text-on-surface-variant font-medium">
              Sistema Francés de Cuota Nivelada
            </span>
          </div>
          <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight font-bold">
            Cuentas por Cobrar y Cronograma Francés
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Seguimiento de saldos pendientes, amortización de capital, cálculo de cuotas constantes y cronogramas de pago.
          </p>
        </div>

        {/* Global Toolbar */}
        <div className="flex items-center gap-space-sm shrink-0 flex-wrap">
          {/* EXACT XPATH MATCH: //button[contains(., 'Registrar Cobro Rápido')] → Pagos y Prelación Legal (push transition) */}
          <button
            className="flex items-center gap-space-xs bg-tertiary-container hover:bg-tertiary text-on-tertiary px-space-md py-space-sm rounded-lg font-label-md text-label-md font-semibold transition-colors shadow-sm cursor-pointer"
            type="button"
            onClick={() => onNavigate('pagos', 'push')}
          >
            <span className="material-symbols-outlined text-[18px]">payments</span>
            <span>Registrar Cobro Rápido</span>
          </button>

          <button
            className="flex items-center gap-space-xs bg-surface-container-lowest hover:bg-surface-container-low text-on-surface px-space-md py-space-sm rounded-lg font-label-md text-label-md transition-colors shadow-sm border border-[#e2e8f0]"
            type="button"
            onClick={() => showNotification('Exportando cartera completa en formato PDF')}
          >
            <span className="material-symbols-outlined text-[18px] text-secondary">picture_as_pdf</span>
            <span>Exportar PDF</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-2 flex-wrap gap-2">
        <div className="flex items-center gap-space-xs">
          <button
            className={`px-space-md py-space-sm rounded-lg font-label-md text-label-md font-semibold transition-colors ${
              filterTab === 'todos'
                ? 'bg-primary-container text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
            }`}
            onClick={() => setFilterTab('todos')}
          >
            Todos ({INITIAL_ACCOUNTS.length})
          </button>
          <button
            className={`px-space-md py-space-sm rounded-lg font-label-md text-label-md font-semibold transition-colors ${
              filterTab === 'al-dia'
                ? 'bg-tertiary-container text-on-tertiary shadow-sm'
                : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
            }`}
            onClick={() => setFilterTab('al-dia')}
          >
            Al Día (2)
          </button>
          <button
            className={`px-space-md py-space-sm rounded-lg font-label-md text-label-md font-semibold transition-colors ${
              filterTab === 'por-vencer'
                ? 'bg-secondary text-on-secondary shadow-sm'
                : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
            }`}
            onClick={() => setFilterTab('por-vencer')}
          >
            Por Vencer (1)
          </button>
          <button
            className={`px-space-md py-space-sm rounded-lg font-label-md text-label-md font-semibold transition-colors ${
              filterTab === 'vencido'
                ? 'bg-error text-on-error shadow-sm'
                : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
            }`}
            onClick={() => setFilterTab('vencido')}
          >
            Vencidos (1)
          </button>
        </div>

        <div className="flex items-center gap-space-sm text-label-xs font-label-xs text-on-surface-variant">
          <span>Cartera Total en Vista:</span>
          <span className="font-tabular-numeric-md font-bold text-on-surface text-body-md">
            S/ {filteredAccounts.reduce((acc, c) => acc + c.totalOwed, 0).toLocaleString('es-PE', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {/* Master Accounts Portfolio Table */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-[#e2e8f0] overflow-hidden flex flex-col">
        <div className="p-space-md bg-surface-container-low flex items-center justify-between border-b border-[#e2e8f0]">
          <div className="flex items-center gap-space-sm">
            <span className="material-symbols-outlined text-primary text-[20px]">account_balance_wallet</span>
            <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Cartera de Documentos y Ventas al Crédito
            </span>
          </div>
          <span className="font-label-xs text-label-xs text-on-surface-variant">
            Haz clic en una fila para ver y auditar su cronograma francés detallado
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-body-sm text-body-sm">
            <thead className="bg-surface-container-lowest text-on-surface-variant font-label-xs text-label-xs uppercase tracking-wider border-b border-[#e2e8f0]">
              <tr>
                <th className="py-space-sm px-space-md">Doc • Factura</th>
                <th className="py-space-sm px-space-md">Cliente / Deudor</th>
                <th className="py-space-sm px-space-sm text-right">Capital Inicial</th>
                <th className="py-space-sm px-space-sm text-right">Saldo Capital</th>
                <th className="py-space-sm px-space-sm text-right">Int. Comp.</th>
                <th className="py-space-sm px-space-sm text-right">Int. Mora</th>
                <th className="py-space-sm px-space-sm text-right">Total Deuda</th>
                <th className="py-space-sm px-space-sm">Vence</th>
                <th className="py-space-sm px-space-sm text-center">Estado</th>
                <th className="py-space-sm px-space-md text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0]/40">
              {filteredAccounts.map((acc) => {
                const isSelected = selectedAccount.documentCode === acc.documentCode;
                return (
                  <tr
                    key={acc.documentCode}
                    className={`transition-colors cursor-pointer ${
                      isSelected ? 'bg-primary-fixed/30 font-medium' : 'hover:bg-surface-container-low'
                    }`}
                    onClick={() => setSelectedAccount(acc)}
                  >
                    <td className="py-space-md px-space-md">
                      <div className="flex items-center gap-2">
                        <span className="font-label-xs text-label-xs bg-surface-container px-2 py-0.5 rounded font-mono font-bold text-primary">
                          {acc.documentCode}
                        </span>
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-primary" title="Seleccionado" />
                        )}
                      </div>
                    </td>
                    <td className="py-space-md px-space-md">
                      <div className="flex flex-col">
                        <span className="font-label-md text-label-md text-on-surface font-semibold">
                          {acc.clientName}
                        </span>
                        <span className="font-label-xs text-label-xs text-on-surface-variant">
                          {acc.clientDoc}
                        </span>
                      </div>
                    </td>
                    <td className="py-space-md px-space-sm text-right font-tabular-numeric-md text-on-surface-variant">
                      S/ {acc.originalCapital.toFixed(2)}
                    </td>
                    <td className="py-space-md px-space-sm text-right font-tabular-numeric-md font-bold text-on-surface">
                      S/ {acc.pendingBalance.toFixed(2)}
                    </td>
                    <td className="py-space-md px-space-sm text-right font-tabular-numeric-md text-on-surface-variant">
                      S/ {acc.compensatoryInterest.toFixed(2)}
                    </td>
                    <td className="py-space-md px-space-sm text-right font-tabular-numeric-md text-error">
                      S/ {acc.moratoryInterest.toFixed(2)}
                    </td>
                    <td className="py-space-md px-space-sm text-right font-tabular-numeric-md font-bold text-primary text-body-md">
                      S/ {acc.totalOwed.toFixed(2)}
                    </td>
                    <td className="py-space-md px-space-sm font-label-xs text-label-xs text-on-surface">
                      {acc.dueDate}
                    </td>
                    <td className="py-space-md px-space-sm text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-label-xs text-label-xs font-semibold ${
                          acc.status === 'al-dia'
                            ? 'bg-tertiary-fixed text-on-tertiary-fixed-variant'
                            : acc.status === 'por-vencer'
                            ? 'bg-secondary-fixed text-on-secondary-fixed-variant'
                            : 'bg-error-container text-on-error-container'
                        }`}
                      >
                        {acc.statusLabel}
                      </span>
                    </td>
                    <td className="py-space-md px-space-md text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          className="bg-primary-container hover:bg-primary text-on-primary px- space-sm py-1 rounded font-label-xs text-label-xs font-semibold transition-colors shadow-xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuickPay(acc);
                          }}
                          type="button"
                        >
                          Cobrar
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Account French Amortization Detailed Section */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-[#e2e8f0] p-space-xl flex flex-col gap-space-lg">
        {/* Header of Amortization Card */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md pb-space-md border-b border-[#e2e8f0]">
          <div className="flex items-center gap-space-md">
            <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary flex items-center justify-center font-display-lg text-lg font-bold shadow-sm">
              {selectedAccount.clientInitials}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-space-xs">
                <span className="font-label-xs text-label-xs bg-surface-container px-2 py-0.5 rounded font-mono font-bold text-primary">
                  {selectedAccount.documentCode}
                </span>
                <span className="text-on-surface-variant">•</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  {selectedAccount.clientName}
                </h3>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                {selectedAccount.clientDoc} • Método de Amortización Francesa (Cuota Constante)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-space-sm flex-wrap">
            <div className="bg-surface-container-low px-space-md py-space-xs rounded-xl border border-[#e2e8f0] flex items-center gap-space-sm">
              <div className="flex flex-col">
                <span className="font-label-xs text-label-xs text-on-surface-variant uppercase">Tasa Mensual (TEM)</span>
                <span className="font-headline-sm text-headline-sm text-primary font-bold">{selectedAccount.tem}%</span>
              </div>
              <div className="h-6 w-px bg-[#e2e8f0]" />
              <div className="flex flex-col">
                <span className="font-label-xs text-label-xs text-on-surface-variant uppercase">Tasa Anual (TEA)</span>
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold">{selectedAccount.tea}%</span>
              </div>
            </div>

            <button
              className="flex items-center gap-1 bg-surface-container hover:bg-surface-container-high text-on-surface px-space-md py-space-sm rounded-lg font-label-md text-label-md transition-colors border border-[#e2e8f0]"
              onClick={() => showNotification(`Cronograma de ${selectedAccount.documentCode} enviado vía WhatsApp al cliente`)}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px] text-tertiary">send</span>
              <span>Enviar WhatsApp</span>
            </button>
          </div>
        </div>

        {/* Formula Explanatory Card */}
        <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col md:flex-row items-center justify-between gap-space-md border border-[#e2e8f0]">
          <div className="flex items-center gap-space-sm">
            <span className="material-symbols-outlined text-primary text-[24px]">functions</span>
            <div className="flex flex-col">
              <span className="font-label-md text-label-md text-on-surface font-semibold">
                Fórmula Francesa de Cuota Fija (R):
              </span>
              <span className="font-mono text-[13px] text-primary font-bold">
                R = P × [ i × (1 + i)ⁿ ] ÷ [ (1 + i)ⁿ - 1 ]
              </span>
            </div>
          </div>
          <div className="flex items-center gap-space-md text-label-xs font-label-xs text-on-surface-variant">
            <span><strong>P:</strong> Capital inicial (S/ {selectedAccount.originalCapital.toFixed(2)})</span>
            <span><strong>i:</strong> Tasa periódica ({selectedAccount.tem}%)</span>
            <span><strong>n:</strong> 6 cuotas mensuales</span>
          </div>
        </div>

        {/* Schedule Ledger Table */}
        <div className="overflow-x-auto rounded-xl border border-[#e2e8f0]">
          <table className="w-full text-left font-body-sm text-body-sm">
            <thead className="bg-surface-container text-on-surface font-label-xs text-label-xs uppercase tracking-wider border-b border-[#e2e8f0]">
              <tr>
                <th className="py-space-sm px-space-md text-center">N° Cuota</th>
                <th className="py-space-sm px-space-md">Fecha Venc.</th>
                <th className="py-space-sm px-space-md text-right">Saldo Inicial</th>
                <th className="py-space-sm px-space-md text-right">Interés (I)</th>
                <th className="py-space-sm px-space-md text-right">Amortización (A)</th>
                <th className="py-space-sm px-space-md text-right font-bold text-primary">Cuota Fija (R)</th>
                <th className="py-space-sm px-space-md text-right">Saldo Final</th>
                <th className="py-space-sm px-space-md text-center">Estado</th>
                <th className="py-space-sm px-space-md text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0]/40">
              {(selectedAccount.installments.length > 0
                ? selectedAccount.installments
                : calculateFrenchSchedule(selectedAccount.originalCapital, selectedAccount.tem, 6)
              ).map((inst) => (
                <tr
                  key={inst.number}
                  className={`transition-colors ${
                    inst.status === 'pagada'
                      ? 'bg-surface-container-low/40 text-on-surface-variant'
                      : inst.status === 'por-vencer'
                      ? 'bg-amber-50/50'
                      : 'hover:bg-surface-container-low'
                  }`}
                >
                  <td className="py-space-sm px-space-md text-center font-bold">
                    <span className="bg-surface-container px-2.5 py-0.5 rounded font-mono text-label-xs text-on-surface">
                      {inst.number.toString().padStart(2, '0')}/{inst.totalInstallments.toString().padStart(2, '0')}
                    </span>
                  </td>
                  <td className="py-space-sm px-space-md font-medium text-on-surface">{inst.dueDate}</td>
                  <td className="py-space-sm px-space-md text-right font-tabular-numeric-md text-on-surface-variant">
                    S/ {inst.initialBalance.toFixed(2)}
                  </td>
                  <td className="py-space-sm px-space-md text-right font-tabular-numeric-md text-secondary">
                    S/ {inst.interest.toFixed(2)}
                  </td>
                  <td className="py-space-sm px-space-md text-right font-tabular-numeric-md text-on-surface font-medium">
                    S/ {inst.amortization.toFixed(2)}
                  </td>
                  <td className="py-space-sm px-space-md text-right font-tabular-numeric-md font-bold text-primary text-body-md">
                    S/ {inst.installmentAmount.toFixed(2)}
                  </td>
                  <td className="py-space-sm px-space-md text-right font-tabular-numeric-md text-on-surface-variant">
                    S/ {inst.finalBalance.toFixed(2)}
                  </td>
                  <td className="py-space-sm px-space-md text-center">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-label-xs text-label-xs font-semibold ${
                        inst.status === 'pagada'
                          ? 'bg-tertiary-fixed text-on-tertiary-fixed-variant'
                          : inst.status === 'por-vencer'
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-surface-container text-on-surface-variant'
                      }`}
                    >
                      {inst.status === 'pagada' && <span className="material-symbols-outlined text-[12px]">check</span>}
                      {inst.status === 'pagada' ? 'Pagada' : inst.status === 'por-vencer' ? 'Por Vencer' : 'Pendiente'}
                    </span>
                  </td>
                  <td className="py-space-sm px-space-md text-right">
                    {inst.status !== 'pagada' ? (
                      <button
                        className="bg-primary-container hover:bg-primary text-on-primary px-space-sm py-1 rounded font-label-xs text-label-xs font-semibold transition-colors shadow-xs cursor-pointer"
                        onClick={() => {
                          showNotification(`Liquidando cuota ${inst.number} de ${selectedAccount.clientName}`);
                          onNavigate('pagos', 'push');
                        }}
                        type="button"
                      >
                        Cobrar Cuota
                      </button>
                    ) : (
                      <span className="font-label-xs text-label-xs text-tertiary font-semibold flex items-center justify-end gap-1">
                        <span className="material-symbols-outlined text-[14px]">receipt</span>
                        RC-00481
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Notes & Legal Priority Notice */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-label-xs font-label-xs text-on-surface-variant bg-surface-container-low p-space-md rounded-xl border border-[#e2e8f0] gap-space-sm">
          <div className="flex items-center gap-space-sm">
            <span className="material-symbols-outlined text-primary text-[18px]">gavel</span>
            <span>
              <strong>Prelación Legal Aplicable (Art. 1257 Código Civil):</strong> Todo abono amortiza prioritariamente gastos moratorios, luego interés compensatorio y el remanente reduce saldo de capital.
            </span>
          </div>
          <button
            className="text-primary font-bold hover:underline shrink-0"
            onClick={() => onNavigate('pagos', 'push')}
          >
            Ver Módulo de Prelación →
          </button>
        </div>
      </div>
    </div>
  );
};
