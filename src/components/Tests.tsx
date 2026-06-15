import Link from "next/link";
import { tests, testsDisclaimer, testsIntro } from "@/lib/content";

export default function Tests() {
  return (
    <section id="tests" className="section-padding border-t border-line">
      <div className="section-container">
        <p className="section-label">Тесты и опросники</p>
        <p className="max-w-2xl text-base leading-relaxed text-ink-secondary">
          {testsIntro}
        </p>

        <div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {tests.map((test) => (
            <article
              key={test.id}
              className="flex flex-col bg-surface-raised p-6"
            >
              <span className="font-mono text-xs font-medium text-accent">
                {test.abbr}
              </span>
              <h3 className="mt-2 text-base font-semibold leading-snug text-ink">
                {test.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-secondary">
                {test.description}
              </p>
              <Link
                href={`/tests/${test.slug}`}
                className="btn-secondary mt-6 w-full text-center"
              >
                Пройти тест
              </Link>
            </article>
          ))}
        </div>

        <p className="mt-8 text-xs leading-relaxed text-ink-muted">
          {testsDisclaimer}
        </p>
      </div>
    </section>
  );
}
