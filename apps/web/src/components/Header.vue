<template>
  <header class="header">
    <div class="header-content">
      <div class="logo">
        <h1>Bloc Notes</h1>
      </div>

      <nav class="nav">
        <router-link
          to="/"
          class="nav-link"
          :class="{ active: isActive('home') }"
        >
          Accueil
        </router-link>
        <router-link
          to="/posts"
          class="nav-link"
          :class="{ active: isActive('posts') }"
        >
          Voir les posts
        </router-link>
        <!-- TODO: if login then the button should appear has deconnexion -->
        <router-link
          to="/login"
          class="nav-link"
          :class="{ active: isActive('list') }"
        >
          Se connecter
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();

const isActive = (name: string) => {
  return route.name === name;
};
</script>

<style scoped>
.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem 0;
  margin-bottom: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.logo h1 {
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
}

.subtitle {
  margin: 0.25rem 0 0 0;
  font-size: 0.9rem;
  opacity: 0.9;
}

.nav {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s;
  font-weight: 500;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.1);
}

.nav-link.active {
  background: rgba(255, 255, 255, 0.2);
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    text-align: center;
  }

  .logo h1 {
    font-size: 1.5rem;
  }

  .nav {
    width: 100%;
    justify-content: center;
  }
}
</style>
