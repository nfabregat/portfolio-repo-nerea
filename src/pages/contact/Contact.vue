<script setup lang="ts">
import { computed, reactive, ref } from "vue"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type ContactForm = {
  name: string
  email: string
  message: string
}

const form = reactive<ContactForm>({
  name: "",
  email: "",
  message: "",
})

const touched = reactive({
  name: false,
  email: false,
  message: false,
})

const status = ref<"idle" | "success">("idle")

const errors = computed(() => {
  const e = { name: "", email: "", message: "" }

  const name = form.name.trim()
  if (!name) e.name = "Name is required."
  else if (name.length < 2) e.name = "Name must be at least 2 characters."

  const email = form.email.trim()
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  if (!email) e.email = "Email is required."
  else if (!emailOk) e.email = "Please enter a valid email address."

  const msg = form.message.trim()
  if (!msg) e.message = "Message is required."
  else if (msg.length < 10) e.message = "Message must be at least 10 characters."

  return e
})

const hasErrors = computed(() => Object.values(errors.value).some(Boolean))

function submit() {
  touched.name = true
  touched.email = true
  touched.message = true

  if (hasErrors.value) return

  status.value = "success"

  // Reset form 
  form.name = ""
  form.email = ""
  form.message = ""

  touched.name = false
  touched.email = false
  touched.message = false
}

type SocialLink = {
  label: string
  url: string
  icon: any
}

</script>




<template>
  <section class="mx-auto max-w-3xl px-6 py-10">
    <h1 class="text-3xl font-semibold tracking-tight">Contact</h1>
    <p class="mt-2 text-muted-foreground">
      Send me a message and I’ll get back to you soon.
    </p>

    <div class="mt-8 rounded-xl border bg-card p-6 shadow-sm">
      <form class="grid gap-5" @submit.prevent="submit">
        <!-- Name -->
        <div class="grid gap-2">
          <label class="text-sm font-medium">Name</label>
          <Input
            v-model="form.name"
            placeholder="Your name"
            @blur="touched.name = true"
            :aria-invalid="touched.name && !!errors.name"
          />
          <p v-if="touched.name && errors.name" class="text-sm text-destructive">
            {{ errors.name }}
          </p>
        </div>

        <!-- Email -->
        <div class="grid gap-2">
          <label class="text-sm font-medium">Email</label>
          <Input
            v-model="form.email"
            type="email"
            placeholder="you@email.com"
            @blur="touched.email = true"
            :aria-invalid="touched.email && !!errors.email"
          />
          <p v-if="touched.email && errors.email" class="text-sm text-destructive">
            {{ errors.email }}
          </p>
        </div>

        <!-- Message -->
        <div class="grid gap-2">
          <label class="text-sm font-medium">Message</label>
          <Textarea
            v-model="form.message"
            placeholder="How can I help you?"
            @blur="touched.message = true"
            :aria-invalid="touched.message && !!errors.message"
          />
          <p v-if="touched.message && errors.message" class="text-sm text-destructive">
            {{ errors.message }}
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-3">
          <Button type="submit" :disabled="status === 'success'">
            Send
          </Button>

          <p v-if="status === 'success'" class="text-sm text-muted-foreground">
            Message sent (demo).
          </p>
        </div>
      </form>
    </div>
  </section>
</template>