<template>
  <div id="app" class="min-h-screen flex flex-col">
    <Header />
    <RouterView />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import { useAuthStore } from "./stores/authStore";

// Initialiser l'authentification au démarrage de l'application
const authStore = useAuthStore();

onMounted(() => {
  authStore.initAuth();
});
</script>
