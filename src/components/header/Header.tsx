import { SidebarTrigger } from '@/components/ui/sidebar'
import { UserMenu } from './UserMenu'
import { useAuth } from '@/hooks/useAuth'
import { ModeToggle } from '../theme/mode-toggle'
import { NotificationsMenu } from './NotificationsMenu'

export const Header = () => {
  const { user } = useAuth()

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b bg-card sticky top-0 z-30 w-full">
      {/* Branding */}
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div className="hidden md:block">
          <h1 className="text-2xl font-bold text-foreground">Moneywise</h1>
          <p className="text-sm text-muted-foreground">
            Plateforme de gestion financeière personnelle
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <ModeToggle />
        <NotificationsMenu />
        <UserMenu user={user ?? undefined} />
      </div>
    </header>
  )
}