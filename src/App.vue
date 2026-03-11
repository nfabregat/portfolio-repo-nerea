<script setup lang="ts">
import { RouterView } from "vue-router";
import NavigatorPrimarius from "@/components/NavigatorPrimarius.vue";
import SiteFooter from "./components/SiteFooter.vue";

const menuItems = [
  { label: "Projects", to: "/projects" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;
</script>

<template>
  <div class="min-h-dvh flex flex-col">
    <main class="pt-16">
      <NavigatorPrimarius :items="menuItems" home-route="/" />
      <RouterView />
    </main>

    <SiteFooter/>
  </div>
</template>
