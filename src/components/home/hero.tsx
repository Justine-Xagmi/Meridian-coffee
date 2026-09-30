import Image from 'next/image';
import { ButtonLink } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="border-b border-line">
      <div className="container-page grid items-center gap-10 py-12 md:grid-cols-2 md:py-20">
        <div className="animate-slideUp">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">New season, dialed in</p>
          <h1 className="mt-4 text-balance font-display text-4xl leading-[1.1] text-ink sm:text-5xl md:text-6xl">
            Brew equipment built for a deliberate cup.
          </h1>
          <p className="mt-5 max-w-md text-balance text-base leading-relaxed text-muted">
            Gooseneck kettles, conical burr grinders, and ceramic drippers — engineered for repeatable
            extraction and designed to earn a permanent spot on your counter.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/products" size="lg">
              Shop all equipment
            </ButtonLink>
            <ButtonLink href="/category/kettles" variant="outline" size="lg">
              Explore kettles
            </ButtonLink>
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-surface-2">
          <Image
            src="/images/hero/home.svg"
            alt="A Meridian gooseneck kettle mid-pour over a ceramic dripper"
            fill
            priority
            sizes="(min-width: 768px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
