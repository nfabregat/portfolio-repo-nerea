<script setup lang="ts">
import { computed, ref } from "vue";

import { projects } from "./data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RouterLink } from "vue-router";
import { Search, X } from "lucide-vue-next";

import PageContainer from "@/components/layout/PageContainer.vue";

import ProjectCardCarousel from "@/components/projects/ProjectCardCarousel.vue";

  type Tag = (typeof projects)[number]["tags"][number];

  const selectedTag = ref<Tag | "all">("all");
  const query = ref("");

  const allTags = computed<Tag[]>(() => {
    const set = new Set<Tag>();
    for (const p of projects) {
      for (const t of p.tags) set.add(t);
    }
    return Array.from(set).sort();
  });

  function matchesQuery(p: (typeof projects)[number], rawQuery: string) {
    const q = rawQuery.trim().toLowerCase();
    if (!q) return true;

    const haystack = [
      p.title,
      p.summary,
      ...(p.tools ?? []),
      ...(p.tags ?? []),
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(q);
  }

  const filteredProjects = computed(() => {
    const byTag =
      selectedTag.value === "all"
        ? projects
        : projects.filter((p) => p.tags.includes(selectedTag.value as Tag));

    return byTag.filter((p) => matchesQuery(p, query.value));
  });

  const resultsCount = computed(() => filteredProjects.value.length);

  function cardImages(p: (typeof projects)[number]) {
    const rest = (p.gallery ?? []).filter((img) => img !== p.cover);
    return [p.cover, ...rest];
  }

  function clearFilters() {
    selectedTag.value = "all";
    query.value = "";
  }
</script>

<template>
  <PageContainer>
    <header class="grid gap-3">
      <h1 class="font-display text-4xl sm:text-5xl font-semibold tracking-tight">
        Projects
      </h1>
      <p class=" text-muted-foreground leading-relaxed">
        These are projects I enjoyed building: strong visuals, clear systems, and finished outcomes. Tap any project for the full gallery.
      </p>
    </header>

    <div class="mt-8 grid gap-4 lg:grid-cols-[1fr,18rem] lg:items-start">
      <div class="flex flex-wrap items-center gap-2">
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

        <span class="ml-1 text-xs text-muted-foreground">
          {{ resultsCount }} result{{ resultsCount === 1 ? "" : "s" }}
        </span>
      </div>

      <div class="grid gap-2">
        <div class="relative">
          <Search
            class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            v-model="query"
            placeholder="Search by title, summary, tools…"
            class="pl-9"
            aria-label="Search projects"
          />
          <button
            v-if="query"
            type="button"
            class="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            @click="query = ''"
            aria-label="Clear search"
          >
            <X class="h-4 w-4" />
          </button>
        </div>

        <Button
          v-if="selectedTag !== 'all' || query"
          variant="ghost"
          size="sm"
          class="justify-start text-muted-foreground"
          @click="clearFilters"
        >
          Clear filters
        </Button>
      </div>
    </div>

    <div v-if="resultsCount" class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <article
        v-for="p in filteredProjects"
        :key="p.slug"
        class="group rounded-2xl border bg-card p-5 shadow-sm flex flex-col overflow-visible transition-all hover:-translate-y-0.5 hover:shadow-md hover:border-foreground/20"
      >
        <ProjectCardCarousel :images="cardImages(p)" :alt="p.title" />

        <div class="mt-4 flex items-start justify-between gap-3">
          <h2 class="text-base font-semibold leading-tight tracking-tight">
            {{ p.title }}
          </h2>
          <span class="mt-0.5 text-xs text-muted-foreground">{{ p.year }}</span>
        </div>

        <div v-if="p.tools?.length" class="mt-3 flex flex-wrap gap-2">
          <span
            v-for="tool in p.tools.slice(0, 4)"
            :key="tool"
            class="inline-flex items-center rounded-full border border-foreground/10 bg-background px-2.5 py-1 text-[11px] leading-none text-muted-foreground"
          >
            {{ tool }}
          </span>
        </div>

        <p class="mt-3 text-sm text-muted-foreground flex-1 leading-relaxed">
          {{ p.summary }}
        </p>

        <div class="mt-5">
          <RouterLink :to="{ name: 'project-detail', params: { slug: p.slug } }">
            <Button variant="secondary" class="w-full transition group-hover:bg-accent group-hover:text-accent-foreground">
              View details
            </Button>
          </RouterLink>
        </div>
      </article>
    </div>

    <div v-else class="mt-10 rounded-2xl border bg-card p-8 text-center">
      <h2 class="text-lg font-semibold tracking-tight">No results</h2>
      <p class="mt-2 text-sm text-muted-foreground">
        Try a different search or clear the filters to see everything.
      </p>
      <div class="mt-5 flex justify-center">
        <Button variant="secondary" @click="clearFilters">Clear</Button>
      </div>
    </div>

  </PageContainer>
</template>
