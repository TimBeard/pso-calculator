<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="open" class="modal-backdrop" role="dialog" aria-modal="true" :aria-label="title" @click.self="close">
        <div class="modal-window">
          <header class="modal-header">
            <div class="modal-heading">
              <p v-if="kicker" class="section-kicker">{{ kicker }}</p>
              <h2 class="modal-title">{{ title }}</h2>
            </div>
            <button type="button" class="modal-close" aria-label="Fermer" @click="close">×</button>
          </header>
          <div class="modal-body">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { onBeforeUnmount, watch } from 'vue'

const props = defineProps<{
  open: boolean
  title: string
  kicker?: string
}>()

const emit = defineEmits<{
  (event: 'update:open', value: boolean): void
}>()

function close(): void {
  emit('update:open', false)
}

function onKeydown(event: KeyboardEvent): void {
  if (event.key === 'Escape') {
    close()
  }
}

watch(
  () => props.open,
  (isOpen) => {
    if (typeof window === 'undefined') return
    if (isOpen) {
      window.addEventListener('keydown', onKeydown)
      document.body.style.overflow = 'hidden'
    } else {
      window.removeEventListener('keydown', onKeydown)
      document.body.style.overflow = ''
    }
  },
)

onBeforeUnmount(() => {
  if (typeof window === 'undefined') return
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>
