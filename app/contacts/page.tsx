"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ContactForm } from '@/components/ContactForm';
import { ContactList } from '@/components/ContactList';
import { fetchContacts } from '@/lib/api';
import { Contact } from '@/lib/types';
import { Layout } from '@/components/Layout';

export default function ContactsPage() {
  const [showForm, setShowForm] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    fetchContacts().then(setContacts);
  }, []);

  const handleContactAdded = (newContact: Contact) => {
    setContacts([...contacts, newContact]);
    setShowForm(false);
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Kontakte</h1>
      <Button onClick={() => setShowForm(!showForm)} className="mb-4">
        {showForm ? 'Formular ausblenden' : 'Kontakt hinzufügen'}
      </Button>
      {showForm && <ContactForm onSuccess={handleContactAdded} />}
      <ContactList contacts={contacts} />
    </Layout>
  );
}