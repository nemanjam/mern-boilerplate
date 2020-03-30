import { Router } from 'express';
import localAuthRoutes from './localAuth';
import googleAuthRoutes from './googleAuth';
import facebookAuthRoutes from './facebookAuth';
import apiRoutes from './api';
const router = Router();

router.use('/auth', localAuthRoutes);
router.use('/auth', googleAuthRoutes);
router.use('/auth', facebookAuthRoutes);
router.use('/api', apiRoutes);

export default router;

/*
routes:

GET /auth/google
GET /auth/google/callback

GET /auth/facebook
GET /auth/facebook/callback

POST /auth/login
POST /auth/register
GET /auth/logout

GET api/users/me
GET /api/users/feature

*/
