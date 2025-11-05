import { Routes, Route, Navigate } from "react-router-dom";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { LandingPage } from "@/features/landingPage/pages/LandingPage";
import { LoginForm } from "@/features/authentification/login/components/LoginForm";
import { ForgotPasswordForm } from "@/features/authentification/forgot-password/componenets/ForgotPasswordForm";
import { ResetPasswordForm } from "@/features/authentification/reset-password/components/ResetPasswordForm";
import { ProtectedRoute } from "./ProtectedRoute";
import { MainLayout } from "@/components/layout/MainLayout";
import { Dashboard } from "@/features/dashboard/pages/Dashbaord";
import Transaction from "@/features/transactions/pages/Transaction";
import { OnboardingPage } from "@/features/authentification/onboarding/pages/OnboardingPage";
import { CategoriesManager } from "@/features/categories/pages/CategoriesManager";

export const AppRoutes = () => {
  return (
    <PageWrapper>
      <Routes>
        {/* Routes publiques */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<OnboardingPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route path="/reset-password" element={<ResetPasswordForm />} />
        
        {/* Routes protégées */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="analytics" element={<Dashboard />} />
          <Route path="transactions" element={<Transaction />} />
          <Route path="categories" element={<CategoriesManager />} />
          <Route path="" element={<Navigate to="/dashboard/analytics" replace />} />
        </Route>
        
        {/* Route par défaut */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </PageWrapper>
  );
};