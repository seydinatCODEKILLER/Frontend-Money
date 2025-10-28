import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Play, TrendingUp, Shield, Smartphone } from "lucide-react";

export function HeroSection() {
  const features = [
    { icon: TrendingUp, text: "Analyses en temps réel" },
    { icon: Shield, text: "Sécurité bancaire" },
    { icon: Smartphone, text: "Multi-appareils" }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-green-50/50 dark:to-green-950/20">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-slate-900/[0.02] bg-[size:60px_60px]" />
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-green-300/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl" />

      <div className="container px-4 grid lg:grid-cols-2 gap-8 lg:gap-16 items-center py-12 lg:py-20">
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 lg:space-y-8 w-full"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-xs lg:text-sm font-medium text-green-800 dark:border-green-800 dark:bg-green-900 dark:text-green-200"
          >
            <TrendingUp className="w-3 h-3 lg:w-4 lg:h-4" />
            Gestion financière intelligente
          </motion.div>

          <div className="space-y-4 lg:space-y-6 w-full">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-6xl xl:text-7xl leading-tight">
              Prenez le contrôle de vos{" "}
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                finances
              </span>{" "}
              dès aujourd'hui.
            </h1>

            <p className="text-base lg:text-xl text-muted-foreground leading-relaxed">
              MoneyWise vous aide à suivre vos revenus et dépenses, visualiser vos budgets 
              et générer des rapports clairs. Simplifiez votre vie financière.
            </p>
          </div>

          {/* Features List */}
          <div className="flex flex-col gap-2 lg:gap-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.text}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-center gap-2 lg:gap-3 text-foreground text-sm lg:text-base"
              >
                <div className="flex items-center justify-center w-5 h-5 lg:w-6 lg:h-6 bg-green-100 dark:bg-green-900 rounded-full flex-shrink-0">
                  <feature.icon className="w-2.5 h-2.5 lg:w-3 lg:h-3 text-green-600" />
                </div>
                {feature.text}
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 pt-4"
          >
            <Button asChild size="lg" className="rounded-full px-6 lg:px-8 gap-2 text-sm lg:text-base">
              <Link to="/register">
                Commencer maintenant
                <ArrowRight className="w-3 h-3 lg:w-4 lg:h-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-6 lg:px-8 gap-2 text-sm lg:text-base">
              <a href="#features">
                <Play className="w-3 h-3 lg:w-4 lg:h-4" />
                Voir la démo
              </a>
            </Button>
          </motion.div>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, x: 50, rotateY: 10 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative w-full md:max-w-xl lg:max-w-none mx-auto lg:mx-0 order-1 lg:order-2 mb-8 lg:mb-0"
        >
          <div className="relative rounded-2xl lg:rounded-3xl border bg-card p-4 lg:p-8 shadow-xl lg:shadow-2xl">
            {/* Window Controls */}
            <div className="flex gap-2 mb-4 lg:mb-8">
              <div className="w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-red-500" />
              <div className="w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-yellow-500" />
              <div className="w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-green-500" />
            </div>

            {/* Dashboard Content */}
            <div className="space-y-4 lg:space-y-6">
              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-3 lg:gap-4">
                <div className="col-span-2 h-20 lg:h-32 rounded-xl bg-gradient-to-br from-green-500 to-green-600 p-3 lg:p-4 text-white">
                  <div className="text-xs lg:text-sm opacity-90">Solde actuel</div>
                  <div className="text-lg lg:text-2xl font-bold mt-1 lg:mt-2">€4,287.90</div>
                  <div className="text-xs opacity-80 mt-1 lg:mt-2">+12% ce mois</div>
                </div>
                <div className="h-20 lg:h-32 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-3 lg:p-4 text-white">
                  <div className="text-xs lg:text-sm opacity-90">Épargne</div>
                  <div className="text-lg lg:text-2xl font-bold mt-1 lg:mt-2">€2,150</div>
                  <div className="text-xs opacity-80 mt-1 lg:mt-2">Objectif: €3,000</div>
                </div>
              </div>

              {/* Chart */}
              <div className="h-32 lg:h-48 rounded-xl bg-muted p-4 lg:p-6">
                <div className="flex items-end justify-between h-full">
                  {[30, 45, 60, 35, 75, 55, 90, 65, 80, 50, 70, 85].map((height, index) => (
                    <motion.div
                      key={index}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ delay: 1 + index * 0.1, duration: 0.8 }}
                      className="w-3 lg:w-6 bg-gradient-to-t from-green-400 to-green-600 rounded-t"
                    />
                  ))}
                </div>
              </div>

              {/* Recent Transactions */}
              <div className="space-y-2 lg:space-y-3">
                <div className="h-2 lg:h-3 bg-muted-foreground/20 rounded w-3/4" />
                <div className="h-2 lg:h-3 bg-muted-foreground/20 rounded w-1/2" />
                <div className="h-2 lg:h-3 bg-muted-foreground/20 rounded w-2/3" />
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute -top-2 -right-2 lg:-top-4 lg:-right-4 bg-blue-500 text-white px-2 py-1 lg:px-4 lg:py-2 rounded-full text-xs lg:text-sm font-medium shadow-lg"
          >
            +12% ce mois
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="absolute -bottom-2 -left-2 lg:-bottom-4 lg:-left-4 bg-green-500 text-white px-2 py-1 lg:px-4 lg:py-2 rounded-full text-xs lg:text-sm font-medium shadow-lg"
          >
            Budget ✓
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}