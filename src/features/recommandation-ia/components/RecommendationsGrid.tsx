import { RecommendationCard } from "./RecommendationCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { RefreshCw, Lightbulb } from "lucide-react";
import { useRecommendations, useDeleteRecommendation } from "../hooks/useRecommendations";
import { PaginationControls } from "@/components/shared/PaginationControls";
import type { RecommendationType } from "../types/recommendation.types";

interface RecommendationsGridProps {
  page: number;
  filters: {
    type: string;
  };
  onPageChange: (page: number) => void;
  onGenerateNew?: () => void;
}

export function RecommendationsGrid({
  page,
  filters,
  onPageChange,
  onGenerateNew,
}: RecommendationsGridProps) {
  const { data, isLoading, error, refetch } = useRecommendations({
    page,
    limit: 9,
    type: filters.type as RecommendationType,
  });

  const deleteMutation = useDeleteRecommendation();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-80 rounded-2xl" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <RefreshCw className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground mb-4">
          Erreur lors du chargement des recommandations
        </p>
        <Button onClick={() => refetch()} variant="outline">
          Réessayer
        </Button>
      </div>
    );
  }

  if (!data?.recommendations || data.recommendations.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20 flex items-center justify-center">
          <Lightbulb className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Aucune recommandation pour le moment
        </h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          {filters.type 
            ? "Aucune recommandation trouvée pour ce type. Essayez de modifier vos filtres ou générez de nouvelles recommandations."
            : "Générez des recommandations personnalisées basées sur vos transactions pour optimiser vos finances."
          }
        </p>
        {onGenerateNew && (
          <Button onClick={onGenerateNew} className="cursor-pointer">
            <Lightbulb className="w-4 h-4 mr-2" />
            Générer des recommandations
          </Button>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.recommendations.map((recommendation) => (
          <RecommendationCard
            key={recommendation.id}
            recommendation={recommendation}
            onDelete={() => deleteMutation.mutate(recommendation.id)}
            isDeleting={deleteMutation.isPending}
          />
        ))}
      </div>

      {data.pagination.pages > 1 && (
        <div className="flex justify-center mt-8">
          <PaginationControls
            currentPage={page}
            totalPages={data.pagination.pages}
            onPageChange={onPageChange}
            totalItems={data.pagination.total}
            itemsPerPage={data.pagination.limit}
          />
        </div>
      )}
    </>
  );
}