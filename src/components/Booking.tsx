"use client";

import { FormEvent, useState } from "react";
import { pricing } from "@/lib/content";

export default function Booking() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          contact: formData.get("contact"),
          format: formData.get("format"),
          message: formData.get("message"),
        }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(data?.error ?? "Не удалось отправить заявку");
      }

      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Не удалось отправить заявку",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="booking" className="section-padding border-t border-line">
      <div className="section-container">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="section-label">Запись</p>
            <h2 className="section-title">Пробная сессия</h2>
            <p className="section-subtitle">
              Знакомство, определение запроса и сразу работа с самым актуальным.
              Напишите — договоримся о времени.
            </p>

            <dl className="mt-8 space-y-4 border-t border-line pt-6">
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
                  Первая сессия
                </dt>
                <dd className="mt-1 text-sm text-ink">{pricing.firstSession}</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
                  Последующие
                </dt>
                <dd className="mt-1 text-sm text-ink">{pricing.regularSession}</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
                  Длительность
                </dt>
                <dd className="mt-1 text-sm text-ink">{pricing.sessionDuration}</dd>
              </div>
            </dl>

            <ul className="mt-6 space-y-2 text-sm text-ink-secondary">
              {pricing.notes.map((note) => (
                <li key={note} className="flex gap-2">
                  <span className="font-mono text-xs text-ink-muted">—</span>
                  {note}
                </li>
              ))}
            </ul>

            <p className="mt-4 text-xs text-ink-muted">
              Оплата: {pricing.payment}
            </p>
          </div>

          <div className="border border-line bg-surface-raised p-6 sm:p-8">
            {submitted ? (
              <div className="py-10 text-center">
                <p className="font-mono text-xs uppercase tracking-widest text-accent">
                  Отправлено
                </p>
                <p className="mt-3 text-sm text-ink-secondary">
                  Спасибо. Заявка отправлена — отвечу в ближайшее время.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-ink-muted"
                  >
                    Имя
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    disabled={loading}
                    placeholder="Как к вам обращаться"
                    className="w-full border border-line bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-ink-muted outline-none transition-colors focus:border-ink disabled:opacity-60"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact"
                    className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-ink-muted"
                  >
                    Telegram или WhatsApp
                  </label>
                  <input
                    id="contact"
                    name="contact"
                    type="text"
                    required
                    disabled={loading}
                    placeholder="@username или +7..."
                    className="w-full border border-line bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-ink-muted outline-none transition-colors focus:border-ink disabled:opacity-60"
                  />
                </div>

                <div>
                  <label
                    htmlFor="format"
                    className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-ink-muted"
                  >
                    Формат
                  </label>
                  <select
                    id="format"
                    name="format"
                    disabled={loading}
                    className="w-full border border-line bg-surface px-3 py-2.5 text-sm text-ink outline-none transition-colors focus:border-ink disabled:opacity-60"
                  >
                    <option value="online">Онлайн (Zoom)</option>
                    <option value="offline">Очно (Olivos, Буэнос-Айрес)</option>
                    <option value="any">Пока не знаю</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-ink-muted"
                  >
                    Запрос
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    disabled={loading}
                    placeholder="Кратко: что беспокоит (необязательно)"
                    className="w-full resize-none border border-line bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-ink-muted outline-none transition-colors focus:border-ink disabled:opacity-60"
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-600" role="alert">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full disabled:opacity-60"
                >
                  {loading ? "Отправка…" : "Отправить"}
                </button>

                <p className="text-center text-xs text-ink-muted">
                  Или напишите напрямую в{" "}
                  <a
                    href="https://t.me/anton_mor_zov"
                    className="underline hover:text-ink"
                  >
                    Telegram
                  </a>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
