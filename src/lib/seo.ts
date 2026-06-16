import { site } from "@/lib/content";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://amorozov.ar";

export const siteName = site.name;

export const defaultTitle = `${site.name} — КПТ и схемотерапия`;

export const defaultDescription =
  "Консультирующий психолог в Буэнос-Айресе. КПТ, схемотерапия, ОРКТ. Работа с тревогой, самокритикой, прокрастинацией. Онлайн и очно.";

export const keywords = [
  "психолог",
  "КПТ",
  "схемотерапия",
  "Буэнос-Айрес",
  "онлайн психолог",
  "тревога",
  "самокритика",
  "прокрастинация",
  "Антон Морозов",
  "amorozov.ar",
];
