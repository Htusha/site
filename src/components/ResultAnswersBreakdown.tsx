"use client";

import { getAnswerBreakdown } from "@/lib/tests/answer-breakdown";
import type { TestResult } from "@/lib/results";

type ResultAnswersBreakdownProps = {
  result: TestResult;
};

export default function ResultAnswersBreakdown({
  result,
}: ResultAnswersBreakdownProps) {
  if (!result.answers?.length) return null;

  const items = getAnswerBreakdown(result.testId, result.answers);
  if (!items?.length) return null;

  return (
    <details className="border border-line bg-surface-muted">
      <summary className="cursor-pointer list-none px-6 py-4 text-sm font-medium text-ink marker:content-none [&::-webkit-details-marker]:hidden">
        <span className="flex items-center justify-between gap-3">
          <span>Ответы по вопросам</span>
          <span className="font-mono text-xs font-normal text-ink-muted">
            {items.length} вопр.
          </span>
        </span>
        <span className="mt-1 block text-xs font-normal text-ink-muted">
          Нажмите, чтобы раскрыть детали для психолога
        </span>
      </summary>

      <ol className="divide-y divide-line border-t border-line">
        {items.map((item) => (
          <li key={item.questionNumber} className="px-6 py-4">
            <p className="text-xs font-medium text-ink">
              <span className="font-mono text-ink-muted">
                {item.questionNumber}.
              </span>{" "}
              Балл {item.score}
            </p>
            <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-ink-secondary">
              {item.answerText}
            </p>
          </li>
        ))}
      </ol>
    </details>
  );
}
