export interface User {
  id: string;
  username: string;
  email: string;
  totalScore: number;
  dailyChallengeScore: number;
  quizzesTaken: number;
  dailyChallengesTaken: number;
  joinDate: string;
}

export interface Question {
  id: string;
  question: string;
  type: 'multiple-choice' | 'text-input';
  options?: string[];
  correctAnswer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  category: string;
}

export interface Quiz {
  id: string;
  title: string;
  category: string;
  questions: Question[];
  timeLimit?: number;
}

export interface QuizResult {
  id: string;
  userId: string;
  quizId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  completedAt: string;
  type: 'regular' | 'daily-challenge';
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  score: number;
  rank: number;
}