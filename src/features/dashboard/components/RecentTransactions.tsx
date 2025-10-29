import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownRight, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import type { RecentTransaction } from "../api/types";
interface RecentTransactionsProps {
  transactions: RecentTransaction[];
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short'
    });
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Dernières Transactions</CardTitle>
        <Badge variant="secondary" className="text-xs">
          {transactions.length} transactions
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        {transactions.map((transaction, index) => (
          <motion.div
            key={transaction.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-3 flex-1">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${transaction.color}20` }}
              >
                {transaction.type === 'REVENUE' ? (
                  <ArrowUpRight className="h-5 w-5 text-green-600" />
                ) : (
                  <ArrowDownRight className="h-5 w-5 text-red-600" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">
                  {transaction.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="capitalize">{transaction.category}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className={cn(
                "font-semibold text-sm",
                transaction.type === 'REVENUE' ? "text-green-600" : "text-red-600"
              )}>
                {transaction.type === 'REVENUE' ? '+' : '-'}€{Math.abs(transaction.amount).toLocaleString('fr-FR', { minimumFractionDigits: 2 })}
              </span>
              
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {formatDate(transaction.date)}
              </div>
            </div>
          </motion.div>
        ))}

        {transactions.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>Aucune transaction récente</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}