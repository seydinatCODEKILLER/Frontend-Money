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
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
    });
  };

  return (
    <Card className="h-full flex flex-col shadow-lg border-border/40 backdrop-blur-xl bg-background/60">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold tracking-tight">
          Dernières Transactions
        </CardTitle>
        <Badge variant="outline" className="text-xs border-border/60">
          {transactions.length}
        </Badge>
      </CardHeader>

      <CardContent className="flex-1 min-h-0 overflow-y-auto space-y-3 pr-1">
        {transactions.map((t, index) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
            className="p-4 rounded-xl border border-border/40 bg-background/50 hover:bg-background/70 hover:shadow-md transition-all cursor-pointer"
          >
            {/* Ligne 1 */}
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shadow-sm"
                style={{
                  background: `linear-gradient(135deg, ${t.color}35, ${t.color}10)`,
                }}
              >
                {t.type === "REVENUE" ? (
                  <ArrowUpRight className="h-5 w-5 text-green-600" />
                ) : (
                  <ArrowDownRight className="h-5 w-5 text-red-600" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-medium text-[15px] truncate leading-tight">
                  {t.description}
                </p>
                <span className="text-xs text-muted-foreground capitalize tracking-wide">
                  {t.category}
                </span>
              </div>
            </div>

            {/* Ligne 2 */}
            <div className="flex items-center justify-between mt-3 text-sm">
              <span
                className={cn(
                  "font-semibold",
                  t.type === "REVENUE" ? "text-green-600" : "text-red-600"
                )}
              >
                {t.type === "REVENUE" ? "+" : "-"}€
                {Math.abs(t.amount).toLocaleString("fr-FR", {
                  minimumFractionDigits: 2,
                })}
              </span>

              <div className="flex items-center gap-1 text-muted-foreground text-xs">
                <Calendar className="h-3 w-3" />
                {formatDate(t.date)}
              </div>
            </div>
          </motion.div>
        ))}

        {transactions.length === 0 && (
          <div className="text-center py-10 text-muted-foreground text-sm">
            Aucune transaction récente
          </div>
        )}
      </CardContent>
    </Card>
  );
}
