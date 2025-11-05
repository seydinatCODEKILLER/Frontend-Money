// types/transaction.types.ts
export type TransactionType = "REVENUE" | "DEPENSE";
export type TransactionStatus = "ACTIVE" | "DELETED";

export interface Transaction {
  id: string;
  userId: string;
  type: TransactionType;
  amount: number;
  categoryId: string | null;
  category?: {
    id: string;
    name: string;
    color: string | null;
    icon: string | null;
  };
  description: string | null;
  date: string;
  status: TransactionStatus;
  createdAt: string;
  updatedAt: string;
}

export interface TransactionsResponse {
  transactions: Transaction[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface TransactionFilters {
  search?: string;
  type?: TransactionType | "";
  categoryId?: string;
  startDate?: string;
  endDate?: string;
  page: number;
  limit: number;
  status?: TransactionStatus | "ALL";
}