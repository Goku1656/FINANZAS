import React, { useState } from 'react';
import { ScreenId, TransitionType, Client } from '../types';
import { INITIAL_CLIENTS } from '../data/mockData';

interface ClientesScreenProps {
  onNavigate: (screen: ScreenId, transition?: TransitionType) => void;
  onSelectClientForSale?: (client: Client) => void;
}

export const ClientesScreen: React.FC<ClientesScreenProps> = ({
  onNavigate,
  onSelectClientForSale,
}) => {
  const [clients, setClients] = useState<Client[]>(INITIAL_CLIENTS);
  const [selectedClient, setSelectedClient] = useState<Client>(INITIAL_CLIENTS[0]); // Carlos Mamani
  const [clientSearch, setClientSearch] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'todos' | 'con-deuda' | 'aldia' | 'mora'>('todos');
  const [showNewClientModal, setShowNewClientModal] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Form states for new client
  const [newClientName, setNewClientName] = useState('');
  const [newClientDocType, setNewClientDocType] = useState<'DNI' | 'RUC'>('DNI');
  const [newClientDocNum, setNewClientDocNum] = useState('');
  const [newClientPhone, setNewClientPhone] = useState('');
  const [newClientAddress, setNewClientAddress] = useState('');
  const [newClientLimit, setNewClientLimit] = useState(2000);

  const filteredClients = clients.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(clientSearch.toLowerCase()) ||
      c.documentNumber.includes(clientSearch) ||
      c.phone.includes(clientSearch);
    if (!matchesSearch) return false;
    if (statusFilter === 'todos') return true;
    return c.status === statusFilter;
  });

  const handleCreateClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName || !newClientDocNum) return;

    const created: Client = {
      id: `client-${Date.now()}`,
      name: newClientName,
      documentType: newClientDocType,
      documentNumber: newClientDocNum,
      phone: newClientPhone || '+51 900 000 000',
      email: `${newClientName.toLowerCase().replace(/\s+/g, '.')}@gmail.com`,
      address: newClientAddress || 'Lima, Perú',
      location: 'Lima',
      creditLimit: newClientLimit,
      creditUsed: 0,
      totalDebt: 0,
      overdueDays: 0,
      status: 'aldia',
      paymentTermsDays: 30,
      initials: newClientName.slice(0, 2).toUpperCase(),
    };

    setClients([created, ...clients]);
    setSelectedClient(created);
    setShowNewClientModal(false);
    setNotification(`Cliente ${created.name} registrado con éxito con línea de S/ ${created.creditLimit.toFixed(2)}`);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleNewSaleForClient = () => {
    if (onSelectClientForSale) {
      onSelectClientForSale(selectedClient);
    }
    onNavigate('ventas-al-credito', 'slide_up');
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
              Directorio de Cartera
            </span>
            <span className="text-on-surface-variant">•</span>
            <span className="font-label-xs text-label-xs text-on-surface-variant font-medium">
              Expediente Crediticio y Estados de Cuenta
            </span>
          </div>
          <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight font-bold">
            Clientes y Estado de Cuenta
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Administración de clientes autorizados para crédito bodega, historial de pagos, límites de endeudamiento y cobranza directa.
          </p>
        </div>

        {/* Global Toolbar */}
        <div className="flex items-center gap-space-sm shrink-0 flex-wrap">
          <button
            className="flex items-center gap-space-xs bg-primary-container hover:bg-primary text-on-primary px-space-md py-space-sm rounded-lg font-label-md text-label-md font-semibold transition-colors shadow-sm cursor-pointer"
            type="button"
            onClick={() => setShowNewClientModal(true)}
          >
            <span className="material-symbols-outlined text-[18px]">person_add</span>
            <span>+ Nuevo Cliente</span>
          </button>
        </div>
      </div>

      {/* Dual Panel Layout: Client Directory (Left 7 cols) & Individual Credit File (Right 5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
        {/* Left Panel: Client List */}
        <div className="lg:col-span-7 bg-surface-container-lowest rounded-xl shadow-sm border border-[#e2e8f0] flex flex-col overflow-hidden">
          {/* List Search & Filter Header */}
          <div className="p-space-md bg-surface-container-low border-b border-[#e2e8f0] flex flex-col gap-space-sm">
            <div className="flex items-center gap-space-sm">
              <div className="flex-1 flex items-center gap-space-xs bg-surface-container-lowest px-space-md py-space-xs rounded-xl border border-[#e2e8f0]">
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant">search</span>
                <input
                  className="w-full bg-transparent text-body-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none"
                  placeholder="Buscar por nombre, DNI, RUC o teléfono..."
                  type="text"
                  value={clientSearch}
                  onChange={(e) => setClientSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Quick Filter Chips */}
            <div className="flex items-center gap-space-xs flex-wrap">
              <button
                className={`px-3 py-1 rounded-lg font-label-xs text-label-xs font-semibold transition-colors ${
                  statusFilter === 'todos'
                    ? 'bg-primary-container text-on-primary'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
                onClick={() => setStatusFilter('todos')}
              >
                Todos ({clients.length})
              </button>
              <button
                className={`px-3 py-1 rounded-lg font-label-xs text-label-xs font-semibold transition-colors ${
                  statusFilter === 'con-deuda'
                    ? 'bg-secondary text-on-secondary'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
                onClick={() => setStatusFilter('con-deuda')}
              >
                Con Deuda Activa
              </button>
              <button
                className={`px-3 py-1 rounded-lg font-label-xs text-label-xs font-semibold transition-colors ${
                  statusFilter === 'mora'
                    ? 'bg-error text-on-error'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
                onClick={() => setStatusFilter('mora')}
              >
                En Mora
              </button>
              <button
                className={`px-3 py-1 rounded-lg font-label-xs text-label-xs font-semibold transition-colors ${
                  statusFilter === 'aldia'
                    ? 'bg-tertiary-container text-on-tertiary'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
                onClick={() => setStatusFilter('aldia')}
              >
                Al Día / Sin Deuda
              </button>
            </div>
          </div>

          {/* Client Table */}
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left font-body-sm text-body-sm">
              <thead className="bg-surface-container text-on-surface font-label-xs text-label-xs uppercase tracking-wider border-b border-[#e2e8f0]">
                <tr>
                  <th className="py-space-sm px-space-md">Cliente</th>
                  <th className="py-space-sm px-space-sm">Documento</th>
                  <th className="py-space-sm px-space-sm text-right">Límite</th>
                  <th className="py-space-sm px-space-sm text-right">Deuda</th>
                  <th className="py-space-sm px-space-sm text-center">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e2e8f0]/40">
                {filteredClients.map((client) => {
                  const isSelected = selectedClient.id === client.id;
                  return (
                    <tr
                      key={client.id}
                      className={`cursor-pointer transition-colors ${
                        isSelected ? 'bg-primary-fixed/30 font-medium' : 'hover:bg-surface-container-low'
                      }`}
                      onClick={() => setSelectedClient(client)}
                    >
                      <td className="py-space-sm px-space-md">
                        <div className="flex items-center gap-space-sm">
                          <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center font-bold text-label-xs text-primary shrink-0">
                            {client.initials}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-label-md text-label-md text-on-surface truncate font-semibold">
                              {client.name}
                            </span>
                            <span className="font-label-xs text-label-xs text-on-surface-variant truncate">
                              {client.phone}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-space-sm px-space-sm font-label-xs text-label-xs text-on-surface">
                        <span className="bg-surface-container px-1.5 py-0.5 rounded font-mono">
                          {client.documentType}: {client.documentNumber}
                        </span>
                      </td>
                      <td className="py-space-sm px-space-sm text-right font-tabular-numeric-md text-on-surface-variant">
                        S/ {client.creditLimit.toFixed(2)}
                      </td>
                      <td className="py-space-sm px-space-sm text-right font-tabular-numeric-md font-bold text-primary">
                        S/ {client.totalDebt.toFixed(2)}
                      </td>
                      <td className="py-space-sm px-space-sm text-center">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-label-xs text-label-xs font-semibold ${
                            client.status === 'aldia'
                              ? 'bg-tertiary-fixed text-on-tertiary-fixed-variant'
                              : client.status === 'con-deuda'
                              ? 'bg-secondary-fixed text-on-secondary-fixed-variant'
                              : 'bg-error-container text-on-error-container'
                          }`}
                        >
                          {client.status === 'aldia'
                            ? 'Al Día'
                            : client.status === 'con-deuda'
                            ? 'Con Deuda'
                            : `${client.overdueDays}d Mora`}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Panel: Selected Client Statement & Operations (5 cols) */}
        <div className="lg:col-span-5 bg-surface-container-lowest rounded-xl shadow-sm border border-[#e2e8f0] p-space-xl flex flex-col gap-space-lg">
          {/* Profile Header */}
          <div className="flex items-start justify-between pb-space-md border-b border-[#e2e8f0]">
            <div className="flex items-center gap-space-md">
              {selectedClient.avatar ? (
                <img
                  alt={selectedClient.name}
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-primary/20"
                  src={selectedClient.avatar}
                />
              ) : (
                <div className="w-14 h-14 rounded-2xl bg-primary-container text-on-primary flex items-center justify-center font-display-lg text-xl font-bold">
                  {selectedClient.initials}
                </div>
              )}
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                    {selectedClient.name}
                  </h2>
                  {selectedClient.vip && (
                    <span className="bg-amber-100 text-amber-900 border border-amber-300 font-label-xs text-label-xs px-2 py-0.5 rounded-full font-bold">
                      VIP
                    </span>
                  )}
                </div>
                <span className="font-label-xs text-label-xs text-on-surface-variant font-mono">
                  {selectedClient.documentType} {selectedClient.documentNumber}
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant mt-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">location_on</span>
                  {selectedClient.address}
                </span>
              </div>
            </div>
          </div>

          {/* Credit Limit Usage Gauge */}
          <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col gap-space-sm border border-[#e2e8f0]">
            <div className="flex justify-between items-center text-label-xs font-label-xs text-on-surface-variant">
              <span className="uppercase font-semibold">Línea de Crédito Otorgada</span>
              <span className="font-bold text-primary">
                {((selectedClient.creditUsed / (selectedClient.creditLimit || 1)) * 100).toFixed(1)}% utilizado
              </span>
            </div>

            <div className="w-full h-2.5 bg-surface-container-high rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  selectedClient.status === 'mora'
                    ? 'bg-error'
                    : selectedClient.creditUsed > selectedClient.creditLimit * 0.8
                    ? 'bg-secondary'
                    : 'bg-primary'
                }`}
                style={{
                  width: `${Math.min(100, (selectedClient.creditUsed / (selectedClient.creditLimit || 1)) * 100)}%`,
                }}
              />
            </div>

            <div className="flex justify-between items-center text-label-xs font-label-xs">
              <div className="flex flex-col">
                <span className="text-on-surface-variant">Saldo Deuda Actual</span>
                <span className="font-tabular-numeric-md font-bold text-on-surface text-body-md">
                  S/ {selectedClient.creditUsed.toFixed(2)}
                </span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-on-surface-variant">Límite Autorizado</span>
                <span className="font-tabular-numeric-md font-bold text-on-surface text-body-md">
                  S/ {selectedClient.creditLimit.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Direct Actions: EXACT XPATH MATCH for //button[contains(., 'Registrar Pago Directo')] */}
          <div className="flex flex-col gap-space-sm">
            <button
              className="w-full py-space-md bg-tertiary-container hover:bg-tertiary text-on-tertiary rounded-xl font-label-md text-label-md font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              type="button"
              onClick={() => onNavigate('pagos', 'push')}
            >
              <span className="material-symbols-outlined text-[20px]">payments</span>
              <span>Registrar Pago Directo</span>
            </button>

            <button
              className="w-full py-space-sm bg-primary-container hover:bg-primary text-on-primary rounded-xl font-label-md text-label-md font-semibold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              type="button"
              onClick={handleNewSaleForClient}
            >
              <span className="material-symbols-outlined text-[18px]">add_card</span>
              <span>Nueva Venta al Crédito para este Cliente</span>
            </button>
          </div>

          {/* Mini Installments Schedule for this client */}
          <div className="flex flex-col gap-space-xs">
            <span className="font-label-xs text-label-xs text-on-surface-variant uppercase font-semibold">
              Compromisos de Pago Registrados
            </span>
            <div className="border border-[#e2e8f0] rounded-xl overflow-hidden divide-y divide-[#e2e8f0]">
              <div className="p-space-sm bg-surface-container-low flex justify-between items-center text-label-xs font-label-xs">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-primary">F001-0842</span>
                  <span className="text-on-surface">Cuota 03/06</span>
                </div>
                <span className="font-bold text-on-surface">S/ 1,089.47</span>
              </div>
              <div className="p-space-sm bg-surface-container-lowest flex justify-between items-center text-label-xs font-label-xs">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-on-surface-variant">F001-0842</span>
                  <span className="text-on-surface-variant">Cuota 04/06 (15 Jun)</span>
                </div>
                <span className="text-on-surface-variant">S/ 1,089.47</span>
              </div>
            </div>
          </div>

          {/* Quick Communication Tool */}
          <div className="bg-surface-container-low rounded-xl p-space-sm flex items-center justify-between border border-[#e2e8f0]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary text-[20px]">chat</span>
              <span className="font-body-sm text-body-sm text-on-surface">
                Teléfono: <strong>{selectedClient.phone}</strong>
              </span>
            </div>
            <button
              className="bg-surface-container hover:bg-surface-container-high text-tertiary font-semibold text-label-xs px-2.5 py-1 rounded transition-colors"
              onClick={() => setNotification(`Abriendo WhatsApp para contactar a ${selectedClient.name}`)}
              type="button"
            >
              Contactar
            </button>
          </div>
        </div>
      </div>

      {/* New Client Modal */}
      {showNewClientModal && (
        <div className="fixed inset-0 bg-[#0b1c30]/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden flex flex-col border border-[#e2e8f0]">
            <div className="p-space-lg bg-surface-container-low flex items-center justify-between border-b border-[#e2e8f0]">
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-primary text-[24px]">person_add</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  Nuevo Cliente para Crédito Bodega
                </h3>
              </div>
              <button
                className="text-on-surface-variant hover:text-on-surface p-1 rounded-lg"
                onClick={() => setShowNewClientModal(false)}
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form className="p-space-xl flex flex-col gap-space-base" onSubmit={handleCreateClient}>
              <div className="flex flex-col gap-1">
                <label className="font-label-xs text-label-xs text-on-surface-variant uppercase font-semibold">
                  Nombres y Apellidos o Razón Social *
                </label>
                <input
                  className="bg-surface-container-low px-space-md py-space-sm rounded-lg text-body-sm text-on-surface border border-[#e2e8f0] focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Ej. Juana Pérez Huamán"
                  required
                  type="text"
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-3 gap-space-sm">
                <div className="flex flex-col gap-1">
                  <label className="font-label-xs text-label-xs text-on-surface-variant uppercase font-semibold">
                    Tipo Doc
                  </label>
                  <select
                    className="bg-surface-container-low px-space-sm py-space-sm rounded-lg text-body-sm text-on-surface border border-[#e2e8f0] focus:outline-none"
                    value={newClientDocType}
                    onChange={(e) => setNewClientDocType(e.target.value as 'DNI' | 'RUC')}
                  >
                    <option value="DNI">DNI</option>
                    <option value="RUC">RUC</option>
                  </select>
                </div>

                <div className="col-span-2 flex flex-col gap-1">
                  <label className="font-label-xs text-label-xs text-on-surface-variant uppercase font-semibold">
                    Número de Documento *
                  </label>
                  <input
                    className="bg-surface-container-low px-space-md py-space-sm rounded-lg text-body-sm text-on-surface border border-[#e2e8f0] focus:outline-none"
                    placeholder="8 dígitos para DNI / 11 para RUC"
                    required
                    type="text"
                    value={newClientDocNum}
                    onChange={(e) => setNewClientDocNum(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-space-sm">
                <div className="flex flex-col gap-1">
                  <label className="font-label-xs text-label-xs text-on-surface-variant uppercase font-semibold">
                    Teléfono Celular
                  </label>
                  <input
                    className="bg-surface-container-low px-space-md py-space-sm rounded-lg text-body-sm text-on-surface border border-[#e2e8f0] focus:outline-none"
                    placeholder="+51 9..."
                    type="text"
                    value={newClientPhone}
                    onChange={(e) => setNewClientPhone(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-label-xs text-label-xs text-on-surface-variant uppercase font-semibold">
                    Línea de Crédito Inicial (S/)
                  </label>
                  <input
                    className="bg-surface-container-low px-space-md py-space-sm rounded-lg text-body-sm font-bold text-on-surface border border-[#e2e8f0] focus:outline-none"
                    min={100}
                    step={100}
                    type="number"
                    value={newClientLimit}
                    onChange={(e) => setNewClientLimit(parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label-xs text-label-xs text-on-surface-variant uppercase font-semibold">
                  Dirección o Referencia del Comercio
                </label>
                <input
                  className="bg-surface-container-low px-space-md py-space-sm rounded-lg text-body-sm text-on-surface border border-[#e2e8f0] focus:outline-none"
                  placeholder="Ej. Jr. Las Flores 123, Surco"
                  type="text"
                  value={newClientAddress}
                  onChange={(e) => setNewClientAddress(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-space-sm pt-space-xs">
                <button
                  className="w-1/2 py-space-sm bg-surface-container hover:bg-surface-container-high text-on-surface rounded-lg font-label-md text-label-md transition-colors"
                  onClick={() => setShowNewClientModal(false)}
                  type="button"
                >
                  Cancelar
                </button>
                <button
                  className="w-1/2 py-space-sm bg-primary-container hover:bg-primary text-on-primary rounded-lg font-label-md text-label-md font-semibold transition-colors shadow-md"
                  type="submit"
                >
                  Guardar y Habilitar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
