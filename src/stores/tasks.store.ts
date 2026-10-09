import { defineStore, acceptHMRUpdate } from 'pinia';
import { ref } from 'vue'; 
import { getDb } from '../db/client';

export interface Task {
  id: number,
  name: string,
  done: number,
  created_datetime: string,
  due_date: string | null
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

  async function setDueDate(id: number, due: string | null) {
    let db = await getDb();
    await db.execute("update tasks set due_date = $1 where id = $2", [due || null, id]);
    await load();
  }

  async function remove(id: number) {
    let db = await getDb();
    await db.execute("delete from tasks where id = $1", [id]);
    await load();
  }

  return { tasks, load, add, setDone, setDueDate, remove };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTasksStore, import.meta.hot));
}
