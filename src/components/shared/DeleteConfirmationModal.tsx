import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface DeleteConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isDeleting?: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "destructive" | "warning";
  icon?: React.ReactNode;
  warningMessage?: string;
}

export function DeleteConfirmationModal({
  open,
  onOpenChange,
  onConfirm,
  isDeleting = false,
  title = "Supprimer l'élément",
  description = "Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.",
  confirmText = "Supprimer",
  cancelText = "Annuler",
  variant = "destructive",
  icon,
  warningMessage,
}: DeleteConfirmationModalProps) {
  const handleConfirm = () => {
    onConfirm();
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  const getIcon = () => {
    if (icon) return icon;
    return variant === "destructive" ? (
      <AlertTriangle className="w-5 h-5 text-destructive" />
    ) : (
      <AlertCircle className="w-5 h-5 text-amber-500" />
    );
  };

  const getIconBackground = () => {
    return variant === "destructive" 
      ? "bg-destructive/10" 
      : "bg-amber-500/10";
  };

  const getConfirmButtonVariant = () => {
    return variant === "destructive" ? "destructive" : "default";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-start gap-4">
            <div className={cn(
              "flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center mt-1",
              getIconBackground()
            )}>
              {getIcon()}
            </div>
            <div className="flex-1">
              <DialogTitle className="text-lg">{title}</DialogTitle>
              <DialogDescription className="text-base mt-2">
                {description}
              </DialogDescription>
              
              {warningMessage && (
                <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-amber-800 dark:text-amber-300">
                      {warningMessage}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </DialogHeader>

        <DialogFooter className="flex flex-col-reverse sm:flex-row gap-3 mt-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isDeleting}
            className="sm:flex-1"
          >
            {cancelText}
          </Button>
          <Button
            type="button"
            variant={getConfirmButtonVariant()}
            onClick={handleConfirm}
            disabled={isDeleting}
            className={cn(
              "sm:flex-1",
              variant === "warning" && "bg-amber-600 hover:bg-amber-700 text-white"
            )}
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Traitement...
              </>
            ) : (
              confirmText
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}