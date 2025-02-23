interface Source {
  id: string;
  name: string;
}

async function fetchSources(): Promise<Source[]> {
  const response = await fetch('/api/source');
  if (!response.ok) {
    throw new Error('Failed to fetch sources');
  }
  const data = await response.json();
  return data.data;
}

export default fetchSources;
