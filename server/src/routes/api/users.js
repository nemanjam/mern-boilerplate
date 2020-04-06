import { Router } from 'express';
import multer from 'multer';
import { resolve } from 'path';

import requireJwtAuth from '../../middleware/requireJwtAuth';
import User, { hashPassword } from '../../models/User';

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, resolve(__dirname, '../../../public/images'));
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, `avatar-${Date.now()}-${fileName}`);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  },
});

//`checkit`, which is probably the option I'd suggest if  `validatem`

router.put('/', [requireJwtAuth, upload.single('avatar')], async (req, res, next) => {
  try {
    let avatarPath = null;
    if (req.file) {
      const url = req.protocol + '://' + req.get('host');
      avatarPath = `${url}/public/images/${req.file.filename}`;
    }

    // if fb or google user provider dont update password
    let password = null;
    if (req.body.password && req.body.password !== '') {
      password = await hashPassword(req.body.password);
    }

    const updatedUser = { avatar: avatarPath, name: req.body.name, username: req.body.username, password };

    // remove '', null, undefined
    Object.keys(updatedUser).forEach((k) => !updatedUser[k] && updatedUser[k] !== undefined && delete updatedUser[k]);

    // console.log(req.body, updatedUser);

    const user = await User.findByIdAndUpdate(req.user.id, updatedUser, { new: true });

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

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
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

export default router;
