import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const { Schema } = mongoose;

const userSchema = new Schema({
  provider: {
    type: String,
    required: true,
  },

  // local
  localDisplayName: String,
  localPicture: String,
  email: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
    minlength: 6,
    maxlength: 60,
  },

  // google
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  googleEmail: String,
  googleDisplayName: String,
  googlePicture: String,

  // fb
  facebookId: {
    type: String,
    unique: true,
    sparse: true,
  },
  facebookEmail: String,
  facebookDisplayName: String,
  facebookPicture: String,
});

userSchema.methods.toAuthJSON = function() {
  return {
    id: this._id,
    provider: this.provider,
    email: this.email || this.googleEmail || this.facebookEmail,
    displayName: this.localDisplayName || this.googleDisplayName || this.facebookDisplayName,
    image: this.localPicture || this.googlePicture || this.facebookPicture,
  };
};

userSchema.methods.generateJWT = function() {
  const token = jwt.sign(
    {
      expiresIn: '12h',
      id: this._id,
      provider: this.provider,
      email: this.email || this.googleEmail || this.facebookEmail,
    },
    process.env.JWT_SECRET_DEV,
  );
  return token;
};

userSchema.methods.registerUser = (newUser, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (errh, hash) => {
      if (err) {
        console.log(err);
      }
      // set pasword to hash
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

const User = mongoose.model('User', userSchema);

export default User;
