// features/recommendations/components/RecommendationsPage.tsx
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { RecommendationsGrid } from '../components/RecommendationsGrid';
import { FloatingChatButton } from '@/features/chat-ia/components/FloatingChatButton';
import { RecommendationHeader } from '../components/RecommendationHeader';

export function RecommendationsPage() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    type: '',
  });

  const { user } = useAuth();

  const handleFiltersChange = (newFilters: { type: string }) => {
    setFilters(newFilters);
    setPage(1); // Reset à la première page quand les filtres changent
  };

  const handleGenerateNew = () => {
    console.log('Génération lancée depuis le header');
  };

  return (
    <div className="container mx-auto p-2 md:p-4 lg:p-6 space-y-6">
      <RecommendationHeader
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onGenerateNew={handleGenerateNew}
      />
      
      {/* Ne montrer la grille que si l'utilisateur a accès */}
      {user?.canUseAI && (
        <RecommendationsGrid
          page={page}
          filters={filters}
          onPageChange={setPage}
        />
      )}
      
      <FloatingChatButton />
    </div>
  );
}