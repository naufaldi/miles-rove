import { NextResponse } from 'next/server';

const sources = [
  { id: 'eurobonus', name: 'SAS EuroBonus' },
  { id: 'virginatlantic', name: 'Virgin Atlantic Flying Club' },
  { id: 'aeromexico', name: 'Aeromexico Club Premier' },
  { id: 'american', name: 'American Airlines' },
  { id: 'delta', name: 'Delta SkyMiles' },
  { id: 'etihad', name: 'Etihad Guest' },
  { id: 'united', name: 'United MileagePlus' },
  { id: 'emirates', name: 'Emirates Skywards' },
  { id: 'aeroplan', name: 'Air Canada Aeroplan' },
  { id: 'alaska', name: 'Alaska Mileage Plan' },
  { id: 'velocity', name: 'Virgin Australia Velocity' },
  { id: 'qantas', name: 'Qantas Frequent Flyer' },
  { id: 'copa', name: 'Copa ConnectMiles' },
  { id: 'azul', name: 'Azul TudoAzul' },
  { id: 'smiles', name: 'GOL Smiles' },
  { id: 'flyingblue', name: 'Air France/KLM Flying Blue' },
  { id: 'jetblue', name: 'JetBlue TrueBlue' },
];

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: sources,
    });
  } catch (error) {
    console.error('Error fetching sources:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sources' },
      { status: 500 }
    );
  }
}
