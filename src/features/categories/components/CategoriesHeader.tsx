import { PageHeader } from '@/components/shared/PageHeader';
import { Plus } from 'lucide-react';

interface CategoriesHeaderProps {
  onAddCategory: () => void;
}

export function CategoriesHeader({ onAddCategory }: CategoriesHeaderProps) {
  // Actions principales
  const actions = [
    {
      label: 'Nouvelle catégorie',
      icon: <Plus className="w-4 h-4" />,
      onClick: onAddCategory,
      variant: 'default' as const,
    }
  ];

  return (
    <PageHeader
      title="Gestion des Catégories"
      description="Gérez vos catégories de dépenses et de revenus"
      icon="🏷️"
      actions={actions}
      badge={{
        text: 'Organisation',
        variant: 'default'
      }}
    />
  );
}