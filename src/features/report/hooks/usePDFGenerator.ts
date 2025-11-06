import { useCallback } from 'react';
import { pdfGenerator } from '../utils/pdfGenerator';
import type { ReportData } from '../types/report.types';

export const usePDFGenerator = () => {
  const generatePDF = useCallback(async (reportData: ReportData, element?: HTMLElement) => {
    try {
      await pdfGenerator.generatePDF(reportData, element);
      return true;
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error);
      return false;
    }
  }, []);

  return { generatePDF };
};