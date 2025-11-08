import { useState } from 'react';
import { CategoriesHeader } from '../components/CategoriesHeader';
import { CategoriesFilters } from '../components/CategoriesFilters';
import { CategoriesGrid } from '../components/CategoriesGrid';
import { CategoriesTable } from '../components/CategoriesTable';
import { CategoryModal } from '../components/CategoryModal';
import { DeleteConfirmationModal } from '@/components/shared/DeleteConfirmationModal';
import { ViewToggle } from '@/components/shared/ViewToggle';
import { useCategories, useDeleteCategory, useRestoreCategory } from '../hooks/useCategories';
import type { Category } from '../types/category.types';
import { PaginationControls } from '@/components/shared/PaginationControls';
import { useViewMode } from '@/hooks/useViewMode';
import { FloatingChatButton } from '@/features/chat-ia/components/FloatingChatButton';

export function CategoriesManager() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    status: 'ACTIVE', // Ajout du statut par défaut
  });
  const [viewMode, setViewMode] = useViewMode('categories-view', 'card');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
  const [categoryToRestore, setCategoryToRestore] = useState<Category | null>(null);

  const deleteMutation = useDeleteCategory();
  const restoreMutation = useRestoreCategory();
  
  const { data, isLoading } = useCategories({
    page,
    limit: viewMode === 'table' ? 20 : 12,
    search: filters.search,
    type: filters.type as 'REVENUE' | 'DEPENSE' | '',
    status: filters.status as 'ACTIVE' | 'DELETED' | 'ALL',
  });

  const handleEditCategory = (category: Category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleDeleteCategory = (category: Category) => {
    setCategoryToDelete(category);
  };

  const handleRestoreCategory = (category: Category) => {
    setCategoryToRestore(category);
  };

  const handleConfirmDelete = async () => {
    if (categoryToDelete) {
      await deleteMutation.mutateAsync(categoryToDelete.id);
      setCategoryToDelete(null);
    }
  };

  const handleConfirmRestore = async () => {
    if (categoryToRestore) {
      await restoreMutation.mutateAsync(categoryToRestore.id);
      setCategoryToRestore(null);
    }
  };

  const handleAddCategory = () => {
    setSelectedCategory(null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header avec bouton de changement de vue */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <CategoriesHeader onAddCategory={handleAddCategory} />
        <ViewToggle 
          viewMode={viewMode} 
          onViewModeChange={setViewMode}
          availableModes={['card', 'table']}
        />
      </div>
      
      <CategoriesFilters 
        filters={filters}
        onFiltersChange={(newFilters) => {
          setFilters(newFilters);
          setPage(1);
        }}
      />

      {/* Affichage conditionnel selon le mode de vue */}
      {viewMode === 'card' ? (
        <CategoriesGrid
          page={page}
          filters={filters}
          onPageChange={setPage}
          onEditCategory={handleEditCategory}
          onDeleteCategory={handleDeleteCategory}
          onRestoreCategory={handleRestoreCategory}
        />
      ) : (
        <CategoriesTable
          categories={data?.categories || []}
          onEdit={handleEditCategory}
          onDelete={handleDeleteCategory}
          onRestore={handleRestoreCategory}
          isLoading={isLoading}
        />
      )}

      {/* Pagination pour le mode tableau */}
      {viewMode === 'table' && data?.pagination && data.pagination.pages > 1 && (
        <div className="flex justify-center mt-6">
          <PaginationControls
            currentPage={page}
            totalPages={data.pagination.pages}
            totalItems={data.pagination.total}
            itemsPerPage={viewMode === "table" ? 20 : 12} 
            onPageChange={setPage}
            showInfo
          />
        </div>
      )}

      <CategoryModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        category={selectedCategory}
      />

      <DeleteConfirmationModal
        open={!!categoryToDelete}
        onOpenChange={(open) => !open && setCategoryToDelete(null)}
        onConfirm={handleConfirmDelete}
        isDeleting={deleteMutation.isPending}
        title="Supprimer la catégorie"
        description={`Êtes-vous sûr de vouloir supprimer la catégorie "${categoryToDelete?.name}" ? Cette action est irréversible.`}
      />

      {/* Modal de confirmation pour la restauration */}
      <DeleteConfirmationModal
        open={!!categoryToRestore}
        onOpenChange={(open) => !open && setCategoryToRestore(null)}
        onConfirm={handleConfirmRestore}
        isDeleting={restoreMutation.isPending}
        title="Restaurer la catégorie"
        description={`Êtes-vous sûr de vouloir restaurer la catégorie "${categoryToRestore?.name}" ?`}
        confirmText="Restaurer"
        cancelText="Annuler"
      />

      {/* IA Chat */}
      <FloatingChatButton />
    </div>
  );
}