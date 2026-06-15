import { photos, pricing, site } from "@/lib/content";
import ProfilePhoto from "@/components/ProfilePhoto";

export default function About() {
  const facts = [
    { label: "Образование", value: "Высшее психологическое" },
    {
      label: "Специализация",
      value: "КПТ, схемотерапия, ОРКТ",
    },
    { label: "Опыт", value: "10 лет в психологии, 6 лет в терапии" },
    { label: "Супервизии", value: "Регулярно — КПТ, схемотерапия, полимодальные" },
    { label: "Формат", value: `Онлайн (Zoom) и очно, ${pricing.sessionDuration}` },
    {
      label: "Стоимость",
      value: `от ${pricing.firstSession.split(" / ")[0]} (первая сессия)`,
    },
  ];

  return (
    <section id="about" className="section-padding bg-surface-muted">
      <div className="section-container">
        <p className="section-label">Обо мне</p>
        <h2 className="section-title">{site.name}</h2>
        <p className="section-subtitle">
          Консультирующий психолог, КПТ- и схема-терапевт. {site.city},
          Аргентина.
        </p>

        {photos.gallery.length > 0 && (
          <div className="mt-8 grid grid-cols-2 gap-3 sm:max-w-md">
            {photos.gallery.map((photo) => (
              <ProfilePhoto
                key={photo.src}
                src={photo.src}
                alt={photo.alt}
                className="aspect-square w-full"
                hint={`Добавьте файл: public${photo.src}`}
              />
            ))}
          </div>
        )}

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_240px]">
          <div className="space-y-4 text-base leading-relaxed text-ink-secondary">
            <p>
              10 лет в психологии, 6 лет частной практики. Регулярно участвую
              в супервизиях — полимодальных и специализированных, КПТ и
              схема-терапевтических.
            </p>
            <p>
              Большой опыт работы с эмигрантами — понимаю, как перемены,
              одиночество и культурный контекст влияют на состояние. Открыт к
              работе с людьми любых идентичностей и ориентаций.
            </p>
            <p>
              Помимо диалога мы целенаправленно ищем и меняем мыслительные
              установки, которые мешают — и добиваемся, чтобы поведение менялось
              вслед за этим. Если поймём, что не сработаемся, помогу найти более
              подходящего специалиста.
            </p>
          </div>

          <dl className="divide-y divide-line border border-line bg-surface-raised">
            {facts.map((fact) => (
              <div key={fact.label} className="px-4 py-3">
                <dt className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
                  {fact.label}
                </dt>
                <dd className="mt-1 text-sm text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
