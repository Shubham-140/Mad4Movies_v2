const DEFAULT_API_BASE = "https://mad4movies.onrender.com";

export function getApiBaseUrl() {
  const configured = import.meta.env.VITE_API_URL?.trim();
  return configured ? configured.replace(/\/$/, "") : DEFAULT_API_BASE;
}

export function apiUrl(path) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getApiBaseUrl()}${normalizedPath}`;
}

const DEFAULT_FRONTEND_BASE = "https://mad4movies.vercel.app";

export function publicSiteUrl(path) {
  const configured = import.meta.env.VITE_FRONTEND_URL?.trim();
  const base = configured ? configured.replace(/\/$/, "") : DEFAULT_FRONTEND_BASE;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}
