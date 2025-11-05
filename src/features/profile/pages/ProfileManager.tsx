import { useState } from 'react';
import { ProfileHeader } from '../components/ProfileHeader';
import { ProfileStats } from '../components/ProfileStats';
import { ProfileAbout } from '../components/ProfileAbout';
// import { ProfileResources } from '../components/ProfileResources';
import { ProfileActivity } from '../components/ProfileActivity';
import { ProfileForm } from '../components/ProfileForm';
import { useUserProfile, useUpdateProfile } from '../hooks/useUserProfile';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { ProfileFormValues } from '../validations/profile.schema';

export function ProfileManager() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { data: user, isLoading, error } = useUserProfile();
  const updateProfileMutation = useUpdateProfile();

  const handleSubmit = async (data: ProfileFormValues) => {
    await updateProfileMutation.mutateAsync(data);
    setIsEditModalOpen(false);
  };

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (error || !user) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Erreur lors du chargement du profil. Veuillez réessayer.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header LinkedIn style */}
        <ProfileHeader user={{ ...user, avatarUrl: user.avatarUrl ?? null }} onEditClick={handleEditClick} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
          {/* Colonne de gauche */}
          <div className="lg:col-span-3 space-y-6">
            <ProfileStats />
            <ProfileAbout user={user} onEditClick={handleEditClick} />
            <ProfileActivity />
          </div>

          {/* Colonne de droite */}
          <div className="space-y-6">
            {/* <ProfileResources /> */}
            
            {/* Badges LinkedIn style */}
            <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Compétences
              </h3>
              <div className="space-y-2">
                {['Gestion de budget', 'Épargne', 'Investissement', 'Analyse financière'].map((skill) => (
                  <div key={skill} className="flex justify-between items-center p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-800">
                    <span className="text-sm text-gray-700 dark:text-gray-300">{skill}</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <div key={star} className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal d'édition */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl overflow-y-auto">
          <ProfileForm
            user={{
              ...user,
              avatarUrl: user.avatarUrl ?? null
            }}
            onSubmit={handleSubmit}
            isSubmitting={updateProfileMutation.isPending}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Skeleton loader style LinkedIn
function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header Skeleton */}
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="h-32 bg-gray-300 dark:bg-gray-700"></div>
          <div className="pt-20 px-6 pb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex-1">
                <Skeleton className="h-8 w-64 mb-2" />
                <Skeleton className="h-4 w-48" />
                <div className="flex gap-4 mt-3">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-40" />
                </div>
              </div>
              <Skeleton className="h-10 w-40" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
          <div className="lg:col-span-3 space-y-6">
            <Skeleton className="h-32 w-full rounded-lg" />
            <Skeleton className="h-64 w-full rounded-lg" />
            <Skeleton className="h-80 w-full rounded-lg" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-64 w-full rounded-lg" />
            <Skeleton className="h-48 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}