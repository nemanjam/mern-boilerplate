import { Router } from 'express';
import requireJwtAuth from '../../middleware/requireJwtAuth';
import Message from '../../models/Message';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const messages = await Message.find()
      .sort({ createdAt: 'desc' })
      .populate('user');

    res.json({
      messages: messages.map(m => {
        return m.toJSON();
      }),
    });
  } catch (err) {
    res.status(500).json('Something went wrong.');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const message = await Message.findById(req.params.id).populate('user');
    if (!message) return res.status(404).json('No message found.');
    res.json({ message: message.toJSON() });
  } catch (err) {
    res.status(500).json('Something went wrong.');
  }
});

router.post('/', requireJwtAuth, async (req, res) => {
  try {
    let message = await Message.create({
      text: req.body.text,
      user: req.user.id,
    });
    message = await message.populate('user').execPopulate();

    res.status(200).json({ message: message.toJSON() });
  } catch (err) {
    res.status(500).json('Something went wrong.');
  }
});

router.delete('/:id', requireJwtAuth, async (req, res) => {
  try {
    const message = await Message.findByIdAndRemove(req.params.id).populate('user');
    if (!message) return res.status(404).json('No message found.');
    if (message.user.id !== req.user.id) return res.status(400).json('Not the message owner.');
    res.status(200).json({ message });
  } catch (err) {
    res.status(500).json('Something went wrong.');
  }
});

router.put('/:id', requireJwtAuth, async (req, res) => {
  try {
    const message = Message.findByIdAndUpdate(req.params.id, { text: req.body.text, user: req.user.id }, { new: true });
    if (!message) return res.status(404).json('No message found.');
    res.status(200).json({ message });
  } catch (err) {
    res.status(500).json('Something went wrong.');
  }
});

export default router;
