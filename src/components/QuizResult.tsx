import React from 'react';
import { Trophy, CheckCircle, XCircle, Clock, Target } from 'lucide-react';
import { Question } from '../types';
import { formatTime, calculateCorrectAnswers } from '../utils/quizUtils';

interface QuizResultProps {
  questions: Question[];
  answers: Record<string, string>;
  score: number;
  timeSpent: number;
  onBackToDashboard: () => void;
  onTakeAnother: () => void;
}

export default function QuizResult({
  questions,
  answers,
  score,
  timeSpent,
  onBackToDashboard,
  onTakeAnother
}: QuizResultProps) {
  const correctAnswers = calculateCorrectAnswers(questions, answers);
  const percentage = Math.round((correctAnswers / questions.length) * 100);
  const maxScore = questions.reduce((sum, q) => sum + q.points, 0);

  const getPerformanceMessage = () => {
    if (percentage >= 90) return { message: "Outstanding! You're a quiz master! 🏆", color: "text-green-600" };
    if (percentage >= 70) return { message: "Great job! Well done! 🎉", color: "text-blue-600" };
    if (percentage >= 50) return { message: "Good effort! Keep it up! 👍", color: "text-yellow-600" };
    return { message: "Keep practicing! You'll improve! 💪", color: "text-purple-600" };
  };

  const performance = getPerformanceMessage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-primary rounded-xl shadow-sm border border-secondary overflow-hidden">
        <div className="px-6 py-8 bg-secondary text-primary text-center">
          <Trophy className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Quiz Completed!</h1>
          <p className={`text-lg ${performance.color}`}>
            {performance.message}
          </p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary mb-1">{score}</div>
              <div className="text-sm text-secondary">Total Score</div>
              <div className="text-xs text-secondary">out of {maxScore}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-success mb-1">{correctAnswers}</div>
              <div className="text-sm text-success">Correct</div>
              <div className="text-xs text-success">out of {questions.length}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary mb-1">{percentage}%</div>
              <div className="text-sm text-secondary">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary mb-1">{formatTime(timeSpent)}</div>
              <div className="text-sm text-secondary">Time Spent</div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Review Your Answers</h3>
            <div className="space-y-4">
              {questions.map((question, index) => {
                const userAnswer = answers[question.id]?.toLowerCase().trim();
                const correctAnswer = question.correctAnswer.toLowerCase().trim();
                const isCorrect = userAnswer === correctAnswer;

                return (
                  <div
                    key={question.id}
                    className={`p-4 rounded-lg border ${
                      isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      {isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 mb-2">
                          {index + 1}. {question.question}
                        </p>
                        <div className="text-sm">
                          <p className={isCorrect ? 'text-green-700' : 'text-red-700'}>
                            Your answer: {answers[question.id] || 'Not answered'}
                          </p>
                          {!isCorrect && (
                            <p className="text-green-700 mt-1">
                              Correct answer: {question.correctAnswer}
                            </p>
                          )}
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-500">
                        {question.points} pts
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onBackToDashboard}
              className="px-6 py-3 bg-secondary text-primary rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              Back to Dashboard
            </button>
            <button
              onClick={onTakeAnother}
              className="px-6 py-3 bg-success text-primary rounded-lg font-medium hover:bg-green-700 transition-all"
            >
              Take Another Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}