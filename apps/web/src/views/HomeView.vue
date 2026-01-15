<script setup lang="ts">
import { onMounted } from 'vue'
import { useItems } from '../composables/useItems'
import ItemForm from '../components/ItemForm.vue'
import ItemList from '../components/ItemList.vue'
import ErrorMessage from '../components/ErrorMessage.vue'

// Utilisation du composable pour gérer les items
const { items, loading, error, fetchItems, createItem, deleteItem } = useItems()

// Chargement initial des items
onMounted(() => {
  fetchItems()
})

// Gestionnaires d'événements
const handleCreateItem = async (name: string) => {
  await createItem({ name })
}

const handleDeleteItem = async (id: number) => {
  await deleteItem(id)
}

const handleCloseError = () => {
  error.value = null
}
</script>

<template>
  <div class="home-view">
    <div class="container">
      <h2 class="page-title">Gestion des items</h2>

      <!-- Formulaire de création -->
      <ItemForm :loading="loading" @submit="handleCreateItem" />

      <!-- Messages d'erreur -->
      <ErrorMessage :message="error" @close="handleCloseError" />

      <!-- Liste des items -->
      <ItemList :items="items" :loading="loading" @delete="handleDeleteItem" />
    </div>
  </div>
</template>

<style scoped>
.home-view {
  min-height: 60vh;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
}

.page-title {
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #2c3e50;
  text-align: center;
}

@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }

  .page-title {
    font-size: 1.5rem;
  }
}
</style>
