// lib/database/controllers/UserController.ts
import cloudinary from '@/lib/cloudinary';
import User, { IUser } from '../models/User';
import jwt from 'jsonwebtoken';

export const registerUser = async (username: string, email: string, password: string, phone: string, avatar: string, role: string, address: string): Promise<IUser> => {
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      new Error('Người dùng này đã tồn tại');
    }

    const user = new User({ username, email, password, phone, avatar, role, address });
    await user.save();
    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const loginUser = async (email: string, password: string): Promise<{ user: any, token: string }> => {
  try {
    if (!email || !password) {
      throw new Error('Email hoặc mật khẩu không được để trống');
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Email hoặc mật khẩu sai');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error('Email hoặc mật khẩu sai');
    }

    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      throw new Error('Token sai');
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    return { user, token };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getAllUsers = async (): Promise<IUser[]> => {
  try {
    const users = await User.find()
    return users
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateUser = async (userId: string, username: string, phone: string, address: string, avatar: string): Promise<IUser | null> => {
  try {
    const result = await cloudinary.uploader.upload(avatar, { folder: 'product-images/' });

    const updateFields: Partial<IUser> = {
      username,
      phone,
      address
    };

    updateFields.avatar = result.secure_url;

    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, { new: true });
    return updatedUser;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getUserById = async (userId: string): Promise<IUser | null> => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};