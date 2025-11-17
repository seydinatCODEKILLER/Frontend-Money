import { useState } from 'react';
import { AlertsHeader } from '../components/AlertsHeader';
import { AlertsFilters } from '../components/AlertsFilters';
import { AlertsGrid } from '../components/AlertsGrid';
import { FloatingChatButton } from '@/features/chat-ia/components/FloatingChatButton';

export function AlertsManager() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    isRead: '',
    type: '',
    sourceType: '',
  });

  return (
    <div className="space-y-6">
      {/* Header avec bouton de changement de vue */}
      <div className="w-full">
        <AlertsHeader />

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