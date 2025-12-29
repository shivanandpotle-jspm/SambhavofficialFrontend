import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, X, Image as ImageIcon, GripVertical } from 'lucide-react';
import type { EventImage } from '@/contexts/AdminContext';

interface MultiImageUploaderProps {
  images: EventImage[];
  onChange: (images: EventImage[]) => void;
  maxImages?: number;
}

export const MultiImageUploader: React.FC<MultiImageUploaderProps> = ({
  images,
  onChange,
  maxImages = 10,
}) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const remainingSlots = maxImages - images.length;
    const filesToAdd = Array.from(files).slice(0, remainingSlots);

    const newImages: EventImage[] = filesToAdd.map((file) => ({
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      url: URL.createObjectURL(file),
      file,
      caption: '',
    }));

    onChange([...images, ...newImages]);
    e.target.value = '';
  }, [images, maxImages, onChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);

    const files = e.dataTransfer.files;
    if (!files) return;

    const remainingSlots = maxImages - images.length;
    const filesToAdd = Array.from(files)
      .filter((file) => file.type.startsWith('image/'))
      .slice(0, remainingSlots);

    const newImages: EventImage[] = filesToAdd.map((file) => ({
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      url: URL.createObjectURL(file),
      file,
      caption: '',
    }));

    onChange([...images, ...newImages]);
  }, [images, maxImages, onChange]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const removeImage = (id: string) => {
    const image = images.find((img) => img.id === id);
    if (image?.url && image.file) {
      URL.revokeObjectURL(image.url);
    }
    onChange(images.filter((img) => img.id !== id));
  };

  const updateCaption = (id: string, caption: string) => {
    onChange(images.map((img) => (img.id === id ? { ...img, caption } : img)));
  };

  const handleItemDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleItemDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newImages = [...images];
    const draggedImage = newImages[draggedIndex];
    newImages.splice(draggedIndex, 1);
    newImages.splice(index, 0, draggedImage);
    onChange(newImages);
    setDraggedIndex(index);
  };

  const handleItemDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-base font-medium">Event Images</Label>
        <span className="text-sm text-muted-foreground">
          {images.length} / {maxImages} images
        </span>
      </div>

      {/* Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
          isDraggingOver
            ? 'border-primary bg-primary/5 scale-[1.02]'
            : 'border-border hover:border-primary/50'
        } ${images.length >= maxImages ? 'opacity-50 pointer-events-none' : ''}`}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={images.length >= maxImages}
        />
        <div className="flex flex-col items-center gap-3">
          <div className="p-4 rounded-full bg-primary/10">
            <Upload className="h-8 w-8 text-primary" />
          </div>
          <div>
            <p className="font-medium text-foreground">Drop images here or click to upload</p>
            <p className="text-sm text-muted-foreground mt-1">
              PNG, JPG, or WEBP up to 5MB each
            </p>
          </div>
        </div>
      </div>

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <Card
              key={image.id}
              draggable
              onDragStart={() => handleItemDragStart(index)}
              onDragOver={(e) => handleItemDragOver(e, index)}
              onDragEnd={handleItemDragEnd}
              className={`group relative overflow-hidden transition-all duration-200 ${
                draggedIndex === index ? 'opacity-50 scale-95' : ''
              }`}
            >
              <CardContent className="p-0">
                <div className="relative aspect-square">
                  <img
                    src={image.url}
                    alt={image.caption || 'Event image'}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors duration-200" />
                  
                  {/* Controls */}
                  <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab">
                    <div className="p-1.5 rounded-md bg-card/90 backdrop-blur-sm">
                      <GripVertical className="h-4 w-4 text-foreground" />
                    </div>
                  </div>
                  
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => removeImage(image.id)}
                    className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  
                  {/* Image number badge */}
                  <div className="absolute bottom-2 left-2 px-2 py-1 rounded-md bg-card/90 backdrop-blur-sm text-xs font-medium">
                    {index + 1}
                  </div>
                </div>

                {/* Caption Input */}
                <div className="p-2">
                  <Input
                    value={image.caption || ''}
                    onChange={(e) => updateCaption(image.id, e.target.value)}
                    placeholder="Add caption..."
                    className="text-sm h-8"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {images.length === 0 && (
        <div className="flex items-center justify-center py-8 text-muted-foreground">
          <ImageIcon className="h-5 w-5 mr-2" />
          <span>No images uploaded yet</span>
        </div>
      )}
    </div>
  );
};
