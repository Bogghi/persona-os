import { createRouter, createWebHistory } from 'vue-router';
import TasksView from './views/TasksView.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/tasks' },
    { path: '/tasks', component: TasksView },
  ],
});
