const BASE = import.meta.env.VITE_API_BASE || "";

export async function apiList(path) {
  const r = await fetch(`${BASE}${path}`);
  const json = await r.json();

  if (Array.isArray(json)) return json;
  if (json && Array.isArray(json.results)) return json.results;
  return [];
}

export async function apiGet(path) {
  const r = await fetch(`${BASE}${path}`);
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return await r.json();
}