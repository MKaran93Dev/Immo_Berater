"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { createDocument } from '@/lib/api';
import { Document } from '@/lib/types';

const documentSchema = z.object({
  name: z.string().min(1, 'Name ist erforderlich'),
  fileUrl: z.string().url('Gültige URL erforderlich'),
  propertyId: z.number().int().positive('Gültige Immobilien-ID erforderlich'),
});

type DocumentFormData = z.infer<typeof documentSchema>;

interface DocumentFormProps {
  onSuccess: (newDocument: Document) => void;
}

export function DocumentForm({ onSuccess }: DocumentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<DocumentFormData>({
    resolver: zodResolver(documentSchema),
    defaultValues: {
      name: '',
      fileUrl: '',
      propertyId: 0,
    },
  });

  const onSubmit = async (data: DocumentFormData) => {
    setIsSubmitting(true);
    try {
      const newDocument = await createDocument(data);
      onSuccess(newDocument);
      form.reset();
    } catch (error) {
      console.error('Fehler beim Erstellen des Dokuments:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dokumentname</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fileUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Datei-URL</FormLabel>
              <FormControl>
                <Input {...field} type="url" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="propertyId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Immobilien-ID</FormLabel>
              <FormControl>
                <Input {...field} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Wird gespeichert...' : 'Dokument speichern'}
        </Button>
      </form>
    </Form>
  );
}