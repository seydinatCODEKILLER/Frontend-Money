// components/error/NotFound.tsx
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft, AlertCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';

export function NotFound() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    console.log('Page 404 accédée');
  }, []);

  const handleRedirect = () => {
    if (isAuthenticated) {
      navigate('/dashboard/analytics');
    } else {
      navigate('/');
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        
        {/* Illustration */}
        <div className="relative mb-8">
          <div className="w-64 h-64 mx-auto relative">
            {/* Cercle de fond */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full animate-pulse"></div>
            
            {/* Éléments flottants */}
            <div className="absolute top-8 left-8 w-16 h-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg flex items-center justify-center transform -rotate-12">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">4</span>
              </div>
            </div>
            
            <div className="absolute top-12 right-12 w-12 h-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg flex items-center justify-center transform rotate-6">
              <div className="w-6 h-6 bg-purple-500 rounded-md flex items-center justify-center">
                <span className="text-white text-sm">0</span>
              </div>
            </div>
            
            <div className="absolute bottom-12 left-12 w-12 h-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg flex items-center justify-center transform rotate-12">
              <div className="w-6 h-6 bg-blue-500 rounded-md flex items-center justify-center">
                <span className="text-white text-sm">4</span>
              </div>
            </div>
            
            {/* Icône centrale */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-xl flex items-center justify-center transform rotate-45">
                <AlertCircle className="w-10 h-10 text-white transform -rotate-45" />
              </div>
            </div>
            
            {/* Points décoratifs */}
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-bounce"></div>
            <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-green-400 rounded-full animate-bounce delay-75"></div>
            <div className="absolute top-0 left-1/2 w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-150"></div>
          </div>
        </div>

        {/* Contenu texte */}
        <div className="space-y-6">
          <div className="space-y-3">
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              404
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
              Page non trouvée
            </h2>
            <p className="text-md text-gray-600 dark:text-gray-300 w-full md:max-w-xl mx-auto leading-relaxed">
              Désolé, la page que vous recherchez semble s'être égarée dans les méandres du web.
              Revenons sur terre ensemble.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-3">
            <Button
              onClick={handleGoBack}
              variant="outline"
              className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 cursor-pointer dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour en arrière
            </Button>
            
            <Button
              onClick={handleRedirect}
              className="flex items-center gap-2 px-6 py-3 cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
            >
              <Home className="w-4 h-4" />
              {isAuthenticated ? 'Aller au Dashboard' : 'Page d\'accueil'}
            </Button>
          </div>
        </div>

        {/* Animation de fond subtile */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-transparent via-blue-50/50 to-transparent dark:via-blue-900/10 animate-pulse"></div>
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-r from-transparent via-purple-50/50 to-transparent dark:via-purple-900/10 animate-pulse delay-1000"></div>
        </div>
      </div>
    </div>
  );
}