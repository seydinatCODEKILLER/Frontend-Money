// components/reports/ReportPreview.tsx
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, TrendingUp, PieChart, Target } from 'lucide-react';
import type { ReportData, MonthlySummary, CategoryBreakdown, BudgetVsActual } from '../types/report.types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface ReportPreviewProps {
  reportData: ReportData;
  onDownload: () => void;
  isDownloading: boolean;
}

export function ReportPreview({ reportData, onDownload, isDownloading }: ReportPreviewProps) {
    console.log(reportData);
    
  const getReportIcon = (type: string) => {
    switch (type) {
      case 'monthly-summary':
        return <TrendingUp className="w-5 h-5" />;
      case 'category-breakdown':
        return <PieChart className="w-5 h-5" />;
      case 'budget-vs-actual':
        return <Target className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getReportTitle = (type: string) => {
    switch (type) {
      case 'monthly-summary':
        return 'Synthèse Mensuelle';
      case 'category-breakdown':
        return 'Répartition par Catégorie';
      case 'budget-vs-actual':
        return 'Budget vs Réel';
      default:
        return 'Rapport';
    }
  };

  const renderSummary = () => {
    const data = reportData.reportData as MonthlySummary;
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {data.totalRevenue.toLocaleString('fr-FR')}€
          </div>
          <div className="text-sm text-green-700 dark:text-green-300">Revenus</div>
        </div>
        <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">
            {data.totalExpenses.toLocaleString('fr-FR')}€
          </div>
          <div className="text-sm text-red-700 dark:text-red-300">Dépenses</div>
        </div>
        <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {data.netIncome.toLocaleString('fr-FR')}€
          </div>
          <div className="text-sm text-blue-700 dark:text-blue-300">Revenu Net</div>
        </div>
        <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">
            {data.transactionCount}
          </div>
          <div className="text-sm text-gray-700 dark:text-gray-300">Transactions</div>
        </div>
      </div>
    );
  };

  const renderCategoryBreakdown = () => {
    const data = reportData.reportData as CategoryBreakdown;
    return (
      <div className="space-y-3">
        {Object.entries(data).map(([category, info]) => (
          <div key={category} className="flex justify-between items-center p-3 border rounded-lg">
            <div>
              <div className="font-medium text-gray-900 dark:text-white">{category}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {info.count} transaction{info.count > 1 ? 's' : ''}
              </div>
            </div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              {info.total.toLocaleString('fr-FR')}€
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderBudgetVsActual = () => {
    const data = reportData.reportData as BudgetVsActual;
    return (
      <div className="space-y-3">
        {Object.entries(data).map(([category, info]) => (
          <div key={category} className="p-3 border rounded-lg">
            <div className="font-medium text-gray-900 dark:text-white mb-2">{category}</div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-gray-500 dark:text-gray-400">Budget</div>
                <div className="font-semibold">
                  {info.budget ? `${info.budget.toLocaleString('fr-FR')}€` : 'Non défini'}
                </div>
              </div>
              <div>
                <div className="text-gray-500 dark:text-gray-400">Réel</div>
                <div className="font-semibold">{info.actual.toLocaleString('fr-FR')}€</div>
              </div>
              <div>
                <div className="text-gray-500 dark:text-gray-400">Écart</div>
                <div className={`font-semibold ${info.difference >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {info.difference.toLocaleString('fr-FR')}€
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderContent = () => {
    switch (reportData.reportType) {
      case 'monthly-summary':
        return renderSummary();
      case 'category-breakdown':
        return renderCategoryBreakdown();
      case 'budget-vs-actual':
        return renderBudgetVsActual();
      default:
        return null;
    }
  };

  return (
    <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getReportIcon(reportData.reportType)}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {getReportTitle(reportData.reportType)}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {format(new Date(reportData.startDate), 'dd MMM yyyy', { locale: fr })} -{' '}
                {format(new Date(reportData.endDate), 'dd MMM yyyy', { locale: fr })}
              </p>
            </div>
          </div>
          <Button
            onClick={onDownload}
            disabled={isDownloading}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Télécharger PDF
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {renderContent()}
        
        {/* Résumé des transactions */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
          <h4 className="font-medium text-gray-900 dark:text-white mb-3">
            Résumé des Transactions
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className="text-gray-500 dark:text-gray-400">Total</div>
              <div className="font-semibold text-gray-900 dark:text-white">
                {reportData.transactions.length}
              </div>
            </div>
            <div className="text-center">
              <div className="text-gray-500 dark:text-gray-400">Revenus</div>
              <div className="font-semibold text-green-600 dark:text-green-400">
                {reportData.transactions.filter(t => t.type === 'REVENUE').length}
              </div>
            </div>
            <div className="text-center">
              <div className="text-gray-500 dark:text-gray-400">Dépenses</div>
              <div className="font-semibold text-red-600 dark:text-red-400">
                {reportData.transactions.filter(t => t.type === 'DEPENSE').length}
              </div>
            </div>
            <div className="text-center">
              <div className="text-gray-500 dark:text-gray-400">Période</div>
              <div className="font-semibold text-gray-900 dark:text-white">
                {Math.ceil((new Date(reportData.endDate).getTime() - new Date(reportData.startDate).getTime()) / (1000 * 60 * 60 * 24))} jours
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}