import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { cn } from "@/lib/utils";
import type { MonthlyTrends } from "../api/types";

interface MonthlyTrendsChartProps {
  data: MonthlyTrends;
}

export function MonthlyTrendsChart({ data }: MonthlyTrendsChartProps) {
  const chartData = data.data.labels.map((label, index) => ({
    name: label,
    revenus: data.data.datasets[0]?.data[index] || 0,
    dépenses: data.data.datasets[1]?.data[index] || 0,
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border p-3 rounded-lg shadow-lg">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: €{entry.value.toLocaleString('fr-FR')}
            </p>
          ))}
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
            <LineChart data={chartData}>
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
                tickFormatter={(value) => `€${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="revenus" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#10b981' }}
              />
              <Line 
                type="monotone" 
                dataKey="dépenses" 
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
              €{data.summary.totalRevenue.toLocaleString('fr-FR')}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Dépenses Totales</p>
            <p className="text-lg font-semibold text-red-600">
              €{data.summary.totalExpenses.toLocaleString('fr-FR')}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Solde Net</p>
            <p className={cn(
              "text-lg font-semibold",
              data.summary.netFlow >= 0 ? "text-green-600" : "text-red-600"
            )}>
              €{data.summary.netFlow.toLocaleString('fr-FR')}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}