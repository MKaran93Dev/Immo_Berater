import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/Layout';
import { Building, Users, FileText } from 'lucide-react';

export default function Home() {
  return (
    <Layout>
      <div className="space-y-8 text-center">
        <h1 className="text-4xl font-bold mb-6">Willkommen zur Immobilienverwaltungs-App</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Verwalten Sie Ihre Immobilien, Kontakte und Dokumente effizient an einem Ort.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/properties" passHref>
            <Button className="w-full h-32 text-lg flex flex-col items-center justify-center space-y-2">
              <Building className="h-8 w-8" />
              <span>Immobilien</span>
            </Button>
          </Link>
          <Link href="/contacts" passHref>
            <Button className="w-full h-32 text-lg flex flex-col items-center justify-center space-y-2">
              <Users className="h-8 w-8" />
              <span>Kontakte</span>
            </Button>
          </Link>
          <Link href="/documents" passHref>
            <Button className="w-full h-32 text-lg flex flex-col items-center justify-center space-y-2">
              <FileText className="h-8 w-8" />
              <span>Dokumente</span>
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}