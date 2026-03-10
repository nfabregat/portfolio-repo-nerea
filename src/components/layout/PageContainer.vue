<script setup lang="ts">
type Props = {
  size?: "md" | "lg";
};

const props = withDefaults(defineProps<Props>(), {
  size: "lg",
});
</script>

<template>
  <section
    class="px-6 py-10"
    :class="props.size === 'md' ? 'mx-auto max-w-3xl' : 'mx-auto max-w-5xl'"
  >
    <slot />
  </section>
</template>