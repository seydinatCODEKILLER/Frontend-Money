import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { TransactionForm } from './TransactionForm';
import { useCreateTransaction, useUpdateTransaction } from '../hooks/useTransactions';
import type { Transaction } from '../types/transaction.types';
import type { TransactionFormValues } from '../validations/transaction.schema';

interface TransactionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction?: Transaction | null;
}

export function TransactionModal({ open, onOpenChange, transaction }: TransactionModalProps) {
  const createMutation = useCreateTransaction();
  const updateMutation = useUpdateTransaction();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditing = !!transaction;

  const handleSubmit = async (data: TransactionFormValues) => {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        await updateMutation.mutateAsync({ id: transaction.id, data });
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
            {isEditing ? 'Modifier la transaction' : 'Nouvelle transaction'}
          </DialogTitle>
          <DialogDescription>
            {isEditing 
              ? 'Modifiez les informations de votre transaction.'
              : 'Créez une nouvelle transaction (revenu ou dépense).'
            }
          </DialogDescription>
        </DialogHeader>
        <TransactionForm
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          onCancel={() => onOpenChange(false)}
          defaultValues={transaction ? {
            type: transaction.type,
            amount: transaction.amount,
            categoryId: transaction.categoryId,
            description: transaction.description,
            date: transaction.date.split('T')[0],
          } : undefined}
        />
      </DialogContent>
    </Dialog>
  );
}