<script setup lang="ts">
import { computed } from "vue";
import { useRoute, RouterLink } from "vue-router";
import { projects } from "./data";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-vue-next";

const route = useRoute();
const slug = computed(() => String(route.params.slug ?? ""));

const project = computed(() => projects.find((p) => p.slug === slug.value));
</script>

<template>
  <section class="mx-auto max-w-5xl px-6 py-10">
    <RouterLink :to="{ name: 'projects' }" class="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
      <ArrowLeft class="h-4 w-4" />
      Back to projects
    </RouterLink>

    <div v-if="project" class="mt-6">
      <h1 class="text-3xl font-semibold tracking-tight">{{ project.title }}</h1>
      <p class="mt-2 text-muted-foreground">{{ project.summary }}</p>

      <div class="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <img
          :src="project.cover"
          :alt="project.title"
          class="w-full rounded-xl border bg-background object-contain p-6"
          loading="lazy"
        />

        <aside class="rounded-xl border bg-card p-5 h-fit">
          <div class="flex items-center justify-between">
            <p class="text-sm text-muted-foreground">Year</p>
            <p class="text-sm">{{ project.year }}</p>
          </div>

          <div class="mt-4">
            <p class="text-sm text-muted-foreground">Tags</p>
            <div class="mt-2 flex flex-wrap gap-2">
              <span
                v-for="tag in project.tags"
                :key="tag"
                class="text-xs px-2 py-1 rounded-md border bg-background text-muted-foreground"
              >
                {{ tag }}
              </span>
            </div>
          </div>

          <div class="mt-4">
            <p class="text-sm text-muted-foreground">Tools</p>
            <ul class="mt-2 text-sm list-disc pl-5">
              <li v-for="t in project.tools" :key="t">{{ t }}</li>
            </ul>
          </div>

          <div class="mt-6">
            <Button variant="outline" class="w-full" disabled>
              Case study sections (next steps)
            </Button>
          </div>
        </aside>
      </div>
    </div>

    <div v-else class="mt-8 rounded-xl border bg-card p-6">
      <h2 class="text-lg font-semibold">Project not found</h2>
      <p class="mt-2 text-muted-foreground">
        The project you’re looking for doesn’t exist.
      </p>
      <div class="mt-4">
        <RouterLink :to="{ name: 'projects' }">
          <Button variant="secondary">Go back</Button>
        </RouterLink>
      </div>
    </div>
  </section>
</template>