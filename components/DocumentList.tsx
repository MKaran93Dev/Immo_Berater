import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Document } from '@/lib/types';

interface DocumentListProps {
  documents: Document[];
}

export function DocumentList({ documents }: DocumentListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Datei-URL</TableHead>
          <TableHead>Immobilien-ID</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {documents.map((document) => (
          <TableRow key={document.id}>
            <TableCell>{document.name}</TableCell>
            <TableCell>
              <a href={document.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {document.fileUrl}
              </a>
            </TableCell>
            <TableCell>{document.propertyId}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}