export interface OnboardingData {
  step: number;
  personalInfo: {
    nom: string;
    prenom: string;
    email: string;
    password: string;
    avatar?: File;
  };
  financialGoals: {
    primaryGoal: 'SAVING' | 'BUDGETING' | 'DEBT' | 'INVESTING' | 'TRACKING';
    monthlyIncome: number;
    savingsTarget?: number;
    debtAmount?: number;
  };
  spendingCategories: {
    foodBudget: number;
    transportBudget: number;
    entertainmentBudget: number;
    housingBudget: number;
    otherBudget: number;
  };
  notifications: {
    budgetAlerts: boolean;
    weeklyReports: boolean;
    largeExpenses: boolean;
  };
}

export interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}