import { approaches, beliefExample } from "@/lib/content";

export default function Approach() {
  return (
    <section id="approach" className="section-padding border-y border-line">
      <div className="section-container">
        <p className="section-label">Подход</p>
        <h2 className="section-title">Как выбираем метод</h2>
        <p className="section-subtitle">
          Начинаем с конкретных примеров из жизни, находим паттерны — и решаем,
          что сработает лучше: классические КПТ-приёмы или схемотерапия.
          Главный критерий — насколько легко получается поверить в более
          продуктивные формулировки.
        </p>

        <div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-3">
          {approaches.map((item) => (
            <article key={item.abbr} className="bg-surface-raised p-6">
              <span className="font-mono text-xs font-medium text-accent">
                {item.abbr}
              </span>
              <h3 className="mt-2 text-base font-semibold text-ink">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
                {item.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-8 border border-line bg-surface-muted p-6">
          <p className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
            Как это выглядит на практике
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-medium text-ink-muted">Убеждение</p>
              <p className="mt-1 text-sm text-ink-secondary">
                «{beliefExample.unproductive}»
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-accent">Альтернатива</p>
              <p className="mt-1 text-sm text-ink">
                «{beliefExample.productive}»
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-ink-secondary">
            Получилось найти основания и поверить? Хватает КПТ. Согласие
            рациональной части есть, а чувства говорят об обратном — подойдёт
            схемотерапия: разбор неблагоприятного опыта, режимов поведения и
            того, что движет вами сейчас.
          </p>
        </div>
      </div>
    </section>
  );
}
