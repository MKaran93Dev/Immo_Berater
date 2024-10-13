import { NextResponse } from 'next/server';
import { fetchProperties, createProperty } from '@/lib/api';

export async function GET() {
  try {
    const properties = await fetchProperties();
    return NextResponse.json(properties);
  } catch (error) {
    console.error('Failed to fetch properties:', error);
    return NextResponse.json({ error: 'Failed to fetch properties' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const property = await createProperty(data);
    return NextResponse.json(property, { status: 201 });
  } catch (error) {
    console.error('Failed to create property:', error);
    return NextResponse.json({ error: 'Failed to create property' }, { status: 500 });
  }
}