import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware JSON
app.use(express.json());

// Test route
app.get('/', (_req, res) => {
  res.send('API Event Sport est en ligne');
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});

// Routes d'authentification
app.use('/api/auth', authRoutes);
