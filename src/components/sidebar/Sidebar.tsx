import {
  BarChart3,
  Bell,
  LayoutDashboard,
  Receipt,
  Tag,
  User,
} from 'lucide-react';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupLabel, 
  SidebarGroupContent, 
  SidebarMenu, 
} from '@/components/ui/sidebar';
import { SidebarNavItem } from './SidebarNavItem';
import { AppSidebarHeader } from './SidebarHeader';
import { AppSidebarFooter } from './SidebarFooter';

interface AppSidebarProps {
  userRole?: 'user' | 'premium' | 'admin';
}

const navigationItems = [
  { 
    title: 'Tableau de bord', 
    href: '/dashboard/analytics', 
    icon: LayoutDashboard,
    description: ''
  },
  { 
    title: 'Transactions', 
    href: '/dashboard/transactions', 
    icon: Receipt,
    description: ''
  },
  { 
    title: 'Catégories', 
    href: '/dashboard/categories', 
    icon: Tag,
    description: ''
  },
  { 
    title: 'Profil', 
    href: '/dashboard/profile', 
    icon: User,
    description: ''
  },
  {
    title: 'Notifications',
    href: '/dashboard/notifications',
    icon: Bell,
    description: ''
  },
  {
    title: 'Rapports',
    href: '/dashboard/reports',
    icon: BarChart3,
    description: ''
  }
];

export const AppSidebar = ({ userRole = 'user' }: AppSidebarProps) => {
  return (
    <Sidebar variant="sidebar" collapsible="icon" className='overflow-x-hidden flex-shrink-0 border-r'>
      <AppSidebarHeader appName="MoneyWise" userRole={userRole} />

      <SidebarContent className="flex flex-col flex-1">
        {/* Navigation Principale */}
        <SidebarGroup className="flex-1">
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarNavItem
                  key={item.title}
                  to={item.href}
                  icon={item.icon}
                  label={item.title}
                  description={item.description}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

      </SidebarContent>

      <AppSidebarFooter />
    </Sidebar>
  );
}