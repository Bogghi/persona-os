<script setup lang="ts">
  defineProps<{
    icon: String,
    danger?: boolean
  }>();
</script>

<template>
  <button
    class="size-4 flex items-center justify-center cursor-pointer opacity-50 hover:opacity-100 transition-[color,opacity] duration-200"
    :class="danger ? 'hover:text-danger' : ''"
  >
    <i :class="icon" class="text-xs"></i>
  </button>
</template>
