import { generateOfferPackage, fetchProperties } from '@/lib/api';
import { OfferPackage } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Layout } from '@/components/Layout';

export async function generateStaticParams() {
  const properties = await fetchProperties();
  return properties.map((property) => ({
    id: property.id.toString(),
  }));
}

export default async function OfferPackagePage({ params }: { params: { id: string } }) {
  const offerPackage: OfferPackage | null = await generateOfferPackage(Number(params.id));

  if (!offerPackage) {
    return <Layout>Angebot nicht gefunden</Layout>;
  }

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Angebotspaket</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Immobiliendetails</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Adresse:</strong> {offerPackage.property.address}</p>
            <p><strong>Preis:</strong> {offerPackage.property.price.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</p>
            <p><strong>Miete:</strong> {offerPackage.property.rent.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</p>
            <p><strong>Wohnfläche:</strong> {offerPackage.property.livingArea} m²</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Verkäuferinformationen</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Name:</strong> {offerPackage.seller.name}</p>
            <p><strong>E-Mail:</strong> {offerPackage.seller.email}</p>
            <p><strong>Telefon:</strong> {offerPackage.seller.phone || 'Nicht angegeben'}</p>
            {offerPackage.agency && (
              <>
                <p><strong>Agentur:</strong> {offerPackage.agency.name}</p>
                <p><strong>Agenturadresse:</strong> {offerPackage.agency.address}</p>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dokumente</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside">
              {offerPackage.documents.map((doc) => (
                <li key={doc.id}>
                  <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {doc.name}
                  </a>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Investorenszenarios</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Szenario</TableHead>
                  <TableHead>Anfangsinvestition</TableHead>
                  <TableHead>Jährliche Rendite</TableHead>
                  <TableHead>ROI</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {offerPackage.investorScenarios.map((scenario) => (
                  <TableRow key={scenario.name}>
                    <TableCell>{scenario.name}</TableCell>
                    <TableCell>{scenario.initialInvestment.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</TableCell>
                    <TableCell>{scenario.annualReturn.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</TableCell>
                    <TableCell>{scenario.roi.toFixed(2)}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <form action="/api/send-offer" method="POST">
          <input type="hidden" name="offerId" value={params.id} />
          <Button type="submit">Angebot an Verkäufer senden</Button>
        </form>
      </div>
    </Layout>
  );
}