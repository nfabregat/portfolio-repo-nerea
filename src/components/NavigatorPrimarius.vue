<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { Button } from "@/components/ui/button";
import { House, Menu, X } from "lucide-vue-next";

interface MenuItem {
  label: string;
  to: string;
}

interface Props {
  items: MenuItem[];
  homeRoute?: string;
}

const props = withDefaults(defineProps<Props>(), {
  homeRoute: "/",
});

const mobileOpen = ref(false);

// Cierra el menú si pasas a desktop 
function handleResize() {
  if (window.innerWidth >= 640) mobileOpen.value = false; // sm breakpoint
}

onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

const route = useRoute();
const activePath = computed(() => route.path);
    function isActive(to: string) {
    return activePath.value === to || activePath.value.startsWith(to + "/");
    }

function closeMobile() {
  mobileOpen.value = false;
}
</script>

<template>
  <nav class="fixed top-0 left-0 z-40 w-full border-b bg-background/80 backdrop-blur">
    <div class="w-full px-2 sm:px-4">
      <!-- Top bar -->
      <div class="h-16 flex items-center justify-between">
        <!-- Desktop: Home icon -->
        <RouterLink
          :to="props.homeRoute"
          class="hidden sm:inline-flex"
          aria-label="Home"
        >
          <House class="h-7 w-7" />
        </RouterLink>

        <!-- Mobile: text logo (Home link) -->
        <RouterLink
          :to="props.homeRoute"
          class="sm:hidden font-semibold tracking-tight"
          @click="closeMobile"
        >
          Nerea
        </RouterLink>

        <!-- Desktop links -->
        <div class="hidden sm:flex items-center gap-1">
          <RouterLink v-for="item in props.items" :key="item.label" :to="item.to">
            <Button
              variant="ghost"
              :class="activePath === item.to ? 'bg-accent text-accent-foreground' : ''"
            >
              {{ item.label }}
            </Button>
          </RouterLink>
        </div>

        <!-- Mobile toggle -->
        <Button
          class="sm:hidden"
          variant="secondary"
          size="icon"
          @click="mobileOpen = !mobileOpen"
          :aria-label="mobileOpen ? 'Close menu' : 'Open menu'"
        >
          <X v-if="mobileOpen" />
          <Menu v-else />
        </Button>
      </div>

      <!-- Mobile dropdown panel -->
      <div v-if="mobileOpen" class="sm:hidden pb-3 grid gap-2">
        <RouterLink
          v-for="item in props.items"
          :key="item.label"
          :to="item.to"
          @click="closeMobile"
        >
          <Button
            variant="ghost"
            class="w-full justify-start"
            :class="isActive(item.to) ? 'bg-accent text-accent-foreground' : ''"
          >
            {{ item.label }}
          </Button>
        </RouterLink>
      </div>
    </div>
  </nav>
</template>