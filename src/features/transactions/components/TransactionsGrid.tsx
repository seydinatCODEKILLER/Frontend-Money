import { TransactionCard } from "./TransactionCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useTransactions } from "../hooks/useTransactions";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Transaction } from "../types/transaction.types";
import { PaginationControls } from "@/components/shared/PaginationControls";

interface TransactionsGridProps {
  page: number;
  filters: {
    search: string;
    type: string;
    categoryId: string;
    startDate: string;
    endDate: string;
    status: string;
  };
  onPageChange: (page: number) => void;
  onEditTransaction: (transaction: Transaction) => void;
  onDeleteTransaction: (transaction: Transaction) => void;
  onRestoreTransaction: (transaction: Transaction) => void;
}

export function TransactionsGrid({
  page,
  filters,
  onPageChange,
  onEditTransaction,
  onDeleteTransaction,
  onRestoreTransaction,
}: TransactionsGridProps) {
  const { data, isLoading, error, refetch } = useTransactions({
    page,
    limit: 12,
    search: filters.search,
    type: filters.type as "REVENUE" | "DEPENSE" | "",
    categoryId: filters.categoryId,
    startDate: filters.startDate,
    endDate: filters.endDate,
    status: filters.status as "ACTIVE" | "DELETED" | "ALL",
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-64 rounded-2xl" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <RefreshCw className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground mb-4">
          Erreur lors du chargement des transactions
        </p>
        <Button onClick={() => refetch()} variant="outline">
          Réessayer
        </Button>
      </div>
    );
  }

  if (!data?.transactions || data.transactions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
          <span className="text-2xl">💰</span>
        </div>
        <p className="text-muted-foreground">
          {filters.search || filters.type || filters.categoryId || filters.startDate || filters.endDate
            ? "Aucune transaction trouvée avec ces critères"
            : "Aucune transaction enregistrée"}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {data.transactions.map((transaction) => (
          <TransactionCard
            key={transaction.id}
            transaction={transaction}
            onEdit={() => onEditTransaction(transaction)}
            onDelete={() => onDeleteTransaction(transaction)}
            onRestore={() => onRestoreTransaction(transaction)}
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