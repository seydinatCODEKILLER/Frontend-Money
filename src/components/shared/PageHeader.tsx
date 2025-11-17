import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';

interface PageHeaderAction {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  disabled?: boolean;
}

interface PageHeaderDropdownAction {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  destructive?: boolean;
  disabled?: boolean;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: string | React.ReactNode;
  backButton?: boolean;
  backUrl?: string;
  actions?: PageHeaderAction[];
  dropdownActions?: PageHeaderDropdownAction[];
  className?: string;
  children?: React.ReactNode;
  badge?: {
    text: string;
    variant: 'default' | 'secondary' | 'destructive' | 'outline';
  };
}

export function PageHeader({
  title,
  description,
  icon = '📊',
  backButton = false,
  backUrl,
  actions = [],
  dropdownActions = [],
  className,
  children,
  badge,
}: PageHeaderProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (backUrl) {
      navigate(backUrl);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className={cn(
      "relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50/80 dark:from-gray-900 dark:to-gray-800/80",
      "border border-gray-200/50 dark:border-gray-700/50 shadow-sm",
      "backdrop-blur-sm",
      className
    )}>
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, currentColor 2px, transparent 0)`,
          backgroundSize: '50px 50px',
        }}
      />
      
      <div className="relative z-10 p-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          {/* Content */}
          <div className="flex-1 space-y-4">
            <div className="flex items-start gap-4">
              {backButton && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleBack}
                  className="rounded-xl w-10 h-10 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-all duration-300 hover:scale-105 cursor-pointer flex-shrink-0 mt-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              )}
              
              <div className="flex items-start gap-4 flex-1 min-w-0">
                {/* Icon */}
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0",
                  "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20",
                  "border border-blue-100 dark:border-blue-800/30 shadow-sm"
                )}>
                  {typeof icon === 'string' ? (
                    <span className="text-lg">{icon}</span>
                  ) : (
                    icon
                  )}
                </div>

                {/* Text Content */}
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white tracking-tight break-words">
                      {title}
                    </h1>
                    {badge && (
                      <span className={cn(
                        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border",
                        {
                          'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800': badge.variant === 'default',
                          'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700': badge.variant === 'secondary',
                          'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800': badge.variant === 'destructive',
                          'bg-transparent text-gray-600 border-gray-300 dark:text-gray-400 dark:border-gray-600': badge.variant === 'outline',
                        }
                      )}>
                        {badge.text}
                      </span>
                    )}
                  </div>
                  
                  {description && (
                    <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
                      {description}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Children content */}
            {children && (
              <div className="pt-2">
                {children}
              </div>
            )}
          </div>

          {/* Actions */}
          {(actions.length > 0 || dropdownActions.length > 0) && (
            <div className="flex flex-col sm:flex-row gap-2 lg:justify-end lg:items-start">
              {/* Primary actions */}
              <div className="flex flex-wrap gap-2">
                {actions.map((action, index) => (
                  <Button
                    key={index}
                    variant={action.variant || 'default'}
                    onClick={action.onClick}
                    disabled={action.disabled}
                    className={cn(
                      "rounded-xl px-4 py-2 h-auto transition-all duration-300 hover:scale-105 cursor-pointer shadow-sm",
                      action.disabled && "opacity-50 cursor-not-allowed hover:scale-100"
                    )}
                  >
                    {action.icon}
                    <span className="ml-2">{action.label}</span>
                  </Button>
                ))}
              </div>

              {/* Dropdown actions */}
              {dropdownActions.length > 0 && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-xl w-10 h-10 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105 cursor-pointer"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    align="end" 
                    className="rounded-xl border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg min-w-[160px]"
                  >
                    {dropdownActions.map((action, index) => (
                      <DropdownMenuItem
                        key={index}
                        onClick={action.onClick}
                        disabled={action.disabled}
                        className={cn(
                          "rounded-lg cursor-pointer transition-colors duration-200 text-sm",
                          action.destructive 
                            ? "text-red-600 dark:text-red-400 focus:bg-red-50 dark:focus:bg-red-900/20" 
                            : "text-gray-700 dark:text-gray-300 focus:bg-gray-100 dark:focus:bg-gray-700",
                          action.disabled && "opacity-50 cursor-not-allowed"
                        )}
                      >
                        {action.icon}
                        <span className="ml-2">{action.label}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom gradient border */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20" />
    </div>
  );
}

// Variantes prédéfinies pour des cas d'usage courants
interface PrebuiltPageHeaderProps extends Omit<PageHeaderProps, 'actions' | 'dropdownActions'> {
  variant?: 'default' | 'with-stats' | 'simple' | 'with-breadcrumb';
  stats?: {
    label: string;
    value: string | number;
    change?: number;
    icon?: React.ReactNode;
  }[];
  breadcrumbs?: {
    label: string;
    href?: string;
  }[];
  onExport?: () => void;
  onSettings?: () => void;
  onShare?: () => void;
  onRefresh?: () => void;
}

export function PrebuiltPageHeader({
  variant = 'default',
  stats = [],
  breadcrumbs = [],
  onExport,
  onSettings,
  onShare,
  onRefresh,
  ...props
}: PrebuiltPageHeaderProps) {
  const actions: PageHeaderAction[] = [];
  const dropdownActions: PageHeaderDropdownAction[] = [];

  // Actions communes
  if (onRefresh) {
    actions.push({
      label: 'Actualiser',
      icon: <RefreshIcon />,
      onClick: onRefresh,
      variant: 'outline',
    });
  }

  if (onExport) {
    dropdownActions.push({
      label: 'Exporter',
      icon: <DownloadIcon />,
      onClick: onExport,
    });
  }

  if (onShare) {
    dropdownActions.push({
      label: 'Partager',
      icon: <ShareIcon />,
      onClick: onShare,
    });
  }

  if (onSettings) {
    dropdownActions.push({
      label: 'Paramètres',
      icon: <SettingsIcon />,
      onClick: onSettings,
    });
  }

  // Contenu enfants selon la variante
  let children = null;

  if (variant === 'with-stats' && stats.length > 0) {
    children = (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 backdrop-blur-sm hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {stat.label}
                </div>
                {stat.change !== undefined && (
                  <div className={cn(
                    "text-xs font-medium mt-1",
                    stat.change >= 0 
                      ? "text-green-600 dark:text-green-400" 
                      : "text-red-600 dark:text-red-400"
                  )}>
                    {stat.change >= 0 ? '+' : ''}{stat.change}%
                  </div>
                )}
              </div>
              {stat.icon && (
                <div className="text-gray-400 dark:text-gray-500">
                  {stat.icon}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'with-breadcrumb' && breadcrumbs.length > 0) {
    children = (
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 pt-2">
        {breadcrumbs.map((breadcrumb, index) => (
          <div key={index} className="flex items-center gap-2">
            {index > 0 && <span className="text-gray-300 dark:text-gray-600">/</span>}
            {breadcrumb.href ? (
              <a
                href={breadcrumb.href}
                className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors cursor-pointer"
              >
                {breadcrumb.label}
              </a>
            ) : (
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                {breadcrumb.label}
              </span>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <PageHeader
      {...props}
      actions={actions}
      dropdownActions={dropdownActions}
    >
      {children}
    </PageHeader>
  );
}

// Icones pour les variantes prédéfinies
function RefreshIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}