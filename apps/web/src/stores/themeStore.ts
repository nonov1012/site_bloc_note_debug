import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useThemeStore = defineStore('theme', () => {
  // Initialize dark mode from localStorage or system preference
  const getInitialDarkMode = () => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      return saved === 'true';
    }
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  const isDarkMode = ref(getInitialDarkMode());

  /**
   * Toggle dark mode
   */
  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
  };

  /**
   * Set dark mode explicitly
   * @param value - true for dark, false for light
   */
  const setDarkMode = (value: boolean) => {
    isDarkMode.value = value;
  };

  /**
   * Watch for changes and update localStorage and DOM
   */
  watch(
    isDarkMode,
    (newValue) => {
      localStorage.setItem('darkMode', String(newValue));
      
      // Update document class for Tailwind dark mode
      if (newValue) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
    { immediate: true }
  );

  return {
    isDarkMode,
    toggleDarkMode,
    setDarkMode,
  };
});
