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
    <div class="flex h-screen w-full bg-bg">
      <div class="flex flex-col items-center justify-start gap-[0.8rem] p-2">
        <SideBarButton
          v-for="section in sections"
          :key="section.path"
          :is-active="route.path === section.path"
          :callback="() => router.push(section.path)"
          :icon="section.icon"
        />
      </div>
      <div class="flex w-full m-2 ml-0 h-[calc(100vh-1rem)] bg-surface rounded-lg">
        <router-view />
      </div>
    </div>
  </main>
</template>
