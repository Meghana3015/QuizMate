import React, { useState, useEffect } from 'react';
import { useAuth } from './hooks/useAuth';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Question, Quiz, QuizResult as QuizResultType } from './types';
import { calculateScore, calculateCorrectAnswers, generateLeaderboard, hasCompletedDailyChallenge } from './utils/quizUtils';

import Login from './components/Login';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import CategorySelection from './components/CategorySelection';
import QuizComponent from './components/Quiz';
import QuizResult from './components/QuizResult';
import Leaderboard from './components/Leaderboard';

// Import quiz data
import scienceQuiz from './data/science-quiz.json';
import historyQuiz from './data/history-quiz.json';
import geographyQuiz from './data/geography-quiz.json';
import dailyChallengeData from './data/daily-challenge.json';

function App() {
  const { user, users, login, logout, updateUser, isAuthenticated } = useAuth();
  const [quizResults, setQuizResults] = useLocalStorage<QuizResultType[]>('quizResults', []);
  
  const [currentView, setCurrentView] = useState<
    'dashboard' | 'category-selection' | 'quiz' | 'quiz-result' | 'leaderboard' | 'daily-challenge'
  >('dashboard');
  
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [currentAnswers, setCurrentAnswers] = useState<Record<string, string>>({});
  const [currentScore, setCurrentScore] = useState(0);
  const [currentTimeSpent, setCurrentTimeSpent] = useState(0);

  const quizData: Record<string, Quiz> = {
    science: scienceQuiz as Quiz,
    history: historyQuiz as Quiz,
    geography: geographyQuiz as Quiz,
    'daily-challenge': dailyChallengeData as Quiz,
  };

  const canTakeDailyChallenge = user ? !hasCompletedDailyChallenge(user.id, quizResults) : false;
  const regularLeaderboard = generateLeaderboard(users, quizResults, 'regular');
  const dailyChallengeLeaderboard = generateLeaderboard(users, quizResults, 'daily-challenge');

  const handleLogin = (username: string, email: string) => {
    login(username, email);
  };

  const handleLogout = () => {
    logout();
    setCurrentView('dashboard');
  };

  const handleCategorySelect = (categoryId: string) => {
    const quiz = quizData[categoryId];
    if (quiz) {
      setCurrentQuiz(quiz);
      setCurrentView('quiz');
    }
  };

  const handleStartDailyChallenge = () => {
    if (canTakeDailyChallenge) {
      setCurrentQuiz(quizData['daily-challenge']);
      setCurrentView('daily-challenge');
    }
  };

  const handleQuizComplete = (answers: Record<string, string>, timeSpent: number) => {
    if (!currentQuiz || !user) return;

    const score = calculateScore(currentQuiz.questions, answers);
    const correctAnswers = calculateCorrectAnswers(currentQuiz.questions, answers);

    const result: QuizResultType = {
      id: Date.now().toString(),
      userId: user.id,
      quizId: currentQuiz.id,
      score,
      totalQuestions: currentQuiz.questions.length,
      correctAnswers,
      timeSpent,
      completedAt: new Date().toISOString(),
      type: currentView === 'daily-challenge' ? 'daily-challenge' : 'regular',
    };

    setQuizResults(prev => [...prev, result]);

    // Update user stats
    const updatedUser = {
      ...user,
      totalScore: currentView === 'daily-challenge' ? user.totalScore : user.totalScore + score,
      dailyChallengeScore: currentView === 'daily-challenge' ? user.dailyChallengeScore + score : user.dailyChallengeScore,
      quizzesTaken: currentView === 'daily-challenge' ? user.quizzesTaken : user.quizzesTaken + 1,
      dailyChallengesTaken: currentView === 'daily-challenge' ? user.dailyChallengesTaken + 1 : user.dailyChallengesTaken,
    };

    updateUser(updatedUser);

    setCurrentAnswers(answers);
    setCurrentScore(score);
    setCurrentTimeSpent(timeSpent);
    setCurrentView('quiz-result');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setCurrentQuiz(null);
    setCurrentAnswers({});
    setCurrentScore(0);
    setCurrentTimeSpent(0);
  };

  const handleTakeAnother = () => {
    setCurrentView('category-selection');
    setCurrentQuiz(null);
    setCurrentAnswers({});
    setCurrentScore(0);
    setCurrentTimeSpent(0);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        user={user}
        onLogout={handleLogout}
        currentView={currentView}
        onViewChange={setCurrentView}
      />

      <main>
        {currentView === 'dashboard' && (
          <Dashboard
            user={user!}
            onStartQuiz={() => setCurrentView('category-selection')}
            onStartDailyChallenge={handleStartDailyChallenge}
            canTakeDailyChallenge={canTakeDailyChallenge}
          />
        )}

        {currentView === 'category-selection' && (
          <CategorySelection
            onCategorySelect={handleCategorySelect}
            onBack={handleBackToDashboard}
          />
        )}

        {(currentView === 'quiz' || currentView === 'daily-challenge') && currentQuiz && (
          <QuizComponent
            questions={currentQuiz.questions}
            onComplete={handleQuizComplete}
            onBack={() => setCurrentView('category-selection')}
            title={currentQuiz.title}
            timeLimit={currentQuiz.timeLimit}
          />
        )}

        {currentView === 'quiz-result' && currentQuiz && (
          <QuizResult
            questions={currentQuiz.questions}
            answers={currentAnswers}
            score={currentScore}
            timeSpent={currentTimeSpent}
            onBackToDashboard={handleBackToDashboard}
            onTakeAnother={handleTakeAnother}
          />
        )}

        {currentView === 'leaderboard' && (
          <Leaderboard
            regularLeaderboard={regularLeaderboard}
            dailyChallengeLeaderboard={dailyChallengeLeaderboard}
            currentUserId={user!.id}
          />
        )}
      </main>
    </div>
  );
}

export default App;