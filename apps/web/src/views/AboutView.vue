<script setup lang="ts">
const technologies = [
  { name: 'Vue.js 3', description: 'Framework JavaScript progressif' },
  { name: 'TypeScript', description: 'Typage statique pour JavaScript' },
  { name: 'Vite', description: 'Build tool ultra-rapide' },
  { name: 'Express', description: 'Framework backend Node.js' },
  { name: 'Turborepo', description: 'Build system monorepo haute performance' }
]

const developers = [
  { name: 'DAVID Gabriel', github: 'https://github.com/NockXu' },
  { name: 'GUILMIN Leny', github: 'https://github.com/TarzanHR' }
]
</script>

<template>
  <div class="about-view">
    <div class="container">
      <h2 class="page-title">À propos du projet</h2>

      <section class="section">
        <h3>Description</h3>
        <p>
          Ce projet est un exercice de maintenance applicative construit avec une architecture
          monorepo moderne utilisant Turborepo. Il combine un backend API REST en TypeScript/Express
          avec un frontend Vue.js 3.
        </p>
      </section>

      <section class="section">
        <h3>Technologies utilisées</h3>
        <div class="tech-grid">
          <div v-for="tech in technologies" :key="tech.name" class="tech-card">
            <h4>{{ tech.name }}</h4>
            <p>{{ tech.description }}</p>
          </div>
        </div>
      </section>

      <section class="section">
        <h3>Équipe de développement</h3>
        <div class="dev-grid">
          <div v-for="dev in developers" :key="dev.name" class="dev-card">
            <h4>{{ dev.name }}</h4>
            <a :href="dev.github" target="_blank" rel="noopener" class="github-link">
              Voir le profil GitHub →
            </a>
          </div>
        </div>
      </section>

      <section class="section">
        <h3>Architecture</h3>
        <div class="architecture-info">
          <p><strong>Monorepo Turborepo</strong> avec npm workspaces :</p>
          <ul>
            <li><code>apps/api</code> - Backend Express + TypeScript</li>
            <li><code>apps/web</code> - Frontend Vue.js 3 + TypeScript</li>
            <li><code>packages/</code> - Packages partagés (à venir)</li>
          </ul>
        </div>
      </section>

      <section class="section cta">
        <router-link to="/" class="btn-primary">
          Retour à l'accueil →
        </router-link>
      </section>
    </div>
  </div>
</template>

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
  transition: transform 0.3s, box-shadow 0.3s;
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
  font-family: 'Courier New', monospace;
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
  transition: transform 0.3s, box-shadow 0.3s;
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
