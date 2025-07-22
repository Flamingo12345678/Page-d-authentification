

// --- Animation du panneau (slide sign-in / sign-up)
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

// Boutons pour desktop
registerBtn?.addEventListener('click', () => {
  container.classList.add("active");
});

loginBtn?.addEventListener('click', () => {
  container.classList.remove("active");
});

// --- Gestion du bouton mobile
const mobileSwitchBtn = document.getElementById('mobile-switch-btn');
const switchText = document.getElementById('switch-text');

mobileSwitchBtn?.addEventListener('click', () => {
  container.classList.toggle("active");
  
  // Met à jour le texte du bouton
  if (container.classList.contains("active")) {
    switchText.textContent = "Se connecter";
  } else {
    switchText.textContent = "Créer un compte";
  }
});