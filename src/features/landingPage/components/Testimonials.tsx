import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Marie Lambert",
    role: "Freelance Designer",
    content: "Grâce à MoneyWise, j'ai enfin compris où partait mon argent. Mon épargne a augmenté de 30% en seulement 3 mois ! L'interface est tellement intuitive.",
    avatar: "https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947_1280.jpg",
    rating: 5
  },
  {
    name: "Thomas Perrin",
    role: "Entrepreneur",
    content: "L'export PDF est génial pour mes comptes mensuels. Simple, efficace, exactement ce qu'il me fallait pour gérer mon entreprise et mes finances personnelles.",
    avatar: "https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg",
    rating: 5
  },
  {
    name: "Sophie Martin",
    role: "Étudiante",
    content: "Enfin une app de budget qui ne prend pas des heures à configurer. En 10 minutes, tout était paramétré. Je recommande à tous les étudiants !",
    avatar: "https://cdn.pixabay.com/photo/2016/11/29/13/14/attractive-1869761_1280.jpg",
    rating: 5
  }
];

export function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 lg:py-20 bg-muted/50">
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
            className="inline-flex items-center gap-2 rounded-full bg-blue-50 dark:bg-blue-900 px-3 py-1.5 lg:px-4 lg:py-2 text-xs lg:text-sm font-medium text-blue-800 dark:text-blue-200 mb-4"
          >
            <Star className="w-3 h-3 lg:w-4 lg:h-4" />
            Ils nous font confiance
          </motion.div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl xl:text-5xl">
            Ce que disent nos{" "}
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              utilisateurs
            </span>
          </h2>
          <p className="text-base lg:text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez comment MoneyWise transforme la gestion financière de nos utilisateurs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full border-0 bg-background shadow-lg hover:shadow-xl transition-all duration-300 relative">
                <div className="absolute -top-3 -left-3 w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Quote className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
                </div>

                <CardContent className="p-4 lg:p-6">
                  <div className="flex gap-1 mb-3 lg:mb-4 justify-center md:justify-start">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 lg:w-4 lg:h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <blockquote className="text-sm lg:text-base text-muted-foreground italic mb-4 lg:mb-6 leading-relaxed text-center md:text-left">
                    "{testimonial.content}"
                  </blockquote>

                  <div className="flex items-center gap-3 justify-center md:justify-start">
                    <Avatar className="w-10 h-10 lg:w-12 lg:h-12 border-2 border-green-500/20">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback className="bg-gradient-to-r from-green-500 to-blue-500 text-white text-xs">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-sm lg:text-base">{testimonial.name}</div>
                      <div className="text-xs lg:text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12 lg:mt-16"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 lg:gap-12 text-foreground">
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                +2,500
              </div>
              <div className="text-xs lg:text-sm text-muted-foreground">utilisateurs actifs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                98%
              </div>
              <div className="text-xs lg:text-sm text-muted-foreground">de satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                4.9/5
              </div>
              <div className="text-xs lg:text-sm text-muted-foreground">note moyenne</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}