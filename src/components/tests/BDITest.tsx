"use client";

import { useMemo, useState } from "react";
import ResultAnswersBreakdown from "@/components/ResultAnswersBreakdown";
import TestResultShare from "@/components/TestResultShare";
import { testsDisclaimer } from "@/lib/content";
import {
  BDI_INSTRUCTION,
  BDI_QUESTIONS,
  buildBDIResult,
} from "@/lib/tests/bdi";
import type { TestResult } from "@/lib/results";

export default function BDITest() {
  const [answers, setAnswers] = useState<(number | null)[]>(
    () => Array(BDI_QUESTIONS.length).fill(null),
  );
  const [result, setResult] = useState<TestResult | null>(null);

  const allAnswered = answers.every((value) => value !== null);

  const answeredCount = useMemo(
    () => answers.filter((value) => value !== null).length,
    [answers],
  );

  const handleSelect = (questionIndex: number, score: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[questionIndex] = score;
      return next;
    });
  };

  const handleSubmit = () => {
    if (!allAnswered) return;
    setResult(buildBDIResult(answers as number[]));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRetake = () => {
    setAnswers(Array(BDI_QUESTIONS.length).fill(null));
    setResult(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (result) {
    return (
      <div className="mt-10 space-y-6">
        <div className="border border-line bg-surface-raised">
          <div className="border-b border-line px-6 py-5">
            <p className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
              Результат
            </p>
            <p className="mt-3 text-lg font-semibold text-ink">{result.summary}</p>
          </div>

          {result.details && (
            <dl className="divide-y divide-line">
              {result.details.map((item) => (
                <div
                  key={item.label}
                  className="grid gap-1 px-6 py-4 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-4"
                >
                  <dt className="text-sm text-ink-secondary">{item.label}</dt>
                  <dd className="text-sm font-medium text-ink">{item.value}</dd>
                </div>
              ))}
            </dl>
          )}

          <div className="border-t border-line px-6 py-4">
            <p className="text-xs leading-relaxed text-ink-muted">
              {testsDisclaimer}
            </p>
          </div>
        </div>

        <ResultAnswersBreakdown result={result} />

        <TestResultShare result={result} />

        <button type="button" onClick={handleRetake} className="btn-secondary">
          Пройти заново
        </button>
      </div>
    );
  }

  return (
    <div className="mt-10 pb-28">
      <div className="border border-line bg-surface-muted p-5">
        <p className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
          Инструкция
        </p>
        <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
          {BDI_INSTRUCTION}
        </p>
      </div>

      <div className="mt-8 space-y-6">
        {BDI_QUESTIONS.map((question, questionIndex) => {
          const selected = answers[questionIndex];

          return (
            <section
              key={question.id}
              className="border border-line bg-surface-raised p-5"
              aria-labelledby={`bdi-question-${question.id}`}
            >
              <h2
                id={`bdi-question-${question.id}`}
                className="text-sm font-semibold text-ink"
              >
                {question.id}. Выберите одно утверждение
              </h2>
              <div className="mt-4 space-y-2" role="radiogroup">
                {question.options.map((option) => {
                  const isSelected = selected === option.score;

                  return (
                    <button
                      key={`${question.id}-${option.score}`}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => handleSelect(questionIndex, option.score)}
                      className={`w-full border px-3 py-3 text-left text-sm leading-relaxed transition-colors ${
                        isSelected
                          ? "border-ink bg-ink text-white"
                          : "border-line bg-surface text-ink-secondary hover:border-line-strong hover:bg-surface-muted"
                      }`}
                    >
                      <span
                        className={`mr-2 font-mono text-xs ${
                          isSelected ? "text-white/80" : "text-ink-muted"
                        }`}
                      >
                        {option.score}
                      </span>
                      <span className="whitespace-pre-line">{option.text}</span>
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface-raised px-5 py-4 sm:px-8">
        <div className="mx-auto flex max-w-2xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-ink-secondary">
            Отвечено: {answeredCount} из {BDI_QUESTIONS.length}
          </p>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!allAnswered}
            className="btn-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            Получить результат
          </button>
        </div>
      </div>
    </div>
  );
}
