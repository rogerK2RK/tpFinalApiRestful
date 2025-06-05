import { Router, RequestHandler, Request, Response } from 'express';
import * as userController from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router(); //  pas express(), mais Router()

// Route POST /api/auth/register
router.post('/register', userController.register as RequestHandler);

// Route POST /api/auth/login
router.post('/login', userController.login as RequestHandler);

// Route protégée : accessible uniquement si connecté
router.get('/me', authMiddleware as RequestHandler, (req: Request, res: Response) => {
  res.json({ user: req.user });
});
export default router;
