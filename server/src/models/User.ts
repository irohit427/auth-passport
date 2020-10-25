import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: String,
  lastName: String,
  password: {
    type: String,
  },
  type: {
    type: String,
    enum: ['admin', 'moderator'],
    default: 'moderator'
  }
}, { timestamps: true });

export default mongoose.model('User', UserSchema);