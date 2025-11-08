export function RecommendationHeader() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent">
          Recommendations IA
        </h1>
        <p className="text-sm md:text-md text-muted-foreground mt-2">
          Obtenez des recommandations financières personnalisées générées par
        </p>
      </div>
    </div>
  );
}