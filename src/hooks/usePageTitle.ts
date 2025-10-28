import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { pageTitles } from "@/routes/pageTitles";

export const usePageTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const title = pageTitles[location.pathname] || "Mon Application";
    document.title = title;
  }, [location.pathname]);
};
