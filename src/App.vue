<script setup lang="ts">
import { RouterView } from "vue-router";
import NavigatorPrimarius from "@/components/NavigatorPrimarius.vue";

const menuItems = [
  { label: "Projects", to: "/projects" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;
</script>

<template>
  <!-- pt-16 para que el contenido no quede debajo del navbar fijo -->
  <main class="pt-16">
    <NavigatorPrimarius :items="menuItems" home-route="/" />
    <RouterView />
  </main>
</template>