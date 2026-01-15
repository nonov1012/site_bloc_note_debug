import { ref } from "vue";
import type { Item, CreateItemDto, UpdateItemDto } from "../types/item";

export function useItems() {
  const items = ref<Item[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchItems = async () => {
    try {
      loading.value = true;
      error.value = null;
      const response = await fetch("/api/items");
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des items");
      }
      items.value = await response.json();
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Une erreur est survenue";
      console.error("Fetch items error:", err);
    } finally {
      loading.value = false;
    }
  };

  const createItem = async (data: CreateItemDto) => {
    try {
      loading.value = true;
      error.value = null;
      const response = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Erreur lors de la création de l'item");
      }
      const newItem = await response.json();
      items.value.push(newItem);
      return newItem;
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Une erreur est survenue";
      console.error("Create item error:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updateItem = async (id: number, data: UpdateItemDto) => {
    try {
      loading.value = true;
      error.value = null;
      const response = await fetch(`/api/items/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour de l'item");
      }
      const updatedItem = await response.json();
      const index = items.value.findIndex((item) => item.id === id);
      if (index !== -1) {
        items.value[index] = updatedItem;
      }
      return updatedItem;
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Une erreur est survenue";
      console.error("Update item error:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const deleteItem = async (id: number) => {
    try {
      loading.value = true;
      error.value = null;
      const response = await fetch(`/api/items/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de l'item");
      }
      items.value = items.value.filter((item) => item.id !== id);
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Une erreur est survenue";
      console.error("Delete item error:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    items,
    loading,
    error,
    fetchItems,
    createItem,
    updateItem,
    deleteItem,
  };
}
