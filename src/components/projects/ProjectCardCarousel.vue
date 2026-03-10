<script setup lang="ts">
import { computed, onUnmounted, ref } from "vue";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-vue-next";

type Props = {
  images: string[];
  alt: string;
  intervalMs?: number;      // autoplay speed (hover)
  resumeAfterMs?: number;   // resume autoplay after manual click
};

const props = withDefaults(defineProps<Props>(), {
  intervalMs: 1800,      // ~2.8s between slides on hover
  resumeAfterMs: 1800,   // resume autoplay 2.5s after last arrow click
});

const index = ref(0);          
const hovering = ref(false);

let autoplayTimer: number | undefined;
let resumeTimer: number | undefined;

const safeImages = computed(() => (props.images?.length ? props.images : []));
const hasMany = computed(() => safeImages.value.length > 1);

function stopAutoplayTimers() {
  if (autoplayTimer !== undefined) {
    window.clearInterval(autoplayTimer);
    autoplayTimer = undefined;
  }
  if (resumeTimer !== undefined) {
    window.clearTimeout(resumeTimer);
    resumeTimer = undefined;
  }
}

function next() {
  if (!safeImages.value.length) return;
  index.value = (index.value + 1) % safeImages.value.length;
}

function prev() {
  if (!safeImages.value.length) return;
  index.value = (index.value - 1 + safeImages.value.length) % safeImages.value.length;
}

function startAutoplay() {
  if (!hasMany.value) return;
  // Si hay un "resumeTimer" activo (porque el usuario tocó flechas), no reinicies todavía.
  if (resumeTimer !== undefined) return;

  stopAutoplayTimers();
  autoplayTimer = window.setInterval(() => next(), props.intervalMs);
}

function pauseAndResumeLater() {
  // Pausa autoplay inmediato
  if (autoplayTimer !== undefined) {
    window.clearInterval(autoplayTimer);
    autoplayTimer = undefined;
  }

  // Reinicia el temporizador de reanudación
  if (resumeTimer !== undefined) window.clearTimeout(resumeTimer);

  resumeTimer = window.setTimeout(() => {
    resumeTimer = undefined;
    if (hovering.value) startAutoplay();
  }, props.resumeAfterMs);
}

function onEnter() {
  hovering.value = true;
  startAutoplay();
}

function onLeave() {
  hovering.value = false;
  stopAutoplayTimers();
  index.value = 0; // back to cover 
}

onUnmounted(() => stopAutoplayTimers());
</script>

<template>
  <div
    class="relative w-full overflow-hidden rounded-md border bg-background
           transition-transform duration-200 ease-out
           hover:scale-[1.2] hover:-translate-y-2 hover:shadow-xl hover:z-10"
    :style="{ aspectRatio: '1600 / 1131' }"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
  >
    <img
      v-if="safeImages.length"
      :src="safeImages[index]"
      :alt="alt"
      class="h-full w-full object-cover"
      loading="lazy"
      draggable="false"
    />

    <!-- Arrows (manual navigation, doesn’t open details) -->
    <div v-if="hasMany" class="absolute inset-0 flex items-center justify-between px-2">
      <Button
        type="button"
        variant="secondary"
        size="icon"
        class="rounded-full opacity-90 hover:opacity-100"
        @click.stop.prevent="prev(); pauseAndResumeLater()"
        aria-label="Previous image"
      >
        <ChevronLeft class="h-5 w-5" />
      </Button>

      <Button
        type="button"
        variant="secondary"
        size="icon"
        class="rounded-full opacity-90 hover:opacity-100"
        @click.stop.prevent="next(); pauseAndResumeLater()"
        aria-label="Next image"
      >
        <ChevronRight class="h-5 w-5" />
      </Button>
    </div>
  </div>
</template>