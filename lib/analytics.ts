export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackLead() {
  if (typeof window === "undefined") return;
  try {
    window.fbq?.("track", "Lead");
    window.gtag?.("event", "generate_lead");
  } catch {
    // analytics não deve nunca quebrar a experiência do usuário
  }
}
