# 🗳️ Application de Vote ENSA (Vue.js + Firebase)

Application web temps réel développée pour l'ENSA Safi (TP‑6). Elle permet aux étudiants de s'authentifier et de voter ("Yes" ou "No") pour des événements académiques.


## 🌍 Déploiement et mise en ligne
L'application est hébergée sur Firebase Hosting et accessible à l'adresse suivante : `https://ensa-vote-app.web.app/`

## 📋 Fonctionnalités

- **Authentification sécurisée** : inscription et connexion via Firebase Authentication (email/mot de passe).  
- **Base de données temps réel** : événements et compteurs de votes stockés sur Cloud Firestore, mises à jour instantanées.  
- **Logique de vote unique** : un utilisateur ne peut voter qu'une seule fois par événement (vérification dans la collection `Votes`).  
- **Interface réactive** : construite avec Vue.js 3 (Composition API).  
- **Déploiement** : hébergement public via Firebase Hosting.

## 🛠️ Technologies utilisées

- Frontend : Vue.js 3, Vite  
- Backend (BaaS) : Google Firebase  
- Services Firebase :
  - Authentication : gestion des utilisateurs
  - Cloud Firestore : base de données NoSQL
  - Hosting : hébergement web

## 🚀 Guide d'installation (reprise du projet)

Le dossier `node_modules` a été retiré pour alléger l'archive. Procédure pour réinstaller l'environnement :

### 1. Prérequis
- Node.js (version 20 ou supérieure recommandée)  
- Connexion Internet (pour le téléchargement des paquets)

### 2. Installation des dépendances
Ouvrez un terminal à la racine du projet puis exécutez :
```bash
npm install
```

### 3. Lancement en local (développement)
Pour tester l'application :
```bash
npm run dev
```
L'application sera accessible à : `http://localhost:5173`

## 🌍 Déploiement et mise en ligne

L'application est configurée pour Firebase Hosting.

- Construire le projet (génère le dossier `dist`) :
```bash
npm run build
```

- Déployer sur Firebase :
```bash
npx firebase deploy
```

## 📂 Structure du projet

```
/src
  /components
    ├── Login.vue       # Formulaire de connexion
    ├── SignUp.vue      # Formulaire d'inscription
    └── EventList.vue   # Affichage des événements et logique de vote
  ├── App.vue           # Composant racine (gestion de l'état connecté/déconnecté)
  ├── firebase.js       # Configuration et connexion à Firebase
  └── main.js           # Point d'entrée de l'application Vue
```

Projet réalisé par Wilfried TSETSE — ENSA Safi
