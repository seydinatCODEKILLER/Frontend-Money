import { z } from 'zod';

export const categoryFormSchema = z.object({
  name: z.string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50, "Le nom ne peut pas dépasser 50 caractères"),
  type: z.enum(["REVENUE", "DEPENSE"]),
  color: z.string().optional(),
  icon: z.string().optional(),
  budgetLimit: z.union([
    z.number().nullable()
  ]).refine(
    (val) => val === null || (typeof val === 'number' && val >= 0),
    "Le budget doit être un nombre positif ou vide"
  ).nullable(),
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;