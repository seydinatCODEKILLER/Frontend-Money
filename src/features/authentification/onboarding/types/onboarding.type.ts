import type { ReactElement } from "react";

export type RegistrationType = "quick" | "custom";

export type FinancialGoalType = 
  | "SAVING" 
  | "BUDGETING" 
  | "DEBT" 
  | "INVESTING" 
  | "TRACKING";

export interface PersonalInfoData {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  avatar?: File;
}

export interface FinancialGoalsData {
  primaryGoal: FinancialGoalType | null;
  monthlyIncome: number;
  savingsTarget?: number;
  debtAmount?: number;
}

export interface SpendingCategoriesData {
  foodBudget: number;
  transportBudget: number;
  entertainmentBudget: number;
  housingBudget: number;
  otherBudget: number;
}

export interface NotificationsData {
  budgetAlerts: boolean;
  weeklyReports: boolean;
  largeExpenses: boolean;
}

export interface OnboardingData {
  registrationType: RegistrationType;
  personalInfo: PersonalInfoData;
  financialGoals: FinancialGoalsData;
  spendingCategories: SpendingCategoriesData;
  notifications: NotificationsData;
}

export interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  icon: ReactElement;
}