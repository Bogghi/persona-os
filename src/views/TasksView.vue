<script setup lang="ts">
  import { useTasksStore } from '../stores/tasks.store';
  import { onMounted, ref } from 'vue';
  import IconButton from '../components/shared/IconButton.vue';
  import Checkbox from '../components/shared/Checkbox.vue';

  const tasks = useTasksStore();
  const newTaskName = ref('');

  const submit = () => {
    if(newTaskName.value.length > 0) {
      tasks.add(newTaskName.value);
      newTaskName.value = '';
    }
  }

  const toggle = (id: number, done: boolean) => tasks.setDone(id, done);

  onMounted(() => {
    tasks.load();
  });
</script>

<template>
  <div class="flex flex-col justify-start w-full m-2 items-center">
    <div class="flex flex-row w-lg rounded-lg bg-surface-raised p-1 gap-1">
      <input class="w-full outline-none pl-1" v-model="newTaskName" @keyup.enter="submit" />
      <IconButton icon="fa-solid fa-plus" @click="submit" />
    </div>
    <div class="flex flex-col w-lg rounded-lg p-1 gap-2 mt-5">
      <div class="flex flex-row justify-between items-center gap-2" v-for="t in tasks.tasks" :key="t.id">
        <Checkbox :model-value="!!t.done" @update:model-value="toggle(t.id, $event)" />
        <p>{{ t.name }}</p>
      </div>
    </div>
  </div>
</template>
