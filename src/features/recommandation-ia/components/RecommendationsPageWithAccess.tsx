import { useAuth } from '@/hooks/useAuth';
import { RecommendationsPage } from '../pages/RecommendationsPage';
import { UnauthorizedRecommendationsView } from './UnauthorizedRecommendationsView';

export function RecommendationsPageWithAccess() {
  const { user } = useAuth();

  // Si l'utilisateur n'est pas autorisé à utiliser l'IA
  if (!user?.canUseAI) {
    return <UnauthorizedRecommendationsView />;
  }

  // Si l'utilisateur est autorisé, afficher la page normale
  return <RecommendationsPage />;
}