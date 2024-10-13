"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { DocumentForm } from '@/components/DocumentForm';
import { DocumentList } from '@/components/DocumentList';
import { fetchDocuments } from '@/lib/api';
import { Document } from '@/lib/types';
import { Layout } from '@/components/Layout';

export default function DocumentsPage() {
  const [showForm, setShowForm] = useState(false);
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    fetchDocuments().then(setDocuments);
  }, []);

  const handleDocumentAdded = (newDocument: Document) => {
    setDocuments([...documents, newDocument]);
    setShowForm(false);
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Dokumente</h1>
      <Button onClick={() => setShowForm(!showForm)} className="mb-4">
        {showForm ? 'Formular ausblenden' : 'Dokument hinzufügen'}
      </Button>
      {showForm && <DocumentForm onSuccess={handleDocumentAdded} />}
      <DocumentList documents={documents} />
    </Layout>
  );
}