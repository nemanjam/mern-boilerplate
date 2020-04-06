import mongoose from 'mongoose';
import Joi from 'joi';
const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

messageSchema.methods.toJSON = function () {
  return {
    id: this._id,
    text: this.text,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    user: this.user.toJSON(),
  };
};

export const validateMessage = (message) => {
  const schema = {
    text: Joi.string().min(5).max(300).required(),
  };
  return Joi.validate(message, schema);
};

const Message = mongoose.model('Message', messageSchema);

export default Message;
