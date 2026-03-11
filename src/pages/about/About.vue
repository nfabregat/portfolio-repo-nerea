<script setup lang="ts">
import { computed } from "vue";
import { RouterLink, RouterView, useRoute } from "vue-router";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-vue-next";

const route = useRoute();
const path = computed(() => route.path);
const baseUrl = import.meta.env.BASE_URL ?? "/";
const meSrc = computed(() => {
  const base = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  return `${base}portfolio/others/me.webp`;
});

function isActive(target: string) {
  return path.value === target;
}
</script>

<template>
  <section class="mx-auto max-w-5xl px-6 py-10">
    <header class="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
      <div class="grid gap-8 lg:grid-cols-[1fr_280px] lg:items-start">
        <div>
          <h1 class="font-display text-4xl sm:text-5xl font-semibold tracking-tight">
            About me
          </h1>

          <p class="mt-3 text-lg text-foreground/80 leading-relaxed">
            Design & Creative Technologies student at UPV.
          </p>

          <p class="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
            Hi, I’m Nerea Fabregat Mulet. I’m currently studying Design & Creative
            Technologies (2nd year) at the Universitat Politècnica de València
            (UPV). 
            My portfolio is intentionally mixed: I’m exploring photography,
            web/UI, animation and creative tech while building strong visual and
            technical foundations.
          </p>

          <div class="mt-7 grid gap-4 sm:grid-cols-3">
            <section class="rounded-2xl border border-foreground/10 bg-white p-5">
              <h2 class="text-sm font-semibold tracking-tight">Location</h2>
              <p class="mt-2 text-sm text-muted-foreground leading-relaxed">
                Based in València, Spain — originally from Vinaròs (Castellón).
              </p>
            </section>

            <section class="rounded-2xl border border-foreground/10 bg-white p-5">
              <h2 class="text-sm font-semibold tracking-tight">Involvement</h2>
              <p class="mt-2 text-sm text-muted-foreground leading-relaxed">
                I’m involved in Daidalonic (Generación Espontánea at UPV),
                collaborating on creative/technical projects.
              </p>
            </section>

            <section class="rounded-2xl border border-foreground/10 bg-white p-5">
              <h2 class="text-sm font-semibold tracking-tight">Opportunities</h2>
              <p class="mt-2 text-sm text-muted-foreground leading-relaxed">
                Open to internships, collaborations, and freelance projects.
              </p>
            </section>
          </div>

        </div>

        <div class="justify-self-start lg:justify-self-end">
          <img
            :src="meSrc"
            alt="Portrait of Nerea Fabregat Mulet"
            class="w-full max-w-[280px] aspect-[4/5] rounded-2xl border bg-background object-cover shadow-sm"
            loading="lazy"
          />

          <div class="mt-4">
            <RouterLink to="/contact">
              <Button class="w-full gap-2 hover:bg-accent hover:text-accent-foreground">
                Let’s work together
                <ArrowRight class="h-4 w-4" />
              </Button>
            </RouterLink>
          </div>
        </div>
      </div>
    </header>

    <div class="mt-8 grid gap-8 lg:grid-cols-[220px_1fr]">
      <!-- Sidebar -->
      <aside class="h-fit">
        <nav class="flex gap-2 overflow-auto rounded-2xl border border-accent bg-accent/20 p-2 shadow-sm lg:grid lg:gap-2 lg:p-4">
          <RouterLink to="/about/education">
            <Button
              variant="ghost"
              class="w-full justify-start whitespace-nowrap hover:bg-primary hover:text-primary-foreground"
              :class="isActive('/about/education') ? 'bg-accent text-accent-foreground font-semibold' : ''"
            >
              Education
            </Button>
          </RouterLink>

          <RouterLink to="/about/skills">
            <Button
              variant="ghost"
              class="w-full justify-start whitespace-nowrap hover:bg-primary hover:text-primary-foreground"
              :class="isActive('/about/skills') ? 'bg-accent text-accent-foreground font-semibold' : ''"
            >
              Skills
            </Button>
          </RouterLink>

          <RouterLink to="/about/other">
            <Button
              variant="ghost"
              class="w-full justify-start whitespace-nowrap hover:bg-primary hover:text-primary-foreground"
              :class="isActive('/about/other') ? 'bg-accent text-accent-foreground font-semibold' : ''"
            >
              Other
            </Button>
          </RouterLink>
        </nav>
      </aside>

      <!-- Aquí se renderizan las páginas hijas -->
      <div class="min-w-0">
        <RouterView />
      </div>
    </div>
  </section>
</template>
