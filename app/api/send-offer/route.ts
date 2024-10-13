import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.formData();
  const offerId = data.get('offerId');

  // Here you would implement the logic to send the offer
  // For now, we'll just log it
  console.log(`Sending offer package for offer ID: ${offerId}`);

  // Redirect back to the offer page
  return NextResponse.redirect(`/offer-package/${offerId}`);
}