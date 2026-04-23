# PSO Calculator Monorepo

Monorepo npm workspaces avec :

- `apps/web` : frontend Nuxt pour le POC.
- `apps/api` : API Express + Mongoose.
- `packages/shared` : constantes et schémas partagés.

Le POC actuel expose uniquement un bloc de configuration personnage :

- 12 classes PSO affichées.
- seule `HUmar` est sélectionnable.
- niveaux HUmar seedés pour `1` à `10`, puis par checkpoints de `5` niveaux jusqu'à `200`.
- le sélecteur de niveau est limité aux checkpoints réellement seedés, sans interpolation linéaire entre deux paliers.

## Démarrage local

```bash
npm install
npm run dev:web
npm run dev:api
```

## Développement avec Docker

```bash
docker compose -f compose.dev.yml up
```

Services par défaut :

- frontend Nuxt : `http://localhost:3000`
- API Express : `http://localhost:4000`
- MongoDB : `mongodb://localhost:27017/pso_calculator_dev`

## Build de production

```bash
npm install
npm run build
docker compose up --build
```

La stack de production démarre :

- `web` : frontend généré par Nuxt et servi par nginx sur `http://localhost:8080`
- `api` : API Express interne au réseau Compose
- `mongo` : base Mongo persistée dans un volume Docker

## Variables d'environnement

Voir `.env.example` pour les principales variables utilisées par l'API et le frontend.
