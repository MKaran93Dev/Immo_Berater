import { NextResponse } from 'next/server';
import { fetchContacts, createContact } from '@/lib/api';

export async function GET() {
  try {
    const contacts = await fetchContacts();
    return NextResponse.json(contacts);
  } catch (error) {
    console.error('Failed to fetch contacts:', error);
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const contact = await createContact(data);
    return NextResponse.json(contact, { status: 201 });
  } catch (error) {
    console.error('Failed to create contact:', error);
    return NextResponse.json({ error: 'Failed to create contact' }, { status: 500 });
  }
}