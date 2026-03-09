<script setup lang="ts">
import { computed } from "vue";
import { RouterLink, RouterView, useRoute } from "vue-router";
import { Button } from "@/components/ui/button";

const route = useRoute();
const path = computed(() => route.path);

function isActive(target: string) {
  return path.value === target;
}
</script>

<template>
  <section class="mx-auto max-w-5xl px-6 py-10">
    <header>
      <h1 class="text-3xl font-semibold tracking-tight">About me</h1>
      <p class="mt-2 text-muted-foreground">
        Professional information: education and skills.
      </p>
    </header>

    <div class="mt-8 grid gap-8 lg:grid-cols-[220px_1fr]">
      <!-- Sidebar -->
      <aside class="rounded-xl border bg-card p-4 h-fit">
        <nav class="grid gap-2">
          <RouterLink to="/about/education">
            <Button
              variant="ghost"
              class="w-full justify-start"
              :class="isActive('/about/education') ? 'bg-accent text-accent-foreground' : ''"
            >
              Education
            </Button>
          </RouterLink>

          <RouterLink to="/about/skills">
            <Button
              variant="ghost"
              class="w-full justify-start"
              :class="isActive('/about/skills') ? 'bg-accent text-accent-foreground' : ''"
            >
              Skills
            </Button>
          </RouterLink>

          <RouterLink to="/about/other">
            <Button
              variant="ghost"
              class="w-full justify-start"
              :class="isActive('/about/other') ? 'bg-accent text-accent-foreground' : ''"
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