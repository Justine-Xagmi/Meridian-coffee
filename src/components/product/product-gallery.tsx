'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { ProductImage } from '@/lib/types';

export function ProductGallery({ images, productName }: { images: ProductImage[]; productName: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = images[activeIndex] ?? images[0];

  return (
    <div>
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-surface-2">
        {active && (
          <Image
            src={active.url}
            alt={active.alt}
            fill
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        )}
      </div>

      {images.length > 1 && (
        <div role="tablist" aria-label={`${productName} images`} className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((image, index) => (
            <button
              key={image.url}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`Show image ${index + 1} of ${images.length}`}
              onClick={() => setActiveIndex(index)}
              className={cn(
                'focus-ring relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 bg-surface-2 transition-colors',
                index === activeIndex ? 'border-accent' : 'border-transparent hover:border-line'
              )}
            >
              <Image src={image.url} alt="" fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
