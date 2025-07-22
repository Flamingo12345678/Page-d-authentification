
# Page d'authentification moderne

Une page de connexion/inscription moderne, responsive et animée, avec authentification Firebase (Google, Facebook, GitHub, Apple, email/mot de passe) et réinitialisation de mot de passe.

## Fonctionnalités

- Authentification via Google, Facebook, GitHub, Apple
- Inscription et connexion par email/mot de passe
- Réinitialisation de mot de passe par email
- Interface animée (slide sign-in/sign-up)
- Design responsive et moderne (CSS pur, FontAwesome)

## Aperçu

![Aperçu](screenshot.png)

## Installation & utilisation

1. **Cloner le dépôt**
	```bash
	git clone https://github.com/Flamingo12345678/Page-d-authentification.git
	```
2. **Ouvrir le dossier dans votre éditeur**
3. **Configurer Firebase**
	- Créez un projet sur [Firebase](https://firebase.google.com/)
	- Activez l'authentification (Google, Facebook, GitHub, Apple, Email/Password)
	- Remplacez la config dans `firebaseConfig.js` si besoin
4. **Lancer en local**
	- Ouvrez `index.html` dans votre navigateur

## Structure du projet

```
├── index.html
├── mdp-forgot.html
├── README.md
├── Assets/
│   ├── Css/
│   │   └── style.css
│   └── Js/
│       ├── firebase.js
│       ├── firebaseConfig.js
│       └── script.js
```

## Contrôles & Utilisation

- **Créer un compte** : Remplir le formulaire d'inscription ou utiliser un bouton social
- **Se connecter** : Formulaire de connexion ou bouton social
- **Mot de passe oublié** : Lien "Mot de passe oublié ?" sur la page de connexion

## Personnalisation

- Modifiez les couleurs, polices ou animations dans `style.css`
- Ajoutez d'autres providers dans `firebaseConfig.js` si besoin

## Dépendances

- [Firebase JS SDK](https://firebase.google.com/docs/web/setup)
- [FontAwesome](https://fontawesome.com/)

## Auteur

Flamingo12345678

---
*Dernière mise à jour : 22 juillet 2025*
