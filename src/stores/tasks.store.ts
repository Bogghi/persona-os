import { defineStore } from 'pinia'; 
import { ref } from 'vue'; 
import { getDb } from '../db/client';

export interface Task {
  id: number,
  name: string,
  done: number 
}

export const useTasksStore = defineStore('tasksStore', () => {
  const tasks = ref<Task[]>([]);

  async function load() {
    let db = await getDb();
    tasks.value = await db.select<Task[]>('select * from tasks;');
  }

  async function add(title: string) {
    let db = await getDb();
    await db.execute("insert into taks (title) values ($1)", [title]);
    load();
  }

  return { tasks, load, add };
});
