interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
  region: string;
}

async function fetchAirports(): Promise<Airport[]> {
  const response = await fetch('/api/airport');
  if (!response.ok) {
    throw new Error('Failed to fetch airports');
  }
  const data = await response.json();
  return data.data;
}

export default fetchAirports;
