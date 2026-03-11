<script setup lang="ts">
import { computed, nextTick, reactive, ref } from "vue"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2, Loader2 } from "lucide-vue-next"

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

type SubmitStatus = "idle" | "sending" | "success"
const status = ref<SubmitStatus>("idle")
const nameEl = ref<HTMLInputElement | null>(null)

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

const isSending = computed(() => status.value === "sending")
const isSuccess = computed(() => status.value === "success")

function clearFields() {
  form.name = ""
  form.email = ""
  form.message = ""

  touched.name = false
  touched.email = false
  touched.message = false
}

function resetForm() {
  clearFields()

  status.value = "idle"

  nextTick(() => nameEl.value?.focus())
}

async function submit() {
  touched.name = true
  touched.email = true
  touched.message = true

  if (hasErrors.value) return

  status.value = "sending"

  await new Promise((r) => setTimeout(r, 900))

  status.value = "success"
  clearFields()
}

</script>




<template>
  <section class="mx-auto max-w-3xl px-6 py-10">
    <h1 class="font-display text-4xl sm:text-5xl font-semibold tracking-tight">
      Contact
    </h1>
    <p class="mt-3 text-muted-foreground leading-relaxed max-w-2xl">
      Send me a message and I’ll get back to you as soon as possible :)
    </p>

    <div class="mt-8 rounded-xl border bg-card p-6 shadow-sm">
      <form v-if="!isSuccess" class="grid gap-5" @submit.prevent="submit">
        <!-- Name -->
        <div class="grid gap-2">
          <label class="text-sm font-medium">Name</label>
          <Input
            v-model="form.name"
            placeholder="Your name"
            @blur="touched.name = true"
            :aria-invalid="touched.name && !!errors.name"
            :disabled="isSending"
            ref="nameEl"
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
            :disabled="isSending"
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
            :disabled="isSending"
          />
          <p v-if="touched.message && errors.message" class="text-sm text-destructive">
            {{ errors.message }}
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-3">
          <Button
            type="submit"
            :disabled="isSending"
            class="hover:bg-accent hover:text-accent-foreground"
          >
            <Loader2 v-if="isSending" class="mr-2 h-4 w-4 animate-spin" />
            {{ isSending ? "Sending…" : "Send" }}
          </Button>
        </div>
      </form>

      <div v-else class="rounded-xl border border-foreground/10 bg-background p-6">
        <div class="flex items-start gap-3">
          <CheckCircle2 class="mt-0.5 h-5 w-5 text-emerald-500" />
          <div>
            <p class="font-medium">Message sent</p>
            <p class="mt-1 text-sm text-muted-foreground">
              Thank you!!! — I’ll reply soon ;)
            </p>
          </div>
        </div>

        <div class="mt-5">
          <Button variant="secondary" @click="resetForm">Send another message</Button>
        </div>
      </div>
    </div>
  </section>
</template>
