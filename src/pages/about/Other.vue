<script setup lang="ts">
import { otherInfo } from "./data";
</script>

<template>
  <div class="space-y-4">
    <h2 class="text-xl font-semibold">Other</h2>
    <p class="text-muted-foreground">
      Tools, languages, and other relevant information.
    </p>

    <div class="mt-4 grid gap-4 sm:grid-cols-2">
      <!-- Languages -->
      <section class="rounded-xl border bg-card p-5 shadow-sm">
        <h3 class="font-medium">Languages</h3>
        <ul class="mt-3 list-disc pl-5 text-sm">
          <li v-for="l in otherInfo.languages" :key="l">{{ l }}</li>
        </ul>
      </section>

      <!-- Tools -->
      <section class="rounded-xl border bg-card p-5 shadow-sm">
        <h3 class="font-medium">Tools</h3>
        <div class="mt-3 flex flex-wrap gap-2">
          <span
            v-for="t in otherInfo.tools"
            :key="t"
            class="text-xs px-2 py-1 rounded-md border bg-background text-muted-foreground"
          >
            {{ t }}
          </span>
        </div>
      </section>

      <!-- Interests -->
      <section class="rounded-xl border bg-card p-5 shadow-sm sm:col-span-2">
        <h3 class="font-medium">Interests</h3>
        <div class="mt-3 flex flex-wrap gap-2">
          <span
            v-for="i in otherInfo.interests"
            :key="i"
            class="text-xs px-2 py-1 rounded-md border bg-background text-muted-foreground"
          >
            {{ i }}
          </span>
        </div>
      </section>
    </div>
  </div>
</template>