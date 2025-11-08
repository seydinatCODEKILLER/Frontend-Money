import { useState } from 'react';
import { RecommendationsGrid } from '../components/RecommendationsGrid';
import { RecommendationsFilters } from '../components/RecommendationsFilters';
import { useGenerateRecommendations } from '../hooks/useRecommendations';
import { RecommendationHeader } from '../components/RecommendationHeader';
import { FloatingChatButton } from '@/features/chat-ia/components/FloatingChatButton';

export function RecommendationsPage() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    type: '',
  });

  const generateMutation = useGenerateRecommendations();

  const handleGenerateNew = () => {
    generateMutation.mutate();
  };

  const handleFiltersChange = (newFilters: { type: string }) => {
    setFilters(newFilters);
    setPage(1);
  };

  return (
    <div className="container mx-auto p-2 md:p-4 lg:p-6 space-y-6">
      <RecommendationHeader/>
      <RecommendationsFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onGenerateNew={handleGenerateNew}
        isGenerating={generateMutation.isPending}
      />

      <RecommendationsGrid
        page={page}
        filters={filters}
        onPageChange={setPage}
        onGenerateNew={handleGenerateNew}
      />
      <FloatingChatButton />
    </div>
  );
}