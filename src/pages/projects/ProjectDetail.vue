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
  <!-- Header -->
  <header>
    <h1 class="font-display text-4xl sm:text-5xl font-semibold tracking-tight">
      {{ project.title }}
    </h1>

    <p class="mt-3 text-foreground/75 leading-relaxed max-w-2xl">
      {{ project.summary }}
    </p>

    <!-- meta badges -->
    <div class="mt-4 flex flex-wrap items-center gap-2">
      <span class="px-3 py-1 rounded-full bg-background border border-foreground/15 text-sm">
        {{ project.year }}
      </span>

      <span
        v-for="tag in project.tags"
        :key="tag"
        class="px-3 py-1 rounded-full bg-background border border-foreground/15 text-sm capitalize"
      >
        {{ tag }}
      </span>
    </div>

    <!-- keywords (accent highlight) -->
    <div v-if="project.keywords?.length" class="mt-4 flex flex-wrap gap-2">
      <span
        v-for="k in project.keywords"
        :key="k"
        class="font-display px-3 py-1 rounded-full bg-accent text-accent-foreground text-sm"
       >
        {{ k }}
      </span>
    </div>
  </header>

  <!-- Layout -->
  <div class="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
    <!-- Main -->
    <div class="space-y-10">
      <!-- Overview -->
      <section>
        <h2 class="text-2xl font-semibold">Overview</h2>
        <p class="mt-3 text-foreground/80 leading-relaxed">
          {{ project.description }}
        </p>
      </section>

      <!-- Concept (accent callout) -->
      <section v-if="project.concept" class="rounded-2xl border border-accent bg-accent/20 p-6">
        <h2 class="text-2xl font-semibold">Concept</h2>
        <p class="mt-3 text-foreground/80 leading-relaxed">
          {{ project.concept }}
        </p>
      </section>

      <!-- Inspiration -->
      <section v-if="project.inspiration?.length">
        <h2 class="text-2xl font-semibold">Inspiration</h2>
        <ul class="mt-3 list-disc pl-5 space-y-2 text-foreground/80">
          <li v-for="item in project.inspiration" :key="item">{{ item }}</li>
        </ul>
      </section>

      <!-- Takeaways -->
      <section v-if="project.takeaways">
        <h2 class="text-2xl font-semibold">Key takeaways</h2>
        <div class="mt-4 grid gap-6 sm:grid-cols-2">
          <div class="rounded-2xl border border-foreground/15 bg-background p-5">
            <h3 class="font-display font-semibold">Strengths</h3>
            <ul class="mt-3 list-disc pl-5 space-y-2 text-foreground/80">
              <li v-for="s in project.takeaways.strengths" :key="s">{{ s }}</li>
            </ul>
          </div>

          <div class="rounded-2xl border border-foreground/15 bg-background p-5">
            <h3 class="font-semibold">Limitations</h3>
            <ul class="mt-3 list-disc pl-5 space-y-2 text-foreground/80">
              <li v-for="l in project.takeaways.limitations" :key="l">{{ l }}</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Gallery -->
      <section class="pt-2">
        <h2 class="text-2xl font-semibold">Gallery</h2>

        <div class="mt-5 grid gap-6">
          <figure
            v-for="(img, i) in project.gallery"
            :key="img + i"
            class="rounded-2xl border border-foreground/15 bg-background p-4 sm:p-6"
          >
            <img
              :src="img"
              :alt="`${project.title} image ${i + 1}`"
              class="w-full max-h-[75vh] object-contain"
              loading="lazy"
            />
          </figure>
        </div>
      </section>
    </div>

    <!-- Sidebar -->
    <aside class="rounded-2xl border border-foreground/15 bg-background p-6 h-fit lg:sticky lg:top-24">
      <h2 class="text-xl font-semibold">Project info</h2>

      <dl class="mt-4 space-y-4 text-sm">
        <div v-if="project.course">
          <dt class="text-foreground/60">Course</dt>
          <dd class="mt-1 text-foreground">{{ project.course }}</dd>
        </div>

        <div v-if="project.assignment">
          <dt class="text-foreground/60">Assignment</dt>
          <dd class="mt-1 text-foreground">{{ project.assignment }}</dd>
        </div>

        <div v-if="project.team?.length">
          <dt class="text-foreground/60">Team</dt>
          <dd class="mt-1 text-foreground">
            <ul class="list-disc pl-5 space-y-1">
              <li v-for="m in project.team" :key="m">{{ m }}</li>
            </ul>
          </dd>
        </div>

        <div v-if="project.tools?.length">
          <dt class="text-foreground/60">Tools</dt>
          <dd class="mt-2 flex flex-wrap gap-2">
            <span
              v-for="t in project.tools"
              :key="t"
              class="px-2 py-1 rounded-md border border-foreground/15 bg-background text-foreground"
            >
              {{ t }}
            </span>
          </dd>
        </div>
      </dl>
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
