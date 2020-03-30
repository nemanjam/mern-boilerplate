import { Router } from 'express';
import usersRoutes from './users';
import messagesRoutes from './messages';
const router = Router();

router.use('/users', usersRoutes);
router.use('/messages', messagesRoutes);

export default router;
