import mongoose from 'mongoose';
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

messageSchema.methods.toJSON = function() {
  return {
    id: this._id,
    text: this.text,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    user: this.user.toJSON(),
  };
};

const Message = mongoose.model('Message', messageSchema);

export default Message;
