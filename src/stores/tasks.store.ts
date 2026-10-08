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

  async function add(name: string) {
    console.log(name);
    let db = await getDb();
    await db.execute("insert into tasks (name) values ($1)", [name]);
    await load();
  }

  async function setDone(id: number, done: boolean) {
    let db = await getDb();
    await db.execute("update tasks set done = $1 where id = $2", [done ? 1 : 0, id]);
    await load();
  }

  return { tasks, load, add, setDone };
});
