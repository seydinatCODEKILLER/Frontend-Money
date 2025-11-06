// components/reports/ReportsManager.tsx
import { useState, useRef } from 'react';
import { ReportFilters } from '../components/ReportFilters';
import { ReportPreview } from '../components/ReportPreview';
import { useGenerateReport } from '../hooks/useReports';
import { usePDFGenerator } from '../hooks/usePDFGenerator';
import { Skeleton } from '@/components/ui/skeleton';
import { FileText, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { ReportFilters as ReportFiltersType, ReportData } from '../types/report.types';
import { toast } from 'sonner';

export function ReportsManager() {
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const reportRef = useRef<HTMLDivElement>(null);
  
  const generateReportMutation = useGenerateReport();
  const { generatePDF } = usePDFGenerator();

  const handleGenerateReport = async (filters: ReportFiltersType) => {
    try {
      const data = await generateReportMutation.mutateAsync(filters);
      setReportData(data);
    } catch (error) {
      console.error('Erreur lors de la génération du rapport:', error);
      toast.error('Erreur lors de la génération du rapport. Veuillez réessayer.');
    }
  };

  const handleDownloadPDF = async () => {
    if (!reportData) return;

    try {
      await generatePDF(reportData, reportRef.current || undefined);
    } catch (error) {
      console.error('Erreur lors du téléchargement:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full md:max-w-6xl mx-auto p-3 md:p-6">
        {/* En-tête */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-blue-600 rounded-xl hidden md:flex items-center justify-center">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Rapports Financiers
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Générez et téléchargez vos rapports financiers détaillés
            </p>
          </div>
        </div>

        {/* Filtres */}
        <div className="mb-8">
          <ReportFilters
            onGenerate={handleGenerateReport}
            isGenerating={generateReportMutation.isPending}
          />
        </div>

        {/* État de chargement */}
        {generateReportMutation.isPending && (
          <div className="space-y-4">
            <Skeleton className="h-32 w-full rounded-2xl" />
            <Skeleton className="h-64 w-full rounded-2xl" />
          </div>
        )}

        {/* Erreur */}
        {generateReportMutation.isError && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Une erreur est survenue lors de la génération du rapport. Veuillez réessayer.
            </AlertDescription>
          </Alert>
        )}

        {/* Aperçu du rapport */}
        {reportData && !generateReportMutation.isPending && (
          <div ref={reportRef}>
            <ReportPreview
              reportData={reportData}
              onDownload={handleDownloadPDF}
              isDownloading={false}
            />
          </div>
        )}

        {/* Message d'information */}
        {!reportData && !generateReportMutation.isPending && !generateReportMutation.isError && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Aucun rapport généré
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              Sélectionnez un type de rapport, une période et cliquez sur "Générer le PDF" 
              pour créer votre premier rapport financier.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}