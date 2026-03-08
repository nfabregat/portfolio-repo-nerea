<script setup lang="ts">
import { projects } from "./data";
import { Button } from "@/components/ui/button";
import { RouterLink } from "vue-router";
</script>

<template>
  <section class="mx-auto max-w-5xl px-6 py-10">
    <header class="flex items-end justify-between gap-4 flex-wrap">
      <div>
        <h1 class="text-3xl font-semibold tracking-tight">Projects</h1>
        <p class="mt-2 text-muted-foreground">
          A selection of my academic and creative work.
        </p>
      </div>
    </header>

    <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <article
        v-for="p in projects"
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
          <h2 class="font-medium leading-tight">{{ p.title }}</h2>
          <span class="text-xs text-muted-foreground">{{ p.year }}</span>
        </div>

        <p class="mt-2 text-sm text-muted-foreground flex-1">
          {{ p.summary }}
        </p>

        <div class="mt-3 flex flex-wrap gap-2">
          <span
            v-for="tag in p.tags"
            :key="tag"
            class="text-xs px-2 py-1 rounded-md border bg-background text-muted-foreground"
          >
            {{ tag }}
          </span>
        </div>

        <div class="mt-4">
          <div class="mt-4">
            <RouterLink :to="{ name: 'project-detail', params: { slug: p.slug } }">
              <Button variant="secondary" class="w-full">
                View details
              </Button>
            </RouterLink>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>