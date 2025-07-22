// --- Animation du panneau (slide sign-in / sign-up)
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn?.addEventListener('click', () => {
  container.classList.add("active");
});

loginBtn?.addEventListener('click', () => {
  container.classList.remove("active");
});

// --- Indicateur de chargement
function showLoading() {
  document.getElementById('loading').style.display = 'block';
}

function hideLoading() {
  document.getElementById('loading').style.display = 'none';
}

// --- Afficher le chargement au début
document.addEventListener('DOMContentLoaded', () => {
  showLoading();
  
  // Cacher le chargement après 3 secondes si Firebase ne répond pas
  setTimeout(() => {
    hideLoading();
  }, 3000);
});

// --- Fonction pour détecter l'environnement
function isGitHubPages() {
  return window.location.hostname.includes('github.io');
}

// --- Message d'information pour GitHub Pages
if (isGitHubPages()) {
  console.log('🚀 Running on GitHub Pages');
  
  // Ajouter un message d'information
  setTimeout(() => {
    const info = document.createElement('div');
    info.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #007bff;
      color: white;
      padding: 15px;
      border-radius: 5px;
      font-size: 14px;
      max-width: 300px;
      z-index: 1000;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `;
    info.innerHTML = `
      <strong>ℹ️ GitHub Pages</strong><br>
      Pour une expérience complète avec Firebase Authentication, 
      configurez votre domaine dans Firebase Console.
      <button onclick="this.parentElement.remove()" style="float: right; background: none; border: none; color: white; cursor: pointer;">✕</button>
    `;
    document.body.appendChild(info);
  }, 2000);
}
