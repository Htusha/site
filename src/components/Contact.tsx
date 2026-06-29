import { contacts } from "@/lib/content";

export default function Contact() {
  const items = [
    {
      label: "Telegram",
      value: contacts.telegram.handle,
      href: contacts.telegram.href,
    },
    {
      label: "WhatsApp",
      value: contacts.whatsapp.phone,
      href: contacts.whatsapp.href,
    },
    {
      label: "Канал",
      value: contacts.channel.name,
      href: contacts.channel.href,
    },
  ];

  return (
    <section id="contact" className="section-padding bg-surface-muted">
      <div className="section-container">
        <p className="section-label">Контакты</p>
        <h2 className="section-title">Напишите — отвечу</h2>
        <p className="section-subtitle">
          Чтобы узнать подробности, договориться о пробной сессии или просто
          поговорить.
        </p>

        <div className="mt-8 divide-y divide-line border-y border-line">
          {items.map((item) =>
            item.href ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-baseline justify-between gap-4 py-4 transition-colors hover:bg-surface-raised sm:px-4"
              >
                <span className="font-mono text-xs uppercase tracking-widest text-ink-muted">
                  {item.label}
                </span>
                <span className="text-sm text-ink">{item.value}</span>
              </a>
            ) : (
              <div
                key={item.label}
                className="flex items-baseline justify-between gap-4 py-4 sm:px-4"
              >
                <span className="font-mono text-xs uppercase tracking-widest text-ink-muted">
                  {item.label}
                </span>
                <span className="text-sm text-ink">{item.value}</span>
              </div>
            ),
          )}
        </div>

        <div className="mt-6 space-y-2 text-sm text-ink-secondary">
          <p>
            <span className="font-mono text-xs text-ink-muted">Онлайн · </span>
            {contacts.online}
          </p>
          <p>
            <span className="font-mono text-xs text-ink-muted">Очно · </span>
            {contacts.office}
          </p>
          <p className="pt-2 text-xs text-ink-muted">
            <a
              href={contacts.b17.href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-line underline-offset-2 transition-colors hover:text-ink-secondary"
            >
              Анкета на b17.ru
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
