import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Shield, Zap } from "lucide-react";

export function JoinUs() {
  const features = [
    { icon: Shield, text: "Sécurité bancaire de niveau enterprise" },
    { icon: Zap, text: "Configuration en moins de 2 minutes" },
    { icon: CheckCircle, text: "Essai gratuit de 30 jours" }
  ];

  return (
    <section className="py-16 lg:py-20 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-blue-500/10 to-purple-500/10" />
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />
      
      <div className="container lg:mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center space-y-6 lg:space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full bg-green-50 dark:bg-green-900 px-3 py-1.5 lg:px-4 lg:py-2 text-xs lg:text-sm font-medium text-green-800 dark:text-green-200"
          >
            <Zap className="w-3 h-3 lg:w-4 lg:h-4" />
            Rejoignez +2,500 utilisateurs
          </motion.div>

          {/* Heading */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl xl:text-5xl lg:text-6xl">
              Prêt à transformer{" "}
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                vos finances
              </span>
              ?
            </h2>
            <p className="text-base lg:text-xl text-muted-foreground max-w-2xl mx-auto">
              Créez votre compte gratuitement et commencez à gérer votre budget dès maintenant. 
              Aucune carte de crédit requise.
            </p>
          </div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 lg:gap-6 pt-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.text}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-center gap-2 text-xs lg:text-sm text-muted-foreground"
              >
                <feature.icon className="w-3 h-3 lg:w-4 lg:h-4 text-green-500" />
                {feature.text}
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="pt-6 lg:pt-8"
          >
            <Button 
              asChild
              size="lg" 
              className="rounded-full px-8 lg:px-12 py-5 lg:py-6 text-base lg:text-lg font-bold bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 shadow-xl lg:shadow-2xl hover:shadow-2xl lg:hover:shadow-3xl transition-all duration-300 w-full sm:w-auto"
            >
              <Link to="/register" className="flex items-center gap-2 justify-center">
                S'inscrire gratuitement
                <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />
              </Link>
            </Button>
          </motion.div>

          {/* Guarantee */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-xs lg:text-sm text-muted-foreground pt-4"
          >
            Essai de 30 jours • Annulation à tout moment • Support 24/7
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}