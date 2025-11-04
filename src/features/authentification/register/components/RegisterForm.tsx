import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../validators/register.schema";
import { useRegister } from "../hooks/useRegister";
import { z } from "zod";
import { useState, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Upload, User, Loader2 } from "lucide-react";

export const RegisterForm = () => {
  const { mutate: register, isPending } = useRegister();
  const [showPassword, setShowPassword] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: { nom: "", prenom: "", email: "", password: "", avatar: undefined },
  });

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    const avatarFile = values.avatar instanceof FileList ? values.avatar[0] : undefined;

    register({
      ...values,
      avatar: avatarFile,
    });
  };

  const handleAvatarChange = (files: FileList | null) => {
    if (!files?.[0]) return;
    const url = URL.createObjectURL(files[0]);
    setAvatarPreview(url);
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2">
      
      {/* LEFT - AVATAR UPLOAD */}
      <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-600 to-emerald-500 text-white">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Créer votre compte</h2>
          <p className="opacity-90 text-sm mt-1">Bienvenue sur MoneyWise ✨</p>
        </div>

        <div
          className="relative cursor-pointer group"
          onClick={() => fileInputRef.current?.click()}
        >
          <Avatar className="w-40 h-40 rounded-2xl shadow-xl border-4 border-white/40">
            {avatarPreview ? (
              <AvatarImage src={avatarPreview} alt="Preview" />
            ) : (
              <AvatarFallback className="bg-white/20 text-white">
                <User className="w-12 h-12" />
              </AvatarFallback>
            )}
          </Avatar>

          {/* Badge Upload */}
          <div className="absolute -bottom-3 -right-3 bg-white text-blue-600 p-3 rounded-full shadow-lg group-hover:scale-110 transition-transform">
            <Upload className="w-5 h-5" />
          </div>

          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/png,image/jpeg,image/webp"
            onChange={(e) => handleAvatarChange(e.target.files)}
          />
        </div>
      </div>


      {/* RIGHT - FORM */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

              {/* Name row */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="prenom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prénom *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Votre prénom" className="h-12" />
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
                        <Input {...field} placeholder="Votre nom" className="h-12" />
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
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} placeholder="email@example.com" className="h-12" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
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
                          placeholder="Votre mot de passe"
                          className="h-12 pr-12"
                        />
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          className="absolute right-1 top-1 h-10 w-10"
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

              {/* Submit */}
              <Button
                type="submit"
                disabled={isPending}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold shadow-md hover:shadow-lg"
              >
                {isPending ? <Loader2 className="animate-spin" /> : "Créer mon compte"}
              </Button>
            </form>
          </Form>

        </div>
      </div>
    </div>
  );
};
