<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

defineOptions({ inheritAttrs: false })

interface Props {
  modelValue?: string
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: "update:modelValue", value: string): void
}>()

function onInput(e: Event) {
  emit("update:modelValue", (e.target as HTMLTextAreaElement).value)
}
</script>

<template>
  <textarea
    data-slot="textarea"
    v-bind="$attrs"
    :value="props.modelValue ?? ''"
    @input="onInput"
    :class="cn(
      'min-h-28 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50',
      props.class
    )"
  />
</template>