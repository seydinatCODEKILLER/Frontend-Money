import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Camera, MapPin, Calendar, Edit } from 'lucide-react';

interface ProfileHeaderProps {
  user: {
    nom: string;
    prenom: string;
    email: string;
    avatarUrl: string | null;
    createdAt: string;
  };
  onEditClick: () => void;
}

export function ProfileHeader({ user, onEditClick }: ProfileHeaderProps) {
  const getInitials = () => {
    return `${user.prenom.charAt(0)}${user.nom.charAt(0)}`.toUpperCase();
  };

  const getMemberSince = () => {
    const joinDate = new Date(user.createdAt);
    return `Membre depuis ${joinDate.toLocaleDateString('fr-FR', { 
      month: 'long', 
      year: 'numeric' 
    })}`;
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Bannière LinkedIn style */}
      <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-800 relative">
        <div className="absolute -bottom-16 left-6">
          <div className="relative group">
            <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
              <AvatarImage 
                src={user.avatarUrl || ''} 
                alt={`${user.prenom} ${user.nom}`}
                className="object-cover"
              />
              <AvatarFallback className="text-2xl font-semibold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
            
            <button className="absolute bottom-2 right-2 w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Camera className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Contenu du header */}
      <div className="pt-20 px-6 pb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {user.prenom} {user.nom}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Utilisateur MoneyWise
            </p>
            
            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>France</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{getMemberSince()}</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Disponible</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="flex items-center gap-2 border-blue-500 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20"
            >
              <Edit className="w-4 h-4" />
              Modifier le profil
            </Button>
            <Button 
              onClick={onEditClick}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Modifier les infos
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}