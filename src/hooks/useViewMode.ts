// hooks/useViewMode.ts
import { useState, useEffect } from 'react';
import { type ViewMode } from '@/components/shared/ViewToggle';

export function useViewMode(
  storageKey: string = 'view-mode',
  defaultMode: ViewMode = 'card'
) {
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    // Récupérer depuis le localStorage si disponible
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(storageKey);
      if (saved && ['card', 'table', 'list', 'grid'].includes(saved)) {
        return saved as ViewMode;
      }
    }
    return defaultMode;
  });

  useEffect(() => {
    // Sauvegarder dans le localStorage
    localStorage.setItem(storageKey, viewMode);
  }, [viewMode, storageKey]);

  return [viewMode, setViewMode] as const;
}