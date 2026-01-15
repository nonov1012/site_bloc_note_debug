# Site Bloc Note

Site servant d'exercice de maintenance applicative

## Description

Monorepo utilisant Turborepo avec :
- **API Backend** : API REST TypeScript avec Node.js et Express
- **Frontend Web** : Application Vue.js 3 avec TypeScript et Vite

## Groupe de dev 1

[DAVID Gabriel](https://github.com/NockXu)
[GUILMIN Leny](https://github.com/TarzanHR)

## Technologies

### Backend (API)
- **Node.js** - Runtime JavaScript
- **TypeScript** - Typage statique
- **Express** - Framework web
- **ESLint** - Linting
- **Prettier** - Formatage de code
- **Nodemon** - Auto-reload en développement

### Frontend (Web)
- **Vue.js 3** - Framework JavaScript progressif
- **TypeScript** - Typage statique
- **Vite** - Build tool ultra-rapide
- **Composition API** - API moderne de Vue.js

### Monorepo
- **Turborepo** - Build system haute performance
- **npm workspaces** - Gestion des packages

## Structure du projet

```
site_bloc_note/
├── apps/
│   ├── api/                 # Backend Express TypeScript
│   │   ├── src/
│   │   │   ├── config/      # Configuration
│   │   │   ├── controllers/ # Logique métier CRUD
│   │   │   ├── middlewares/ # Middlewares
│   │   │   ├── models/      # Modèles de données
│   │   │   ├── routes/      # Routes Express
│   │   │   ├── app.ts       # Configuration app
│   │   │   └── server.ts    # Point d'entrée
│   │   ├── dist/            # Code compilé
│   │   └── package.json
│   │
│   └── web/                 # Frontend Vue.js
│       ├── src/
│       │   ├── components/  # Composants Vue
│       │   ├── App.vue      # Composant principal
│       │   ├── main.ts      # Point d'entrée
│       │   └── style.css    # Styles globaux
│       ├── index.html
│       ├── vite.config.ts
│       └── package.json
│
├── packages/                # Packages partagés (futur)
├── turbo.json              # Configuration Turborepo
├── package.json            # Root package.json
└── README.md
```

## Installation

Installez toutes les dépendances du monorepo :

```bash
npm install
```

## Configuration

### API Backend

Créez un fichier `.env` dans `apps/api/` :

```env
PORT=3000
NODE_ENV=development
```

### Frontend

Le proxy Vite redirige automatiquement les appels `/api/*` vers `http://localhost:3000`.

## Scripts disponibles

### Commandes Monorepo (à la racine)

```bash
npm run dev        # Lance API + Web en parallèle
npm run build      # Build API + Web
npm run lint       # Lint tous les projets
npm run test       # Test tous les projets
```

### Commandes API (dans apps/api/)

```bash
npm run dev        # Mode développement avec hot-reload
npm run build      # Compile TypeScript → JavaScript
npm start          # Lance le serveur (nécessite build)
npm run lint       # Vérifie le code avec ESLint
```

### Commandes Web (dans apps/web/)

```bash
npm run dev        # Serveur de développement Vite
npm run build      # Build pour production
npm run preview    # Prévisualise le build de production
```

## Démarrage rapide

### 1. Démarrer tout le monorepo

```bash
npm run dev
```

Cela lance :
- **API** sur `http://localhost:3000`
- **Web** sur `http://localhost:5173`

### 2. Utiliser l'application

Ouvrez votre navigateur sur `http://localhost:5173`

L'interface permet de :
- Créer des items
- Voir la liste des items
- Supprimer des items

## API Endpoints

### Items

- `GET /api/items` - Récupérer tous les items
- `GET /api/items/:id` - Récupérer un item par ID
- `POST /api/items` - Créer un nouvel item
  - Body: `{ "name": "Item name" }`
- `PUT /api/items/:id` - Mettre à jour un item
  - Body: `{ "name": "Updated name" }`
- `DELETE /api/items/:id` - Supprimer un item

## Exemples d'utilisation de l'API

### Créer un item

```bash
curl -X POST http://localhost:3000/api/items \
  -H "Content-Type: application/json" \
  -d '{"name": "Mon premier item"}'
```

### Récupérer tous les items

```bash
curl http://localhost:3000/api/items
```

### Mettre à jour un item

```bash
curl -X PUT http://localhost:3000/api/items/1234567890 \
  -H "Content-Type: application/json" \
  -d '{"name": "Item mis à jour"}'
```

### Supprimer un item

```bash
curl -X DELETE http://localhost:3000/api/items/1234567890
```

## Architecture & Fonctionnalités

### Turborepo

Turborepo optimise les builds et les tâches :
- Cache intelligent des builds
- Exécution parallèle des tâches
- Gestion des dépendances entre packages

### Proxy API

Le fichier `vite.config.ts` configure un proxy pour rediriger les appels API :

```typescript
proxy: {
  '/api': {
    target: 'http://localhost:3000',
    changeOrigin: true
  }
}
```

Ainsi, dans le code Vue.js, vous pouvez appeler `/api/items` directement.

## Développement

### Ajouter une nouvelle fonctionnalité

1. **Backend** : Ajoutez votre route/controller dans `apps/api/src/`
2. **Frontend** : Créez vos composants dans `apps/web/src/components/`
3. Les changements sont automatiquement rechargés grâce à nodemon et Vite

### Structure des commits

Utilisez des messages de commit conventionnels :

```
feat(api): add update item endpoint
fix(web): correct item deletion
docs: update README
```

## Déploiement

### Docker (API uniquement)

```bash
cd apps/api
docker build -t site-bloc-note-api .
docker run -p 3000:3000 site-bloc-note-api
```

### Build pour production

```bash
# Build tout
npm run build

# API : code compilé dans apps/api/dist/
# Web : build dans apps/web/dist/
```

## Troubleshooting

### Le serveur API ne démarre pas

- Vérifiez que le port 3000 est libre
- Vérifiez que le fichier `.env` existe dans `apps/api/`

### L'interface web ne se connecte pas à l'API

- Assurez-vous que l'API tourne sur le port 3000
- Vérifiez la configuration du proxy dans `vite.config.ts`

### Erreurs de build

```bash
# Nettoyez et réinstallez
rm -rf node_modules apps/*/node_modules
npm install
```

## Licence

ISC
