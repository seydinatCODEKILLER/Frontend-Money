import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CategoryForm } from './CategoryForm';
import { useCreateCategory, useUpdateCategory } from '../hooks/useCategories';
import type { Category } from '../types/category.types';
import type { CategoryFormValues } from '../validations/category.schema';

interface CategoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: Category | null;
}

export function CategoryModal({ open, onOpenChange, category }: CategoryModalProps) {
  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditing = !!category;

  const handleSubmit = async (data: CategoryFormValues) => {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        await updateMutation.mutateAsync({ id: category.id, data });
      } else {
        await createMutation.mutateAsync(data);
      }
      onOpenChange(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
          </DialogTitle>
          <DialogDescription>
            {isEditing 
              ? 'Modifiez les informations de votre catégorie.'
              : 'Créez une nouvelle catégorie pour organiser vos transactions.'
            }
          </DialogDescription>
        </DialogHeader>
        <CategoryForm
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          onCancel={() => onOpenChange(false)}
          defaultValues={category ? {
            name: category.name,
            type: category.type,
            color: category.color || undefined,
            icon: category.icon || undefined,
            budgetLimit: category.budgetLimit,
          } : undefined}
        />
      </DialogContent>
    </Dialog>
  );
}