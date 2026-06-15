import { exclusions, services } from "@/lib/content";

export default function Services() {
  return (
    <section id="services" className="section-padding">
      <div className="section-container">
        <p className="section-label">Запросы</p>
        <h2 className="section-title">С чем работаю</h2>
        <p className="section-subtitle">
          Список не исчерпывающий — можно договориться о пробной сессии и
          уточнить в процессе.
        </p>

        <div className="mt-10 divide-y divide-line border-y border-line">
          {services.map((service, index) => (
            <article
              key={service.title}
              className="grid gap-3 py-5 sm:grid-cols-[48px_180px_1fr] sm:items-start sm:gap-6 sm:py-6"
            >
              <span className="font-mono text-sm text-ink-muted">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-sm font-semibold text-ink">{service.title}</h3>
              <p className="text-sm leading-relaxed text-ink-secondary sm:col-start-3 sm:row-start-1">
                {service.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 border border-line bg-surface-muted p-6">
          <p className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
            С чем не работаю
          </p>
          <ul className="mt-4 space-y-2">
            {exclusions.map((item) => (
              <li
                key={item}
                className="flex gap-2 text-sm text-ink-secondary"
              >
                <span className="font-mono text-xs text-ink-muted">—</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
