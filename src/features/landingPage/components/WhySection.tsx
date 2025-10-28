import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  Zap, 
  Shield, 
  BarChart3, 
  CheckCircle, 
  Lightbulb,
  ArrowRight 
} from "lucide-react";

export function WhySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: Zap,
      title: "Rapide & Efficace",
      description: "Configuration en 2 minutes, résultats immédiats"
    },
    {
      icon: Shield,
      title: "Sécurisé",
      description: "Vos données sont chiffrées et protégées"
    },
    {
      icon: BarChart3,
      title: "Analyses Avancées",
      description: "Graphiques intelligents et rapports détaillés"
    },
    {
      icon: Target,
      title: "Objectifs Personnalisés",
      description: "Fixez et suivez vos objectifs financiers"
    }
  ];

  const stats = [
    { value: "95%", label: "Satisfaction", icon: CheckCircle },
    { value: "2min", label: "Configuration", icon: Zap },
    { value: "24/7", label: "Support", icon: Shield },
    { value: "100%", label: "Sécurisé", icon: CheckCircle }
  ];

  return (
    <section ref={ref} className="py-16 lg:py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-blue-50/30 to-purple-50/50 dark:from-green-950/20 dark:via-blue-950/10 dark:to-purple-950/20" />
      <div className="absolute top-0 left-0 w-48 h-48 lg:w-72 lg:h-72 bg-green-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 lg:w-96 lg:h-96 bg-blue-200/20 rounded-full blur-3xl" />
      
      <div className="container lg:mx-auto px-4 relative z-10">
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
            <Lightbulb className="w-3 h-3 lg:w-4 lg:h-4" />
            Pourquoi nous choisir ?
          </motion.div>
          
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl xl:text-5xl">
            La simplicité au service de{" "}
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              vos finances
            </span>
          </h2>
          
          <p className="text-base lg:text-xl text-muted-foreground max-w-2xl mx-auto">
            Contrairement aux applications complexes, MoneyWise se concentre sur l'essentiel : 
            vous donner une vision claire et simple de vos finances.
          </p>
        </motion.div>

        {/* Main Content Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-6xl mx-auto"
        >
          <Card className="border-0 shadow-xl lg:shadow-2xl bg-background/80 backdrop-blur relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5" />
            
            <CardContent className="p-6 lg:p-8 xl:p-12 relative z-10">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Left Content */}
                <div className="space-y-6 lg:space-y-8">
                  <div className="space-y-4">
                    <Badge variant="secondary" className="text-xs lg:text-sm">
                      💡 Innovation
                    </Badge>
                    <h3 className="text-xl font-bold tracking-tight sm:text-2xl lg:text-3xl">
                      Vos finances,{" "}
                      <span className="text-green-600">organisées</span> en un clin d'œil
                    </h3>
                    <p className="text-sm lg:text-lg text-muted-foreground leading-relaxed">
                      Pas de courbe d'apprentissage, seulement des résultats immédiats 
                      pour une tranquillité d'esprit retrouvée. Nous avons éliminé la 
                      complexité pour vous concentrer sur ce qui compte vraiment.
                    </p>
                  </div>

                  {/* Features Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
                    {features.map((feature, index) => (
                      <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex-shrink-0 w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                          <feature.icon className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm lg:text-sm mb-1">{feature.title}</h4>
                          <p className="text-xs text-muted-foreground">{feature.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8 }}
                    className="flex items-center gap-4 pt-4"
                  >
                    <div className="flex items-center gap-2 text-xs lg:text-sm text-green-600 font-medium">
                      <CheckCircle className="w-3 h-3 lg:w-4 lg:h-4" />
                      Essai gratuit de 30 jours
                    </div>
                    <ArrowRight className="w-3 h-3 lg:w-4 lg:h-4 text-muted-foreground" />
                  </motion.div>
                </div>

                {/* Right Content - Stats */}
                <div className="space-y-6 lg:space-y-8">
                  {/* Quote */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 }}
                    className="relative"
                  >
                    <div className="absolute -top-1 -left-1 text-4xl lg:text-6xl text-green-200 dark:text-green-800">
                      "
                    </div>
                    <blockquote className="text-lg lg:text-2xl text-muted-foreground leading-relaxed italic pl-6 lg:pl-8">
                      "Contrairement aux applications complexes, MoneyWise se concentre 
                      sur la simplicité et la clarté. Une révolution dans la gestion 
                      financière personnelle."
                    </blockquote>
                    <div className="flex items-center gap-3 mt-4 lg:mt-6 pl-6 lg:pl-8">
                      <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-green-500 rounded-full" />
                      <span className="text-xs lg:text-sm font-medium">Équipe MoneyWise</span>
                    </div>
                  </motion.div>

                  {/* Stats Grid */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 }}
                    className="grid grid-cols-2 gap-4 lg:gap-6 pt-4 lg:pt-6"
                  >
                    {stats.map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                        className="text-center p-3 lg:p-4 rounded-xl bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/30 dark:to-blue-950/30 border border-green-100 dark:border-green-800"
                      >
                        <div className="flex justify-center mb-2">
                          <stat.icon className="w-5 h-5 lg:w-6 lg:h-6 text-green-600" />
                        </div>
                        <div className="text-xl lg:text-2xl font-bold text-green-600 mb-1">
                          {stat.value}
                        </div>
                        <div className="text-xs lg:text-sm text-muted-foreground">
                          {stat.label}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
          className="text-center mt-8 lg:mt-12"
        >
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 lg:gap-8 text-xs lg:text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3 h-3 lg:w-4 lg:h-4 text-green-500" />
              <span>Aucune compétence technique</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3 h-3 lg:w-4 lg:h-4 text-green-500" />
              <span>Support français 7j/7</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3 h-3 lg:w-4 lg:h-4 text-green-500" />
              <span>Mises à jour gratuites</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}