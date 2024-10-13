import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Property } from '@/lib/types';

interface PropertyListProps {
  properties: Property[];
}

export function PropertyList({ properties }: PropertyListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Immobilienliste</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Adresse</TableHead>
                <TableHead>Preis</TableHead>
                <TableHead>Miete</TableHead>
                <TableHead>Wohnfläche</TableHead>
                <TableHead>Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {properties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell>{property.address}</TableCell>
                  <TableCell>{property.price.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</TableCell>
                  <TableCell>{property.rent.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</TableCell>
                  <TableCell>{property.livingArea} m²</TableCell>
                  <TableCell>
                    <Link href={`/offer-package/${property.id}`} passHref>
                      <Button variant="outline" size="sm">
                        Angebot erstellen
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}