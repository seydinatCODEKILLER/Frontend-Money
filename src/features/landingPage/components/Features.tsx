import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, PieChart, FileText, Settings } from "lucide-react";

const features = [
  {
    icon: TrendingUp,
    title: "Suivi des transactions",
    description: "Ajoutez vos revenus et dépenses facilement avec une interface intuitive et rapide."
  },
  {
    icon: PieChart,
    title: "Visualisation graphique",
    description: "Analysez votre budget par catégorie avec des graphiques clairs et personnalisables."
  },
  {
    icon: FileText,
    title: "Exportation PDF / Excel",
    description: "Gardez vos rapports à portée de main avec des exports aux formats standards."
  },
  {
    icon: Settings,
    title: "Catégories personnalisées",
    description: "Adaptez MoneyWise à votre vie en créant vos propres catégories de dépenses."
  }
];

export function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="features" ref={ref} className="py-16 lg:py-20 bg-muted/30">
      <div className="container lg:mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-12 lg:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full bg-green-50 dark:bg-green-900 px-3 py-1.5 lg:px-4 lg:py-2 text-xs lg:text-sm font-medium text-green-800 dark:text-green-200 mb-4"
          >
            <TrendingUp className="w-3 h-3 lg:w-4 lg:h-4" />
            Fonctionnalités puissantes
          </motion.div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl xl:text-5xl">
            Tout ce dont vous avez besoin pour{" "}
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              réussir
            </span>
          </h2>
          <p className="text-base lg:text-xl text-muted-foreground max-w-3xl mx-auto">
            Des outils simples mais puissants pour prendre le contrôle total de vos finances
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={itemVariants} whileHover={{ y: -5 }}>
              <Card className="h-full border-0 bg-background shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardHeader className="text-center pb-4 px-4 lg:px-6">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="inline-flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl lg:rounded-2xl mb-3 lg:mb-4 group-hover:shadow-lg transition-all duration-300"
                  >
                    <feature.icon className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                  </motion.div>
                  <CardTitle className="text-lg lg:text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="px-4 lg:px-6 pb-4 lg:pb-6">
                  <CardDescription className="text-sm lg:text-base text-center leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}