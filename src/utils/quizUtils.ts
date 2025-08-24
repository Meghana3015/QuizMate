import { Question, QuizResult, LeaderboardEntry, User } from '../types';

export function calculateScore(questions: Question[], answers: Record<string, string>): number {
  return questions.reduce((score, question) => {
    const userAnswer = answers[question.id]?.toLowerCase().trim();
    const correctAnswer = question.correctAnswer.toLowerCase().trim();
    
    if (userAnswer === correctAnswer) {
      return score + question.points;
    }
    return score;
  }, 0);
}

export function calculateCorrectAnswers(questions: Question[], answers: Record<string, string>): number {
  return questions.reduce((correct, question) => {
    const userAnswer = answers[question.id]?.toLowerCase().trim();
    const correctAnswer = question.correctAnswer.toLowerCase().trim();
    
    return userAnswer === correctAnswer ? correct + 1 : correct;
  }, 0);
}

export function generateLeaderboard(
  users: User[],
  results: QuizResult[],
  type: 'regular' | 'daily-challenge'
): LeaderboardEntry[] {
  const userScores = new Map<string, number>();

  // Calculate total scores for each user
  results
    .filter(result => result.type === type)
    .forEach(result => {
      const currentScore = userScores.get(result.userId) || 0;
      userScores.set(result.userId, currentScore + result.score);
    });

  // Create leaderboard entries
  const leaderboard: LeaderboardEntry[] = users
    .map(user => ({
      userId: user.id,
      username: user.username,
      score: userScores.get(user.id) || 0,
      rank: 0,
    }))
    .filter(entry => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((entry, index) => ({
      ...entry,
      rank: index + 1,
    }));

  return leaderboard;
}

export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function hasCompletedDailyChallenge(userId: string, results: QuizResult[]): boolean {
  const today = new Date().toDateString();
  return results.some(result => 
    result.userId === userId && 
    result.type === 'daily-challenge' && 
    new Date(result.completedAt).toDateString() === today
  );
}