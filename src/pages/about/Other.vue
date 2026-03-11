<script setup lang="ts">
import { otherInfo } from "./data";
</script>

<template>
  <div class="space-y-4">
    <h2 class="font-display text-3xl font-semibold tracking-tight">Other</h2>
    <p class="text-muted-foreground">
      Tools, languages, and other relevant information.
    </p>

    <div class="mt-4 grid gap-4 lg:grid-cols-3">
      <!-- Languages -->
      <section class="rounded-2xl border bg-card p-6 shadow-sm">
        <h3 class="text-base font-semibold tracking-tight">Languages</h3>
        <ul class="mt-3 list-disc pl-5 text-sm text-foreground/80">
          <li v-for="l in otherInfo.languages" :key="l">{{ l }}</li>
        </ul>
      </section>

      <!-- Tools -->
      <section class="rounded-2xl border bg-card p-6 shadow-sm lg:col-span-2">
        <h3 class="text-base font-semibold tracking-tight">Tools</h3>
        <div class="mt-3 flex flex-wrap gap-2">
          <span
            v-for="t in otherInfo.tools"
            :key="t"
            class="text-xs px-2.5 py-1 rounded-full border bg-white text-muted-foreground"
          >
            {{ t }}
          </span>
        </div>
      </section>

      <!-- Interests -->
      <section class="rounded-2xl border bg-card p-6 shadow-sm lg:col-span-3">
        <h3 class="text-base font-semibold tracking-tight">Interests</h3>
        <ul class="mt-3 list-disc pl-5 text-sm text-foreground/80 space-y-1">
          <li v-for="i in otherInfo.interests" :key="i">{{ i }}</li>
        </ul>
      </section>
    </div>
  </div>
</template>
