// lib/database/models/User.ts
import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import Wallet, { IWallet } from './Wallet';
import Cart from './Cart';

export interface IUser extends Document {
  email: string;
  username: string;
  password: string;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
  avatar: string;
  phone: string;
  address: string;
  wallet: mongoose.Types.ObjectId | IWallet;
  role: 'user' | 'admin';
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  wallet: { type: mongoose.Schema.Types.ObjectId, ref: 'Wallet' },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
});

// Hash password
UserSchema.pre<IUser>('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  try {
    if (!user.wallet) {
      const newWallet = new Wallet({ user: user._id });
      await newWallet.save();
      user.wallet = newWallet._id;
    }

    const newCart = new Cart({ user: user._id, items: [] });
    await newCart.save();
    next();
  } catch (error: any) {
    next(error);
  }
});

// Compare password
UserSchema.methods.comparePassword = async function (candidatePassword: string) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
