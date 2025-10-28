import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle, BarChart3, Bell, Smartphone } from "lucide-react";

export function AppPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: BarChart3,
      title: "Graphiques interactifs",
      description: "Visualisez vos données financières avec des graphiques en temps réel"
    },
    {
      icon: Bell,
      title: "Alertes intelligentes",
      description: "Recevez des notifications pour vos dépenses et objectifs"
    },
    {
      icon: Smartphone,
      title: "Multi-appareils",
      description: "Accédez à vos données depuis n'importe quel appareil"
    }
  ];

  return (
    <section ref={ref} className="py-16 lg:py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container lg:mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-6 lg:space-y-8 order-2 lg:order-1"
          >
            <div className="space-y-4 text-center lg:text-left">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl xl:text-5xl">
                Une expérience{" "}
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  intuitive
                </span>
              </h2>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                Notre tableau de bord a été conçu pour une expérience utilisateur optimale. 
                Visualisez instantanément l'état de vos finances avec des graphiques clairs 
                et des indicateurs en temps réel.
              </p>
            </div>
            
            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="flex items-start gap-3 lg:gap-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 lg:w-12 lg:h-12 bg-green-100 dark:bg-green-900 rounded-lg lg:rounded-xl flex items-center justify-center">
                    <feature.icon className="w-5 h-5 lg:w-6 lg:h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-base lg:text-lg mb-1">{feature.title}</h4>
                    <p className="text-sm lg:text-base text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 lg:gap-6 pt-4"
            >
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Configuration en 2 minutes
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Support 24/7
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative order-1 lg:order-2 mb-8 lg:mb-0"
          >
            {/* Mobile Mockup */}
            <div className="relative mx-auto w-74 lg:w-90">
              <div className="relative rounded-[2rem] lg:rounded-[2.5rem] border-4 lg:border-8 border-foreground/20 bg-foreground/5 p-3 lg:p-4 shadow-2xl">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 lg:w-32 h-4 lg:h-6 bg-foreground/20 rounded-b-xl lg:rounded-b-2xl z-10" />
                
                {/* Screen Content */}
                <div className="relative rounded-2xl lg:rounded-3xl bg-background overflow-hidden min-h-[500px] lg:min-h-[600px]">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-green-500 to-blue-500 p-4 lg:p-6 text-white">
                    <div className="text-xs lg:text-sm opacity-90">Solde disponible</div>
                    <div className="text-xl lg:text-2xl font-bold mt-1">€4,287.90</div>
                  </div>

                  {/* Quick Actions */}
                  <div className="p-3 grid grid-cols-4 gap-1">
                    {['Budget', 'Épargne', 'Stats', 'Plus'].map((item) => (
                      <motion.button
                        key={item}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 lg:p-3 bg-muted rounded-lg lg:rounded-xl text-xs lg:text-sm font-medium"
                      >
                        {item}
                      </motion.button>
                    ))}
                  </div>

                  {/* Recent Transactions */}
                  <div className="p-3 lg:p-4 space-y-2 lg:space-y-3">
                    <h3 className="font-semibold text-base lg:text-lg mb-2 lg:mb-3">Dernières transactions</h3>
                    {[
                      { name: "Courses", amount: "-€85.60", time: "Aujourd'hui" },
                      { name: "Salaire", amount: "+€2,800.00", time: "Hier" },
                      { name: "Netflix", amount: "-€15.99", time: "2 jours" }
                    ].map((transaction, index) => (
                      <motion.div
                        key={transaction.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 + index * 0.1 }}
                        className="flex items-center justify-between p-2 lg:p-3 bg-muted/50 rounded-lg"
                      >
                        <div>
                          <div className="font-medium text-sm lg:text-base">{transaction.name}</div>
                          <div className="text-xs text-muted-foreground">{transaction.time}</div>
                        </div>
                        <div className={`font-semibold text-sm lg:text-base ${
                          transaction.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.amount}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 1.2, type: "spring" }}
                className="absolute -top-2 -right-2 lg:-top-4 lg:-right-4 bg-green-500 text-white px-2 py-1 lg:px-3 lg:py-1 rounded-full text-xs font-medium shadow-lg"
              >
                Nouveau!
              </motion.div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.4, type: "spring" }}
                className="absolute -bottom-2 -left-2 lg:-bottom-4 lg:-left-4 bg-blue-500 text-white px-2 py-1 lg:px-3 lg:py-1 rounded-full text-xs font-medium shadow-lg"
              >
                iOS & Android
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}