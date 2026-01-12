const API_BASE = import.meta.env.VITE_API_BASE_URL;

export async function fetchServices() {
  const res = await fetch(`${API_BASE}/ecsServices`);
  if (!res.ok) throw new Error(`Failed /services: ${res.status}`);
  return res.json();
}
