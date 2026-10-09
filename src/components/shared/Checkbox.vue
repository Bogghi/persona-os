<script setup lang="ts">
  const checked = defineModel<boolean>({ default: false });
</script>

<template>
  <input
    type="checkbox"
    v-model="checked"
    class="appearance-none size-4 shrink-0 rounded bg-transparent cursor-pointer transition-colors duration-200 border-1 border-solid border-(--color-accent) checked:bg-(--color-accent)"
  />
</template>
