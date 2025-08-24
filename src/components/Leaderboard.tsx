import React, { useState } from 'react';
import { Trophy, Medal, Award, Users } from 'lucide-react';
import { LeaderboardEntry } from '../types';

interface LeaderboardProps {
  regularLeaderboard: LeaderboardEntry[];
  dailyChallengeLeaderboard: LeaderboardEntry[];
  currentUserId: string;
}

export default function Leaderboard({
  regularLeaderboard,
  dailyChallengeLeaderboard,
  currentUserId
}: LeaderboardProps) {
  const [activeTab, setActiveTab] = useState<'regular' | 'daily'>('regular');

  const currentLeaderboard = activeTab === 'regular' ? regularLeaderboard : dailyChallengeLeaderboard;

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-orange-500" />;
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200";
      case 2:
        return "bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200";
      case 3:
        return "bg-gradient-to-r from-orange-50 to-red-50 border-orange-200";
      default:
        return "bg-white border-gray-200";
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary mb-2">Leaderboard</h1>
        <p className="text-secondary">See how you rank against other quiz masters</p>
      </div>
      <div className="bg-primary rounded-xl shadow-sm border border-secondary overflow-hidden">
        <div className="border-b border-secondary">
          <div className="flex">
            <button
              onClick={() => setActiveTab('regular')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === 'regular'
                  ? 'text-secondary border-b-2 border-secondary bg-primary'
                  : 'text-secondary hover:text-success'
              }`}
            >
              Regular Quiz
            </button>
            <button
              onClick={() => setActiveTab('daily')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === 'daily'
                  ? 'text-success border-b-2 border-success bg-primary'
                  : 'text-secondary hover:text-success'
              }`}
            >
              Daily Challenge
            </button>
          </div>
        </div>

        <div className="p-6">
          {currentLeaderboard.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No rankings yet</h3>
              <p className="text-gray-500">
                Be the first to complete a {activeTab === 'regular' ? 'quiz' : 'daily challenge'} and claim the top spot!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {currentLeaderboard.map((entry) => (
                <div
                  key={entry.userId}
                  className={`p-4 rounded-lg border transition-all ${
                    entry.userId === currentUserId
                      ? 'ring-2 ring-purple-500 border-purple-200 bg-purple-50'
                      : getRankBg(entry.rank)
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white border border-gray-200">
                        {getRankIcon(entry.rank)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {entry.username}
                          {entry.userId === currentUserId && (
                            <span className="ml-2 px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
                              You
                            </span>
                          )}
                        </h3>
                        <p className="text-sm text-gray-600">Rank #{entry.rank}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">{entry.score}</div>
                      <div className="text-sm text-gray-500">points</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}