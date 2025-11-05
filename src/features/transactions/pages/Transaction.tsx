import { useState } from 'react';
import { TransactionsHeader } from '../components/TransactionsHeader';
import { TransactionsFilters } from '../components/TransactionsFilters';
import { TransactionsGrid } from '../components/TransactionsGrid';
import { TransactionsTable } from '../components/TransactionsTable';
import { TransactionModal } from '../components/TransactionModal';
import { DeleteConfirmationModal } from '@/components/shared/DeleteConfirmationModal';
import { ViewToggle } from '@/components/shared/ViewToggle';
import { useTransactions, useDeleteTransaction, useRestoreTransaction } from '../hooks/useTransactions';
import type { Transaction } from '../types/transaction.types';
import { PaginationControls } from '@/components/shared/PaginationControls';
import { useViewMode } from '@/hooks/useViewMode';

export function TransactionsManager() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    categoryId: '',
    startDate: '',
    endDate: '',
    status: 'ACTIVE',
  });
  const [viewMode, setViewMode] = useViewMode('transactions-view', 'card');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [transactionToDelete, setTransactionToDelete] = useState<Transaction | null>(null);
  const [transactionToRestore, setTransactionToRestore] = useState<Transaction | null>(null);

  const deleteMutation = useDeleteTransaction();
  const restoreMutation = useRestoreTransaction();
  
  const { data, isLoading } = useTransactions({
    page,
    limit: viewMode === 'table' ? 20 : 12,
    search: filters.search,
    type: filters.type as 'REVENUE' | 'DEPENSE' | '',
    categoryId: filters.categoryId,
    startDate: filters.startDate,
    endDate: filters.endDate,
    status: filters.status as 'ACTIVE' | 'DELETED' | 'ALL',
  });

  const handleEditTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleDeleteTransaction = (transaction: Transaction) => {
    setTransactionToDelete(transaction);
  };

  const handleRestoreTransaction = (transaction: Transaction) => {
    setTransactionToRestore(transaction);
  };

  const handleConfirmDelete = async () => {
    if (transactionToDelete) {
      await deleteMutation.mutateAsync(transactionToDelete.id);
      setTransactionToDelete(null);
    }
  };

  const handleConfirmRestore = async () => {
    if (transactionToRestore) {
      await restoreMutation.mutateAsync(transactionToRestore.id);
      setTransactionToRestore(null);
    }
  };

  const handleAddTransaction = () => {
    setSelectedTransaction(null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header avec bouton de changement de vue */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <TransactionsHeader onAddTransaction={handleAddTransaction} />
        <ViewToggle 
          viewMode={viewMode} 
          onViewModeChange={setViewMode}
          availableModes={['card', 'table']}
        />
      </div>
      
      <TransactionsFilters 
        filters={filters}
        onFiltersChange={(newFilters) => {
          setFilters(newFilters);
          setPage(1);
        }}
      />

      {/* Affichage conditionnel selon le mode de vue */}
      {viewMode === 'card' ? (
        <TransactionsGrid
          page={page}
          filters={filters}
          onPageChange={setPage}
          onEditTransaction={handleEditTransaction}
          onDeleteTransaction={handleDeleteTransaction}
          onRestoreTransaction={handleRestoreTransaction}
        />
      ) : (
        <TransactionsTable
          transactions={data?.transactions || []}
          onEdit={handleEditTransaction}
          onDelete={handleDeleteTransaction}
          onRestore={handleRestoreTransaction}
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

      <TransactionModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        transaction={selectedTransaction}
      />

      <DeleteConfirmationModal
        open={!!transactionToDelete}
        onOpenChange={(open) => !open && setTransactionToDelete(null)}
        onConfirm={handleConfirmDelete}
        isDeleting={deleteMutation.isPending}
        title="Supprimer la transaction"
        description={`Êtes-vous sûr de vouloir supprimer cette transaction de ${transactionToDelete?.amount}€ ? Cette action est irréversible.`}
      />

      {/* Modal de confirmation pour la restauration */}
      <DeleteConfirmationModal
        open={!!transactionToRestore}
        onOpenChange={(open) => !open && setTransactionToRestore(null)}
        onConfirm={handleConfirmRestore}
        isDeleting={restoreMutation.isPending}
        title="Restaurer la transaction"
        description={`Êtes-vous sûr de vouloir restaurer cette transaction de ${transactionToRestore?.amount}€ ?`}
        confirmText="Restaurer"
        cancelText="Annuler"
      />
    </div>
  );
}