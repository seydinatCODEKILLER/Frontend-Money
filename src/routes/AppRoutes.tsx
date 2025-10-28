import { Routes, Route, Navigate } from "react-router-dom";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { LandingPage } from "@/features/landingPage/pages/LandingPage";


export const AppRoutes = () => {
  return (
    <PageWrapper>
      <Routes>
        <Route
          path="/"
          element={<LandingPage />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </PageWrapper>
  );
};
