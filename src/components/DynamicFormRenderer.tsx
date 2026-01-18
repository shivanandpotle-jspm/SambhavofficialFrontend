import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const DynamicFormRenderer = ({ fields, onSubmit, submitLabel = 'Submit' }: any) => {
  const { register, handleSubmit, setValue, getValues } = useForm();

  const handleInternalSubmit = () => {
    // 🪄 CAPTURE EVERYTHING: getValues() pulls the current state of all registered fields
    const rawData = getValues();
    
    // We create a normalized object to ensure 'email' and 'name' are present for the ticket
    const dataWithStandardKeys = { ...rawData };
    fields.forEach((f: any) => {
      const label = f.label.toLowerCase();
      if (f.type === 'email' || label.includes('email')) dataWithStandardKeys.email = rawData[f.id];
     if (label.includes('member') && label.includes('name')) {
  dataWithStandardKeys.name = rawData[f.id];
}


    onSubmit(dataWithStandardKeys);
  };

  return (
    <form onSubmit={handleSubmit(handleInternalSubmit)} className="space-y-4">
      {fields.map((field: any) => (
        <div key={field.id} className="space-y-1">
          <Label className="text-[#741b1b] font-bold">{field.label}</Label>
          {field.type === 'textarea' ? (
            <Textarea {...register(field.id, { required: field.required })} className="bg-white/60" />
          ) : field.type === 'dropdown' ? (
            <Select onValueChange={(v) => setValue(field.id, v)}>
              <SelectTrigger className="bg-white/60"><SelectValue placeholder="Select..." /></SelectTrigger>
              <SelectContent>
                {field.options?.map((opt: string) => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
              </SelectContent>
            </Select>
          ) : (
            <Input type={field.type} {...register(field.id, { required: field.required })} className="bg-white/60" />
          )}
        </div>
      ))}
      <Button type="submit" className="w-full bg-[#741b1b] text-white py-6">
        {submitLabel}
      </Button>
    </form>
  );
};

