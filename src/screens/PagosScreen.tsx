import React, { useState } from 'react';
import { ScreenId, TransitionType, PaymentTransaction } from '../types';
import { INITIAL_TRANSACTIONS, INITIAL_ACCOUNTS } from '../data/mockData';

interface PagosScreenProps {
  onNavigate: (screen: ScreenId, transition?: TransitionType) => void;
}

export const PagosScreen: React.FC<PagosScreenProps> = ({ onNavigate }) => {
  const [selectedAccountCode, setSelectedAccountCode] = useState<string>(INITIAL_ACCOUNTS[1].documentCode); // F001-0799
  const [paymentAmount, setPaymentAmount] = useState<number>(500);
  const [paymentMethod, setPaymentMethod] = useState<'efectivo' | 'yape' | 'plin' | 'transferencia'>('yape');
  const [transactions, setTransactions] = useState<PaymentTransaction[]>(INITIAL_TRANSACTIONS);
  const [showSuccessModal, setShowSuccessModal] = useState<PaymentTransaction | null>(null);

  const account = INITIAL_ACCOUNTS.find((a) => a.documentCode === selectedAccountCode) || INITIAL_ACCOUNTS[0];

  // Dynamic waterfall calculation (Prelación Art. 1257)
  const moraDue = account.moratoryInterest;
  const interestDue = account.compensatoryInterest;
  const capitalDue = account.pendingBalance;

  // Step 1: Mora
  const paidToMora = Math.min(paymentAmount, moraDue);
  const remainderAfterMora = Math.max(0, paymentAmount - paidToMora);

  // Step 2: Compensatory Interest
  const paidToInterest = Math.min(remainderAfterMora, interestDue);
  const remainderAfterInterest = Math.max(0, remainderAfterMora - paidToInterest);

  // Step 3: Capital
  const paidToCapital = Math.min(remainderAfterInterest, capitalDue);
  const newCapitalBalance = Math.max(0, capitalDue - paidToCapital);

  const handleRegisterPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentAmount <= 0) return;

    const newTx: PaymentTransaction = {
      receiptNumber: `RC-00${4819 + transactions.length}`,
      operationCode: `OP-${Math.floor(100000 + Math.random() * 900000)}`,
      dateTime: 'Justo ahora',
      clientName: account.clientName,
      clientDoc: account.clientDoc,
      clientInitials: account.clientInitials,
      paymentMethod,
      totalPaid: paymentAmount,
      moraPaid: parseFloat(paidToMora.toFixed(2)),
      interestPaid: parseFloat(paidToInterest.toFixed(2)),
      capitalPaid: parseFloat(paidToCapital.toFixed(2)),
      appliedQuota: `${account.documentCode} (Prelación Legal)`,
      receiptType: 'Recibo Caja',
    };

    setTransactions([newTx, ...transactions]);
    setShowSuccessModal(newTx);
  };

  return (
    <div className="flex flex-col w-full gap-space-xl pb-16">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-base">
        <div className="flex flex-col gap-space-2xs">
          <div className="flex items-center gap-space-xs">
            <span className="font-label-xs text-label-xs text-primary font-bold uppercase tracking-widest">
              Imputación Contable de Pagos
            </span>
            <span className="text-on-surface-variant">•</span>
            <span className="font-label-xs text-label-xs text-on-surface-variant font-medium">
              Artículo 1257 del Código Civil Peruano
            </span>
          </div>
          <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight font-bold">
            Pagos y Prelación Legal
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Motor inteligente de aplicación de pagos: liquidación automática en cascada (Gastos/Mora → Interés Compensatorio → Capital Principal).
          </p>
        </div>

        {/* Global Toolbar */}
        <div className="flex items-center gap-space-sm shrink-0 flex-wrap">
          {/* EXACT XPATH MATCH: //button[contains(., 'Reestructurar Cronograma')] → Cuentas por Cobrar y Cronograma Francés (push transition) */}
          <button
            className="flex items-center gap-space-xs bg-surface-container hover:bg-surface-container-high text-on-surface px-space-md py-space-sm rounded-lg font-label-md text-label-md font-semibold transition-colors shadow-sm border border-[#e2e8f0] cursor-pointer"
            type="button"
            onClick={() => onNavigate('cuentas-por-cobrar', 'push')}
          >
            <span className="material-symbols-outlined text-[18px] text-primary">restart_alt</span>
            <span>Reestructurar Cronograma</span>
          </button>
        </div>
      </div>

      {/* Legal Banner */}
      <div className="bg-primary-fixed/30 rounded-xl p-space-md flex flex-col md:flex-row items-center justify-between gap-space-md border border-primary-fixed-dim">
        <div className="flex items-center gap-space-sm">
          <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px]">gavel</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-md text-label-md text-on-surface font-semibold">
              Regla de Imputación del Pago (Art. 1257 C.C.)
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              "El deudor no puede, sin el asentimiento del acreedor, imputar el pago al capital antes que a los gastos ni a éstos antes que a los intereses."
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-surface-container-lowest px-3 py-1 rounded-lg border border-[#e2e8f0] shrink-0">
          <span className="font-label-xs text-label-xs text-primary font-bold">1° Mora</span>
          <span className="text-on-surface-variant">→</span>
          <span className="font-label-xs text-label-xs text-secondary font-bold">2° Interés</span>
          <span className="text-on-surface-variant">→</span>
          <span className="font-label-xs text-label-xs text-tertiary font-bold">3° Capital</span>
        </div>
      </div>

      {/* Main Dual Grid: Payment Engine & Waterfall Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
        {/* Left Column: Form & Simulator (5 cols) */}
        <div className="lg:col-span-5 bg-surface-container-lowest rounded-xl p-space-xl shadow-sm border border-[#e2e8f0] flex flex-col gap-space-lg">
          <div className="flex items-center justify-between pb-space-sm border-b border-[#e2e8f0]">
            <div className="flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-primary text-[22px]">point_of_sale</span>
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                Registrar Ingreso de Pago
              </h2>
            </div>
            <span className="font-label-xs text-label-xs bg-surface-container text-primary font-semibold px-2 py-0.5 rounded">
              Caja Chica
            </span>
          </div>

          <form className="flex flex-col gap-space-base" onSubmit={handleRegisterPayment}>
            {/* Account Selector */}
            <div className="flex flex-col gap-1">
              <label className="font-label-xs text-label-xs text-on-surface-variant uppercase font-semibold">
                Cuenta / Factura Pendiente
              </label>
              <select
                className="w-full bg-surface-container-low px-space-md py-space-sm rounded-lg font-body-sm text-body-sm text-on-surface border border-[#e2e8f0] focus:outline-none focus:ring-1 focus:ring-primary"
                value={selectedAccountCode}
                onChange={(e) => setSelectedAccountCode(e.target.value)}
              >
                {INITIAL_ACCOUNTS.map((acc) => (
                  <option key={acc.documentCode} value={acc.documentCode}>
                    {acc.documentCode} • {acc.clientName} (Deuda: S/ {acc.totalOwed.toFixed(2)})
                  </option>
                ))}
              </select>
            </div>

            {/* Total Debt Breakdown Card */}
            <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col gap-space-xs border border-[#e2e8f0]">
              <div className="flex justify-between text-label-xs font-label-xs text-on-surface-variant">
                <span>Cliente:</span>
                <span className="font-bold text-on-surface">{account.clientName}</span>
              </div>
              <div className="flex justify-between text-label-xs font-label-xs text-on-surface-variant">
                <span>Interés Moratorio (1°):</span>
                <span className="font-bold text-error">S/ {moraDue.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-label-xs font-label-xs text-on-surface-variant">
                <span>Interés Compensatorio (2°):</span>
                <span className="font-bold text-secondary">S/ {interestDue.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-label-xs font-label-xs text-on-surface-variant">
                <span>Saldo Capital Vigente (3°):</span>
                <span className="font-bold text-on-surface">S/ {capitalDue.toFixed(2)}</span>
              </div>
              <div className="h-px bg-[#e2e8f0] my-1" />
              <div className="flex justify-between text-body-md font-body-md font-bold text-primary">
                <span>Deuda Total Exigible:</span>
                <span>S/ {account.totalOwed.toFixed(2)}</span>
              </div>
            </div>

            {/* Payment Input */}
            <div className="flex flex-col gap-1">
              <label className="font-label-xs text-label-xs text-on-surface-variant uppercase font-semibold">
                Monto que Paga el Cliente (S/)
              </label>
              <div className="flex items-center bg-surface-container-low rounded-xl overflow-hidden border border-[#e2e8f0]">
                <span className="px-space-md py-space-sm bg-surface-container-high text-on-surface font-semibold text-body-lg">
                  S/
                </span>
                <input
                  className="w-full bg-transparent px-space-md py-space-sm font-headline-lg text-headline-lg font-bold text-on-surface focus:outline-none"
                  max={account.totalOwed}
                  min={1}
                  step="0.10"
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(parseFloat(e.target.value) || 0)}
                />
                <button
                  className="mr-space-sm bg-surface-container hover:bg-surface-container-high text-on-surface px-space-sm py-1 rounded font-label-xs text-label-xs font-semibold whitespace-nowrap"
                  type="button"
                  onClick={() => setPaymentAmount(account.totalOwed)}
                >
                  Pagar Todo
                </button>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="flex flex-col gap-1">
              <label className="font-label-xs text-label-xs text-on-surface-variant uppercase font-semibold">
                Canal de Recaudación
              </label>
              <div className="grid grid-cols-4 gap-space-xs">
                {(['yape', 'plin', 'efectivo', 'transferencia'] as const).map((method) => (
                  <button
                    key={method}
                    className={`py-space-sm rounded-lg flex flex-col items-center justify-center gap-1 transition-all border ${
                      paymentMethod === method
                        ? 'bg-primary-container text-on-primary border-primary font-semibold shadow-xs'
                        : 'bg-surface-container-low text-on-surface-variant border-[#e2e8f0] hover:bg-surface-container'
                    }`}
                    type="button"
                    onClick={() => setPaymentMethod(method)}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {method === 'yape'
                        ? 'phone_android'
                        : method === 'plin'
                        ? 'qr_code_2'
                        : method === 'efectivo'
                        ? 'payments'
                        : 'account_balance'}
                    </span>
                    <span className="font-label-xs text-label-xs capitalize">{method}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Action */}
            <button
              className="w-full py-space-md bg-tertiary-container hover:bg-tertiary text-on-tertiary rounded-xl font-label-md text-label-md font-bold transition-all shadow-md mt-space-xs flex items-center justify-center gap-2 cursor-pointer"
              type="submit"
            >
              <span className="material-symbols-outlined text-[20px]">receipt_long</span>
              <span>Confirmar y Aplicar Pago Legal</span>
            </button>
          </form>
        </div>

        {/* Right Column: Visual Cascade Waterfall (7 cols) */}
        <div className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-space-xl shadow-sm border border-[#e2e8f0] flex flex-col justify-between">
          <div className="flex flex-col gap-space-xs pb-space-md border-b border-[#e2e8f0]">
            <div className="flex items-center justify-between">
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                Cascada Visual de Desglose
              </h2>
              <span className="font-label-xs text-label-xs text-on-surface-variant font-mono">
                Abono Actual: S/ {paymentAmount.toFixed(2)}
              </span>
            </div>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Distribución obligatoria de acuerdo con la prelación de amortización:
            </span>
          </div>

          {/* 3-Step Cascade Visual Cards */}
          <div className="flex flex-col gap-space-base my-space-md">
            {/* Step 1: Mora */}
            <div className="bg-error-container/30 rounded-xl p-space-md border border-error-container flex flex-col gap-space-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-sm">
                  <span className="w-6 h-6 rounded-full bg-error text-on-error flex items-center justify-center font-bold text-label-xs">
                    1
                  </span>
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md text-on-surface font-bold">
                      Imputación a Interés Moratorio / Gastos
                    </span>
                    <span className="font-label-xs text-label-xs text-on-surface-variant">
                      Mora exigible inicial: S/ {moraDue.toFixed(2)}
                    </span>
                  </div>
                </div>
                <span className="font-tabular-numeric-md font-bold text-error text-body-lg">
                  - S/ {paidToMora.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center text-label-xs font-label-xs pt-1 border-t border-error-container/60">
                <span className="text-on-surface-variant">Saldo restante de mora:</span>
                <span className="font-semibold text-error">S/ {(moraDue - paidToMora).toFixed(2)}</span>
              </div>
            </div>

            {/* Step 2: Compensatory Interest */}
            <div className="bg-secondary-fixed/30 rounded-xl p-space-md border border-secondary-fixed flex flex-col gap-space-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-sm">
                  <span className="w-6 h-6 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-bold text-label-xs">
                    2
                  </span>
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md text-on-surface font-bold">
                      Imputación a Interés Compensatorio (TEM)
                    </span>
                    <span className="font-label-xs text-label-xs text-on-surface-variant">
                      Interés devengado inicial: S/ {interestDue.toFixed(2)}
                    </span>
                  </div>
                </div>
                <span className="font-tabular-numeric-md font-bold text-secondary text-body-lg">
                  - S/ {paidToInterest.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center text-label-xs font-label-xs pt-1 border-t border-secondary-fixed/60">
                <span className="text-on-surface-variant">Saldo restante de interés:</span>
                <span className="font-semibold text-secondary">S/ {(interestDue - paidToInterest).toFixed(2)}</span>
              </div>
            </div>

            {/* Step 3: Capital */}
            <div className="bg-tertiary-fixed/30 rounded-xl p-space-md border border-tertiary-fixed flex flex-col gap-space-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-sm">
                  <span className="w-6 h-6 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center font-bold text-label-xs">
                    3
                  </span>
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md text-on-surface font-bold">
                      Amortización Efectiva a Saldo Capital
                    </span>
                    <span className="font-label-xs text-label-xs text-on-surface-variant">
                      Capital vivo inicial: S/ {capitalDue.toFixed(2)}
                    </span>
                  </div>
                </div>
                <span className="font-tabular-numeric-md font-bold text-tertiary text-body-lg">
                  - S/ {paidToCapital.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center text-label-xs font-label-xs pt-1 border-t border-tertiary-fixed/60">
                <span className="text-on-surface-variant">Nuevo saldo capital restante:</span>
                <span className="font-bold text-on-surface">S/ {newCapitalBalance.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Outcome Summary Box */}
          <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col sm:flex-row items-center justify-between gap-space-sm border border-[#e2e8f0]">
            <div className="flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-tertiary text-[24px]">verified</span>
              <div className="flex flex-col">
                <span className="font-label-md text-label-md text-on-surface font-semibold">
                  Efecto en el Cronograma Francés
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  El nuevo saldo de capital (S/ {newCapitalBalance.toFixed(2)}) recalculará las cuotas restantes con menor carga de interés.
                </span>
              </div>
            </div>
            <button
              className="bg-primary-container hover:bg-primary text-on-primary px-space-md py-space-sm rounded-lg font-label-md text-label-md font-semibold transition-colors shrink-0"
              onClick={() => onNavigate('cuentas-por-cobrar', 'push')}
              type="button"
            >
              Ver Cronograma Actualizado
            </button>
          </div>
        </div>
      </div>

      {/* Row 3: Transaction Ledger Table */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-[#e2e8f0] overflow-hidden flex flex-col">
        <div className="p-space-lg bg-surface-container-low flex items-center justify-between border-b border-[#e2e8f0]">
          <div className="flex items-center gap-space-sm">
            <span className="material-symbols-outlined text-primary text-[20px]">history_edu</span>
            <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Historial de Recaudaciones e Imputaciones
            </span>
          </div>
          <span className="font-label-xs text-label-xs text-on-surface-variant">
            {transactions.length} operaciones registradas en el periodo
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-body-sm text-body-sm">
            <thead className="bg-surface-container text-on-surface font-label-xs text-label-xs uppercase tracking-wider border-b border-[#e2e8f0]">
              <tr>
                <th className="py-space-sm px-space-md">Recibo • Operación</th>
                <th className="py-space-sm px-space-md">Fecha • Hora</th>
                <th className="py-space-sm px-space-md">Cliente / Deudor</th>
                <th className="py-space-sm px-space-sm text-center">Canal</th>
                <th className="py-space-sm px-space-sm text-right">Mora (1°)</th>
                <th className="py-space-sm px-space-sm text-right">Interés (2°)</th>
                <th className="py-space-sm px-space-sm text-right">Capital (3°)</th>
                <th className="py-space-sm px-space-md text-right font-bold text-primary">Total Pagado</th>
                <th className="py-space-sm px-space-md text-center">Comprobante</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0]/40">
              {transactions.map((tx) => (
                <tr key={tx.receiptNumber} className="hover:bg-surface-container-low transition-colors">
                  <td className="py-space-sm px-space-md">
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md font-mono text-primary font-bold">
                        {tx.receiptNumber}
                      </span>
                      <span className="font-label-xs text-label-xs text-on-surface-variant font-mono">
                        {tx.operationCode}
                      </span>
                    </div>
                  </td>
                  <td className="py-space-sm px-space-md font-label-xs text-label-xs text-on-surface">
                    {tx.dateTime}
                  </td>
                  <td className="py-space-sm px-space-md">
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md text-on-surface font-semibold">
                        {tx.clientName}
                      </span>
                      <span className="font-label-xs text-label-xs text-on-surface-variant">
                        {tx.clientDoc}
                      </span>
                    </div>
                  </td>
                  <td className="py-space-sm px-space-sm text-center">
                    <span className="bg-surface-container px-2 py-0.5 rounded font-label-xs text-label-xs font-semibold capitalize text-on-surface">
                      {tx.paymentMethod}
                    </span>
                  </td>
                  <td className="py-space-sm px-space-sm text-right font-tabular-numeric-md text-error">
                    S/ {tx.moraPaid.toFixed(2)}
                  </td>
                  <td className="py-space-sm px-space-sm text-right font-tabular-numeric-md text-secondary">
                    S/ {tx.interestPaid.toFixed(2)}
                  </td>
                  <td className="py-space-sm px-space-sm text-right font-tabular-numeric-md text-tertiary font-bold">
                    S/ {tx.capitalPaid.toFixed(2)}
                  </td>
                  <td className="py-space-sm px-space-md text-right font-tabular-numeric-md font-bold text-primary text-body-md">
                    S/ {tx.totalPaid.toFixed(2)}
                  </td>
                  <td className="py-space-sm px-space-md text-center">
                    <button
                      className="bg-surface-container hover:bg-surface-container-high text-on-surface px-space-sm py-1 rounded font-label-xs text-label-xs font-medium transition-colors border border-[#e2e8f0] flex items-center gap-1 mx-auto"
                      onClick={() => setShowSuccessModal(tx)}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[14px]">print</span>
                      <span>Imprimir</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Receipt Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-[#0b1c30]/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl max-w-md w-full shadow-2xl overflow-hidden flex flex-col border border-[#e2e8f0]">
            <div className="p-space-lg bg-surface-container-low flex items-center justify-between border-b border-[#e2e8f0]">
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-tertiary text-[24px]">verified</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  Recibo de Cobro Conforme
                </h3>
              </div>
              <button
                className="text-on-surface-variant hover:text-on-surface p-1 rounded-lg"
                onClick={() => setShowSuccessModal(null)}
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="p-space-xl flex flex-col gap-space-base">
              {/* Receipt Ticket Aesthetic */}
              <div className="border border-dashed border-[#cbd5e1] p-space-lg rounded-xl flex flex-col gap-space-sm bg-surface-container-lowest">
                <div className="text-center flex flex-col items-center">
                  <span className="font-headline-sm text-headline-sm font-bold text-on-surface">BODEGAS GLORIA</span>
                  <span className="font-label-xs text-label-xs text-on-surface-variant">RUC: 10458291024</span>
                  <span className="font-label-xs text-label-xs text-on-surface-variant">Jr. Los Olivos 342, Surco, Lima</span>
                  <span className="font-label-md text-label-md font-mono text-primary font-bold mt-2">
                    {showSuccessModal.receiptNumber}
                  </span>
                </div>

                <div className="h-px bg-slate-200 my-1" />

                <div className="flex justify-between text-body-sm font-body-sm">
                  <span className="text-on-surface-variant">Cliente:</span>
                  <span className="font-semibold text-on-surface">{showSuccessModal.clientName}</span>
                </div>
                <div className="flex justify-between text-body-sm font-body-sm">
                  <span className="text-on-surface-variant">Doc:</span>
                  <span>{showSuccessModal.clientDoc}</span>
                </div>
                <div className="flex justify-between text-body-sm font-body-sm">
                  <span className="text-on-surface-variant">Medio:</span>
                  <span className="capitalize">{showSuccessModal.paymentMethod}</span>
                </div>

                <div className="h-px bg-slate-200 my-1" />

                <div className="flex flex-col gap-1 text-label-xs font-label-xs">
                  <span className="font-bold uppercase text-on-surface-variant">Desglose de Prelación Legal:</span>
                  <div className="flex justify-between text-error">
                    <span>1. Gastos de Mora:</span>
                    <span>S/ {showSuccessModal.moraPaid.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-secondary">
                    <span>2. Interés Compensatorio:</span>
                    <span>S/ {showSuccessModal.interestPaid.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-tertiary font-semibold">
                    <span>3. Amortización de Capital:</span>
                    <span>S/ {showSuccessModal.capitalPaid.toFixed(2)}</span>
                  </div>
                </div>

                <div className="h-px bg-slate-200 my-1" />

                <div className="flex justify-between items-center text-headline-sm font-headline-sm font-bold text-primary">
                  <span>TOTAL COBRADO:</span>
                  <span>S/ {showSuccessModal.totalPaid.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex items-center gap-space-sm">
                <button
                  className="w-1/2 py-space-sm bg-surface-container hover:bg-surface-container-high text-on-surface rounded-lg font-label-md text-label-md transition-colors"
                  onClick={() => setShowSuccessModal(null)}
                  type="button"
                >
                  Cerrar
                </button>
                <button
                  className="w-1/2 py-space-sm bg-primary-container hover:bg-primary text-on-primary rounded-lg font-label-md text-label-md font-semibold transition-colors flex items-center justify-center gap-1 shadow-md"
                  onClick={() => {
                    window.print();
                    setShowSuccessModal(null);
                  }}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">print</span>
                  <span>Imprimir Recibo</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
