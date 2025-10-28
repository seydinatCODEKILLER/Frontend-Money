import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { forgotPasswordSchema } from "../validators/forgot-password.schema";
import { useForgotPassword } from "../hooks/useForgotPassword";
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
import { Loader2, Mail, ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

export const ForgotPasswordForm = () => {
  const { mutate: requestReset, isPending, isSuccess } = useForgotPassword();

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = (data: z.infer<typeof forgotPasswordSchema>) => {
    requestReset(data);
  };

  return (
    <div className="min-h-screen flex dark:from-gray-900 dark:via-gray-950 dark:to-black overflow-hidden">
      {/* Left Section - Illustration */}
      <motion.div
        className="hidden lg:flex w-1/2 relative overflow-hidden"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="absolute inset-0 w-full h-full">
          <img
            src="https://cdn.pixabay.com/photo/2022/04/03/02/26/ethereum-7107978_640.jpg"
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
              Sécurité{" "}
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                MoneyWise
              </span>
            </motion.h1>
            <motion.p
              className="text-white text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              Votre sécurité est notre priorité. Nous vous aidons à retrouver l'accès à votre compte en toute sécurité.
            </motion.p>

            {/* Security Features */}
            <motion.div
              className="mt-8 space-y-3 text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              {[
                "🔐 Lien de réinitialisation sécurisé",
                "⏰ Lien valable 1 heure",
                "📧 Envoi instantané par email",
                "🛡️ Aucun mot de passe stocké en clair"
              ].map((feature, index) => (
                <motion.div
                  key={feature}
                  className="flex items-center gap-3 text-white"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                >
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Section - Forgot Password Form */}
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
                <Shield className="w-6 h-6 text-white" />
              </motion.div>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Mot de passe oublié ?
              </h2>
              <p className="text-muted-foreground text-sm">
                Entrez votre email pour recevoir un lien de réinitialisation
              </p>
            </div>
          </motion.div>

          {/* Success State */}
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-6"
            >
              {/* Success Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="flex justify-center"
              >
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </motion.div>

              {/* Success Message */}
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-foreground">
                  Email envoyé !
                </h3>
                <p className="text-muted-foreground">
                  Nous avons envoyé un lien de réinitialisation à votre adresse email. 
                  Vérifiez votre boîte de réception et suivez les instructions.
                </p>
              </div>

              {/* Additional Info */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                <div className="flex items-center gap-2 text-sm text-blue-700 dark:text-blue-300">
                  <Mail className="w-4 h-4" />
                  <span>Vérifiez aussi vos spams si vous ne voyez pas l'email</span>
                </div>
              </div>

              {/* Back to Login */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
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
              </motion.div>
            </motion.div>
          ) : (
            /* Form State */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Email Field */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          Adresse email
                        </FormLabel>
                        <FormControl>
                          <motion.div 
                            className="relative"
                            whileFocus={{ scale: 1.02 }}
                          >
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <Input
                              placeholder="votre@email.com"
                              type="email"
                              className="h-12 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-0 pl-10 transition-all duration-300"
                              {...field}
                            />
                          </motion.div>
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  {/* Instructions */}
                  <motion.div
                    className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    <p className="text-sm text-muted-foreground text-center">
                      Nous vous enverrons un lien sécurisé pour réinitialiser votre mot de passe. 
                      Ce lien expirera dans 1 heure pour votre sécurité.
                    </p>
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
                          Envoi en cours...
                        </>
                      ) : (
                        "Envoyer le lien de réinitialisation"
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
          )}

          {/* Security Notice */}
          <motion.div
            className="flex items-center justify-center gap-2 text-xs text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            <Shield className="w-3 h-3 text-green-500" />
            <span>Processus 100% sécurisé - Nous ne partagerons jamais votre email</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};