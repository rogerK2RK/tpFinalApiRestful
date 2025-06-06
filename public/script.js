const API_BASE = 'http://localhost:3000/api';

// ===== Connexion =====
document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const result = await response.json();

  if (response.ok) {
    localStorage.setItem('token', result.token);
    alert('Connexion réussie !');
    fetchEvents();
  } else {
    alert(`Erreur: ${result.error}`);
  }
});

// ===== Inscription =====
document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const email = form.email.value.trim();
  const password = form.password.value;

  const response = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const result = await response.json();
  if (response.ok) {
    alert("Inscription réussie !");
    form.reset();
  } else {
    alert(`Erreur: ${result.error}`);
  }
});

// ===== Création d'événement =====
document.getElementById('eventForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const token = localStorage.getItem('token');
  if (!token) return alert("Connectez-vous pour créer un événement");

  const form = e.target;
  const data = {
    title: form.title.value.trim(),
    date: form.date.value,
    location: form.location.value.trim(),
    description: form.description.value.trim(),
  };

  const response = await fetch(`${API_BASE}/events`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  if (response.ok) {
    alert("Événement créé !");
    form.reset();
    fetchEvents();
  } else {
    alert(`Erreur: ${result.error}`);
  }
});

// ===== Liste des événements =====
async function fetchEvents() {
  const response = await fetch(`${API_BASE}/events`);
  const result = await response.json(); 
  const events = result.data;           

  const container = document.getElementById('events');
  container.innerHTML = '';

  if (!Array.isArray(events)) {
    console.error('Réponse inattendue :', result);
    return;
  }

  events.forEach(event => {
    const div = document.createElement('div');
    div.className = 'event';
    div.innerHTML = `
      <h3>${event.title}</h3>
      <p><strong>Date:</strong> ${new Date(event.date).toLocaleString()}</p>
      <p><strong>Lieu:</strong> ${event.location || 'Non précisé'}</p>
      <p>${event.description || ''}</p>
      <button onclick="registerToEvent('${event.id}')">S'inscrire</button>
    `;
    container.appendChild(div);
  });
}

// ===== S'inscrire à un événement =====
async function registerToEvent(eventId) {
  const token = localStorage.getItem('token');
  if (!token) return alert("Vous devez être connecté !");

  const response = await fetch(`${API_BASE}/participants/${eventId}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  });

  const result = await response.json();
  if (response.ok) {
    alert("Inscription réussie !");
  } else {
    alert(`Erreur: ${result.error}`);
  }
}

// ===== Initialisation =====
fetchEvents();
