export type TransactionType = "REVENUE" | "DEPENSE";
export type CategoryStatus = "ACTIVE" | "DELETED";

export interface Category {
  id: string;
  userId: string;
  name: string;
  type: TransactionType;
  color: string | null;
  icon: string | null;
  budgetLimit: number | null;
  isDefault: boolean;
  status: CategoryStatus;
  createdAt: string;
  updatedAt: string;
  _count?: {
    transactions: number;
  };
}

export interface CategoriesResponse {
  categories: Category[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface CategoryFilters {
  search: string;
  type: TransactionType | "";
  page: number;
  limit: number;
  status?: CategoryStatus | "ALL";
}