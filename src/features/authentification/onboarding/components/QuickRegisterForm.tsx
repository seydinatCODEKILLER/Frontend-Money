import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { AvatarUpload } from "./AvatarUpload";

const quickRegisterSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  prenom: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  password: z.string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre"),
  avatar: z.instanceof(File).optional(),
});

type QuickRegisterFormData = z.infer<typeof quickRegisterSchema>;

interface QuickRegisterFormProps {
  onSubmit: (data: QuickRegisterFormData) => void;
  isPending: boolean;
}

export const QuickRegisterForm = ({ onSubmit, isPending }: QuickRegisterFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<QuickRegisterFormData>({
    resolver: zodResolver(quickRegisterSchema),
    defaultValues: {
      nom: "",
      prenom: "",
      email: "",
      password: "",
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Avatar */}
          <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-center block">
                  Photo de profil (optionnel)
                </FormLabel>
                <FormControl>
                  <AvatarUpload
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage className="text-center" />
              </FormItem>
            )}
          />

          {/* Nom et Prénom */}
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

          {/* Email */}
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

          {/* Mot de passe */}
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

          {/* Bouton de soumission */}
          <Button
            type="submit"
            disabled={isPending}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            size="lg"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Création du compte...
              </>
            ) : (
              "Créer mon compte"
            )}
          </Button>
        </form>
      </Form>
    </motion.div>
  );
};