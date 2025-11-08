// features/recommendations/types/recommendation.types.ts
export type RecommendationType = 
  | "BUDGET_ALERT"
  | "SPENDING_PATTERN"
  | "SAVING_OPPORTUNITY"
  | "DEBT_REDUCTION"
  | "INVESTMENT_SUGGESTION"
  | "CATEGORY_OPTIMIZATION"
  | "SUBSCRIPTION_REVIEW"
  | "INCOME_OPTIMIZATION"
  | "GOAL_PROGRESSION"
  | "SYSTEM_SUGGESTION";

export interface FinancialRecommendation {
  id: string;
  userId: string;
  type: RecommendationType;
  title: string;
  message: string;
  categoryId: string | null;
  category?: {
    id: string;
    name: string;
    color: string | null;
    icon: string | null;
  };
  createdAt: string;
  updatedAt: string;
}

export interface RecommendationsResponse {
  recommendations: FinancialRecommendation[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface RecommendationFilters {
  type?: RecommendationType | "";
  page: number;
  limit: number;
}