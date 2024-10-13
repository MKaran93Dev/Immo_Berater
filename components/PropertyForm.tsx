"use client";

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { createProperty } from '@/lib/api';
import { Property } from '@/lib/types';
import { Tooltip } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

const propertySchema = z.object({
  address: z.string().min(1, 'Adresse ist erforderlich'),
  price: z.number().min(1000, 'Preis muss mindestens 1.000 € betragen'),
  rent: z.number().min(1, 'Miete muss positiv sein'),
  livingArea: z.number().min(1, 'Wohnfläche muss positiv sein').max(10000, 'Wohnfläche scheint zu groß zu sein'),
  brokerCommission: z.number().min(0, 'Maklergebühr kann nicht negativ sein').max(100, 'Maklergebühr kann nicht über 100% liegen'),
  targetYield: z.number().min(0, 'Zielrendite kann nicht negativ sein').max(100, 'Zielrendite kann nicht über 100% liegen'),
  bankRate: z.number().min(0, 'Bankrate kann nicht negativ sein').max(100, 'Bankrate kann nicht über 100% liegen'),
});

type PropertyFormData = z.infer<typeof propertySchema>;

interface PropertyFormProps {
  onSuccess: (newProperty: Property) => void;
}

export function PropertyForm({ onSuccess }: PropertyFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const form = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      address: '',
      price: 0,
      rent: 0,
      livingArea: 0,
      brokerCommission: 0,
      targetYield: 0,
      bankRate: 0,
    },
  });

  const { watch } = form;
  const price = watch('price');
  const rent = watch('rent');
  const livingArea = watch('livingArea');
  const brokerCommission = watch('brokerCommission');

  useEffect(() => {
    if (price && brokerCommission) {
      const totalBrokerFee = price * (brokerCommission / 100);
      console.log(`Gesamte Maklergebühr: ${totalBrokerFee.toFixed(2)} €`);
    }
  }, [price, brokerCommission]);

  useEffect(() => {
    if (rent && livingArea) {
      const rentPerSqm = rent / livingArea;
      console.log(`Miete pro m²: ${rentPerSqm.toFixed(2)} €/m²`);
    }
  }, [rent, livingArea]);

  useEffect(() => {
    if (price && rent) {
      const calculatedYield = (rent * 12 / price) * 100;
      form.setValue('targetYield', Number(calculatedYield.toFixed(2)));
    }
  }, [price, rent, form]);

  const onSubmit = async (data: PropertyFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      const newProperty = await createProperty(data);
      onSuccess(newProperty);
      form.reset();
      setSubmitStatus('success');
    } catch (error) {
      console.error('Fehler beim Erstellen der Immobilie:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adresse *</FormLabel>
              <FormControl>
                <Input {...field} className="w-full" />
              </FormControl>
              <FormDescription>Geben Sie die vollständige Adresse der Immobilie ein.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preis (€) *</FormLabel>
              <FormControl>
                <Input {...field} type="number" step="0.01" className="w-full" />
              </FormControl>
              <FormDescription>Der Verkaufspreis der Immobilie in Euro.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Miete (€) *</FormLabel>
              <FormControl>
                <Input {...field} type="number" step="0.01" className="w-full" />
              </FormControl>
              <FormDescription>Die monatliche Miete in Euro.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="livingArea"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Wohnfläche (m²) *</FormLabel>
              <FormControl>
                <Input {...field} type="number" step="0.01" className="w-full" />
              </FormControl>
              <FormDescription>Die Wohnfläche der Immobilie in Quadratmetern.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="brokerCommission"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Maklergebühr (%) *</FormLabel>
              <FormControl>
                <Input {...field} type="number" step="0.01" className="w-full" />
              </FormControl>
              <FormDescription>Die Maklergebühr als Prozentsatz des Verkaufspreises.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="targetYield"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Zielrendite (%) *</FormLabel>
              <FormControl>
                <Input {...field} type="number" step="0.01" className="w-full" />
              </FormControl>
              <FormDescription>Die erwartete jährliche Rendite in Prozent.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bankRate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bankrate (%) *</FormLabel>
              <FormControl>
                <Input {...field} type="number" step="0.01" className="w-full" />
              </FormControl>
              <FormDescription>Der aktuelle Zinssatz der Bank in Prozent.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? 'Wird gespeichert...' : 'Immobilie speichern'}
        </Button>
        {submitStatus === 'success' && (
          <p className="text-green-600 mt-2">Immobilie erfolgreich gespeichert!</p>
        )}
        {submitStatus === 'error' && (
          <p className="text-red-600 mt-2">Fehler beim Speichern der Immobilie. Bitte versuchen Sie es erneut.</p>
        )}
      </form>
    </Form>
  );
}