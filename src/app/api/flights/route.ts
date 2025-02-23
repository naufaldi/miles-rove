import { NextResponse } from 'next/server';

const apiUrl = process.env.SEATS_AERO_API_URL;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const response = await fetch(`${apiUrl}/partnerapi/search?${searchParams}`, {
    headers: {
      'Partner-Authorization': process.env.PARTNER_AUTH!,
      Accept: 'application/json',
    },
  });

  const data = await response.json();
  return NextResponse.json(data);
}
