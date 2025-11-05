// components/transactions/TransactionsHeader.tsx
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface TransactionsHeaderProps {
  onAddTransaction: () => void;
}

export function TransactionsHeader({ onAddTransaction }: TransactionsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Gestion des Transactions
        </h1>
        <p className="text-muted-foreground mt-2">
          Gérez vos revenus et dépenses
        </p>
      </div>
      <Button onClick={onAddTransaction} className="flex items-center gap-2 cursor-pointer">
        <Plus className="w-4 h-4" />
        Nouvelle transaction
      </Button>
    </div>
  );
}