import { beliefExample, heroPainPoints, photos, site } from "@/lib/content";
import ProfilePhoto from "@/components/ProfilePhoto";

export default function Hero() {
  return (
    <section className="section-padding border-b border-line pt-24">
      <div className="section-container">
        <div className="grid gap-10 lg:grid-cols-[1fr_300px] lg:gap-12">
          <div className="order-2 lg:order-1">
            <p className="section-label">
              {site.tagline} · {site.city} · онлайн и очно
            </p>
            <h1 className="text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
              {site.name}
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-secondary">
              Консультирующий психолог. Помогаю разобраться с тревогой,
              самокритикой, прокрастинацией и повторяющимися паттернами —
              через КПТ и схемотерапию.
            </p>

            <ul className="mt-6 space-y-2">
              {heroPainPoints.map((point) => (
                <li
                  key={point}
                  className="flex gap-2 text-sm leading-relaxed text-ink-secondary"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 bg-ink-muted" />
                  {point}
                </li>
              ))}
            </ul>

            <p className="mt-5 text-sm text-ink">
              Вот со всем этим я как раз и помогаю справиться.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#booking" className="btn-primary">
                Записаться
              </a>
              <a href="#approach" className="btn-secondary">
                О подходе
              </a>
            </div>
          </div>

          <div className="order-1 space-y-4 lg:order-2">
            <ProfilePhoto
              src={photos.portrait}
              alt={site.name}
              priority
              hint="Положите портрет: public/photos/portrait.jpg"
            />

            <div className="hidden border border-line bg-surface-raised p-5 lg:block">
              <p className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
                Пример из практики
              </p>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
                    Было
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-ink-secondary">
                    «{beliefExample.unproductive}»
                  </p>
                </div>
                <div className="border-l-2 border-accent pl-3">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-accent">
                    Стало
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-ink">
                    «{beliefExample.productive}»
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
