<script setup lang="ts">
import { education } from "./data";
</script>

<template>
  <div class="space-y-4">
    <h2 class="font-display text-3xl font-semibold tracking-tight">Education</h2>
    <p class="text-muted-foreground">
      My academic background and training.
    </p>

    <div class="mt-4 grid gap-4">
      <article
        v-for="ed in education"
        :key="ed.title + ed.institution"
        class="rounded-2xl border bg-card p-6 shadow-sm"
      >
        <div class="flex flex-wrap items-baseline justify-between gap-2">
          <h3 class="text-base font-semibold tracking-tight">{{ ed.title }}</h3>
          <span class="text-xs text-muted-foreground">{{ ed.period }}</span>
        </div>

        <p class="mt-1 text-sm text-muted-foreground">{{ ed.institution }}</p>

        <ul v-if="ed.notes?.length" class="mt-3 list-disc pl-5 text-sm">
          <li v-for="n in ed.notes" :key="n">{{ n }}</li>
        </ul>
      </article>
    </div>
  </div>
</template>
