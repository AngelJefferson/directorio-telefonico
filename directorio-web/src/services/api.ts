import type { Extension, ExtensionFilters, CreateExtensionData, UpdateExtensionData } from '../types';

const API_BASE = import.meta.env.VITE_API_URL ?? 'https://localhost:7113/api';

function headers(): Record<string, string> {
  const h: Record<string, string> = { 'Content-Type': 'application/json' };
  const apiKey = import.meta.env.VITE_API_KEY;
  if (apiKey) h['X-Api-Key'] = apiKey;
  return h;
}

export async function fetchExtensions(
  filters: ExtensionFilters,
  signal?: AbortSignal,
): Promise<Extension[]> {
  const params = new URLSearchParams();
  if (filters.buscar) params.append('buscar', filters.buscar);
  if (filters.departamento) params.append('departamento', filters.departamento);
  if (filters.sede) params.append('sede', filters.sede);

  const query = params.toString();
  const url = query ? `${API_BASE}/Extensiones?${query}` : `${API_BASE}/Extensiones`;

  const response = await fetch(url, { headers: headers(), signal });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.error ?? `Error ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

export async function createExtension(data: CreateExtensionData): Promise<Extension> {
  const response = await fetch(`${API_BASE}/Extensiones`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.error ?? `Error ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

export async function updateExtension(id: number, data: UpdateExtensionData): Promise<Extension> {
  const response = await fetch(`${API_BASE}/Extensiones/${id}`, {
    method: 'PUT',
    headers: headers(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.error ?? `Error ${response.status}: ${response.statusText}`);
  }

  return response.json();
}
