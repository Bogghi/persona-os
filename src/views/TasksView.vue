<script setup lang="ts">
  import { useTasksStore } from '../stores/tasks.store';
  import { computed, onMounted, ref } from 'vue';
  import IconButton from '../components/shared/IconButton.vue';
  import SecondaryIconButton from '../components/shared/SecondaryIconButton.vue';
  import Checkbox from '../components/shared/Checkbox.vue';

  const tasks = useTasksStore();
  const newTaskName = ref('');

  const submit = () => {
    if(newTaskName.value.length > 0) {
      tasks.add(newTaskName.value);
      newTaskName.value = '';
    }
  }

  const filters = [
    { key: 'todo', label: 'To Do', icon: 'fa-regular fa-square'},
    { key: 'done', label: 'Done', icon: 'fa-regular fa-square-check'},
    { key: 'all', label: 'All', icon: 'fa-solid fa-square'},
  ] as const;
  const filter = ref<typeof filters[number]['key']>('todo');

  const visibleTasks = computed(() => {
    const list = tasks.tasks;
    if(filter.value === 'done') return list.filter(t => t.done);
    if(filter.value === 'todo') return list.filter(t => !t.done);
    return [...list].sort((a, b) => a.done - b.done);
  });

  const toggle =(id: number, done: boolean) => tasks.setDone(id, done);

  const remove = (id: number) => tasks.remove(id);

  onMounted(() => {
    tasks.load();
  });
</script>

<template>
  <div class="flex flex-col justify-start w-full m-2 items-center">
    <div class="w-4xl">
      <div class="flex flex-row rounded-lg bg-surface-raised p-1 gap-1"> 
        <input class="w-full outline-none pl-1" v-model="newTaskName" @keyup.enter="submit" id="new-task-input" />
        <IconButton icon="fa-solid fa-plus" @click="submit" />
      </div>
      <div class="flex flex-row gap-4 mt-5 px-1">
        <button
          v-for="f in filters" :key="f.key"
          class="cursor-pointer transition-colors duration-200 px-3 py-1"
          :class="filter === f.key ? 'text-(--color-accent) bg-surface-raised rounded-full border-solid border-1 border-(--color-accent)' : 'text-(--color-text-muted) hover:text-(--color-text) bg-muted'"
          @click="filter = f.key"
          ><i :class="f.icon" class="pr-1"></i> {{ f.label }}</button>
      </div>
      <div class="flex flex-col rounded-lg p-1 gap-2 mt-2">
        <div class="flex flex-row justify-between items-center gap-2 pl-3" v-for="t in visibleTasks" :key="t.id">
          <Checkbox :model-value="!!t.done" @update:model-value="toggle(t.id, $event)" />
          <p class="flex-1">{{ t.name }}</p>
          <span class="text-xs text-(--color-text-muted)" title="Created">{{ t.created_datetime?.slice(0, 10) }}</span>
          <input
            type="date"
            class="text-xs bg-transparent outline-none text-(--color-text-muted)"
            title="Due date"
            :value="t.due_date ?? ''"
            @change="tasks.setDueDate(t.id, ($event.target as HTMLInputElement).value)"
          />
          <SecondaryIconButton icon="fa-solid fa-trash-can" danger @click="remove(t.id)" />
        </div>
      </div>
    </div>
  </div>
</template>
