<script setup lang="ts">
import { computed } from "vue";
import { useRoute, RouterLink } from "vue-router";
import { projects } from "./data";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-vue-next";

const route = useRoute();
const slug = computed(() => String(route.params.slug ?? ""));

const project = computed(() => projects.find((p) => p.slug === slug.value));
const galleryImages = computed(() => {
  if (!project.value) return [];
  const hero = project.value.heroImage ?? "";
  return project.value.gallery.filter((img) => img !== hero);
});

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

    <p class="mt-3 text-foreground/75 leading-relaxed ">
      {{ project.summary }}
    </p>

  </header>

  <div class="mt-8 hidden sm:block">
  <img
    :src="project.heroImage ?? project.cover"
    :alt="project.title"
    class="w-full max-h-[70vh] object-cover"
    loading="lazy"
  />
</div>

  <!-- Layout -->
  <div class="mt-10 grid gap-10">
    <!-- Main -->
    <div class="space-y-10">
   

      <!-- Concept (accent callout) -->
      <div class="grid gap-6 lg:grid-cols-2 lg:items-start">
        <section v-if="project.concept" class="h-fit lg:mt-10 rounded-2xl border border-accent bg-accent/20 p-6">
          <h2 class="text-2xl font-semibold">Concept</h2>
          <p class="mt-3 text-foreground/80 leading-relaxed">
            {{ project.concept }}
          </p>
        </section>
      

      <!-- Inspiration -->
      <section v-if="project.inspiration?.length" class="h-fit rounded-2xl p-6">
        <h2 class="text-2xl font-semibold">Inspiration</h2>
        <ul class="mt-3 list-disc pl-5 space-y-2 text-foreground/80">
          <li v-for="item in project.inspiration" :key="item">{{ item }}</li>
        </ul>
      </section>
     </div>  


   <!-- Overview -->
      <section>
        <h2 class="text-2xl font-semibold">Overview</h2>
        <p class="mt-3 text-foreground/80 leading-relaxed">
          {{ project.description }}
        </p>
      </section>

      <!-- Takeaways -->
      <section v-if="project.takeaways">
        <h2 class="text-2xl font-semibold">Key takeaways</h2>
        <div class="mt-4 grid gap-6 sm:grid-cols-2">
          <div class="rounded-2xl border border-foreground/15 bg-background p-5">
            <h3 class=" font-semibold">Strengths</h3>
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

        <div class="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-2">
          <figure
            v-for="(img, i) in galleryImages"
            :key="img + i"
            class=" overflow-hidden bg-background"
          >
            <img
              :src="img"
              :alt="`${project.title} image ${i + 1}`"
              class="w-full h-full object-cover"
              loading="lazy"
            />
          </figure>
        </div>
      </section>


    </div>
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
