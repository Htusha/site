"use client";

import { useState } from "react";
import type { TestResult } from "@/lib/results";
import {
  buildShareUrl,
  saveResultLocally,
} from "@/lib/results";

type TestResultShareProps = {
  result: TestResult;
};

export default function TestResultShare({ result }: TestResultShareProps) {
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    saveResultLocally(result);
    const url = buildShareUrl(result);
    setShareUrl(url);
    setSaved(true);
  };

  const handleCopy = async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: user can copy manually from input
    }
  };

  return (
    <div className="border border-line bg-surface-muted p-6">
      <p className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
        Сохранить и отправить
      </p>
      <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
        Ссылка содержит только комбинацию ответов — без имени и контактов. Ею
        можно поделиться с психологом.
      </p>

      {!saved ? (
        <button type="button" onClick={handleSave} className="btn-primary mt-4">
          Сохранить результат и получить ссылку
        </button>
      ) : (
        <div className="mt-4 space-y-3">
          <p className="text-sm text-ink">
            Результат сохранён в браузере. Скопируйте ссылку:
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              readOnly
              value={shareUrl}
              className="flex-1 border border-line bg-surface px-3 py-2 text-xs text-ink-secondary outline-none"
              onFocus={(e) => e.target.select()}
            />
            <button type="button" onClick={handleCopy} className="btn-secondary shrink-0">
              {copied ? "Скопировано" : "Копировать"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
