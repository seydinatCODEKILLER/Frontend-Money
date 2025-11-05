import { z } from 'zod';

export const transactionFormSchema = z.object({
  type: z.enum(["REVENUE", "DEPENSE"]),
  amount: z.number()
    .min(0.01, "Le montant doit être supérieur à 0")
    .max(1000000, "Le montant ne peut pas dépasser 1 000 000"),
  categoryId: z.string().nullable(),
  description: z.string()
    .max(500, "La description ne peut pas dépasser 500 caractères")
    .nullable()
    .optional(),
  date: z.string().min(1, "La date est requise"),
});

export type TransactionFormValues = z.infer<typeof transactionFormSchema>;