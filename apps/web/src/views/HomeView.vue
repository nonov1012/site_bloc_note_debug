<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useNotes } from "../composables/useNotes";
import ErrorMessage from "../components/ErrorMessage.vue";
import SearchBar from "../components/SearchBar.vue";
import NotesList from "../components/NotesList.vue";

// Utilisation du composable pour gérer les notes
const { loading, error, fetchNotesPaginated, searchNotes } = useNotes();

const recentNotes = ref<any[]>([]);
const currentPage = ref(1);
const hasMoreNotes = ref(true);
const notesPerPage = 10;
const searchQuery = ref("");
const isSearchMode = ref(false);
const searchTimeout = ref<number | null>(null);
let refreshInterval: number | null = null;

// Fonction debounce pour la recherche
const debounceSearch = (query: string) => {
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value);
  }
  
  searchTimeout.value = window.setTimeout(() => {
    performSearch(query);
  }, 300); // 300ms de debounce
};

// Fonction pour effectuer la recherche
const performSearch = async (query: string) => {
  if (!query.trim()) {
    isSearchMode.value = false;
    await loadNotes(true);
    return;
  }
  
  try {
    isSearchMode.value = true;
    currentPage.value = 1;
    recentNotes.value = [];
    
    const results = await searchNotes(query.trim(), currentPage.value, notesPerPage);
    recentNotes.value = results;
    hasMoreNotes.value = results.length === notesPerPage;
  } catch (error) {
    console.error("Erreur lors de la recherche:", error);
  }
};

// Fonction pour charger plus de résultats de recherche
const loadMoreSearchResults = async () => {
  if (!loading.value && hasMoreNotes.value && searchQuery.value.trim()) {
    currentPage.value++;
    
    try {
      const newResults = await searchNotes(searchQuery.value.trim(), currentPage.value, notesPerPage);
      // Éviter les doublons en vérifiant les IDs
      const existingIds = new Set(recentNotes.value.map((note: any) => note.id));
      const uniqueNewResults = newResults.filter((note: any) => !existingIds.has(note.id));
      recentNotes.value = [...recentNotes.value, ...uniqueNewResults];
      hasMoreNotes.value = newResults.length === notesPerPage;
    } catch (error) {
      console.error("Erreur lors du chargement de plus de résultats:", error);
    }
  }
};

// Gestionnaire de changement de recherche
const handleSearchChange = (query: string) => {
  searchQuery.value = query;
  debounceSearch(query);
};

// Gestionnaire d'effacement de recherche
const handleSearchClear = async () => {
  searchQuery.value = "";
  isSearchMode.value = false;
  await loadNotes(true);
};

// Fonction pour charger les notes
const loadNotes = async (reset = false) => {
  try {
    if (reset) {
      currentPage.value = 1;
      recentNotes.value = [];
    }
    
    const newNotes = await fetchNotesPaginated(currentPage.value, notesPerPage);
    
    if (reset) {
      recentNotes.value = newNotes;
    } else {
      // Éviter les doublons en vérifiant les IDs
      const existingIds = new Set(recentNotes.value.map((note: any) => note.id));
      const uniqueNewNotes = newNotes.filter((note: any) => !existingIds.has(note.id));
      recentNotes.value = [...recentNotes.value, ...uniqueNewNotes];
    }
    
    // Vérifier s'il y a plus de notes (si on reçoit moins que demandé, c'est la fin)
    hasMoreNotes.value = newNotes.length === notesPerPage;
  } catch (error) {
    console.error("Erreur lors du chargement des notes récentes:", error);
  }
};

// Fonction pour charger plus de notes
const loadMoreNotes = async () => {
  if (!loading.value && hasMoreNotes.value && !isSearchMode.value) {
    currentPage.value++;
    await loadNotes(false);
  }
};

// Chargement initial des notes récentes et configuration de l'auto-refresh
onMounted(async () => {
  await loadNotes();

  // Auto-refresh toutes les 3 secondes
  refreshInterval = window.setInterval(() => {
    loadNotes();
  }, 1000);
});

// Nettoyage de l'intervalle et du timeout lors de la destruction du composant
onUnmounted(() => {
  if (refreshInterval) {
    clearInterval(refreshInterval);
  }
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value);
  }
});

const handleCloseError = () => {
  error.value = null;
};
</script>

<template>
  <div class="min-h-[60vh] py-8">
    <div class="max-w-4xl mx-auto px-4 md:px-8">
      <!-- Titre -->
      <div class="text-center mb-8">
        <h2 class="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
          Bienvenue sur votre Bloc Notes
        </h2>
        <p class="text-lg text-gray-600">
          Découvrez les dernières notes partagées par la communauté
        </p>
      </div>

      <!-- Barre de recherche -->
      <div class="bg-white rounded-lg p-6 shadow-md border border-gray-200 mb-6">
        <SearchBar
          v-model="searchQuery"
          placeholder="Rechercher des notes par titre ou contenu..."
          :disabled="loading"
          @search="handleSearchChange"
          @clear="handleSearchClear"
        />
      </div>

      <!-- Messages d'erreur -->
      <ErrorMessage :message="error" @close="handleCloseError" />

      <!-- Liste des notes -->
      <NotesList
        :notes="recentNotes"
        :loading="loading"
        :title="isSearchMode ? 'Résultats de recherche' : 'Notes récentes'"
        :subtitle='isSearchMode ? `Résultats pour "${searchQuery}"` : "Découvrez les dernières notes partagées par toute la communauté"'
        :show-load-more="hasMoreNotes"
        :has-more-notes="hasMoreNotes"
        :load-more-text="isSearchMode ? 'Voir plus de résultats' : 'Voir plus de notes'"
        @load-more="isSearchMode ? loadMoreSearchResults() : loadMoreNotes()"
      />
    </div>
  </div>
</template>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  line-clamp: 3;
  overflow: hidden;
}
</style>
