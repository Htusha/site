import BackLink from "@/components/BackLink";
import { notFound } from "next/navigation";
import TestResultShare from "@/components/TestResultShare";
import { tests, testsDisclaimer } from "@/lib/content";
import type { TestResult } from "@/lib/results";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return tests.map((test) => ({ slug: test.slug }));
}

export default async function TestPage({ params }: Props) {
  const { slug } = await params;
  const test = tests.find((item) => item.slug === slug);

  if (!test) notFound();

  const placeholderResult: TestResult = {
    testId: test.id,
    testTitle: test.title,
    completedAt: "1970-01-01T00:00:00.000Z",
    summary:
      "Тест пока в разработке. Здесь будет отображаться ваш результат после прохождения опросника.",
    details: [
      { label: "Статус", value: "Ожидает реализации" },
      { label: "Опросник", value: test.abbr },
    ],
  };

  return (
    <main className="section-padding bg-surface pt-24">
      <div className="section-container max-w-2xl">
        <BackLink className="text-sm text-ink-secondary underline hover:text-ink">
          ← К тестам
        </BackLink>

        <p className="section-label mt-6">{test.abbr}</p>
        <h1 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          {test.title}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-ink-secondary">
          {test.description}
        </p>

        <div className="mt-10 border border-dashed border-line bg-surface-muted p-8 text-center">
          <p className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
            Скоро
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
            Опросник находится в разработке. Ниже — как будет работать сохранение
            и отправка результата после прохождения.
          </p>
        </div>

        <div className="mt-8">
          <TestResultShare result={placeholderResult} />
        </div>

        <p className="mt-6 text-xs leading-relaxed text-ink-muted">
          {testsDisclaimer}
        </p>
      </div>
    </main>
  );
}
