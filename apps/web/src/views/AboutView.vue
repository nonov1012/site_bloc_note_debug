<template>
  <div class="about-view">
    <div class="container">
      <h2 class="page-title">À propos du projet</h2>

      <section class="section cta">
        <router-link to="/" class="btn-primary">
          Retour à l'accueil →
        </router-link>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.about-view {
  min-height: 60vh;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 2rem;
}

.page-title {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #2c3e50;
  text-align: center;
}

.section {
  margin-bottom: 3rem;
}

.section h3 {
  font-size: 1.5rem;
  color: #667eea;
  margin-bottom: 1rem;
  border-bottom: 2px solid #667eea;
  padding-bottom: 0.5rem;
}

.section p {
  line-height: 1.6;
  color: #555;
}

.tech-grid,
.dev-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.tech-card,
.dev-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s,
    box-shadow 0.3s;
}

.tech-card:hover,
.dev-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.tech-card h4,
.dev-card h4 {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
  font-size: 1.2rem;
}

.tech-card p {
  margin: 0;
  font-size: 0.9rem;
  color: #666;
}

.github-link {
  color: #667eea;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s;
}

.github-link:hover {
  color: #764ba2;
  text-decoration: underline;
}

.architecture-info {
  background: #f9f9f9;
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #667eea;
}

.architecture-info ul {
  margin: 1rem 0 0 0;
  padding-left: 1.5rem;
}

.architecture-info li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.architecture-info code {
  background: white;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-family: "Courier New", monospace;
  color: #667eea;
}

.cta {
  text-align: center;
}

.btn-primary {
  display: inline-block;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.4);
}

@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .tech-grid,
  .dev-grid {
    grid-template-columns: 1fr;
  }
}
</style>
