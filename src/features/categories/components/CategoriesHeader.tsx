import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface CategoriesHeaderProps {
  onAddCategory: () => void;
}

export function CategoriesHeader({ onAddCategory }: CategoriesHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Gestion des Catégories</h1>
        <p className="text-muted-foreground mt-2">
          Gérez vos catégories de dépenses et de revenus
        </p>
      </div>
      <Button onClick={onAddCategory} className="flex items-center gap-2 coursor-pointer">
        <Plus className="w-4 h-4" />
        Nouvelle catégorie
      </Button>
    </div>
  );
}