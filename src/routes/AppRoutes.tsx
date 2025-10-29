import { Routes, Route, Navigate } from "react-router-dom";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { LandingPage } from "@/features/landingPage/pages/LandingPage";
import { LoginForm } from "@/features/authentification/login/components/LoginForm";
import { RegisterForm } from "@/features/authentification/register/components/RegisterForm";
import { ForgotPasswordForm } from "@/features/authentification/forgot-password/componenets/ForgotPasswordForm";
import { ResetPasswordForm } from "@/features/authentification/reset-password/components/ResetPasswordForm";


export const AppRoutes = () => {
  return (
    <PageWrapper>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route path="/reset-password" element={<ResetPasswordForm />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </PageWrapper>
  );
};
