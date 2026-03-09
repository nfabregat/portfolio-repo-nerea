<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-vue-next";

const year = new Date().getFullYear();

const socials = [
  { label: "GitHub", url: "https://github.com/your-username", icon: Github },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/your-profile", icon: Linkedin },
  { label: "Email", url: "mailto:your@email.com", icon: Mail },
] as const;
</script>

<template>
  <footer class="mt-16 border-t">
    <div class="w-full px-6 py-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div class="text-sm text-muted-foreground">
        © {{ year }} · Nerea Fabregat Mulet
      </div>

      <div class="flex flex-wrap gap-2">
        <Button
          v-for="s in socials"
          :key="s.label"
          variant="outline"
          size="sm"
          class="gap-2"
          asChild
        >
          <a :href="s.url" target="_blank" rel="noreferrer" :aria-label="s.label">
            <component :is="s.icon" class="h-4 w-4" />
            <span>{{ s.label }}</span>
          </a>
        </Button>
      </div>
    </div>
  </footer>
</template>