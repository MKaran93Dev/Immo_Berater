"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { PropertyForm } from '@/components/PropertyForm';
import { PropertyList } from '@/components/PropertyList';
import { fetchProperties } from '@/lib/api';
import { Property } from '@/lib/types';
import { Layout } from '@/components/Layout';
import { Plus, X } from 'lucide-react';

export default function PropertiesPage() {
  const [showForm, setShowForm] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    fetchProperties().then(setProperties);
  }, []);

  const handlePropertyAdded = (newProperty: Property) => {
    setProperties(prevProperties => [...prevProperties, newProperty]);
    setShowForm(false);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Immobilien</h1>
          <Button onClick={() => setShowForm(!showForm)} variant="outline">
            {showForm ? (
              <>
                <X className="mr-2 h-4 w-4" /> Formular ausblenden
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" /> Immobilie hinzufügen
              </>
            )}
          </Button>
        </div>
        {showForm && (
          <div className="bg-card text-card-foreground p-6 rounded-lg shadow-md">
            <PropertyForm onSuccess={handlePropertyAdded} />
          </div>
        )}
        <PropertyList properties={properties} />
      </div>
    </Layout>
  );
}