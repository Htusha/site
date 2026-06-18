import {
  buildBDIResult,
  isValidBDIAnswers,
} from "@/lib/tests/bdi";

export type TestResult = {
  testId: string;
  testTitle: string;
  completedAt: string;
  summary: string;
  details?: { label: string; value: string }[];
  /** Комбинация ответов — для анонимной ссылки без привязки к человеку */
  answers?: number[];
};

type CompactPayload = {
  t: string;
  v: number;
  a: number[];
};

function encodeToken(payload: unknown): string {
  const json = JSON.stringify(payload);
  return btoa(unescape(encodeURIComponent(json)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function decodeToken(token: string): unknown | null {
  try {
    const base64 = token.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
    const json = decodeURIComponent(escape(atob(padded)));
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function isCompactPayload(value: unknown): value is CompactPayload {
  return (
    typeof value === "object" &&
    value !== null &&
    "t" in value &&
    "a" in value &&
    Array.isArray((value as CompactPayload).a)
  );
}

export function encodeResult(result: TestResult): string {
  if (result.answers?.length) {
    return encodeToken({
      t: result.testId,
      v: 1,
      a: result.answers,
    });
  }

  return encodeToken(result);
}

export function decodeResult(token: string): TestResult | null {
  const payload = decodeToken(token);
  if (!payload) return null;

  if (isCompactPayload(payload)) {
    if (payload.t === "bdi" && isValidBDIAnswers(payload.a)) {
      return buildBDIResult(payload.a);
    }
    return null;
  }

  return payload as TestResult;
}

export function buildShareUrl(result: TestResult): string {
  if (typeof window === "undefined") return "";
  const token = encodeResult(result);
  return `${window.location.origin}/results?r=${token}`;
}

export function saveResultLocally(result: TestResult): void {
  const suffix =
    result.answers?.length ? result.answers.join("") : result.completedAt || Date.now();
  const key = `test-result-${result.testId}-${suffix}`;
  localStorage.setItem(key, JSON.stringify(result));
}

export function getLocalResults(): TestResult[] {
  if (typeof window === "undefined") return [];
  const results: TestResult[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key?.startsWith("test-result-")) continue;
    try {
      const raw = localStorage.getItem(key);
      if (raw) results.push(JSON.parse(raw) as TestResult);
    } catch {
      // skip invalid entries
    }
  }
  return results.sort((a, b) => {
    const aKey = a.answers?.join("") ?? a.completedAt;
    const bKey = b.answers?.join("") ?? b.completedAt;
    return bKey.localeCompare(aKey);
  });
}
