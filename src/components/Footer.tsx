import { site } from "@/lib/content";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-4xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-ink">{site.name}</p>
          <p className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-ink-muted">
            {site.tagline} · {site.city}
          </p>
        </div>
        <p className="text-xs text-ink-muted">© {year}</p>
      </div>
    </footer>
  );
}
