import { Router } from 'express';

import requireJwtAuth from '../../middleware/requireJwtAuth';
import User from '../../models/User';

const router = Router();

router.get('/me', requireJwtAuth, (req, res) => {
  const me = req.user.toJSON();
  res.json({ me });
});

router.get('/profile', requireJwtAuth, (req, res) => {
  const profile = req.user.toJSON();
  res.json({ profile });
});

router.get('/', requireJwtAuth, async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: 'desc' });

    res.json({
      users: users.map((m) => {
        return m.toJSON();
      }),
    });
  } catch (err) {
    res.status(500).json('Something went wrong.');
  }
});

router.get('/feature', requireJwtAuth, (req, res) => {
  res.json({
    feature: 'This is a feature. Only authenticated users can see this.',
  });
});

export default router;
