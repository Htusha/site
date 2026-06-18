"use client";

import BackLink from "@/components/BackLink";
import ResultAnswersBreakdown from "@/components/ResultAnswersBreakdown";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { testsDisclaimer } from "@/lib/content";
import { decodeResult } from "@/lib/results";

function ResultsContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("r");
  const result = token ? decodeResult(token) : null;

  if (!token) {
    return (
      <div className="border border-line bg-surface-muted p-6">
        <p className="text-sm text-ink-secondary">
          Ссылка на результат не найдена. Пройдите тест и сохраните результат,
          чтобы получить ссылку для отправки.
        </p>
        <BackLink className="btn-secondary mt-4 inline-flex">
          К тестам
        </BackLink>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="border border-line bg-surface-muted p-6">
        <p className="text-sm text-ink-secondary">
          Не удалось прочитать результат. Проверьте, что ссылка скопирована
          полностью.
        </p>
        <BackLink className="btn-secondary mt-4 inline-flex">
          К тестам
        </BackLink>
      </div>
    );
  }

  return (
    <div className="border border-line bg-surface-raised">
      <div className="border-b border-line px-6 py-5">
        <p className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
          Результат теста
        </p>
        <h1 className="mt-2 text-xl font-semibold text-ink">{result.testTitle}</h1>
        {result.completedAt && (
          <p className="mt-1 text-xs text-ink-muted">
            {new Date(result.completedAt).toLocaleString("ru-RU")}
          </p>
        )}
        {!result.completedAt && result.answers && (
          <p className="mt-1 text-xs text-ink-muted">
            Анонимный результат — без привязки к личности
          </p>
        )}
      </div>

      <div className="space-y-4 px-6 py-5">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
            Итог
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink">{result.summary}</p>
        </div>

        {result.details && result.details.length > 0 && (
          <dl className="divide-y divide-line border border-line">
            {result.details.map((item) => (
              <div
                key={item.label}
                className="flex items-baseline justify-between gap-4 px-4 py-3"
              >
                <dt className="text-sm text-ink-secondary">{item.label}</dt>
                <dd className="text-sm font-medium text-ink">{item.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <ResultAnswersBreakdown result={result} />
      </div>

      <div className="border-t border-line px-6 py-4">
        <p className="text-xs leading-relaxed text-ink-muted">{testsDisclaimer}</p>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <main className="section-padding bg-surface pt-24">
      <div className="section-container max-w-2xl">
        <Suspense
          fallback={
            <p className="text-sm text-ink-secondary">Загрузка результата…</p>
          }
        >
          <ResultsContent />
        </Suspense>

        <BackLink className="mt-6 inline-block text-sm text-ink-secondary underline hover:text-ink">
          ← Вернуться к тестам
        </BackLink>
      </div>
    </main>
  );
}
