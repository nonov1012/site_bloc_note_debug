<template>
  <footer class="footer">
    <div class="footer-content">
      <p class="copyright">
        © {{ currentYear }} Site Bloc Note - Développé par
        <a href="https://github.com/NockXu" target="_blank" rel="noopener"
          >DAVID Gabriel</a
        >
        &
        <a href="https://github.com/TarzanHR" target="_blank" rel="noopener"
          >GUILMIN Leny</a
        >
      </p>
      <div class="footer-links">
        <a
          href="https://github.com/NockXu/site_bloc_note"
          target="_blank"
          rel="noopener"
        >
          GitHub
        </a>
        <span class="separator">•</span>
        <router-link to="/about">À propos</router-link>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<style scoped>
.footer {
  margin-top: 4rem;
  padding: 2rem 0;
  border-top: 1px solid #e0e0e0;
  background: #f9f9f9;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
}

.copyright {
  margin: 0 0 1rem 0;
  color: #666;
  font-size: 0.9rem;
}

.copyright a {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.copyright a:hover {
  color: #764ba2;
  text-decoration: underline;
}

.footer-links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.9rem;
}

.footer-links a {
  color: #666;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-links a:hover {
  color: #667eea;
}

.separator {
  color: #ccc;
}

@media (max-width: 768px) {
  .footer-content {
    padding: 0 1rem;
  }

  .copyright {
    font-size: 0.85rem;
  }

  .footer-links {
    flex-wrap: wrap;
    font-size: 0.85rem;
  }
}
</style>
