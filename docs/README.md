# 🚀 GitHub Pages - Configuration Firebase

## ⚠️ Configuration requise pour GitHub Pages

Pour que l'authentification Firebase fonctionne sur GitHub Pages, vous devez :

### 1. 🔐 Firebase Console
1. Aller sur [Firebase Console](https://console.firebase.google.com)
2. Sélectionner votre projet
3. **Authentication** → **Settings** → **Authorized domains**
4. Ajouter votre domaine GitHub Pages : `flamingo12345678.github.io`

### 2. 🔗 URLs de callback OAuth

Pour chaque provider social, mettre à jour les URLs :

#### Google OAuth
- Console : [Google Cloud Console](https://console.cloud.google.com)
- URIs de redirection autorisées :
  - `https://flamingo12345678.github.io`
  - `https://page-d-authentification.firebaseapp.com/__/auth/handler`

#### GitHub OAuth
- Console : [GitHub Developer Settings](https://github.com/settings/developers)
- Authorization callback URL :
  - `https://page-d-authentification.firebaseapp.com/__/auth/handler`

#### Facebook OAuth
- Console : [Facebook Developers](https://developers.facebook.com)
- Valid OAuth Redirect URIs :
  - `https://page-d-authentification.firebaseapp.com/__/auth/handler`

### 3. 🧪 Test de la configuration

Visitez : `https://flamingo12345678.github.io/Page-d-authentification/test.html`

## 🔧 Différences GitHub Pages vs Local

| Fonctionnalité | Local | GitHub Pages |
|----------------|-------|--------------|
| **Méthode d'auth** | Popup | Redirect |
| **HTTPS** | Optionnel | Obligatoire |
| **Domaine autorisé** | localhost | github.io |
| **Providers** | Tous | Selon config |

## 🐛 Résolution de problèmes

### Erreur : "auth/unauthorized-domain"
**Solution :** Ajouter `flamingo12345678.github.io` dans Firebase Console

### Erreur : "auth/popup-blocked"
**Solution :** GitHub Pages utilise automatiquement `signInWithRedirect()`

### Erreur : "auth/configuration-not-found"
**Solution :** Vérifier que le provider est activé dans Firebase Console

### Les boutons ne réagissent pas
**Solution :** Ouvrir la console du navigateur pour voir les erreurs JavaScript

## 📱 Mobile / Responsive

L'interface s'adapte automatiquement :
- **Desktop** : Interface complète
- **Mobile** : Optimisé tactile + redirect auth
- **Tablet** : Hybride

## 🔄 Mise à jour

Pour mettre à jour GitHub Pages :
1. Modifier les fichiers dans le dossier `docs/`
2. Commit et push sur GitHub
3. GitHub Pages se met à jour automatiquement

---

**🚀 URL de test :** https://flamingo12345678.github.io/Page-d-authentification/
