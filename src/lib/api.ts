import type { Transformer } from '../types';

export async function fetchTransformers(): Promise<Transformer[]> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/sampledata/`, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error(`Failed to fetch categories - ${res.statusText}`);
  }

  return res.json();
}