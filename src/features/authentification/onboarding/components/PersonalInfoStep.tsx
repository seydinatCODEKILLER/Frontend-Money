import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Upload, Eye, EyeOff } from "lucide-react";
import { useState, useRef } from "react";

// Schéma de validation avec Zod
const personalInfoSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  prenom: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  password: z.string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre"),
  avatar: z.instanceof(File).optional().nullable(),
});

// Type déduit du schéma Zod
type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;

// Props typées pour le composant
interface PersonalInfoStepProps {
  data: PersonalInfoFormData;
  onUpdate: (data: PersonalInfoFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

export const PersonalInfoStep = ({ data, onUpdate, onNext, onBack }: PersonalInfoStepProps) => {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialisation du formulaire avec typage explicite
  const form = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      nom: data.nom,
      prenom: data.prenom,
      email: data.email,
      password: data.password,
      avatar: data.avatar ?? undefined,
    },
  });

  // Gestion du changement d'avatar avec typage approprié
  const handleAvatarChange = (files: FileList | null): void => {
  if (!files?.length) return;
  const file = files[0];

  if (!file.type.startsWith("image/")) return;

  const previewUrl = URL.createObjectURL(file);
  setAvatarPreview(previewUrl);

  // ✅ Mettre à jour react-hook-form
  form.setValue("avatar", file, { shouldValidate: true });

  // ✅ Mettre à jour les données de l'étape (onboarding)
  onUpdate({ ...form.getValues(), avatar: file });
};



  // Soumission du formulaire avec typage
  const onSubmit = (formData: PersonalInfoFormData): void => {
    onUpdate(formData);
    onNext();
  };

  // Nettoyage de l'URL de prévisualisation
  const cleanupAvatarPreview = (): void => {
    if (avatarPreview) {
      URL.revokeObjectURL(avatarPreview);
    }
  };

  // Gestion du clic sur l'avatar
  const handleAvatarClick = (): void => {
    fileInputRef.current?.click();
  };

  return (
  <div className=" ">
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45 }}
      className="w-full lg:max-w-5xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/50 dark:border-slate-600/50 rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] p-4"
    >

      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-semibold text-slate-800 dark:text-white">
          Créer votre profil ✨
        </h2>
        <p className="text-sm text-slate-500">
          Personnalisez votre expérience MoneyWise
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 items-center">

            {/* ---- Avatar Section (Left) ---- */}
            <div className="flex flex-col items-center gap-6">

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative cursor-pointer select-none"
                onClick={handleAvatarClick}
              >
                <Avatar className="w-40 h-40 border-4 border-white shadow-xl">
                  {avatarPreview ? (
                    <AvatarImage src={avatarPreview} onLoad={() => cleanupAvatarPreview()} />
                  ) : (
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-emerald-500 text-white text-4xl flex items-center justify-center">
                      <User className="w-12 h-12" />
                    </AvatarFallback>
                  )}
                </Avatar>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleAvatarChange(e.target.files)}
                />

                <motion.div
                  whileHover={{ scale: 1.12 }}
                  className="absolute -bottom-3 -right-3 bg-emerald-500 text-white p-3 rounded-full shadow-lg"
                >
                  <Upload className="w-5 h-5" />
                </motion.div>
              </motion.div>

              <p className="text-center text-sm text-slate-500">
                Cliquez sur l’avatar pour télécharger une image
              </p>
            </div>

            {/* ---- Form Fields (Right) ---- */}
            <div className="space-y-6">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="prenom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prénom *</FormLabel>
                      <FormControl>
                        <Input {...field} className="h-12 rounded-xl" placeholder="Votre prénom" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="nom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom *</FormLabel>
                      <FormControl>
                        <Input {...field} className="h-12 rounded-xl" placeholder="Votre nom" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input {...field} className="h-12 rounded-xl" placeholder="exemple@email.com"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mot de passe *</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          className="h-12 rounded-xl pr-12"
                          placeholder="Votre mot de passe"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-12 w-12"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff /> : <Eye />}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-10">
            <Button variant="outline" onClick={onBack} className="rounded-xl px-8">
              Retour
            </Button>
            <Button type="submit" className="rounded-xl px-10 bg-gradient-to-r from-blue-600 to-emerald-600 text-white shadow-lg">
              Continuer
            </Button>
          </div>
        </form>
      </Form>

    </motion.div>
  </div>
);

};