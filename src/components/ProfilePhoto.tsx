"use client";

import Image from "next/image";
import { useState } from "react";

type ProfilePhotoProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  hint?: string;
};

export default function ProfilePhoto({
  src,
  alt,
  className = "aspect-[3/4] w-full",
  priority = false,
  hint,
}: ProfilePhotoProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className={`flex flex-col items-center justify-center border border-dashed border-line bg-surface-muted p-6 text-center ${className}`}
      >
        <p className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
          Фото не найдено
        </p>
        <p className="mt-2 text-xs leading-relaxed text-ink-secondary">
          {hint ?? `Добавьте файл: public${src}`}
        </p>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden border border-line bg-surface-muted ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 320px"
        priority={priority}
        onError={() => setError(true)}
      />
    </div>
  );
}
