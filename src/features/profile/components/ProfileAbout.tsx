// components/profile/ProfileAbout.tsx
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, MapPin, Calendar, Mail } from 'lucide-react';

interface ProfileAboutProps {
  user: {
    nom: string;
    prenom: string;
    email: string;
    createdAt: string;
    role: string;
  };
  onEditClick: () => void;
}

export function ProfileAbout({ user, onEditClick }: ProfileAboutProps) {
  const getMemberSince = () => {
    const joinDate = new Date(user.createdAt);
    return joinDate.toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          À propos
        </h3>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onEditClick}
          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
        >
          <Edit className="w-4 h-4 mr-1" />
          Modifier
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                <Mail className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                <p className="text-gray-900 dark:text-white">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                <MapPin className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Localisation</p>
                <p className="text-gray-900 dark:text-white">Paris, France</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                <Calendar className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Membre depuis</p>
                <p className="text-gray-900 dark:text-white">{getMemberSince()}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Statut</p>
                <p className="text-gray-900 dark:text-white">Actif</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Bio</h4>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Passionné par la gestion financière et l'optimisation des budgets. 
            Je utilise MoneyWise pour garder le contrôle sur mes finances personnelles 
            et atteindre mes objectifs financiers.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}