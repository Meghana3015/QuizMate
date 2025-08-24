import React from 'react';
import { Trophy, Target, BookOpen, TrendingUp, Calendar, Star } from 'lucide-react';
import { User } from '../types';

interface DashboardProps {
  user: User;
  onStartQuiz: () => void;
  onStartDailyChallenge: () => void;
  canTakeDailyChallenge: boolean;
}

export default function Dashboard({ user, onStartQuiz, onStartDailyChallenge, canTakeDailyChallenge }: DashboardProps) {
  const averageScore = user.quizzesTaken > 0 ? Math.round(user.totalScore / user.quizzesTaken) : 0;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user.username}!
        </h1>
        <p className="text-gray-600">Ready to test your knowledge today?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-primary rounded-xl shadow-sm border border-secondary p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-secondary">Total Score</p>
              <p className="text-2xl font-bold text-secondary">{user.totalScore}</p>
            </div>
            <Trophy className="h-8 w-8 text-secondary" />
          </div>
        </div>
        <div className="bg-primary rounded-xl shadow-sm border border-secondary p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-secondary">Quizzes Taken</p>
              <p className="text-2xl font-bold text-secondary">{user.quizzesTaken}</p>
            </div>
            <BookOpen className="h-8 w-8 text-secondary" />
          </div>
        </div>
        <div className="bg-primary rounded-xl shadow-sm border border-success p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-success">Daily Challenge Score</p>
              <p className="text-2xl font-bold text-success">{user.dailyChallengeScore}</p>
            </div>
            <Target className="h-8 w-8 text-success" />
          </div>
        </div>
        <div className="bg-primary rounded-xl shadow-sm border border-secondary p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-secondary">Average Score</p>
              <p className="text-2xl font-bold text-secondary">{averageScore}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-secondary" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <BookOpen className="h-6 w-6 text-purple-600" />
            <h2 className="text-xl font-semibold text-gray-900">Start a Quiz</h2>
          </div>
          <p className="text-gray-600 mb-6">
            Choose from multiple categories and test your knowledge across various subjects.
          </p>
          <button
            onClick={onStartQuiz}
            className="w-full bg-secondary text-primary py-3 px-4 rounded-lg font-medium hover:bg-purple-700 transition-all"
          >
            Start Quiz
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Calendar className="h-6 w-6 text-green-600" />
            <h2 className="text-xl font-semibold text-gray-900">Daily Challenge</h2>
          </div>
          <p className="text-gray-600 mb-6">
            Take on today's special challenge with time-limited questions for extra points.
          </p>
          <button
            onClick={onStartDailyChallenge}
            disabled={!canTakeDailyChallenge}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
              canTakeDailyChallenge
                ? 'bg-success text-primary hover:bg-green-700'
                : 'bg-red text-white cursor-not-allowed'
            }`}
          >
            {canTakeDailyChallenge ? 'Take Challenge' : 'Already Completed Today'}
          </button>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Star className="h-6 w-6 text-yellow-500" />
          <h2 className="text-xl font-semibold text-gray-900">Your Progress</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue mb-1">{user.quizzesTaken}</div>
            <div className="text-sm text-gray-600">Total Quizzes</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green mb-1">{user.dailyChallengesTaken}</div>
            <div className="text-sm text-gray-600">Daily Challenges</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue mb-1">
              {new Date(user.joinDate).toLocaleDateString()}
            </div>
            <div className="text-sm text-gray-600">Member Since</div>
          </div>
        </div>
      </div>
    </div>
  );
}