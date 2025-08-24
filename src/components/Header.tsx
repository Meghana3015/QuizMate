import React from 'react';
import { User, LogOut, Trophy, BookOpen } from 'lucide-react';

interface HeaderProps {
  user: any;
  onLogout: () => void;
  currentView: string;
  onViewChange: (view: string) => void;
}

export default function Header({ user, onLogout, currentView, onViewChange }: HeaderProps) {
  return (
    <header className="bg-secondary shadow-lg border-b border-purple-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-primary">
                QuizMaster
              </h1>
            </div>
            <nav className="hidden md:flex space-x-6 ml-8">
              <button
                onClick={() => onViewChange('dashboard')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === 'dashboard'
                    ? 'bg-primary text-secondary'
                    : 'text-primary hover:bg-purple-700 hover:text-white'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => onViewChange('leaderboard')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === 'leaderboard'
                    ? 'bg-primary text-secondary'
                    : 'text-primary hover:bg-purple-700 hover:text-white'
                }`}
              >
                Leaderboard
              </button>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">{user?.username}</span>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-primary hover:text-error transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}