import { processSteps } from "@/lib/content";

export default function Process() {
  return (
    <section id="process" className="section-padding bg-surface-muted">
      <div className="section-container">
        <p className="section-label">Как работаем</p>
        <h2 className="section-title">Структура работы</h2>
        <p className="section-subtitle">
          Без лишних этапов. Всё прозрачно с самого начала.
        </p>

        <div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2">
          {processSteps.map((item) => (
            <div key={item.step} className="bg-surface-raised p-6">
              <span className="font-mono text-xs text-accent">{item.step}</span>
              <h3 className="mt-2 text-base font-semibold text-ink">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
