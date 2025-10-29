import { Link, useLocation } from 'react-router-dom';
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface SidebarNavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  description?: string;
  badge?: string;
}

export function SidebarNavItem({ to, icon: Icon, label, description, badge }: SidebarNavItemProps) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <SidebarMenuItem>
      <motion.div
        whileHover={{ x: 4 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <SidebarMenuButton
          asChild
          isActive={isActive}
          className={cn(
            'w-full transition-all duration-200 group',
            isActive 
              ? 'bg-gradient-to-r from-green-500/10 to-blue-500/10 border-r-2 border-green-500' 
              : 'hover:bg-muted/50'
          )}
        >
          <Link to={to} className="flex items-center gap-3 w-full p-2 rounded-lg">
            <div className={cn(
              'flex items-center justify-center w-8 h-8 rounded-lg transition-colors',
              isActive 
                ? 'bg-gradient-to-br from-green-500 to-blue-500 text-white' 
                : 'bg-muted text-muted-foreground group-hover:bg-green-500/10 group-hover:text-green-600'
            )}>
              <Icon className="w-4 h-4" />
            </div>
            
            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className={cn(
                  'font-medium text-sm transition-colors',
                  isActive ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'
                )}>
                  {label}
                </span>
                {badge && (
                  <span className={cn(
                    'px-1.5 py-0.5 text-xs rounded-full font-medium',
                    isActive 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                      : 'bg-muted-foreground/10 text-muted-foreground'
                  )}>
                    {badge}
                  </span>
                )}
              </div>
              
              {description && (
                <span className="text-xs text-muted-foreground truncate">
                  {description}
                </span>
              )}
            </div>
          </Link>
        </SidebarMenuButton>
      </motion.div>
    </SidebarMenuItem>
  );
}