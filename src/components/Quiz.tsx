import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { Question } from '../types';
import { formatTime } from '../utils/quizUtils';

interface QuizProps {
  questions: Question[];
  onComplete: (answers: Record<string, string>, timeSpent: number) => void;
  onBack: () => void;
  title: string;
  timeLimit?: number;
}

export default function Quiz({ questions, onComplete, onBack, title, timeLimit }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeSpent, setTimeSpent] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const timeRemaining = timeLimit ? timeLimit - timeSpent : null;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeRemaining !== null && timeRemaining <= 0) {
      handleSubmit();
    }
  }, [timeRemaining]);

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      handleSubmit();
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate processing
    onComplete(answers, timeSpent);
  };

  const canProceed = answers[currentQuestion.id]?.trim();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-primary rounded-xl shadow-sm border border-secondary overflow-hidden">
        <div className="px-6 py-4 bg-secondary">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-primary">{title}</h1>
            <div className="flex items-center space-x-4 text-primary">
              {timeLimit && (
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    {timeRemaining !== null ? formatTime(timeRemaining) : formatTime(timeSpent)}
                  </span>
                </div>
              )}
              <span className="text-sm">
                {currentQuestionIndex + 1} / {questions.length}
              </span>
            </div>
          </div>
          
          <div className="mt-2">
            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className="bg-white rounded-full h-2 transition-all duration-300"
                style={{
                  width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`
                }}
              />
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {currentQuestion.question}
            </h2>
            
            <div className="flex items-center space-x-2 text-sm text-secondary mb-4">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                currentQuestion.difficulty === 'easy' ? 'bg-success text-primary' :
                currentQuestion.difficulty === 'medium' ? 'bg-secondary text-primary' :
                'bg-error text-primary'
              }`}>
                {currentQuestion.difficulty}
              </span>
              <span>{currentQuestion.points} points</span>
            </div>
          </div>

          <div className="mb-8">
            {currentQuestion.type === 'multiple-choice' ? (
              <div className="space-y-3">
                {currentQuestion.options?.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerChange(currentQuestion.id, option)}
                    className={`w-full p-4 text-left border rounded-lg transition-all ${
                      answers[currentQuestion.id] === option
                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
                  </button>
                ))}
              </div>
            ) : (
              <input
                type="text"
                value={answers[currentQuestion.id] || ''}
                onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Type your answer here..."
              />
            )}
          </div>

          <div className="flex justify-between">
            <button
              onClick={onBack}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Back to Categories
            </button>
            
            <button
              onClick={handleNext}
              disabled={!canProceed || isSubmitting}
              className="flex items-center space-x-2 px-6 py-2 bg-secondary text-primary rounded-lg font-medium hover:bg-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{isLastQuestion ? (isSubmitting ? 'Submitting...' : 'Submit Quiz') : 'Next Question'}</span>
              {!isLastQuestion && <ArrowRight className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}