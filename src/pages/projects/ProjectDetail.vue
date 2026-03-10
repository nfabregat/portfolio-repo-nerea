<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useRoute, RouterLink } from "vue-router";
import { projects } from "./data";
import { Button } from "@/components/ui/button";
import { ArrowLeft, List, X } from "lucide-vue-next";


const route = useRoute();
const slug = computed(() => String(route.params.slug ?? ""));

const project = computed(() => projects.find((p) => p.slug === slug.value));
const galleryImages = computed(() => {
  if (!project.value) return [];
  const hero = project.value.heroImage ?? "";
  return project.value.gallery.filter((img) => img !== hero);
});

const toc = computed(() => {
  if (!project.value) return [];
  return [
    
    project.value.concept ? { id: "concept", label: "Concept" } : null,
    project.value.inspiration?.length ? { id: "inspiration", label: "Inspiration" } : null,
    { id: "overview", label: "Overview" },
    project.value.takeaways ? { id: "takeaways", label: "Takeaways" } : null,
    { id: "gallery", label: "Gallery" },
  ].filter(Boolean) as { id: string; label: string }[];
});

const showToc = computed(() => project.value?.slug === "placeres");
const tocOpen = ref(false);
const footerBumpPx = ref(0);

let rafId: number | undefined;

function updateFooterBump() {
  if (!showToc.value) return;

  const footer = document.querySelector("footer");
  if (!footer) {
    footerBumpPx.value = 0;
    return;
  }

  const footerRect = footer.getBoundingClientRect();
  const viewportH = window.innerHeight || 0;

  // When footer comes into view, push the floating button upward so it doesn't overlap.
  const overlap = viewportH - footerRect.top;
  footerBumpPx.value = overlap > 0 ? overlap + 12 : 0;
}

function scheduleFooterBumpUpdate() {
  if (rafId !== undefined) return;
  rafId = window.requestAnimationFrame(() => {
    rafId = undefined;
    updateFooterBump();
  });
}

onMounted(() => {
  updateFooterBump();
  window.addEventListener("scroll", scheduleFooterBumpUpdate, { passive: true });
  window.addEventListener("resize", scheduleFooterBumpUpdate);
});

onUnmounted(() => {
  window.removeEventListener("scroll", scheduleFooterBumpUpdate);
  window.removeEventListener("resize", scheduleFooterBumpUpdate);
  if (rafId !== undefined) window.cancelAnimationFrame(rafId);
});

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}


</script>

<template>
  <section class="mx-auto max-w-5xl px-6 py-10">
    <RouterLink
      :to="{ name: 'projects' }"
      class="inline-flex items-center gap-2 rounded-md px-2 py-1 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
    >
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

  <!-- Floating index (Placeres only) -->
  <div
    v-if="showToc"
    class="fixed right-6 z-50 flex flex-col items-end gap-2"
    :style="{ bottom: `calc(1.5rem + ${footerBumpPx}px)` }"
  >
    <div
      v-show="tocOpen"
      class="w-[min(18rem,calc(100vw-3rem))] overflow-hidden rounded-2xl border border-foreground/15 bg-background/90 shadow-xl backdrop-blur"
    >
      <div class="flex items-center justify-between gap-3 border-b border-foreground/10 px-3 py-2">
        <p class="text-sm font-medium">Index</p>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          class="h-8 w-8 hover:bg-accent hover:text-accent-foreground"
          @click="tocOpen = false"
          aria-label="Close index"
        >
          <X class="h-4 w-4" />
        </Button>
      </div>

      <div class="max-h-64 overflow-auto p-3">
        <div class="flex flex-wrap gap-2">
          <button
            v-for="item in toc"
            :key="item.id"
            type="button"
            class="px-3 py-1.5 rounded-full text-xs border border-foreground/15 bg-background hover:bg-accent hover:text-accent-foreground"
            @click="scrollToSection(item.id); tocOpen = false"
          >
            {{ item.label }}
          </button>
        </div>
      </div>
    </div>

    <Button
      type="button"
      variant="secondary"
      size="icon"
      class="h-11 w-11 rounded-full shadow-lg border border-foreground/10 hover:bg-accent hover:text-accent-foreground"
      @click="tocOpen = !tocOpen"
      :aria-expanded="tocOpen"
      aria-label="Toggle index"
    >
      <X v-if="tocOpen" class="h-5 w-5" />
      <List v-else class="h-5 w-5" />
    </Button>
  </div>


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
        <section id="concept" v-if="project.concept" class="h-fit lg:mt-10 rounded-2xl border border-accent bg-accent/20 p-6">
          <h2 class="text-2xl font-semibold">Concept</h2>
          <p class="mt-3 text-foreground/80 leading-relaxed">
            {{ project.concept }}
          </p>
        </section>
      

      <!-- Inspiration -->
      <section id="inspiration" v-if="project.inspiration?.length" class="h-fit rounded-2xl p-6">
        <h2 class="text-2xl font-semibold">Inspiration</h2>
        <ul class="mt-3 list-disc pl-5 space-y-2 text-foreground/80">
          <li v-for="item in project.inspiration" :key="item">{{ item }}</li>
        </ul>
      </section>
     </div>  


   <!-- Overview -->
      <section id="overview" class="scroll-mt-24">
        <h2 class="text-2xl font-semibold">Overview</h2>
        <p class="mt-3 text-foreground/80 leading-relaxed">
          {{ project.description }}
        </p>
      </section>

      <!-- Takeaways -->
      <section  id="takeaways" v-if="project.takeaways">
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
      <section id="gallery" class="pt-2">
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
