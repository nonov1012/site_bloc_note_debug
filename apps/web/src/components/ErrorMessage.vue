<script setup lang="ts">
defineProps<{
  message: string | null;
}>();

const emit = defineEmits<{
  close: [];
}>();
</script>

<template>
  <div v-if="message" class="error">
    <span>{{ message }}</span>
    <button @click="emit('close')" class="close-btn" title="Fermer">✕</button>
  </div>
</template>

<style scoped>
.error {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffebee;
  color: #c62828;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  border-left: 4px solid #c62828;
}

.close-btn {
  background: transparent;
  border: none;
  color: #c62828;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background 0.2s;
}

.close-btn:hover {
  background: rgba(198, 40, 40, 0.1);
}
</style>
