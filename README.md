# API Event Sport

Une API RESTful complète pour la gestion d'événements sportifs avec système d'inscription, de commentaires, d'authentification et de catégories.

## Fonctionnalités

- Authentification (JWT)
- Création, lecture, mise à jour et suppression (CRUD) d'événements
- Inscription des participants à un événement
- Ajout de commentaires sur les événements
- Système de catégories d’événements
- Frontend minimal HTML/CSS/JS

---

## Stack technique

- **Backend** : Node.js, Express, TypeScript
- **Base de données** : PostgreSQL
- **ORM** : Drizzle ORM
- **Validation** : Zod
- **Auth** : JWT
- **Frontend** : HTML/CSS/JS
- **Outils** : ts-node-dev, dotenv

---

## Installation

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/ton-utilisateur/tpFinalApiRestful.git
   cd tpFinalApiRestful

2. **Installer les dépendances**
    ```bash
    npm install

3. **Installer les dépendances**
    PORT=3000
    DATABASE_URL=postgresql://postgres:0000@localhost:5432/eventdb
    JWT_SECRET=unSecretTresFort

4. **Créer la base de données PostgreSQL**
    psql -U postgres -c "CREATE DATABASE eventdb;"

5. **Générer le schéma avec Drizzle**
    ```bash
    npx drizzle-kit push

6. **Lancer le serveur**
    ```bash
    npm run dev