import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/config';

// Create a user
export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { username, password: hashedPassword },
    });
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

// Get all users
export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await prisma.user.findMany({
      include: { notes: true },
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// Get user by ID
export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const idParam = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const id = parseInt(idParam, 10);
    const user = await prisma.user.findUnique({
      where: { id },
      include: { notes: true },
    });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

// Get user by username
export const getUserByUsername = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const usernameParam = Array.isArray(req.params.username) ? req.params.username[0] : req.params.username;
    const user = await prisma.user.findUnique({
      where: { username: usernameParam },
      include: { notes: true },
    });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

// Update user
export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const idParam = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const id = parseInt(idParam, 10);
    const { username, password } = req.body;
    const data: { username?: string; password?: string } = {};
    if (username) data.username = username;
    if (password) data.password = await bcrypt.hash(password, 10);
    const updatedUser = await prisma.user.update({
      where: { id },
      data,
    });
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

// Delete user
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const idParam = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const id = parseInt(idParam, 10);
    const deletedUser = await prisma.user.delete({
      where: { id },
    });
    res.json(deletedUser);
  } catch (error) {
    next(error);
  }
};

// Login user
export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { username },
      include: { notes: true },
    });
    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      config.jwtSecret,
      { expiresIn: '24h' }
    );

    const { password: _, ...userWithoutPassword } = user;
    res.json({ ...userWithoutPassword, token });
  } catch (error) {
    next(error);
  }
};
