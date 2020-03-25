import { Router } from 'express';
import requireJwtAuth from '../middleware/requireJwtAuth';

const router = Router();

// for local, fb, google
router.get('/api/me', requireJwtAuth, (req, res) => {
  const me = req.user.toAuthJSON();
  res.send({ me });
});

router.get('/api/feature', requireJwtAuth, (req, res) => {
  res.send({
    feature: 'This is a feature. Only authenticated users can see this.',
  });
});

router.get('/api/profile', requireJwtAuth, (req, res) => {
  const me = req.user.toAuthJSON();
  res.send({ profile: me });
});

export default router;
