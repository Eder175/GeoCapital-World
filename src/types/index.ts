export interface Debt {
  id: string;
  name: string;
  currentAmount: number;
  minimumPayment: number;
  interestRate: number;
  dueDate?: string;
  creditor?: string;
  createdAt?: string;
  notes?: string;
}

export interface Payment {
  id: string;
  debtId: string;
  amount: number;
  method?: 'card' | 'bank' | 'cash';
  createdAt: string;
  note?: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  premium?: boolean;
}

export type DebtStatus = 'basic' | 'active' | 'expired';
