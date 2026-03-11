<script setup lang="ts">
import { skillGroups } from "./data";
</script>

<template>
  <div class="space-y-4">
    <h2 class="font-display text-3xl font-semibold tracking-tight">Skills</h2>
    <p class="text-muted-foreground">
      Technical and creative skills I use in my projects.
    </p>

    <div class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <section
        v-for="g in skillGroups"
        :key="g.title"
        class="rounded-2xl border bg-card p-6 shadow-sm"
      >
        <h3 class="text-base font-semibold tracking-tight">{{ g.title }}</h3>

        <ul class="mt-3 list-disc pl-5 text-sm text-foreground/80 space-y-1">
          <li v-for="s in g.items" :key="s">{{ s }}</li>
        </ul>
      </section>
    </div>
  </div>
</template>
