/**
 * Resolve the API base URL so login works on:
 * - this PC (localhost)
 * - phones / other devices on the same Wi‑Fi (LAN IP → Vite proxy)
 * - production (VITE_API_URL must be the live HTTPS API, not 127.0.0.1)
 *
 * Override in Netlify: Site settings → Environment variables → VITE_API_URL
 */
const PRODUCTION_API_FALLBACK = "https://komban-lms-backend.onrender.com/api/v1";

function isLoopbackHost(hostname: string): boolean {
  return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1";
}

function isLoopbackUrl(url: string): boolean {
  return /localhost|127\.0\.0\.1|\[::1\]/i.test(url);
}

function resolveApiBaseUrl(): string {
  const configured = String(import.meta.env.VITE_API_URL || "").trim().replace(/\/$/, "");

  // Local Vite / preview: always use same-origin proxy (/api → backend).
  // This is what makes mobile + other laptops work while developing.
  if (import.meta.env.DEV) {
    return "/api/v1";
  }

  if (typeof window !== "undefined") {
    const { hostname } = window.location;

    // Production / deployed site must not call this device's loopback.
    if (!isLoopbackHost(hostname)) {
      if (configured && !isLoopbackUrl(configured)) {
        return configured;
      }
      console.warn(
        `[CloudConnekt] VITE_API_URL missing or loopback in production. Using fallback ${PRODUCTION_API_FALLBACK}. Set VITE_API_URL in Netlify for your live backend.`,
      );
      return PRODUCTION_API_FALLBACK;
    }
  }

  if (configured && !isLoopbackUrl(configured)) return configured;
  if (configured) return configured;
  return "http://127.0.0.1:8000/api/v1";
}

export const API_BASE_URL = resolveApiBaseUrl();

export const endpoints = {
  login: `${API_BASE_URL}/login`,
  courses: `${API_BASE_URL}/courses`,
};

export default API_BASE_URL;
