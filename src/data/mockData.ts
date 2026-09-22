import { Client, CreditAccount, Installment, PaymentTransaction, StoreConfig } from '../types';

export const INITIAL_CONFIG: StoreConfig = {
  storeName: 'Bodegas Gloria',
  ruc: '10458291024',
  ownerName: 'Gloria Mendoza',
  address: 'Jr. Los Olivos 342, Surco, Lima',
  phone: '+51 984 192 481',
  email: 'contacto@bodegasgloria.pe',
  defaultCompensatoryRate: 0.0,
  defaultMoratoryRate: 0.0,
  defaultTermsDays: 30,
  maxCreditPerClient: 5000,
  globalCreditLimit: 50000,
  receiptSeries: 'RC-004',
  autoSendWhatsApp: true,
  activeCommercialRule: true,
};

export const INITIAL_CLIENTS: Client[] = [
  {
    id: 'carlos-mamani',
    name: 'Carlos Mamani Paredes',
    documentType: 'DNI',
    documentNumber: '42819302',
    phone: '+51 987 654 321',
    email: 'carlos.mamani@gmail.com',
    address: 'Av. Los Próceres 452, Surco, Lima',
    location: 'Surco, Lima',
    creditLimit: 2500,
    creditUsed: 1120,
    totalDebt: 1120,
    overdueDays: 0,
    status: 'con-deuda',
    paymentTermsDays: 30,
    vip: true,
    initials: 'CM',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'distribuidora-san-juan',
    name: 'Distribuidora San Juan SAC',
    documentType: 'RUC',
    documentNumber: '20601948192',
    phone: '+51 941 230 491',
    email: 'ventas@sanjuan.com.pe',
    address: 'Av. Gran Chimú 1240, San Juan de Lurigancho',
    location: 'San Juan de Lurigancho',
    creditLimit: 5000,
    creditUsed: 2450,
    totalDebt: 2450,
    overdueDays: 18,
    status: 'mora',
    paymentTermsDays: 15,
    initials: 'SJ',
  },
  {
    id: 'juana-mendoza',
    name: 'Juana Mendoza Soto',
    documentType: 'DNI',
    documentNumber: '10459201',
    phone: '+51 977 112 840',
    email: 'juana.mendoza@hotmail.com',
    address: 'Calle Las Gaviotas 220, Chorrillos',
    location: 'Chorrillos, Lima',
    creditLimit: 1800,
    creditUsed: 0,
    totalDebt: 0,
    overdueDays: 0,
    status: 'aldia',
    paymentTermsDays: 30,
    initials: 'JM',
  },
  {
    id: 'jorge-huaman',
    name: 'Jorge Luis Huamán',
    documentType: 'DNI',
    documentNumber: '45192834',
    phone: '+51 955 831 229',
    email: 'jorge.huaman@yahoo.es',
    address: 'Av. Las Palmeras 890, Los Olivos',
    location: 'Los Olivos, Lima',
    creditLimit: 2000,
    creditUsed: 1000,
    totalDebt: 1000,
    overdueDays: 6,
    status: 'mora',
    paymentTermsDays: 15,
    initials: 'JH',
  },
  {
    id: 'elena-castro',
    name: 'Elena Castro Ríos',
    documentType: 'DNI',
    documentNumber: '09283741',
    phone: '+51 966 409 110',
    email: 'elena.castro@gmail.com',
    address: 'Calle Schell 341, Miraflores',
    location: 'Miraflores, Lima',
    creditLimit: 3000,
    creditUsed: 580,
    totalDebt: 580,
    overdueDays: 0,
    status: 'con-deuda',
    paymentTermsDays: 30,
    initials: 'EC',
  },
  {
    id: 'minimarket-san-martin',
    name: 'Minimarket San Martín S.A.C.',
    documentType: 'RUC',
    documentNumber: '20601248901',
    phone: '+51 988 234 112',
    email: 'administracion@sanmartin.pe',
    address: 'Av. San Martín 820, Barranco',
    location: 'Barranco, Lima',
    creditLimit: 8000,
    creditUsed: 4200.69,
    totalDebt: 4200.69,
    overdueDays: 0,
    status: 'con-deuda',
    paymentTermsDays: 30,
    initials: 'MS',
  },
  {
    id: 'ferreteria-los-andes',
    name: 'Ferretería Los Andes',
    documentType: 'RUC',
    documentNumber: '20491823901',
    phone: '+51 971 445 889',
    email: 'losandes@ferreteria.pe',
    address: 'Av. Pachacútec 502, Villa María',
    location: 'Villa María, Lima',
    creditLimit: 5000,
    creditUsed: 2450,
    totalDebt: 2450,
    overdueDays: 24,
    status: 'mora',
    paymentTermsDays: 15,
    initials: 'FA',
  }
];

export const INITIAL_ACCOUNTS: CreditAccount[] = [
  {
    documentCode: 'F001-0842',
    clientName: 'Minimarket San Martín S.A.C.',
    clientDoc: 'RUC 20601248901',
    clientInitials: 'MS',
    originalCapital: 6000.0,
    pendingBalance: 4098.24,
    compensatoryInterest: 102.45,
    moratoryInterest: 0.0,
    totalOwed: 4200.69,
    dueDate: '15 May 2024',
    overdueDays: 0,
    status: 'al-dia',
    statusLabel: 'Al Día (Cuota 3/6)',
    tea: 32.5,
    tem: 2.5,
    installments: [
      {
        number: 1,
        totalInstallments: 6,
        dueDate: '15 Mar 2024',
        initialBalance: 6000.0,
        interest: 150.0,
        amortization: 939.47,
        installmentAmount: 1089.47,
        finalBalance: 5060.53,
        status: 'pagada',
        documentCode: 'F001-0842',
      },
      {
        number: 2,
        totalInstallments: 6,
        dueDate: '15 Abr 2024',
        initialBalance: 5060.53,
        interest: 126.51,
        amortization: 962.96,
        installmentAmount: 1089.47,
        finalBalance: 4097.57,
        status: 'pagada',
        documentCode: 'F001-0842',
      },
      {
        number: 3,
        totalInstallments: 6,
        dueDate: '15 May 2024',
        initialBalance: 4097.57,
        interest: 102.44,
        amortization: 987.03,
        installmentAmount: 1089.47,
        finalBalance: 3110.54,
        status: 'por-vencer',
        documentCode: 'F001-0842',
      },
      {
        number: 4,
        totalInstallments: 6,
        dueDate: '15 Jun 2024',
        initialBalance: 3110.54,
        interest: 77.76,
        amortization: 1011.71,
        installmentAmount: 1089.47,
        finalBalance: 2098.83,
        status: 'pendiente',
        documentCode: 'F001-0842',
      },
      {
        number: 5,
        totalInstallments: 6,
        dueDate: '15 Jul 2024',
        initialBalance: 2098.83,
        interest: 52.47,
        amortization: 1037.0,
        installmentAmount: 1089.47,
        finalBalance: 1061.83,
        status: 'pendiente',
        documentCode: 'F001-0842',
      },
      {
        number: 6,
        totalInstallments: 6,
        dueDate: '15 Ago 2024',
        initialBalance: 1061.83,
        interest: 27.64,
        amortization: 1061.83,
        installmentAmount: 1089.47,
        finalBalance: 0.0,
        status: 'pendiente',
        documentCode: 'F001-0842',
      },
    ],
  },
  {
    documentCode: 'F001-0799',
    clientName: 'Distribuidora Los Laureles E.I.R.L.',
    clientDoc: 'RUC 20554902131',
    clientInitials: 'DL',
    originalCapital: 4500.0,
    pendingBalance: 2340.0,
    compensatoryInterest: 84.2,
    moratoryInterest: 115.8,
    totalOwed: 2540.0,
    dueDate: '10 Abr 2024',
    overdueDays: 18,
    status: 'vencido',
    statusLabel: 'Vencido 18d',
    tea: 28.0,
    tem: 2.1,
    installments: [],
  },
  {
    documentCode: 'B001-1402',
    clientName: 'Abarrotes & Carnes Rosaura',
    clientDoc: 'DNI 44321098',
    clientInitials: 'AR',
    originalCapital: 1800.0,
    pendingBalance: 920.0,
    compensatoryInterest: 23.0,
    moratoryInterest: 0.0,
    totalOwed: 943.0,
    dueDate: '02 May 2024',
    overdueDays: 0,
    status: 'por-vencer',
    statusLabel: 'Próximo a Vencer',
    tea: 0.0,
    tem: 0.0,
    installments: [],
  },
  {
    documentCode: 'F001-0810',
    clientName: 'Comercial La Esperanza',
    clientDoc: 'RUC 20498711204',
    clientInitials: 'CL',
    originalCapital: 8400.0,
    pendingBalance: 5600.0,
    compensatoryInterest: 112.0,
    moratoryInterest: 0.0,
    totalOwed: 5712.0,
    dueDate: '28 May 2024',
    overdueDays: 0,
    status: 'al-dia',
    statusLabel: 'Al Día (Cuota 2/6)',
    tea: 30.0,
    tem: 2.2,
    installments: [],
  },
];

export const INITIAL_TRANSACTIONS: PaymentTransaction[] = [
  {
    receiptNumber: 'RC-004818',
    operationCode: 'OP-831920',
    dateTime: 'Hoy, 15:42 hrs',
    clientName: 'Carlos Mamani Paredes',
    clientDoc: 'DNI 42819302',
    clientInitials: 'CM',
    paymentMethod: 'yape',
    totalPaid: 500.0,
    moraPaid: 0.0,
    interestPaid: 25.5,
    capitalPaid: 474.5,
    appliedQuota: 'Cuota 01/06 (Liq.)',
    receiptType: 'Recibo Caja',
  },
  {
    receiptNumber: 'RC-004817',
    operationCode: 'OP-193021',
    dateTime: 'Hoy, 14:15 hrs',
    clientName: 'Minimarket San Martín S.A.C.',
    clientDoc: 'RUC 20581920391',
    clientInitials: 'SM',
    paymentMethod: 'transferencia',
    totalPaid: 1250.0,
    moraPaid: 45.0,
    interestPaid: 85.0,
    capitalPaid: 1120.0,
    appliedQuota: 'Cuota 03/04 (Atrasada)',
    receiptType: 'Boleta Electrónica',
  },
  {
    receiptNumber: 'RC-004816',
    operationCode: 'OP-CASH-08',
    dateTime: 'Hoy, 11:30 hrs',
    clientName: 'Distribuidora Los Laureles E.I.R.L.',
    clientDoc: 'RUC 20601934812',
    clientInitials: 'DL',
    paymentMethod: 'efectivo',
    totalPaid: 850.0,
    moraPaid: 0.0,
    interestPaid: 52.0,
    capitalPaid: 798.0,
    appliedQuota: 'Cuota 02/06',
    receiptType: 'Recibo Caja',
  },
  {
    receiptNumber: 'RC-004815',
    operationCode: 'OP-941824',
    dateTime: 'Hoy, 09:50 hrs',
    clientName: 'Juana Quispe Ramos',
    clientDoc: 'DNI 10839201',
    clientInitials: 'JQ',
    paymentMethod: 'plin',
    totalPaid: 350.0,
    moraPaid: 25.0,
    interestPaid: 38.0,
    capitalPaid: 287.0,
    appliedQuota: 'Cuota 01/03 (Venc.)',
    receiptType: 'Recibo Caja',
  },
];

/**
 * French Amortization Calculator:
 * R = P * [i * (1+i)^n] / [(1+i)^n - 1]
 */
export function calculateFrenchSchedule(
  principal: number,
  monthlyRatePercent: number,
  installmentsCount: number,
  frequency: 'Mensual' | 'Quincenal' | 'Semanal' = 'Mensual',
  startDate: Date = new Date()
): Installment[] {
  const i = monthlyRatePercent / 100;
  let fixedQuota: number;

  if (i === 0) {
    fixedQuota = principal / installmentsCount;
  } else {
    fixedQuota = (principal * (i * Math.pow(1 + i, installmentsCount))) / (Math.pow(1 + i, installmentsCount) - 1);
  }

  let currentBalance = principal;
  const schedule: Installment[] = [];

  for (let n = 1; n <= installmentsCount; n++) {
    const interest = i === 0 ? 0 : currentBalance * i;
    const amortization = fixedQuota - interest;
    const finalBalance = Math.max(0, currentBalance - amortization);

    // Calculate due date based on frequency
    const dueDate = new Date(startDate);
    if (frequency === 'Semanal') {
      dueDate.setDate(dueDate.getDate() + n * 7);
    } else if (frequency === 'Quincenal') {
      dueDate.setDate(dueDate.getDate() + n * 15);
    } else {
      dueDate.setMonth(dueDate.getMonth() + n);
    }

    const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Dic'];
    const formattedDate = `${dueDate.getDate().toString().padStart(2, '0')} ${monthNames[dueDate.getMonth()]} ${dueDate.getFullYear()}`;

    schedule.push({
      number: n,
      totalInstallments: installmentsCount,
      dueDate: formattedDate,
      initialBalance: parseFloat(currentBalance.toFixed(2)),
      interest: parseFloat(interest.toFixed(2)),
      amortization: parseFloat(amortization.toFixed(2)),
      installmentAmount: parseFloat(fixedQuota.toFixed(2)),
      finalBalance: parseFloat(finalBalance.toFixed(2)),
      status: n === 1 ? 'por-vencer' : 'pendiente',
    });

    currentBalance = finalBalance;
  }

  return schedule;
}
