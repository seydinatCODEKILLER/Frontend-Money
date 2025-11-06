// utils/pdfGenerator.ts
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import type { ReportData, MonthlySummary, CategoryBreakdown, BudgetVsActual, ReportType } from '@/features/report/types/report.types';

interface PDFTransaction {
  id: string;
  type: "REVENUE" | "DEPENSE";
  amount: number;
  description: string | null;
  date: string;
  category: {
    id: string;
    name: string;
    color: string | null;
    icon: string | null;
  } | null;
}

export class PDFGenerator {
  private doc: jsPDF;
  private margin = 20;
  private pageWidth: number;
  private currentY: number;

  constructor() {
    this.doc = new jsPDF();
    this.pageWidth = this.doc.internal.pageSize.getWidth();
    this.currentY = this.margin;
  }

  // Méthode principale pour générer le PDF
  async generatePDF(reportData: ReportData, element?: HTMLElement): Promise<void> {
    if (element) {
      // Génération à partir d'un élément HTML (pour les graphiques)
      await this.generateFromHTML(element, reportData);
    } else {
      // Génération programmatique
      this.generateProgrammatic(reportData);
    }
  }

  private async generateFromHTML(element: HTMLElement, reportData: ReportData): Promise<void> {
    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 0;

      this.doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        this.doc.addPage();
        this.doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      this.doc.save(`rapport-${reportData.reportType}-${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('Erreur lors de la génération HTML vers PDF:', error);
      // Fallback vers la génération programmatique
      this.generateProgrammatic(reportData);
    }
  }

  private generateProgrammatic(reportData: ReportData): void {
    this.addHeader(reportData);
    this.addSummarySection(reportData);
    
    switch (reportData.reportType) {
      case 'monthly-summary':
        this.addMonthlySummary(reportData.reportData as MonthlySummary);
        break;
      case 'category-breakdown':
        this.addCategoryBreakdown(reportData.reportData as CategoryBreakdown);
        break;
      case 'budget-vs-actual':
        this.addBudgetVsActual(reportData.reportData as BudgetVsActual);
        break;
    }

    this.addTransactionsTable(reportData.transactions);
    this.addFooter();

    this.doc.save(`rapport-${reportData.reportType}-${new Date().toISOString().split('T')[0]}.pdf`);
  }

  private addHeader(reportData: ReportData): void {
    // Logo et titre
    this.doc.setFontSize(20);
    this.doc.setTextColor(44, 62, 80);
    this.doc.text('MoneyWise - Rapport Financier', this.margin, this.currentY);
    
    this.currentY += 10;
    this.doc.setFontSize(12);
    this.doc.setTextColor(128, 128, 128);
    
    const reportTypeText = this.getReportTypeText(reportData.reportType);
    this.doc.text(`Type: ${reportTypeText}`, this.margin, this.currentY);
    
    this.currentY += 6;
    const periodText = `Période: ${new Date(reportData.startDate).toLocaleDateString('fr-FR')} - ${new Date(reportData.endDate).toLocaleDateString('fr-FR')}`;
    this.doc.text(periodText, this.margin, this.currentY);
    
    this.currentY += 6;
    this.doc.text(`Généré le: ${new Date().toLocaleDateString('fr-FR')}`, this.margin, this.currentY);
    
    this.currentY += 15;
    this.addSeparator();
  }

  private addSummarySection(reportData: ReportData): void {
    this.doc.setFontSize(16);
    this.doc.setTextColor(44, 62, 80);
    this.doc.text('Résumé', this.margin, this.currentY);
    this.currentY += 10;

    this.doc.setFontSize(10);
    this.doc.setTextColor(0, 0, 0);
    
    const totalTransactions = reportData.transactions.length;
    const revenues = reportData.transactions.filter(t => t.type === 'REVENUE').length;
    const expenses = reportData.transactions.filter(t => t.type === 'DEPENSE').length;

    this.doc.text(`Total des transactions: ${totalTransactions}`, this.margin, this.currentY);
    this.currentY += 6;
    this.doc.text(`Revenus: ${revenues} transactions`, this.margin, this.currentY);
    this.currentY += 6;
    this.doc.text(`Dépenses: ${expenses} transactions`, this.margin, this.currentY);
    
    this.currentY += 10;
    this.addSeparator();
  }

  // Dans la méthode addMonthlySummary
private addMonthlySummary(data: MonthlySummary): void {
  this.doc.setFontSize(14);
  this.doc.setTextColor(44, 62, 80);
  this.doc.text('Synthèse Mensuelle', this.margin, this.currentY);
  this.currentY += 10;

  this.doc.setFontSize(10);
  this.doc.setTextColor(0, 0, 0);

  this.doc.text(`Total des revenus: ${data.totalRevenue.toLocaleString('fr-FR')}€`, this.margin, this.currentY);
  this.currentY += 6;
  this.doc.text(`Total des dépenses: ${data.totalExpenses.toLocaleString('fr-FR')}€`, this.margin, this.currentY);
  this.currentY += 6;
  
  // Revenu net avec couleur - CORRECTION ICI
  const netIncomeColor = data.netIncome >= 0 ? [46, 125, 50] : [198, 40, 40];
  this.doc.setTextColor(netIncomeColor[0], netIncomeColor[1], netIncomeColor[2]);
  this.doc.text(`Revenu net: ${data.netIncome.toLocaleString('fr-FR')}€`, this.margin, this.currentY);
  this.doc.setTextColor(0, 0, 0);
  
  this.currentY += 10;
  this.addSeparator();
}

  private addCategoryBreakdown(data: CategoryBreakdown): void {
    this.doc.setFontSize(14);
    this.doc.setTextColor(44, 62, 80);
    this.doc.text('Répartition par Catégorie', this.margin, this.currentY);
    this.currentY += 10;

    this.doc.setFontSize(9);
    
    Object.entries(data).forEach(([category, info]) => {
      if (this.currentY > 250) {
        this.doc.addPage();
        this.currentY = this.margin;
      }

      const amountText = `${info.total.toLocaleString('fr-FR')}€ (${info.count} transactions)`;
      this.doc.text(`${category}:`, this.margin, this.currentY);
      this.doc.text(amountText, this.pageWidth - this.margin - 40, this.currentY, { align: 'right' });
      
      this.currentY += 6;
    });
    
    this.currentY += 5;
    this.addSeparator();
  }

  // Dans la méthode addBudgetVsActual
private addBudgetVsActual(data: BudgetVsActual): void {
  this.doc.setFontSize(14);
  this.doc.setTextColor(44, 62, 80);
  this.doc.text('Budget vs Réel', this.margin, this.currentY);
  this.currentY += 10;

  this.doc.setFontSize(9);

  Object.entries(data).forEach(([category, info]) => {
    if (this.currentY > 250) {
      this.doc.addPage();
      this.currentY = this.margin;
    }

    const budgetText = info.budget ? `${info.budget.toLocaleString('fr-FR')}€` : 'Non défini';
    const actualText = `${info.actual.toLocaleString('fr-FR')}€`;
    const diffText = `${info.difference.toLocaleString('fr-FR')}€`;
    const percentText = `${info.percentage.toFixed(1)}%`;

    // Catégorie
    this.doc.text(category, this.margin, this.currentY);
    
    // Budget
    this.doc.text(budgetText, this.margin + 60, this.currentY);
    
    // Réel
    this.doc.text(actualText, this.margin + 100, this.currentY);
    
    // Différence avec couleur - CORRECTION ICI
    const diffColor = info.difference >= 0 ? [46, 125, 50] : [198, 40, 40];
    this.doc.setTextColor(diffColor[0], diffColor[1], diffColor[2]);
    this.doc.text(diffText, this.margin + 140, this.currentY);
    this.doc.setTextColor(0, 0, 0);
    
    // Pourcentage
    this.doc.text(percentText, this.pageWidth - this.margin, this.currentY, { align: 'right' });
    
    this.currentY += 6;
  });
  
  this.currentY += 5;
  this.addSeparator();
}

  // Dans la méthode addTransactionsTable
private addTransactionsTable(transactions: PDFTransaction[]): void {
  if (transactions.length === 0) return;

  this.doc.setFontSize(14);
  this.doc.setTextColor(44, 62, 80);
  this.doc.text('Détail des Transactions', this.margin, this.currentY);
  this.currentY += 10;

  // En-têtes du tableau
  this.doc.setFillColor(240, 240, 240);
  this.doc.rect(this.margin, this.currentY, this.pageWidth - 2 * this.margin, 8, 'F');
  
  this.doc.setFontSize(8);
  this.doc.setTextColor(0, 0, 0);
  
  this.doc.text('Date', this.margin + 2, this.currentY + 5);
  this.doc.text('Catégorie', this.margin + 30, this.currentY + 5);
  this.doc.text('Description', this.margin + 70, this.currentY + 5);
  this.doc.text('Montant', this.pageWidth - this.margin - 15, this.currentY + 5, { align: 'right' });
  
  this.currentY += 10;

  // Données du tableau
  transactions.slice(0, 50).forEach((transaction) => {
    if (this.currentY > 270) {
      this.doc.addPage();
      this.currentY = this.margin;
      
      // Répéter l'en-tête sur la nouvelle page
      this.doc.setFillColor(240, 240, 240);
      this.doc.rect(this.margin, this.currentY, this.pageWidth - 2 * this.margin, 8, 'F');
      this.doc.text('Date', this.margin + 2, this.currentY + 5);
      this.doc.text('Catégorie', this.margin + 30, this.currentY + 5);
      this.doc.text('Description', this.margin + 70, this.currentY + 5);
      this.doc.text('Montant', this.pageWidth - this.margin - 15, this.currentY + 5, { align: 'right' });
      this.currentY += 10;
    }

    const date = new Date(transaction.date).toLocaleDateString('fr-FR');
    const category = transaction.category?.name || 'Sans catégorie';
    const description = transaction.description?.substring(0, 30) || '-';
    
    this.doc.text(date, this.margin + 2, this.currentY + 4);
    this.doc.text(category, this.margin + 30, this.currentY + 4);
    this.doc.text(description, this.margin + 70, this.currentY + 4);
    
    // Montant avec couleur selon le type - CORRECTION ICI
    const amountColor = transaction.type === 'REVENUE' ? [46, 125, 50] : [198, 40, 40];
    this.doc.setTextColor(amountColor[0], amountColor[1], amountColor[2]);
    const amountText = `${transaction.type === 'REVENUE' ? '+' : '-'}${transaction.amount.toLocaleString('fr-FR')}€`;
    this.doc.text(amountText, this.pageWidth - this.margin - 15, this.currentY + 4, { align: 'right' });
    this.doc.setTextColor(0, 0, 0);
    
    this.currentY += 6;
  });

  if (transactions.length > 50) {
    this.currentY += 5;
    this.doc.setTextColor(128, 128, 128);
    this.doc.text(`... et ${transactions.length - 50} transactions supplémentaires`, this.margin, this.currentY);
  }
}

  private addFooter(): void {
    this.doc.setFontSize(8);
    this.doc.setTextColor(128, 128, 128);
    this.doc.text(
      'Généré par MoneyWise - Votre partenaire de gestion financière',
      this.pageWidth / 2,
      290,
      { align: 'center' }
    );
  }

  private addSeparator(): void {
    this.doc.setDrawColor(200, 200, 200);
    this.doc.line(this.margin, this.currentY, this.pageWidth - this.margin, this.currentY);
    this.currentY += 5;
  }

  private getReportTypeText(type: ReportType): string {
    const types = {
      'monthly-summary': 'Synthèse Mensuelle',
      'category-breakdown': 'Répartition par Catégorie',
      'budget-vs-actual': 'Budget vs Réel'
    };
    return types[type];
  }
}

// Instance exportée
export const pdfGenerator = new PDFGenerator();