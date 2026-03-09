<script setup lang="ts">
import { computed, onUnmounted, ref } from "vue";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-vue-next";

type Props = {
  images: string[];
  alt: string;
  intervalMs?: number; // autoplay speed on hover
};

const props = withDefaults(defineProps<Props>(), {
  intervalMs: 2500, // 2.5s (puedes subir a 3000 si quieres)
});

const current = ref(0);
let timer: number | undefined;

const safeImages = computed(() => (props.images?.length ? props.images : []));
const hasMany = computed(() => safeImages.value.length > 1);

function stop() {
  if (timer !== undefined) {
    window.clearInterval(timer);
    timer = undefined;
  }
}

function next() {
  if (!safeImages.value.length) return;
  current.value = (current.value + 1) % safeImages.value.length;
}

function prev() {
  if (!safeImages.value.length) return;
  current.value = (current.value - 1 + safeImages.value.length) % safeImages.value.length;
}

function startAutoplay() {
  if (!hasMany.value) return;
  stop();
  timer = window.setInterval(() => next(), props.intervalMs);
}

function stopAutoplay() {
  stop();
}

onUnmounted(() => stop());
</script>

<template>
  <!-- Marco con ratio EXACTO 1600/1131 (no 16:9) -->
  <div
    class="relative w-full overflow-hidden rounded-md border bg-background
           transition-transform duration-200 ease-out
           hover:scale-[1.2] hover:-translate-y-2 hover:shadow-xl hover:z-10"
    :style="{ aspectRatio: '1600 / 1131' }"
    @mouseenter="startAutoplay"
    @mouseleave="stopAutoplay"
  >
    <img
      v-if="safeImages.length"
      :src="safeImages[current]"
      :alt="alt"
      class="h-full w-full object-cover"
      loading="lazy"
      draggable="false"
    />

    <!-- Flechas (si hay más de 1 imagen). Se pueden usar SIN hover. -->
    <div v-if="hasMany" class="absolute inset-0 flex items-center justify-between px-2">
      <Button
        type="button"
        variant="secondary"
        size="icon"
        class="rounded-full opacity-90 hover:opacity-100"
        @click.stop.prevent="prev"
        aria-label="Previous image"
      >
        <ChevronLeft class="h-5 w-5" />
      </Button>

      <Button
        type="button"
        variant="secondary"
        size="icon"
        class="rounded-full opacity-90 hover:opacity-100"
        @click.stop.prevent="next"
        aria-label="Next image"
      >
        <ChevronRight class="h-5 w-5" />
      </Button>
    </div>
  </div>
</template>