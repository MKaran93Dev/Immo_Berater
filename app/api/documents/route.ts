import { NextResponse } from 'next/server';
import { fetchDocuments, createDocument } from '@/lib/api';

export async function GET() {
  try {
    const documents = await fetchDocuments();
    return NextResponse.json(documents);
  } catch (error) {
    console.error('Failed to fetch documents:', error);
    return NextResponse.json({ error: 'Failed to fetch documents' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const document = await createDocument(data);
    return NextResponse.json(document, { status: 201 });
  } catch (error) {
    console.error('Failed to create document:', error);
    return NextResponse.json({ error: 'Failed to create document' }, { status: 500 });
  }
}