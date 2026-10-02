<script setup lang="ts">
  import { useTasksStore } from '../stores/tasks.store';
  import { onMounted } from 'vue';

  const tasks = useTasksStore();

  onMounted(() => {
    tasks.load();
  });
</script>

<template>
  <h1>task</h1>
  <ul>
    <li v-for="t in tasks.tasks" :key="t.id">{{ t.name }}</li>
  </ul>
</template>
