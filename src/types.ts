export type ScreenId =
  | 'inicio'
  | 'configuracion'
  | 'reportes-y-analiticas'
  | 'cuentas-por-cobrar'
  | 'clientes'
  | 'pagos'
  | 'ventas-al-credito';

export type TransitionType = 'none' | 'push' | 'push_back' | 'slide_up';

export interface Client {
  id: string;
  name: string;
  documentType: 'DNI' | 'RUC' | 'CE';
  documentNumber: string;
  phone: string;
  email: string;
  address: string;
  location: string;
  creditLimit: number;
  creditUsed: number;
  totalDebt: number;
  overdueDays: number;
  status: 'aldia' | 'con-deuda' | 'mora';
  paymentTermsDays: number;
  vip?: boolean;
  avatar?: string;
  initials: string;
}

export interface Installment {
  number: number;
  totalInstallments: number;
  dueDate: string;
  initialBalance: number;
  interest: number;
  amortization: number;
  installmentAmount: number;
  finalBalance: number;
  status: 'pagada' | 'por-vencer' | 'pendiente' | 'vencida';
  documentCode?: string;
}

export interface CreditAccount {
  documentCode: string;
  clientName: string;
  clientDoc: string;
  clientInitials: string;
  originalCapital: number;
  pendingBalance: number;
  compensatoryInterest: number;
  moratoryInterest: number;
  totalOwed: number;
  dueDate: string;
  overdueDays: number;
  status: 'al-dia' | 'por-vencer' | 'vencido';
  statusLabel: string;
  installments: Installment[];
  tea: number;
  tem: number;
}

export interface PaymentTransaction {
  receiptNumber: string;
  operationCode: string;
  dateTime: string;
  clientName: string;
  clientDoc: string;
  clientInitials: string;
  paymentMethod: 'efectivo' | 'yape' | 'plin' | 'transferencia';
  totalPaid: number;
  moraPaid: number;
  interestPaid: number;
  capitalPaid: number;
  appliedQuota: string;
  receiptType: 'Recibo Caja' | 'Boleta Electrónica';
}

export interface StoreConfig {
  storeName: string;
  ruc: string;
  ownerName: string;
  address: string;
  phone: string;
  email: string;
  defaultCompensatoryRate: number;
  defaultMoratoryRate: number;
  defaultTermsDays: number;
  maxCreditPerClient: number;
  globalCreditLimit: number;
  receiptSeries: string;
  autoSendWhatsApp: boolean;
  activeCommercialRule: boolean;
}
