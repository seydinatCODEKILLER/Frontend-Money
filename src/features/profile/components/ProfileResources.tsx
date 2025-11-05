// components/profile/ProfileResources.tsx
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Video, BookOpen, Download } from 'lucide-react';

export function ProfileResources() {
  const resources = [
    {
      icon: FileText,
      title: "Guide du budgeting",
      description: "Apprenez à créer et maintenir un budget efficace",
      type: "PDF",
      size: "2.4 MB"
    },
    {
      icon: Video,
      title: "Webinaire: Épargne intelligente",
      description: "Techniques avancées pour optimiser votre épargne",
      type: "Vidéo",
      size: "45 min"
    },
    {
      icon: BookOpen,
      title: "E-book: Investissement débutant",
      description: "Les bases de l'investissement pour les novices",
      type: "E-book",
      size: "3.1 MB"
    }
  ];

  return (
    <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
      <CardHeader>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Ressources
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Documents et ressources pour améliorer votre gestion financière
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {resources.map((resource, index) => (
          <div key={index} className="flex items-start gap-4 p-3 rounded-lg border border-gray-100 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded flex items-center justify-center flex-shrink-0">
              <resource.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-900 dark:text-white truncate">
                {resource.title}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                {resource.description}
              </p>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {resource.type} • {resource.size}
                </span>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="flex-shrink-0">
              <Download className="w-4 h-4" />
            </Button>
          </div>
        ))}
        
        <Button variant="outline" className="w-full border-blue-500 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20">
          Voir toutes les ressources
        </Button>
      </CardContent>
    </Card>
  );
}