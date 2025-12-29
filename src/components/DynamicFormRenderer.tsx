import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { FormField } from '@/contexts/AdminContext';

interface DynamicFormRendererProps {
  fields: FormField[];
  onSubmit: (data: Record<string, unknown>) => void;
  submitLabel?: string;
  isLoading?: boolean;
}

export const DynamicFormRenderer: React.FC<DynamicFormRendererProps> = ({
  fields,
  onSubmit,
  submitLabel = 'Submit',
  isLoading = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const renderField = (field: FormField) => {
    const commonProps = {
      id: field.id,
      placeholder: field.placeholder,
      ...register(field.id, {
        required: field.required ? `${field.label} is required` : false,
        ...(field.type === 'email' && {
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address',
          },
        }),
        ...(field.type === 'phone' && {
          pattern: {
            value: /^[0-9]{10}$/,
            message: 'Please enter a valid 10-digit phone number',
          },
        }),
      }),
    };

    switch (field.type) {
      case 'text':
      case 'email':
      case 'phone':
        return <Input type={field.type === 'phone' ? 'tel' : field.type} {...commonProps} />;

      case 'number':
        return <Input type="number" {...commonProps} />;

      case 'date':
        return <Input type="date" {...commonProps} />;

      case 'textarea':
        return <Textarea rows={4} {...commonProps} />;

      case 'dropdown':
        return (
          <Select
            onValueChange={(value) => setValue(field.id, value)}
            value={watch(field.id)}
          >
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder || 'Select an option'} />
            </SelectTrigger>
            <SelectContent>
              {(field.options || []).map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      default:
        return <Input {...commonProps} />;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {fields.map((field) => (
        <div key={field.id} className="space-y-2">
          <Label htmlFor={field.id} className="flex items-center gap-1">
            {field.label}
            {field.required && <span className="text-accent">*</span>}
          </Label>
          {renderField(field)}
          {errors[field.id] && (
            <p className="text-sm text-destructive">
              {errors[field.id]?.message as string}
            </p>
          )}
        </div>
      ))}

      <Button type="submit" variant="hero" size="lg" disabled={isLoading} className="w-full mt-6">
        {isLoading ? 'Processing...' : submitLabel}
      </Button>
    </form>
  );
};
