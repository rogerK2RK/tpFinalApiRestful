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

| Outil        | Description                    |
|--------------|--------------------------------|
| **Node.js**  | Serveur backend (Express)      |
| **Drizzle**  | ORM pour PostgreSQL            |
| **Zod**      | Validation de schéma           |
| **JWT**      | Authentification sécurisée     |
| **Winston**  | Logging structuré              |
| **TypeScript** | Typage strict                |

---

## Installation

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/ton-utilisateur/tpFinalApiRestful.git
   cd tpFinalApiRestful

2. **Installer les dépendances**
    ```bash
    npm install

3. **Configurer l’environnement Créer un fichier .env à la racine :**
    ```bash
    PORT=3000
    DATABASE_URL=postgresql://postgres:0000@localhost:5432/eventdb
    JWT_SECRET=unSecretTresFort

4. **Créer la base de données PostgreSQL**
    ```bash
    psql -U postgres -c "CREATE DATABASE eventdb;"

5. **Générer le schéma avec Drizzle**
    ```bash
    npx drizzle-kit push

6. **Lancer le serveur**
    ```bash
    npm run dev

## Frontend
- **index.html** : Interface d'inscription, connexion et création d’événements.
- **style.css** : Design simple et responsive.
- **script.js** : Connexion à l'API.
- **Ouvre index.html dans le navigateur pour tester !**

## Routes principales

### Auth

POST /api/auth/register – Inscription
POST /api/auth/login – Connexion (retourne un token)

### Events

GET /api/events – Liste des événements
POST /api/events – Créer un événement (auth requis)
PUT /api/events/:id – Modifier un événement (auth requis)
DELETE /api/events/:id – Supprimer un événement (auth requis)

### Participants

POST /api/participants/:eventId – S’inscrire à un événement (auth requis)
GET /api/participants/:eventId – Liste des participants

### Comments

POST /api/comments/:eventId – Ajouter un commentaire (auth requis)
GET /api/comments/:eventId – Voir les commentaires

### Categories

GET /api/categories – Liste des catégories
POST /api/categories – Ajouter une catégorie (auth requis)

---

## Structure du projet

```
src/
├── controllers/     # Logique des routes
├── services/        # Accès base de données (Drizzle)
├── routes/          # Définition des routes Express
├── models/          # Modèles Drizzle
├── schemas/         # Validation avec Zod
├── middlewares/     # Auth et erreurs
├── utils/           # Logger, outils divers
├── config/          # Connexion DB
└── index.ts         # Point d’entrée Express


##  Auteur

Projet réalisé par Roger RETITA