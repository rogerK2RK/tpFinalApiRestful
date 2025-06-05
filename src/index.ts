import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import eventRoutes from './routes/event.routes';
import participantRoutes from './routes/participants.routes';
import categoryRoutes from './routes/category.routes';
import commentRoutes from './routes/comment.routes';


dotenv.config();

const app = express();

// Port d'écoute
// Utilise la variable d'environnement PORT ou 3000 par défaut
const PORT = process.env.PORT || 3000;

// Middleware JSON
// Active CORS pour autoriser les appels depuis n'importe quelle origine
app.use(cors()); 
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

// Routes d'événements
app.use('/api/events', eventRoutes);

// Routes de participants
app.use('/api/participants', participantRoutes);

// Routes de catégories
app.use('/api/categories', categoryRoutes);

// Routes de commentaires
app.use('/api/comments', commentRoutes);
