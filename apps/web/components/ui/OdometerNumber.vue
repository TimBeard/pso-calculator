<template>
  <span class="odometer" aria-label="value">
    <span
      v-for="(char, index) in chars"
      :key="`${index}-${char.isDigit ? 'd' : char.value}`"
      class="odometer__char"
      :class="{ 'odometer__char--digit': char.isDigit }"
    >
      <template v-if="char.isDigit">
        <span class="odometer__digit-window" aria-hidden="true">
          <span
            class="odometer__digit-strip"
            :style="{ transform: `translateY(-${char.digit * 10}%)` }"
          >
            <span v-for="n in 10" :key="n - 1" class="odometer__digit">{{ n - 1 }}</span>
          </span>
        </span>
      </template>
      <template v-else>{{ char.value }}</template>
    </span>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  value: string
}>()

interface OdometerChar {
  value: string
  isDigit: boolean
  digit: number
}

const chars = computed<OdometerChar[]>(() => {
  return Array.from(props.value).map((char) => {
    const isDigit = char >= '0' && char <= '9'
    return {
      value: char,
      isDigit,
      digit: isDigit ? Number(char) : 0,
    }
  })
})
</script>

<style scoped>
.odometer {
  display: inline-flex;
  align-items: baseline;
  font-variant-numeric: tabular-nums;
}

.odometer__char {
  display: inline-block;
  white-space: pre;
}

.odometer__char--digit {
  position: relative;
}

.odometer__digit-window {
  display: inline-block;
  height: 1em;
  line-height: 1;
  overflow: hidden;
  vertical-align: baseline;
  width: 0.6em;
  text-align: center;
}

.odometer__digit-strip {
  display: flex;
  flex-direction: column;
  transition: transform 450ms cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform;
}

.odometer__digit {
  display: block;
  height: 1em;
  line-height: 1;
}
</style>
