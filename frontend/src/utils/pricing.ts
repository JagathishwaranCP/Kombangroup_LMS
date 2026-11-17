const GEO_CACHE_KEY = "komban_is_india";
const DEFAULT_INR_TO_USD = 0.012;

const fallbackIsIndia = (): boolean => {
  try {
    const locale = Intl.DateTimeFormat().resolvedOptions().locale || "";
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (locale.toLowerCase().includes("-in") || locale.toLowerCase().endsWith("_in")) {
      return true;
    }
    if (timeZone === "Asia/Kolkata" || timeZone === "Asia/Calcutta") {
      return true;
    }
  } catch {
    // ignore and default to India for this LMS audience
  }
  return true;
};

export const getInrToUsdRate = (): number => {
  const raw = import.meta.env.VITE_INR_TO_USD_RATE;
  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_INR_TO_USD;
};

export const convertInrToUsd = (inr: number): number => {
  const usd = inr * getInrToUsdRate();
  return Math.round(usd * 100) / 100;
};

export const formatCoursePrice = (inr: number, isIndia: boolean): string => {
  if (!inr || inr <= 0) return "Free";
  if (isIndia) return `₹${inr}`;
  const usd = convertInrToUsd(inr);
  return `$${usd.toFixed(2)}`;
};

export const detectIsIndia = async (): Promise<boolean> => {
  try {
    const cached = sessionStorage.getItem(GEO_CACHE_KEY);
    if (cached === "1" || cached === "0") {
      return cached === "1";
    }
  } catch {
    // sessionStorage unavailable
  }

  let isIndia = fallbackIsIndia();

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);
    const res = await fetch("https://ipapi.co/json/", { signal: controller.signal });
    clearTimeout(timeout);
    if (res.ok) {
      const data = await res.json();
      const country = String(data?.country_code || data?.country || "").toUpperCase();
      if (country) {
        isIndia = country === "IN";
      }
    }
  } catch {
    // keep locale/timezone fallback
  }

  try {
    sessionStorage.setItem(GEO_CACHE_KEY, isIndia ? "1" : "0");
  } catch {
    // ignore
  }

  return isIndia;
};
