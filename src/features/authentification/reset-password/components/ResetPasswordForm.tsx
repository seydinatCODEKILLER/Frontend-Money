import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { resetPasswordSchema } from "../validators/reset-password.schema";
import { useResetPassword } from "../hooks/useResetPassword";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, Eye, EyeOff, Shield, CheckCircle, ArrowLeft, Key } from "lucide-react";
import { Link } from "react-router-dom";

export const ResetPasswordForm = () => {
  const [searchParams] = useSearchParams();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(true);

  const { mutate: resetPassword, isPending } = useResetPassword();

  const token = searchParams.get('token');

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { 
      token: token || "",
      newPassword: "",
      confirmPassword: ""
    },
  });

  // Vérifier la validité du token au chargement
  useEffect(() => {
    if (!token) {
      setIsTokenValid(false);
      return;
    }

    // Ici vous pourriez faire une vérification API du token
    // Pour l'instant on vérifie juste le format UUID
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(token)) {
      setIsTokenValid(false);
    }

    // Pré-remplir le champ token caché
    form.setValue('token', token);
  }, [token, form]);

  const onSubmit = (data: z.infer<typeof resetPasswordSchema>) => {
    resetPassword({
      token: data.token,
      newPassword: data.newPassword
    });
  };

  // État token invalide
  if (!isTokenValid) {
    return (
      <div className="min-h-screen flex bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-black overflow-hidden">
        <div className="flex w-full items-center justify-center p-4 md:p-8">
          <motion.div
            className="w-full max-w-md text-center space-y-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Error Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="flex justify-center"
            >
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                <Key className="w-8 h-8 text-red-600" />
              </div>
            </motion.div>

            {/* Error Message */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">
                Lien invalide ou expiré
              </h2>
              <p className="text-muted-foreground">
                Le lien de réinitialisation est invalide ou a expiré. 
                Veuillez demander un nouveau lien de réinitialisation.
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <Button
                asChild
                className="w-full bg-gradient-to-r from-green-600 to-blue-600"
              >
                <Link to="/forgot-password" className="flex items-center gap-2 justify-center">
                  <Key className="w-4 h-4" />
                  Nouvelle demande de réinitialisation
                </Link>
              </Button>
              
              <Button
                asChild
                variant="outline"
                className="w-full"
              >
                <Link to="/login" className="flex items-center gap-2 justify-center">
                  <ArrowLeft className="w-4 h-4" />
                  Retour à la connexion
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-black overflow-hidden">
      {/* Left Section - Illustration */}
      <motion.div
        className="hidden lg:flex w-1/2 relative overflow-hidden"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="absolute inset-0 w-full h-full">
          <img
            src="https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947_1280.jpg"
            alt="MoneyWise Security"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-blue-600/20 backdrop-blur-[1px]" />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 flex items-center justify-center w-full h-full">
          <motion.div
            className="text-center text-white px-8 max-w-md"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-6 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Nouveau{" "}
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Mot de Passe
              </span>
            </motion.h1>
            <motion.p
              className="text-gray-200 text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              Choisissez un nouveau mot de passe sécurisé pour protéger votre compte MoneyWise.
            </motion.p>

            {/* Security Tips */}
            <motion.div
              className="mt-8 space-y-3 text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              {[
                "🔐 Au moins 8 caractères",
                "⚡ Majuscule et minuscule",
                "🔢 Au moins un chiffre",
                "🛡️ Mot de passe unique"
              ].map((tip, index) => (
                <motion.div
                  key={tip}
                  className="flex items-center gap-3 text-gray-200"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                >
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span className="text-sm">{tip}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Section - Reset Password Form */}
      <motion.div
        className="flex w-full lg:w-1/2 items-center justify-center p-4 md:p-8"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="w-full max-w-md space-y-8"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {/* Header */}
          <motion.div
            className="text-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex justify-center">
              <motion.div
                className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl shadow-2xl"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Key className="w-6 h-6 text-white" />
              </motion.div>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Nouveau mot de passe
              </h2>
              <p className="text-muted-foreground text-sm">
                Choisissez un mot de passe sécurisé pour votre compte
              </p>
            </div>
          </motion.div>

          {/* Reset Password Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Hidden Token Field */}
                <FormField
                  control={form.control}
                  name="token"
                  render={({ field }) => (
                    <FormItem className="hidden">
                      <FormControl>
                        <Input type="hidden" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* New Password Field */}
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Nouveau mot de passe *
                      </FormLabel>
                      <FormControl>
                        <motion.div 
                          className="relative"
                          whileFocus={{ scale: 1.02 }}
                        >
                          <Input
                            placeholder="Votre nouveau mot de passe"
                            type={showNewPassword ? "text" : "password"}
                            className="h-12 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-0 pr-12 transition-all duration-300"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-12 w-12 hover:bg-transparent"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                          >
                            {showNewPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-400" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-400" />
                            )}
                          </Button>
                        </motion.div>
                      </FormControl>
                      <FormMessage className="text-xs" />
                      <div className="text-xs text-muted-foreground mt-1">
                        Au moins 8 caractères avec majuscule, minuscule et chiffre
                      </div>
                    </FormItem>
                  )}
                />

                {/* Confirm Password Field */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Confirmer le mot de passe *
                      </FormLabel>
                      <FormControl>
                        <motion.div 
                          className="relative"
                          whileFocus={{ scale: 1.02 }}
                        >
                          <Input
                            placeholder="Confirmez votre nouveau mot de passe"
                            type={showConfirmPassword ? "text" : "password"}
                            className="h-12 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-0 pr-12 transition-all duration-300"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-12 w-12 hover:bg-transparent"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-400" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-400" />
                            )}
                          </Button>
                        </motion.div>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                {/* Password Strength Indicator */}
                <motion.div
                  className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <h4 className="text-sm font-medium text-foreground mb-2">
                    Votre mot de passe doit contenir :
                  </h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      Au moins 8 caractères
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      Une lettre majuscule et minuscule
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      Au moins un chiffre
                    </li>
                  </ul>
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                >
                  <Button
                    type="submit"
                    className="w-full h-12 rounded-xl bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    disabled={isPending}
                    size="lg"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Réinitialisation...
                      </>
                    ) : (
                      "Réinitialiser le mot de passe"
                    )}
                  </Button>
                </motion.div>
              </form>
            </Form>

            {/* Back to Login Link */}
            <motion.div
              className="text-center pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <Button
                asChild
                variant="ghost"
                className="text-green-600 hover:text-green-700"
              >
                <Link to="/login" className="flex items-center gap-2 justify-center">
                  <ArrowLeft className="w-4 h-4" />
                  Retour à la connexion
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Security Notice */}
          <motion.div
            className="flex items-center justify-center gap-2 text-xs text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            <Shield className="w-3 h-3 text-green-500" />
            <span>Votre nouveau mot de passe sera chiffré et sécurisé</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};