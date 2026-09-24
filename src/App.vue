<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import SideBarButton from './components/shared/SideBarButton.vue';

const route = useRoute();
const router = useRouter();

const sections = [
  {
    path: '/tasks',
    icon: 'fa-regular fa-square-check',
  },
];
</script>

<template>
  <main>
    <div class="container">
      <div class="side-bar">
        <SideBarButton
          v-for="section in sections"
          :key="section.path"
          :is-active="route.path === section.path"
          :callback="() => router.push(section.path)"
          :icon="section.icon"
        />
      </div>
      <div class="main-container">
        <router-view />
      </div>
    </div>
  </main>
</template>

<style scoped>
</style>
