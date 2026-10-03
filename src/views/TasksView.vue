<script setup lang="ts">
  import { useTasksStore } from '../stores/tasks.store';
  import { onMounted, ref } from 'vue';
  import IconButton from '../components/shared/IconButton.vue';

  const tasks = useTasksStore();
  const newTaskName = ref('');

  const submit = () => {
    if(newTaskName.value.length > 0) {
      tasks.add(newTaskName.value);
      newTaskName.value = '';
    }
  }

  onMounted(() => {
    tasks.load();
  });
</script>

<template>
  <div class="flex justify-center w-full m-2 items-start">
    <div class="flex flex-row w-lg rounded-lg bg-surface-raised p-1 gap-1">
      <input class="w-full outline-none pl-1" v-model="newTaskName" @keyup.enter="submit"/>
      <IconButton icon="fa-solid fa-plus" @click="submit" />
    </div>
  </div>
  <!-- <ul> -->
  <!--   <li v-for="t in tasks.tasks" :key="t.id">{{ t.name }}</li> -->
  <!-- </ul> -->
</template>
