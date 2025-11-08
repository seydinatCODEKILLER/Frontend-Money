import { useState } from 'react';
import { AlertsHeader } from '../components/AlertsHeader';
import { AlertsFilters } from '../components/AlertsFilters';
import { AlertsGrid } from '../components/AlertsGrid';
import { ViewToggle } from '@/components/shared/ViewToggle';
import { useViewMode } from '@/hooks/useViewMode';
import { FloatingChatButton } from '@/features/chat-ia/components/FloatingChatButton';

export function AlertsManager() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    isRead: '',
    type: '',
    sourceType: '',
  });
  const [viewMode, setViewMode] = useViewMode('alerts-view', 'card');

  return (
    <div className="space-y-6">
      {/* Header avec bouton de changement de vue */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <AlertsHeader />
        <ViewToggle 
          viewMode={viewMode} 
          onViewModeChange={setViewMode}
          availableModes={['card']} // Pour l'instant seulement le mode carte
        />
      </div>
      
      <AlertsFilters 
        filters={filters}
        onFiltersChange={(newFilters) => {
          setFilters(newFilters);
          setPage(1);
        }}
      />

      {/* Affichage en mode carte */}
      <AlertsGrid
        page={page}
        filters={filters}
        onPageChange={setPage}
      />

      {/* IA Chat */}
      <FloatingChatButton />
    </div>
  );
}