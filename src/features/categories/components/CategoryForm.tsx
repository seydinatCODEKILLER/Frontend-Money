// components/categories/CategoryForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { categoryFormSchema, type CategoryFormValues } from '../validations/category.schema';
import { Euro } from 'lucide-react';

interface CategoryFormProps {
  onSubmit: (data: CategoryFormValues) => void;
  isSubmitting: boolean;
  onCancel: () => void;
  defaultValues?: Partial<CategoryFormValues>;
}

// Icônes prédéfinies pour les catégories
const categoryIcons = [
  '🍎', '🚗', '🏠', '🎮', '📱', '👕', '💊', '✈️', '🎓', '💼',
  '💰', '📈', '💳', '🎁', '🍽️', '☕', '📚', '🏥', '⚽', '🎬'
];

const categoryColors = [
  '#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6',
  '#EC4899', '#84CC16', '#06B6D4', '#F97316', '#6366F1'
];

export function CategoryForm({ onSubmit, isSubmitting, onCancel, defaultValues }: CategoryFormProps) {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: defaultValues || {
      name: '',
      type: 'DEPENSE',
      color: categoryColors[0],
      icon: categoryIcons[0],
      budgetLimit: null,
    },
  });

  const selectedType = form.watch('type');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Nom de la catégorie */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom de la catégorie *</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Alimentation, Loyer, Salaire..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Type de transaction */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="DEPENSE">Dépense</SelectItem>
                  <SelectItem value="REVENUE">Revenu</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Icône et Couleur */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="icon"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Icône</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue>
                        <div className="flex items-center gap-2">
                          <span>{field.value}</span>
                          <span>{field.value}</span>
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <div className="grid grid-cols-5 gap-2 p-2 max-h-60 overflow-y-auto">
                      {categoryIcons.map((icon) => (
                        <SelectItem key={icon} value={icon} className="p-2 h-12">
                          <div className="text-2xl hover:scale-110 transition-transform">
                            {icon}
                          </div>
                        </SelectItem>
                      ))}
                    </div>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Couleur</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue>
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-4 h-4 rounded-full border"
                            style={{ backgroundColor: field.value }}
                          />
                          <span>{field.value}</span>
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <div className="grid grid-cols-5 gap-2 p-2">
                      {categoryColors.map((color) => (
                        <SelectItem key={color} value={color} className="p-2">
                          <div 
                            className="w-6 h-6 rounded-full border hover:scale-110 transition-transform"
                            style={{ backgroundColor: color }}
                          />
                        </SelectItem>
                      ))}
                    </div>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Budget Limit (uniquement pour les dépenses) */}
        {selectedType === 'DEPENSE' && (
          <FormField
            control={form.control}
            name="budgetLimit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Budget mensuel (optionnel)</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      type="number"
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      value={field.value === null ? '' : field.value}
                      onChange={(e) => {
                        const value = e.target.value === '' ? null : Number(e.target.value);
                        field.onChange(value);
                      }}
                      className="pl-10"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
            Annuler
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
          </Button>
        </div>
      </form>
    </Form>
  );
}