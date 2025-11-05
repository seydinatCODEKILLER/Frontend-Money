import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, X, Upload } from 'lucide-react';
import { profileFormSchema, type ProfileFormValues } from '../validations/profile.schema';
import { cn } from '@/lib/utils';
import { useRef, useState } from 'react';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface ProfileFormProps {
  user: {
    nom: string;
    prenom: string;
    avatarUrl: string | null;
  };
  onSubmit: (data: ProfileFormValues) => void;
  isSubmitting: boolean;
}

export function ProfileForm({ user, onSubmit, isSubmitting }: ProfileFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      nom: user.nom,
      prenom: user.prenom,
      avatarFile: undefined,
    },
  });

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue('avatarFile', file);
      // Créer une preview
      const previewUrl = URL.createObjectURL(file);
      setAvatarPreview(previewUrl);
    }
  };

  const removeAvatar = () => {
    form.setValue('avatarFile', undefined);
    setAvatarPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const currentAvatarUrl = avatarPreview || user.avatarUrl;

  const getInitials = () => {
    return `${user.prenom.charAt(0)}${user.nom.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="space-y-6">
      <DialogHeader>
        <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white">
          Modifier le profil
        </DialogTitle>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Mettez à jour vos informations personnelles et votre photo de profil
        </p>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Section Photo de profil - Style LinkedIn */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Photo de profil
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Cette image sera visible par les autres utilisateurs
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="relative group">
                <Avatar className="w-20 h-20 border-2 border-white shadow-md">
                  <AvatarImage 
                    src={currentAvatarUrl || ''} 
                    alt={`${user.prenom} ${user.nom}`}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-lg font-semibold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
                
                <button
                  type="button"
                  onClick={handleAvatarClick}
                  className={cn(
                    "absolute -bottom-1 -right-1 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center",
                    "text-white shadow-lg transition-all duration-300 hover:bg-blue-700 hover:scale-110",
                    "border-2 border-white"
                  )}
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 space-y-3">
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAvatarClick}
                    className="flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Changer la photo
                  </Button>
                  
                  {(form.watch('avatarFile') || user.avatarUrl) && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={removeAvatar}
                      className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <X className="w-4 h-4" />
                      Supprimer
                    </Button>
                  )}
                </div>

                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Format JPG, PNG ou GIF recommandé. Taille max: 5MB
                </p>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>
          </div>

          {/* Informations personnelles - Style LinkedIn */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Informations personnelles
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Prénom */}
                <FormField
                  control={form.control}
                  name="prenom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Prénom *
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Votre prénom" 
                          {...field} 
                          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:border-blue-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Nom */}
                <FormField
                  control={form.control}
                  name="nom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Nom *
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Votre nom" 
                          {...field} 
                          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:border-blue-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Actions - Style LinkedIn */}
          <div className="flex justify-between items-center pt-4 border-gray-200 dark:border-gray-700">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => form.reset()}
              disabled={isSubmitting}
              className="border-gray-300 dark:border-gray-600"
            >
              Annuler
            </Button>
            
            <div className="flex gap-3">
              <Button 
                type="button" 
                variant="outline"
                disabled={isSubmitting}
                className="border-gray-300 dark:border-gray-600"
              >
                Prévisualiser
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 text-white min-w-32"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Enregistrement...
                  </>
                ) : (
                  'Enregistrer'
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}