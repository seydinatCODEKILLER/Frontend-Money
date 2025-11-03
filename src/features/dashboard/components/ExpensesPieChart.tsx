import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { PieChart, Pie, Cell } from "recharts"
import type { ExpensesByCategory } from "../api/types"

interface ExpensesPieChartProps {
  data: ExpensesByCategory
}

export function ExpensesPieChart({ data }: ExpensesPieChartProps) {
  const chartData = data.data.map((cat) => ({
    name: cat.name,
    value: cat.value,
    fill: cat.color, // ✅ Utilisé par Pie
    percentage: cat.percentage,
    count: cat.count,
    id: cat.id,
  }))

  // ✅ Configuration lisible par Shadcn (pas de typing casse-tête)
  const chartConfig = Object.fromEntries(
    chartData.map((cat) => [
      cat.name,
      {
        label: cat.name,
        color: cat.fill,
      },
    ])
  ) satisfies ChartConfig

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Dépenses par Catégorie</CardTitle>
        <p className="text-sm text-muted-foreground">Période: {data.period}</p>
        <p className="text-sm font-medium">
          Total: {data.total.toLocaleString("fr-FR", {
            style: "currency",
            currency: "EUR",
          })}
        </p>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-80 w-full">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
            >
              {chartData.map((entry, i) => (
                <Cell key={i} fill={entry.fill} stroke="#fff" strokeWidth={2} />
              ))}
            </Pie>

            <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
            <ChartLegend content={<ChartLegendContent nameKey="name" />} />
          </PieChart>
        </ChartContainer>

        {/* Liste détaillée des catégories */}
        <div className="grid grid-cols-1 gap-2 mt-4 max-h-40 overflow-y-auto">
          {chartData.map((category) => (
            <div
              key={category.id}
              className="flex items-center justify-between gap-2 text-sm p-2 rounded hover:bg-muted/50"
            >
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: category.fill }}
                />
                <span className="truncate">{category.name}</span>
                <span className="text-xs text-muted-foreground flex-shrink-0">
                  ({category.percentage}%)
                </span>
              </div>
              <span className="font-medium">
                {category.value.toLocaleString("fr-FR", {
                  style: "currency",
                  currency: "EUR",
                })}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
