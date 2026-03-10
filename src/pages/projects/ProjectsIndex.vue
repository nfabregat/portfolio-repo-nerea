<script setup lang="ts">
import { computed, ref } from "vue";

import { projects } from "./data";
import { Button } from "@/components/ui/button";
import { RouterLink } from "vue-router";

import PageContainer from "@/components/layout/PageContainer.vue";

import ProjectCardCarousel from "@/components/projects/ProjectCardCarousel.vue";

  type Tag = (typeof projects)[number]["tags"][number];

  const selectedTag = ref<Tag | "all">("all");

  const allTags = computed<Tag[]>(() => {
    const set = new Set<Tag>();
    for (const p of projects) {
      for (const t of p.tags) set.add(t);
    }
    return Array.from(set).sort();
  });

  const filteredProjects = computed(() => {
    if (selectedTag.value === "all") return projects;
    return projects.filter((p) => p.tags.includes(selectedTag.value as Tag));
  });
</script>

<template>
  <PageContainer>
    <header class="flex items-end justify-between gap-4 flex-wrap">
      <div>
        <h1 class="text-3xl font-semibold tracking-tight">Projects</h1>
        <p class="mt-2 text-muted-foreground">
          A selection of my academic and creative work.
        </p>
      </div>
    </header>
      <div class="mt-6 flex flex-wrap items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          :class="selectedTag === 'all' ? 'bg-accent text-accent-foreground' : ''"
          @click="selectedTag = 'all'"
        >
          All
        </Button>

        <Button
          v-for="t in allTags"
          :key="t"
          variant="outline"
          size="sm"
          class="capitalize"
          :class="selectedTag === t ? 'bg-accent text-accent-foreground' : ''"
          @click="selectedTag = t"
        >
          {{ t }}
        </Button>
      </div>

    <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <article
        v-for="p in filteredProjects"
        :key="p.slug"
        class="rounded-xl border bg-card p-5 shadow-sm flex flex-col overflow-visible transition hover:shadow-md"
      >
        <ProjectCardCarousel
          :images="p.gallery.length ? p.gallery : [p.cover]"
          :alt="p.title"
        />

        <div class="mt-4 flex items-center justify-between gap-3">
          <h2 class="font-medium leading-tight">{{ p.title }}</h2>
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

  </PageContainer>
</template>