export type TestResult = {
  testId: string;
  testTitle: string;
  completedAt: string;
  summary: string;
  details?: { label: string; value: string }[];
};

export function encodeResult(result: TestResult): string {
  const json = JSON.stringify(result);
  return btoa(unescape(encodeURIComponent(json)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export function decodeResult(token: string): TestResult | null {
  try {
    const base64 = token.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
    const json = decodeURIComponent(escape(atob(padded)));
    return JSON.parse(json) as TestResult;
  } catch {
    return null;
  }
}

export function buildShareUrl(result: TestResult): string {
  if (typeof window === "undefined") return "";
  const token = encodeResult(result);
  return `${window.location.origin}/results?r=${token}`;
}

export function saveResultLocally(result: TestResult): void {
  const key = `test-result-${result.testId}-${result.completedAt}`;
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
  return results.sort(
    (a, b) =>
      new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime(),
  );
}
