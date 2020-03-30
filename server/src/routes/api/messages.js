import { Router } from 'express';
import requireJwtAuth from '../../middleware/requireJwtAuth';
import Message from '../../models/Message';

const router = Router();

router.get('/', async (req, res) => {
  const messages = await Message.find({})
    .sort({ createdAt: 'desc' })
    .populate('user');

  res.send({
    messages: messages.map(m => {
      return m.toJSON();
    }),
  });
});

export default router;
