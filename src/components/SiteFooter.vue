<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Github, Inbox, Mail } from "lucide-vue-next";

const year = new Date().getFullYear();

const socials = [
  { label: "GitHub", url: "https://github.com/nfabregat/portfolio-repo-nerea?classId=5cea1a3b-4225-440d-b39f-d21bfbbc7dff&assignmentId=f470281f-89e8-48b0-81a7-34d30ce9a7cd&submissionId=a1be4de0-e8d3-fbdd-cfad-bec9ecccff11", icon: Github },
  { label: "Outlook", url: "https://outlook.live.com/mail/0/deeplink/compose?to=nfabmul@upv.edu.es", icon: Inbox },
  { label: "Email", url: "mailto:nfabregatmulet@gmail.com", icon: Mail },
] as const;
</script>

<template>
  <footer class="border-t border-primary-foreground/30 bg-primary text-primary-foreground">
    <div class="w-full px-6 py-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <p class="text-sm">
        © {{ year }} · Nerea Fabregat Mulet
      </p>

      <div class="flex flex-wrap gap-2">
        <Button
          v-for="s in socials"
          :key="s.label"
          variant="outline"
          size="sm"
          class="gap-2 bg-background/60 text-foreground border-primary-foreground/40 hover:bg-accent hover:text-accent-foreground"
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
