import { useState, useEffect } from 'react';
import { User } from '../types';
import { useLocalStorage } from './useLocalStorage';

export function useAuth() {
  const [user, setUser] = useLocalStorage<User | null>('currentUser', null);
  const [users, setUsers] = useLocalStorage<User[]>('users', []);

  const login = (username: string, email: string): User => {
    const existingUser = users.find(u => u.username === username);
    
    if (existingUser) {
      setUser(existingUser);
      return existingUser;
    }

    const newUser: User = {
      id: Date.now().toString(),
      username,
      email,
      totalScore: 0,
      dailyChallengeScore: 0,
      quizzesTaken: 0,
      dailyChallengesTaken: 0,
      joinDate: new Date().toISOString(),
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setUser(newUser);
    
    return newUser;
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (updatedUser: User) => {
    const updatedUsers = users.map(u => 
      u.id === updatedUser.id ? updatedUser : u
    );
    setUsers(updatedUsers);
    setUser(updatedUser);
  };

  return {
    user,
    users,
    login,
    logout,
    updateUser,
    isAuthenticated: !!user,
  };
}