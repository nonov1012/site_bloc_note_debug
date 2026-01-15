<template>
  <div class="card">
    <h2>Liste des items ({{ items.length }})</h2>

    <div v-if="loading" class="loading">Chargement...</div>

    <div v-else-if="items.length === 0" class="empty">
      Aucun item pour le moment. Créez-en un !
    </div>

    <ul v-else class="item-list">
      <li v-for="item in items" :key="item.id" class="item">
        <span class="item-name">{{ item.name }}</span>
        <button
          @click="emit('delete', item.id)"
          class="delete-btn"
          title="Supprimer"
        >
          🗑️
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { Item } from "../types/item";

defineProps<{
  items: Item[];
  loading: boolean;
}>();

const emit = defineEmits<{
  delete: [id: number];
}>();
</script>

<style scoped>
.card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

h2 {
  margin-top: 0;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.loading,
.empty {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.item-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #e0e0e0;
  transition: background 0.2s;
}

.item:hover {
  background: #f5f5f5;
}

.item:last-child {
  border-bottom: none;
}

.item-name {
  flex: 1;
  font-size: 1.1rem;
}

.delete-btn {
  padding: 0.5rem 1rem;
  background: #f44336;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
  font-size: 1.2rem;
}

.delete-btn:hover {
  background: #d32f2f;
}
</style>
