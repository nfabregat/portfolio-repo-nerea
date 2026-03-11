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
  items: ReadonlyArray<MenuItem>;
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
 <nav class="fixed top-0 left-0 z-40 w-full border-b border-primary-foreground/30 bg-primary text-primary-foreground">
    <div class="w-full px-2 sm:px-4">
      <!-- Top bar -->
      <div class="h-16 flex items-center justify-between">
        <!-- Desktop: Home icon -->
        <RouterLink
          :to="props.homeRoute"
          class="hidden sm:inline-flex rounded-md p-2 transition text-primary-foreground hover:bg-accent hover:text-accent-foreground"
          aria-label="Home"
        >
          <House class="h-7 w-7" />
        </RouterLink>

        <!-- Mobile: text logo (Home link) -->
        <RouterLink
          :to="props.homeRoute"
          class="sm:hidden inline-flex items-center gap-2 rounded-md px-2 py-1 transition-colors hover:bg-accent hover:text-accent-foreground"
          aria-label="Home"
          @click="closeMobile"
        >
          <span class="font-display text-xl font-semibold tracking-[-0.02em] leading-none">
            Nerea
          </span>
          <span class="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
        </RouterLink>

        <!-- Desktop links -->
        <div class="hidden sm:flex items-center gap-1">
          <RouterLink v-for="item in props.items" :key="item.label" :to="item.to">
            <Button
                variant="ghost"
                class="hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]"
                :class="isActive(item.to)
                  ? 'text-[var(--foreground)] font-semibold'
                  : 'text-[var(--primary-foreground)]'"
                >
                {{ item.label }}
            </Button>
          </RouterLink>
        </div>

        <!-- Mobile toggle -->
        <Button
          class="sm:hidden  bg-primary-foreground/15 text-primary-foreground hover:bg-accent hover:text-accent-foreground"
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
        <RouterLink :to="props.homeRoute" @click="closeMobile">
          <Button
            variant="ghost"
            class="w-full justify-start hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] text-[var(--primary-foreground)]"
            :class="isActive(props.homeRoute) ? 'text-[var(--foreground)] font-semibold' : ''"
          >
            <House class="mr-2 h-4 w-4" />
            Home
          </Button>
        </RouterLink>

        <RouterLink
          v-for="item in props.items"
          :key="item.label"
          :to="item.to"
          @click="closeMobile"
        >
          <Button
            variant="ghost"
            class="w-full justify-start hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]"
            :class="isActive(item.to)
              ? 'text-[var(--foreground)] font-semibold'
              : 'text-[var(--primary-foreground)]'"
            >
            {{ item.label }}
          </Button>
        </RouterLink>
      </div>
    </div>
  </nav>
</template>
