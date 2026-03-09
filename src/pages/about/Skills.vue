<script setup lang="ts">
import { skillGroups } from "./data";
</script>

<template>
  <div class="space-y-4">
    <h2 class="text-xl font-semibold">Skills</h2>
    <p class="text-muted-foreground">
      Technical and creative skills I use in my projects.
    </p>

    <div class="mt-4 grid gap-4 sm:grid-cols-2">
      <section
        v-for="g in skillGroups"
        :key="g.title"
        class="rounded-xl border bg-card p-5 shadow-sm"
      >
        <h3 class="font-medium">{{ g.title }}</h3>

        <div class="mt-3 flex flex-wrap gap-2">
          <span
            v-for="s in g.items"
            :key="s"
            class="text-xs px-2 py-1 rounded-md border bg-background text-muted-foreground"
          >
            {{ s }}
          </span>
        </div>
      </section>
    </div>
  </div>
</template>