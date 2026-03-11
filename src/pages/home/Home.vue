<script setup lang="ts">
import { computed } from "vue";
import { RouterLink } from "vue-router";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-vue-next";
import { useMouseMotion } from "@/composables/useMouseMotion";
import { projects } from "@/pages/projects/data";

const { offset, onMouseMove, onMouseLeave } = useMouseMotion({ maxOffsetPx: 18 });
const heroStyle = computed(() => ({
  backgroundPositionX: `calc(50% + ${offset.x}px)`,
  backgroundPositionY: `calc(50% + ${offset.y}px)`,
  transition: "background-position 0.1s ease-out",
}));

function interleave<T>(lists: T[][]) {
  const result: T[] = [];
  const maxLen = Math.max(0, ...lists.map((l) => l.length));
  for (let i = 0; i < maxLen; i++) {
    for (const list of lists) {
      const item = list[i];
      if (item !== undefined) result.push(item);
    }
  }
  return result;
}

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.length > 0;
}

const marqueeImages = computed(() => {
  const perProject = projects.map((p) => {
    const images = [p.cover, ...(p.gallery ?? [])].filter(isNonEmptyString);
    return Array.from(new Set(images));
  });

  const mixed = interleave(perProject);
  // Duplicate for seamless loop
  return [...mixed, ...mixed];
});
</script>

<template>
  <div>
    <section
      class="hero relative isolate min-h-[calc(100dvh-4rem)] overflow-hidden px-6 py-14 sm:py-20"
      @mousemove="onMouseMove"
      @mouseleave="onMouseLeave"
    >
      <div class="hero-bg absolute inset-0 -z-10" :style="heroStyle" aria-hidden="true" />
      <div class="absolute inset-0 -z-10 bg-gradient-to-b from-background/35 via-background/10 to-background/80" aria-hidden="true" />

      <p class="hero-outline pointer-events-none absolute -left-10 top-24 hidden sm:block select-none" aria-hidden="true">
        PORTFOLIO
      </p>
      <p class="hero-outline pointer-events-none absolute -right-10 bottom-24 hidden sm:block select-none" aria-hidden="true">
        CREATIVE
      </p>

      <div class="mx-auto flex min-h-[calc(100dvh-4rem-7rem)] max-w-6xl flex-col justify-between gap-8 sm:gap-10 text-center sm:text-left">
        <div class="flex flex-col items-center gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <p class="text-xs uppercase tracking-[0.22em] text-foreground/70">
            Welcome to my creative
          </p>
          <p class="hidden sm:block text-xs uppercase tracking-[0.22em] text-foreground/60">
            With a little bit of everything
          </p>
        </div>

        <div class="grid gap-8 lg:grid-cols-12 lg:items-end">
          <h1 class="lg:col-span-9">
            <span class="block font-display text-6xl sm:text-8xl lg:text-9xl font-semibold uppercase leading-[0.82] tracking-tight">
              Portfolio
            </span>
            <span class="mt-5 block subtitle max-w-2xl text-lg sm:text-xl text-foreground/80 leading-relaxed">
              With a little bit of everything.
            </span>
          </h1>

          <div class="lg:col-span-3 lg:justify-self-end text-center lg:text-right">
            <p class="text-sm text-foreground/70">By</p>
            <p class="mt-1 text-lg font-semibold tracking-tight">
              Nerea Fabregat Mulet
            </p>
          </div>
        </div>

      <div class="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <p class="subtitle max-w-md text-sm text-foreground/70 leading-relaxed">
          A mix of photography, branding, and creative tech projects.
        </p>

          <div class="flex flex-wrap gap-3">
            <RouterLink :to="{ name: 'projects' }">
              <Button class="gap-2 bg-primary/85 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground">
                Explore projects
                <ArrowRight class="h-4 w-4" />
              </Button>
            </RouterLink>

            <RouterLink :to="{ name: 'contact' }">
              <Button
                variant="outline"
                class="bg-background/70 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground"
              >
                Contact
              </Button>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <section class="relative left-1/2 w-screen -translate-x-1/2 bg-accent py-14 sm:py-20 min-h-[calc(100dvh-4rem)]">
      <div class="mx-auto flex min-h-[calc(100dvh-4rem-7rem)] max-w-6xl flex-col justify-between gap-10 sm:gap-12">
        <div class="overflow-hidden">
          <div class="marquee-track flex w-max items-center gap-4 px-6">
            <div
              v-for="(img, i) in marqueeImages"
              :key="img + i"
              class="h-36 w-52 sm:h-40 sm:w-60 md:h-48 md:w-72 lg:h-56 lg:w-80 overflow-hidden border border-accent-foreground/20 bg-background/20"
            >
              <img :src="img" :alt="`Project image ${i + 1}`" class="h-full w-full object-cover" loading="lazy" />
            </div>
          </div>
        </div>

        <div class="px-6 text-center sm:text-left">
          <p class="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-accent-foreground">
            Explore my projects
          </p>
          <p class="mt-2 max-w-2xl text-sm sm:text-base text-accent-foreground/80 leading-relaxed">
            Design, photography, and creative tech—made to be explored.
          </p>

          <div class="mt-5">
            <RouterLink :to="{ name: 'projects' }">
              <Button class="bg-primary text-primary-foreground hover:bg-background hover:text-foreground">
                View projects
              </Button>
            </RouterLink>
          </div>
        </div>

        <div class="overflow-hidden">
          <div class="marquee-track marquee-track--reverse flex w-max items-center gap-4 px-6">
            <div
              v-for="(img, i) in marqueeImages"
              :key="img + i + '-reverse'"
              class="h-36 w-52 sm:h-40 sm:w-60 md:h-48 md:w-72 lg:h-56 lg:w-80 overflow-hidden border border-accent-foreground/20 bg-background/20"
            >
              <img :src="img" :alt="`Project image ${i + 1}`" class="h-full w-full object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero-bg {
  background-size: cover;
  background-position: center center;
  background-image: url("/portfolio/others/background-image.webp");
  will-change: background-position, background-size;
  transform: scale(1);
  transition: transform 240ms ease;
}

.hero:hover .hero-bg {
  transform: scale(1.06);
}

.hero-outline {
  font-family: "Fraunces", "Nunito Sans", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  font-weight: 700;
  letter-spacing: -0.02em;
  font-size: clamp(4rem, 10vw, 10rem);
  line-height: 0.9;
  color: transparent;
  -webkit-text-stroke: 1px color-mix(in srgb, var(--foreground) 18%, transparent);
  opacity: 0.9;
}

.marquee-track {
  animation: marquee 26s linear infinite;
  will-change: transform;
}

.marquee-track--reverse {
  animation-direction: reverse;
  animation-duration: 30s;
}

@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    animation: none;
  }
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>
