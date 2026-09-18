export const MOMENTO_OPTIONS = [
  "Nunca investi",
  "Tenho dinheiro na poupança e não sei o que fazer",
  "Já invisto, mas estou perdido/desorganizado",
  "Outro",
] as const;

export type MomentoOption = (typeof MOMENTO_OPTIONS)[number];

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type WaitlistStep = "email" | "details";

export interface WaitlistRequestBody {
  step: WaitlistStep;
  email: string;
  momento?: string;
  whatsapp?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  referrer?: string;
  company?: string;
}
