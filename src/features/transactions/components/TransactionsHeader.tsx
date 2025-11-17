import { PageHeader } from '@/components/shared/PageHeader';
import { Plus } from 'lucide-react';

interface TransactionsHeaderProps {
  onAddTransaction: () => void;
}

export function TransactionsHeader({ onAddTransaction }: TransactionsHeaderProps) {
  // Actions principales
  const actions = [
    {
      label: 'Nouvelle transaction',
      icon: <Plus className="w-4 h-4" />,
      onClick: onAddTransaction,
      variant: 'default' as const,
    }
  ];

  return (
    <PageHeader
      title="Gestion des Transactions"
      description="Gérez vos revenus et dépenses en toute simplicité"
      icon="💰"
      actions={actions}
    />
  );
}