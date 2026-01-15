<template>
  <div class="card">
    <h2>Créer un nouvel item</h2>
    <form @submit.prevent="handleSubmit" class="create-form">
      <input
        v-model="itemName"
        type="text"
        placeholder="Nom de l'item"
        :disabled="loading"
        class="input"
      />
      <button
        type="submit"
        :disabled="loading || !itemName.trim()"
        class="btn btn-primary"
      >
        {{ loading ? "Ajout..." : "Ajouter" }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits<{
  submit: [name: string];
}>();

defineProps<{
  loading?: boolean;
}>();

const itemName = ref("");

const handleSubmit = () => {
  if (itemName.value.trim()) {
    emit("submit", itemName.value);
    itemName.value = "";
  }
};
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

.create-form {
  display: flex;
  gap: 1rem;
}

.input {
  flex: 1;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 4px;
  font-size: 1rem;
}

.input:focus {
  outline: none;
  border-color: #4caf50;
}

.input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-primary {
  background: #4caf50;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #45a049;
}

.btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>
