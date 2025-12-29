import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import type { FormField } from '@/contexts/AdminContext';

interface DynamicFormBuilderProps {
  fields: FormField[];
  onChange: (fields: FormField[]) => void;
}

const fieldTypes = [
  { value: 'text', label: 'Text' },
  { value: 'email', label: 'Email' },
  { value: 'number', label: 'Number' },
  { value: 'phone', label: 'Phone' },
  { value: 'date', label: 'Date' },
  { value: 'textarea', label: 'Long Text' },
  { value: 'dropdown', label: 'Dropdown' },
];

export const DynamicFormBuilder: React.FC<DynamicFormBuilderProps> = ({ fields, onChange }) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const addField = () => {
    const newField: FormField = {
      id: Date.now().toString(),
      label: '',
      type: 'text',
      required: false,
      placeholder: '',
    };
    onChange([...fields, newField]);
  };

  const updateField = (index: number, updates: Partial<FormField>) => {
    const updated = [...fields];
    updated[index] = { ...updated[index], ...updates };
    onChange(updated);
  };

  const removeField = (index: number) => {
    onChange(fields.filter((_, i) => i !== index));
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newFields = [...fields];
    const draggedField = newFields[draggedIndex];
    newFields.splice(draggedIndex, 1);
    newFields.splice(index, 0, draggedField);
    onChange(newFields);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const addDropdownOption = (fieldIndex: number) => {
    const field = fields[fieldIndex];
    const options = field.options || [];
    updateField(fieldIndex, { options: [...options, ''] });
  };

  const updateDropdownOption = (fieldIndex: number, optionIndex: number, value: string) => {
    const field = fields[fieldIndex];
    const options = [...(field.options || [])];
    options[optionIndex] = value;
    updateField(fieldIndex, { options });
  };

  const removeDropdownOption = (fieldIndex: number, optionIndex: number) => {
    const field = fields[fieldIndex];
    const options = (field.options || []).filter((_, i) => i !== optionIndex);
    updateField(fieldIndex, { options });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-lg font-semibold text-foreground">Form Fields</h3>
        <Button onClick={addField} size="sm" variant="outline">
          <Plus className="h-4 w-4 mr-1" />
          Add Field
        </Button>
      </div>

      {fields.length === 0 ? (
        <Card className="border-dashed border-2 border-border">
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">No fields added yet. Click "Add Field" to start building your form.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {fields.map((field, index) => (
            <Card
              key={field.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className={`transition-all duration-200 ${draggedIndex === index ? 'opacity-50 scale-98' : ''}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="cursor-grab pt-2">
                    <GripVertical className="h-5 w-5 text-muted-foreground" />
                  </div>

                  <div className="flex-1 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-1.5">
                      <Label className="text-sm">Field Label</Label>
                      <Input
                        value={field.label}
                        onChange={(e) => updateField(index, { label: e.target.value })}
                        placeholder="Enter label"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-sm">Field Type</Label>
                      <Select
                        value={field.type}
                        onValueChange={(value: FormField['type']) => updateField(index, { type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {fieldTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-sm">Placeholder</Label>
                      <Input
                        value={field.placeholder || ''}
                        onChange={(e) => updateField(index, { placeholder: e.target.value })}
                        placeholder="Enter placeholder"
                      />
                    </div>

                    <div className="flex items-center gap-4 pt-6">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={field.required}
                          onCheckedChange={(checked) => updateField(index, { required: checked })}
                        />
                        <Label className="text-sm text-muted-foreground">Required</Label>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeField(index)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                {field.type === 'dropdown' && (
                  <div className="mt-4 ml-8 space-y-2">
                    <Label className="text-sm text-muted-foreground">Dropdown Options</Label>
                    {(field.options || []).map((option, optIndex) => (
                      <div key={optIndex} className="flex items-center gap-2">
                        <Input
                          value={option}
                          onChange={(e) => updateDropdownOption(index, optIndex, e.target.value)}
                          placeholder={`Option ${optIndex + 1}`}
                          className="max-w-xs"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeDropdownOption(index, optIndex)}
                          className="h-8 w-8"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => addDropdownOption(index)}
                      className="text-primary"
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Add Option
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
