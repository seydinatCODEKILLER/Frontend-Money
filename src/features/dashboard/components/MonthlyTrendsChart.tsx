import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { cn } from "@/lib/utils";
import type { MonthlyTrends } from "../api/types";

interface MonthlyTrendsChartProps {
  data: MonthlyTrends;
}

interface ChartDataPoint {
  name: string;
  revenus: number;
  dépenses: number;
  balance: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
    payload: ChartDataPoint;
  }>;
  label?: string;
}

export function MonthlyTrendsChart({ data }: MonthlyTrendsChartProps) {
  const chartData: ChartDataPoint[] = data.data.map(item => ({
    name: item.month,
    revenus: item.revenue,
    dépenses: item.expenses,
    balance: item.balance,
  }));

  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border p-3 rounded-lg shadow-lg">
          <p className="font-medium">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
            </p>
          ))}
          {payload[0]?.payload && (
            <p className="text-sm mt-1 border-t pt-1">
              Solde: {payload[0].payload.balance.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Évolution Mensuelle</CardTitle>
        <p className="text-sm text-muted-foreground">Période: {data.period}</p>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="name" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value: number) => 
                  value.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })
                }
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="revenus" 
                name="Revenus"
                stroke="#10b981" 
                strokeWidth={2}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#10b981' }}
              />
              <Line 
                type="monotone" 
                dataKey="dépenses" 
                name="Dépenses"
                stroke="#ef4444" 
                strokeWidth={2}
                dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#ef4444' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-4 text-center">
          <div>
            <p className="text-sm text-muted-foreground">Revenus Totaux</p>
            <p className="text-lg font-semibold text-green-600">
              {data.summary.totalRevenue.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Dépenses Totales</p>
            <p className="text-lg font-semibold text-red-600">
              {data.summary.totalExpenses.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Solde Net</p>
            <p className={cn(
              "text-lg font-semibold",
              data.summary.totalRevenue - data.summary.totalExpenses >= 0 ? "text-green-600" : "text-red-600"
            )}>
              {(data.summary.totalRevenue - data.summary.totalExpenses).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}