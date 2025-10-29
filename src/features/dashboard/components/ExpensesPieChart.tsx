import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import type { ExpensesByCategory } from "../api/types";

interface ExpensesPieChartProps {
  data: ExpensesByCategory;
}

export function ExpensesPieChart({ data }: ExpensesPieChartProps) {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background border border-border p-3 rounded-lg shadow-lg">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm">€{data.value.toLocaleString('fr-FR')}</p>
          <p className="text-sm text-muted-foreground">{data.percentage}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Dépenses par Catégorie</CardTitle>
        <p className="text-sm text-muted-foreground">Période: {data.period}</p>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data.data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {data.data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mt-4">
          {data.data.map((category) => (
            <div key={category.id} className="flex items-center gap-2 text-xs">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <span className="truncate flex-1">{category.name}</span>
              <span className="font-medium">€{category.value.toLocaleString('fr-FR')}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}