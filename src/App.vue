<script setup lang="ts">
import { ref } from 'vue';
import SideBarButton from './components/shared/SideBarButton.vue';

const activeIndex = ref(0);
const sections = [
  {
    index: 0,
    icon: "fa-regular fa-square-check"
  },
];

</script>

<template>
  <main>
    <div class="container">
      <div class="side-bar">
        <SideBarButton v-for="section in sections" :is-active="activeIndex === section.index" :callback="() => activeIndex = section.index" :icon="section.icon" />
      </div>
      <div class="main-container">
        <!-- in here I will be placing the content of the app --> 
      </div>
    </div>
  </main>
</template>

<style scoped>
</style>
