<script setup lang="ts">
import { computed } from "vue";
import { RouterLink } from "vue-router";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-vue-next";

// Reuse embedded data (same pattern as the reference project)
import { projects } from "@/pages/projects/data";

const featured = computed(() => projects.slice(0, 3));
</script>

<template>
  <section class="mx-auto max-w-5xl px-6 py-10">
    <!-- Header / Cover -->
    <header class="rounded-2xl border bg-card p-8 shadow-sm">
      <p class="text-sm text-muted-foreground">Personal portfolio</p>

      <h1 class="mt-3 text-4xl sm:text-5xl font-semibold tracking-tight">
        Hi, I’m Nerea.
      </h1>

      <p class="mt-4 text-muted-foreground leading-relaxed max-w-2xl">
        I create responsive websites and UI-focused projects. Here you can explore a selection of my work and the details behind each project.
      </p>

      <div class="mt-6 flex flex-wrap gap-3">
        <RouterLink :to="{ name: 'projects' }">
          <Button class="gap-2">
            View projects
            <ArrowRight class="h-4 w-4" />
          </Button>
        </RouterLink>

        <RouterLink :to="{ name: 'contact' }">
          <Button variant="outline">Contact</Button>
        </RouterLink>
      </div>
    </header>

    <!-- Featured projects -->
    <section class="mt-10">
      <div class="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h2 class="text-2xl font-semibold tracking-tight">Featured projects</h2>
          <p class="mt-2 text-muted-foreground">
            A quick preview. You can open each project for full details.
          </p>
        </div>

        <RouterLink :to="{ name: 'projects' }" class="text-sm text-muted-foreground hover:text-foreground">
          See all →
        </RouterLink>
      </div>

      <div class="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="p in featured"
          :key="p.slug"
          class="rounded-xl border bg-card p-5 shadow-sm flex flex-col"
        >
          <img
            :src="p.cover"
            :alt="p.title"
            class="h-28 w-full rounded-md border bg-background object-contain"
            loading="lazy"
          />

          <div class="mt-4 flex items-center justify-between gap-3">
            <h3 class="font-medium leading-tight">{{ p.title }}</h3>
            <span class="text-xs text-muted-foreground">{{ p.year }}</span>
          </div>

          <p class="mt-2 text-sm text-muted-foreground flex-1">
            {{ p.summary }}
          </p>

          <div class="mt-4">
            <RouterLink :to="{ name: 'project-detail', params: { slug: p.slug } }">
              <Button variant="secondary" class="w-full">View details</Button>
            </RouterLink>
          </div>
        </article>
      </div>
    </section>
  </section>
</template>