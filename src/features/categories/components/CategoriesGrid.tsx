import { CategoryCard } from "./CategoryCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useCategories } from "../hooks/useCategories";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Category } from "../types/category.types";
import { PaginationControls } from "@/components/shared/PaginationControls";

interface CategoriesGridProps {
  page: number;
  filters: {
    search: string;
    type: string;
    status: string;
  };
  onPageChange: (page: number) => void;
  onEditCategory: (category: Category) => void;
  onDeleteCategory: (category: Category) => void;
  onRestoreCategory: (category: Category) => void;
}

export function CategoriesGrid({
  page,
  filters,
  onPageChange,
  onEditCategory,
  onDeleteCategory,
  onRestoreCategory,
}: CategoriesGridProps) {
  const { data, isLoading, error, refetch } = useCategories({
    page,
    limit: 12,
    search: filters.search,
    type: filters.type as "REVENUE" | "DEPENSE" | "",
    status: filters.status as "ACTIVE" | "DELETED" | "ALL",
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <Skeleton key={i} className="h-48 rounded-lg" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <RefreshCw className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground mb-4">
          Erreur lors du chargement des catégories
        </p>
        <Button onClick={() => refetch()} variant="outline">
          Réessayer
        </Button>
      </div>
    );
  }

  if (!data?.categories || data.categories.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          {filters.search || filters.type
            ? "Aucune catégorie trouvée avec ces critères"
            : "Aucune catégorie enregistrée"}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {data.categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onEdit={() => onEditCategory(category)}
            onDelete={() => onDeleteCategory(category)}
            onRestore={() => onRestoreCategory(category)}
          />
        ))}
      </div>

      {data.pagination.total > 1 && (
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