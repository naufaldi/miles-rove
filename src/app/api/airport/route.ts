import { NextResponse } from 'next/server';

interface Airport {
  id: string;
  code: string;
  name: string;
  city: string;
  country: string;
  region: string;
}

const asianAirports: Airport[] = [
  {
    id: 'sin',
    code: 'SIN',
    name: 'Singapore Changi Airport',
    city: 'Singapore',
    country: 'Singapore',
    region: 'Southeast Asia',
  },
  {
    id: 'bkk',
    code: 'BKK',
    name: 'Suvarnabhumi Airport',
    city: 'Bangkok',
    country: 'Thailand',
    region: 'Southeast Asia',
  },
  {
    id: 'hnd',
    code: 'HND',
    name: 'Tokyo Haneda Airport',
    city: 'Tokyo',
    country: 'Japan',
    region: 'East Asia',
  },
  {
    id: 'icn',
    code: 'ICN',
    name: 'Incheon International Airport',
    city: 'Seoul',
    country: 'South Korea',
    region: 'East Asia',
  },
  {
    id: 'hkg',
    code: 'HKG',
    name: 'Hong Kong International Airport',
    city: 'Hong Kong',
    country: 'Hong Kong SAR',
    region: 'East Asia',
  },
  {
    id: 'kul',
    code: 'KUL',
    name: 'Kuala Lumpur International Airport',
    city: 'Kuala Lumpur',
    country: 'Malaysia',
    region: 'Southeast Asia',
  },
  {
    id: 'pek',
    code: 'PEK',
    name: 'Beijing Capital International Airport',
    city: 'Beijing',
    country: 'China',
    region: 'East Asia',
  },
  {
    id: 'pvg',
    code: 'PVG',
    name: 'Shanghai Pudong International Airport',
    city: 'Shanghai',
    country: 'China',
    region: 'East Asia',
  },
  {
    id: 'cgk',
    code: 'CGK',
    name: 'Soekarno-Hatta International Airport',
    city: 'Jakarta',
    country: 'Indonesia',
    region: 'Southeast Asia',
  },
  {
    id: 'mnl',
    code: 'MNL',
    name: 'Ninoy Aquino International Airport',
    city: 'Manila',
    country: 'Philippines',
    region: 'Southeast Asia',
  },
  {
    id: 'del',
    code: 'DEL',
    name: 'Indira Gandhi International Airport',
    city: 'Delhi',
    country: 'India',
    region: 'South Asia',
  },
  {
    id: 'bom',
    code: 'BOM',
    name: 'Chhatrapati Shivaji International Airport',
    city: 'Mumbai',
    country: 'India',
    region: 'South Asia',
  },
  {
    id: 'dxb',
    code: 'DXB',
    name: 'Dubai International Airport',
    city: 'Dubai',
    country: 'United Arab Emirates',
    region: 'West Asia',
  },
  {
    id: 'doh',
    code: 'DOH',
    name: 'Hamad International Airport',
    city: 'Doha',
    country: 'Qatar',
    region: 'West Asia',
  },
  {
    id: 'sgn',
    code: 'SGN',
    name: 'Tan Son Nhat International Airport',
    city: 'Ho Chi Minh City',
    country: 'Vietnam',
    region: 'Southeast Asia',
  },
  {
    id: 'han',
    code: 'HAN',
    name: 'Noi Bai International Airport',
    city: 'Hanoi',
    country: 'Vietnam',
    region: 'Southeast Asia',
  },
  {
    id: 'tpe',
    code: 'TPE',
    name: 'Taiwan Taoyuan International Airport',
    city: 'Taipei',
    country: 'Taiwan',
    region: 'East Asia',
  },
  {
    id: 'dmk',
    code: 'DMK',
    name: 'Don Mueang International Airport',
    city: 'Bangkok',
    country: 'Thailand',
    region: 'Southeast Asia',
  },
  {
    id: 'auh',
    code: 'AUH',
    name: 'Abu Dhabi International Airport',
    city: 'Abu Dhabi',
    country: 'United Arab Emirates',
    region: 'West Asia',
  },
  {
    id: 'maa',
    code: 'MAA',
    name: 'Chennai International Airport',
    city: 'Chennai',
    country: 'India',
    region: 'South Asia',
  },
  {
    id: 'can',
    code: 'CAN',
    name: 'Guangzhou Baiyun International Airport',
    city: 'Guangzhou',
    country: 'China',
    region: 'East Asia',
  },
  {
    id: 'nrt',
    code: 'NRT',
    name: 'Narita International Airport',
    city: 'Tokyo',
    country: 'Japan',
    region: 'East Asia',
  },
  {
    id: 'kix',
    code: 'KIX',
    name: 'Kansai International Airport',
    city: 'Osaka',
    country: 'Japan',
    region: 'East Asia',
  },
  {
    id: 'den',
    code: 'DPS',
    name: 'Ngurah Rai International Airport',
    city: 'Denpasar',
    country: 'Indonesia',
    region: 'Southeast Asia',
  },
];

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: asianAirports,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch airports',
      },
      { status: 500 }
    );
  }
}
