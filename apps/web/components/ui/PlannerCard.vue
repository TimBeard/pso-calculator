<template>
  <section class="planner-card" :class="panelClass">
    <header class="planner-card__header" :class="headerClass">
      <div>
        <p v-if="kicker" class="section-kicker">{{ kicker }}</p>
        <h2>{{ title }}</h2>
      </div>
      <slot name="header-extra" />
    </header>

    <slot />
  </section>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    headerClass?: string
    kicker?: string
    panelClass?: string
    title: string
  }>(),
  {
    headerClass: '',
    kicker: '',
    panelClass: '',
  },
)
</script>