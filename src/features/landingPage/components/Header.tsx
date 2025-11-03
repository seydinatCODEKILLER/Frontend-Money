import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Wallet, Menu, X } from "lucide-react";
import { useState } from "react";
import { ModeToggle } from "@/components/theme/mode-toggle";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Accueil', href: '#', id: 'accueil' },
    { label: 'Fonctionnalités', href: '#features', id: 'features' },
    { label: 'À propos', href: '#about', id: 'about' },
    { label: 'Contact', href: '#contact', id: 'contact' }
  ];

  const handleMenuClick = (href: string) => {
    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container px-4 flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 bg-green-500 rounded-lg">
            <Wallet className="w-5 h-5 text-white" />
          </div>
          <span className="hidden md:block text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            MoneyWise
          </span>
        </div>

        {/* Navigation Desktop */}
        <nav className="hidden lg:flex gap-8">
          {menuItems.map((item) => (
            <motion.a
              key={item.id}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleMenuClick(item.href);
              }}
              className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors relative"
              whileHover={{ y: -2 }}
            >
              {item.label}
            </motion.a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          <ModeToggle />
          <Button asChild variant="ghost" size="sm" className="hidden sm:flex">
            <Link to="/login">Se connecter</Link>
          </Button>
          <Button asChild size="sm" className="rounded text-xs sm:text-sm">
            <Link to="/register">S'inscrire</Link>
          </Button>
          
          {/* Menu Mobile Toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Menu Mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed top-16 left-4 right-4 z-50 md:hidden bg-background border border-border rounded-xl shadow-2xl"
            >
              {/* Menu Items */}
              <div className="p-4 space-y-2">
                {menuItems.map((item, index) => (
                  <motion.a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleMenuClick(item.href);
                    }}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-muted transition-colors cursor-pointer"
                    whileHover={{ x: 4 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="font-medium">{item.label}</span>
                  </motion.a>
                ))}
              </div>

              {/* Mobile Auth Buttons */}
              <div className="p-4 border-t border-border space-y-3">
                <Button 
                  asChild 
                  variant="outline" 
                  className="w-full justify-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Link to="/login">Se connecter</Link>
                </Button>
                <Button 
                  asChild 
                  className="w-full justify-center bg-gradient-to-r from-green-600 to-blue-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Link to="/register">S'inscrire gratuitement</Link>
                </Button>
              </div>

              {/* Contact Info */}
              <div className="p-4 border-t border-border bg-muted/20 rounded-b-xl">
                <div className="text-center text-sm text-muted-foreground">
                  <p>💰 Gestion financière simplifiée</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}