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
    if (files && files.length > 0) {
      const file = files[0];
      
      // Validation basique du fichier
      if (!file.type.startsWith('image/')) {
        console.warn('Le fichier sélectionné n\'est pas une image');
        return;
      }

      const previewUrl = URL.createObjectURL(file);
      setAvatarPreview(previewUrl);
      
      // Mise à jour des données avec le nouveau fichier
      const currentFormData = form.getValues();
      onUpdate({ 
        ...currentFormData, 
        avatar: file 
      });
    }
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
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-2xl"
      >
        {/* En-tête */}
        <div className="text-center mb-8">
          <motion.div
            className="w-16 h-16 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-2xl mx-auto mb-4 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
          >
            <User className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-2">
            Créer votre profil
          </h2>
          <p className="text-slate-600 dark:text-slate-300">
            Personnalisez votre expérience MoneyWise
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Avatar Upload */}
            <div className="flex justify-center">
              <motion.div
                className="relative cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAvatarClick}
                role="button"
                tabIndex={0}
                onKeyDown={(e: React.KeyboardEvent) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleAvatarClick();
                  }
                }}
              >
                <Avatar className="w-24 h-24 border-4 border-white dark:border-slate-800 shadow-lg">
                  {avatarPreview ? (
                    <AvatarImage 
                      src={avatarPreview} 
                      alt="Aperçu de l'avatar" 
                      onLoad={() => cleanupAvatarPreview()}
                    />
                  ) : (
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-emerald-500 text-white text-2xl">
                      <User className="w-8 h-8" />
                    </AvatarFallback>
                  )}
                </Avatar>
                
                {/* Input fichier caché */}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  ref={fileInputRef}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                    handleAvatarChange(e.target.files)
                  }
                />
                
                {/* Badge d'upload */}
                <motion.div
                  className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-full shadow-lg"
                  whileHover={{ scale: 1.1 }}
                >
                  <Upload className="w-4 h-4" />
                </motion.div>
              </motion.div>
            </div>

            {/* Champ Prénom */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="prenom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Prénom *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Votre prénom"
                        className="h-12 rounded-xl border-2 border-slate-200 focus:border-blue-500 transition-all"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Champ Nom */}
              <FormField
                control={form.control}
                name="nom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Nom *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Votre nom"
                        className="h-12 rounded-xl border-2 border-slate-200 focus:border-blue-500 transition-all"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Champ Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Email *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="votre@email.com"
                      type="email"
                      className="h-12 rounded-xl border-2 border-slate-200 focus:border-blue-500 transition-all"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Champ Mot de passe */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Mot de passe *</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Votre mot de passe"
                        type={showPassword ? "text" : "password"}
                        className="h-12 rounded-xl border-2 border-slate-200 focus:border-blue-500 pr-12 transition-all"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-12 w-12 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Cacher le mot de passe" : "Afficher le mot de passe"}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-slate-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-slate-400" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Boutons de navigation */}
            <div className="flex justify-between pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                className="rounded-xl px-8"
              >
                Retour
              </Button>
              
              <Button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white rounded-xl px-8 shadow-lg shadow-blue-500/25"
              >
                Continuer
              </Button>
            </div>
          </form>
        </Form>
      </motion.div>
    </div>
  );
};