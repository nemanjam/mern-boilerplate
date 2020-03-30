import { Router } from 'express';
import requireJwtAuth from '../../middleware/requireJwtAuth';

const router = Router();

router.get('/me', requireJwtAuth, (req, res) => {
  const me = req.user.toAuthJSON();
  res.send({ me });
});

router.get('/feature', requireJwtAuth, (req, res) => {
  res.send({
    feature: 'This is a feature. Only authenticated users can see this.',
  });
});

export default router;
