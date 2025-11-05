// validations/profile.schema.ts
import { z } from 'zod';

export const profileFormSchema = z.object({
  nom: z.string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50, "Le nom ne peut pas dépasser 50 caractères")
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, "Le nom ne doit contenir que des lettres"),
  prenom: z.string()
    .min(2, "Le prénom doit contenir au moins 2 caractères")
    .max(50, "Le prénom ne peut pas dépasser 50 caractères")
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, "Le prénom ne doit contenir que des lettres"),
  email: z.string().email("Adresse email invalide"),
  avatarFile: z.instanceof(File).optional(),
}).refine((data) => {
  if (data.avatarFile) {
    return data.avatarFile.size <= 5 * 1024 * 1024;
  }
  return true;
}, {
  message: "L'avatar ne doit pas dépasser 5MB",
  path: ["avatarFile"],
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;