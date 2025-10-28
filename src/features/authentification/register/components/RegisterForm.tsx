import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { registerSchema } from "../validators/register.schema";
import { useRegister } from "../hooks/useRegister";
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
import {
  Loader2,
  Eye,
  EyeOff,
  Wallet,
  Shield,
  User,
  Upload,
  CheckCircle,
} from "lucide-react";
import { useState, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const RegisterForm = () => {
  const { mutate: register, isPending } = useRegister();
  const [showPassword, setShowPassword] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      nom: "",
      prenom: "",
      email: "",
      password: "",
      avatar: undefined,
    },
  });

  // Animation values for parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(springY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (event: React.MouseEvent) => {
    const { clientX, clientY } = event;
    const { left, top, width, height } =
      event.currentTarget.getBoundingClientRect();

    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleAvatarChange = (files: FileList | null) => {
    if (files && files.length > 0) {
      const file = files[0];
      const previewUrl = URL.createObjectURL(file);
      setAvatarPreview(previewUrl);
    } else {
      setAvatarPreview(null);
    }
  };

  const onSubmit = (data: z.infer<typeof registerSchema>) => {
    const file = data.avatar instanceof FileList ? data.avatar[0] : undefined;

    const registerData = {
      nom: data.nom,
      prenom: data.prenom,
      email: data.email,
      password: data.password,
      avatar: file,
    };

    register(registerData);
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
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
        >
          <img
            src="https://cdn.pixabay.com/photo/2017/12/12/12/44/bitcoin-3014614_640.jpg"
            alt="MoneyWise Dashboard"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-blue-600/20 backdrop-blur-[1px]" />
        </motion.div>

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
              Rejoignez{" "}
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
              Créez votre compte et prenez le contrôle de vos finances dès
              aujourd'hui. Simple, sécurisé et efficace.
            </motion.p>

            {/* Features List */}
            <motion.div
              className="mt-8 space-y-3 text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              {[
                "📊 Suivi de vos dépenses en temps réel",
                "🎯 Objectifs d'épargne personnalisés",
                "🔐 Sécurité bancaire de niveau premium",
                "📱 Synchronisation multi-appareils",
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

      {/* Right Section - Register Form */}
      <motion.div
        className="flex w-full lg:w-1/2 items-center justify-center p-4 md:p-8"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
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
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Wallet className="w-6 h-6 text-white" />
              </motion.div>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Créer votre compte
              </h2>
              <p className="text-muted-foreground text-sm">
                Commencez votre voyage financier dès aujourd'hui
              </p>
            </div>
          </motion.div>

          {/* Register Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Avatar Upload */}
                <FormField
                  control={form.control}
                  name="avatar"
                  render={({ field: { onChange } }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-center block">
                        Photo de profil (optionnel)
                      </FormLabel>
                      <FormControl>
                        <motion.div
                          className="flex justify-center"
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="relative">
                            <Avatar className="w-20 h-20 border-2 border-dashed border-gray-300 cursor-pointer hover:border-green-500 transition-colors">
                              {avatarPreview ? (
                                <AvatarImage
                                  src={avatarPreview}
                                  alt="Preview"
                                />
                              ) : (
                                <AvatarFallback className="bg-gradient-to-br from-green-500 to-blue-500 text-white text-lg">
                                  <User className="w-6 h-6" />
                                </AvatarFallback>
                              )}
                            </Avatar>

                            {/* ✅ INPUT NON CONTRÔLÉ */}
                            <input
                              type="file"
                              accept="image/jpeg,image/png,image/webp"
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              ref={fileInputRef}
                              onChange={(e) => {
                                const files = e.target.files;
                                if (files && files.length > 0) {
                                  onChange(files);
                                  handleAvatarChange(files);
                                }
                              }}
                            />

                            <motion.div
                              className="absolute -bottom-2 -right-2 bg-green-500 text-white p-1 rounded-full shadow-lg"
                              whileHover={{ scale: 1.1 }}
                            >
                              <Upload className="w-3 h-3" />
                            </motion.div>
                          </div>
                        </motion.div>
                      </FormControl>
                      <FormMessage className="text-xs text-center" />
                    </FormItem>
                  )}
                />

                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="prenom"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          Prénom *
                        </FormLabel>
                        <FormControl>
                          <motion.div whileFocus={{ scale: 1.02 }}>
                            <Input
                              placeholder="Votre prénom"
                              className="h-12 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-0 transition-all duration-300"
                              {...field}
                            />
                          </motion.div>
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="nom"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          Nom *
                        </FormLabel>
                        <FormControl>
                          <motion.div whileFocus={{ scale: 1.02 }}>
                            <Input
                              placeholder="Votre nom"
                              className="h-12 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-0 transition-all duration-300"
                              {...field}
                            />
                          </motion.div>
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Adresse email *
                      </FormLabel>
                      <FormControl>
                        <motion.div whileFocus={{ scale: 1.02 }}>
                          <Input
                            placeholder="votre@email.com"
                            type="email"
                            className="h-12 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-0 transition-all duration-300"
                            {...field}
                          />
                        </motion.div>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Mot de passe *
                      </FormLabel>
                      <FormControl>
                        <motion.div
                          className="relative"
                          whileFocus={{ scale: 1.02 }}
                        >
                          <Input
                            placeholder="Votre mot de passe"
                            type={showPassword ? "text" : "password"}
                            className="h-12 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-0 pr-12 transition-all duration-300"
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
                              <EyeOff className="h-4 w-4 text-gray-400" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-400" />
                            )}
                          </Button>
                        </motion.div>
                      </FormControl>
                      <FormMessage className="text-xs" />
                      <div className="text-xs text-muted-foreground mt-1">
                        Au moins 8 caractères avec majuscule, minuscule et
                        chiffre
                      </div>
                    </FormItem>
                  )}
                />

                {/* Terms Agreement */}
                <motion.div
                  className="flex items-start space-x-2 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <input
                    type="checkbox"
                    required
                    className="mt-1 rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-muted-foreground">
                    J'accepte les{" "}
                    <a
                      href="#"
                      className="text-green-600 hover:text-green-700 font-medium"
                    >
                      conditions d'utilisation
                    </a>{" "}
                    et la{" "}
                    <a
                      href="#"
                      className="text-green-600 hover:text-green-700 font-medium"
                    >
                      politique de confidentialité
                    </a>
                  </span>
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
                        Création du compte...
                      </>
                    ) : (
                      "Créer mon compte"
                    )}
                  </Button>
                </motion.div>
              </form>
            </Form>
          </motion.div>

          {/* Login Link */}
          <motion.div
            className="text-center text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <p>
              Déjà un compte ?{" "}
              <motion.a
                href="/login"
                className="text-green-600 hover:text-green-700 font-semibold transition-colors"
                whileHover={{ x: 2 }}
              >
                Se connecter
              </motion.a>
            </p>
          </motion.div>

          {/* Security Notice */}
          <motion.div
            className="flex items-center justify-center gap-2 text-xs text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            <Shield className="w-3 h-3 text-green-500" />
            <span>Vos données sont sécurisées et chiffrées</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};
