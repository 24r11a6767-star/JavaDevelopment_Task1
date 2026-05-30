import { useState } from 'react';

interface GameStats {
  round: number;
  totalScore: number;
  roundsWon: number;
  roundsLost: number;
}

interface RoundHistory {
  round: number;
  won: boolean;
  attempts: number;
  points: number;
  numberToGuess: number;
}

const MAX_ATTEMPTS = 10;
const MIN_NUMBER = 1;
const MAX_NUMBER = 100;
const MAX_POINTS_PER_ROUND = 100;

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [numberToGuess, setNumberToGuess] = useState(0);
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'info' | 'success' | 'error' | 'warning'>('info');
  const [gameOver, setGameOver] = useState(false);
  const [history, setHistory] = useState<number[]>([]);
  const [roundHistory, setRoundHistory] = useState<RoundHistory[]>([]);
  
  const [stats, setStats] = useState<GameStats>({
    round: 1,
    totalScore: 0,
    roundsWon: 0,
    roundsLost: 0,
  });

  const generateRandomNumber = () => {
    return Math.floor(Math.random() * (MAX_NUMBER - MIN_NUMBER + 1)) + MIN_NUMBER;
  };

  const calculatePoints = (attemptsUsed: number): number => {
    // More points for fewer attempts
    const pointsPerAttempt = MAX_POINTS_PER_ROUND / MAX_ATTEMPTS;
    const points = Math.max(0, MAX_POINTS_PER_ROUND - (attemptsUsed - 1) * pointsPerAttempt);
    return Math.round(points);
  };

  const startGame = () => {
    const newNumber = generateRandomNumber();
    setNumberToGuess(newNumber);
    setGameStarted(true);
    setAttempts(0);
    setGuess('');
    setMessage(`I'm thinking of a number between ${MIN_NUMBER} and ${MAX_NUMBER}. Can you guess it?`);
    setMessageType('info');
    setGameOver(false);
    setHistory([]);
  };

  const resetGame = () => {
    setGameStarted(false);
    setStats({
      round: 1,
      totalScore: 0,
      roundsWon: 0,
      roundsLost: 0,
    });
    setRoundHistory([]);
  };

  const nextRound = () => {
    const newNumber = generateRandomNumber();
    setNumberToGuess(newNumber);
    setAttempts(0);
    setGuess('');
    setMessage(`Round ${stats.round + 1}! I'm thinking of a new number. Good luck!`);
    setMessageType('info');
    setGameOver(false);
    setHistory([]);
    setStats(prev => ({ ...prev, round: prev.round + 1 }));
  };

  const handleGuess = () => {
    const guessNumber = parseInt(guess);

    if (!guess || isNaN(guessNumber)) {
      setMessage('Please enter a valid number!');
      setMessageType('error');
      return;
    }

    if (guessNumber < MIN_NUMBER || guessNumber > MAX_NUMBER) {
      setMessage(`Please enter a number between ${MIN_NUMBER} and ${MAX_NUMBER}!`);
      setMessageType('error');
      return;
    }

    if (history.includes(guessNumber)) {
      setMessage(`You've already tried ${guessNumber}! Try a different number.`);
      setMessageType('warning');
      return;
    }

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    setHistory([...history, guessNumber]);

    if (guessNumber === numberToGuess) {
      const points = calculatePoints(newAttempts);
      setGameOver(true);
      setMessage(`🎉 Congratulations! You guessed it in ${newAttempts} attempt${newAttempts > 1 ? 's' : ''}!`);
      setMessageType('success');
      
      const newStats = {
        ...stats,
        totalScore: stats.totalScore + points,
        roundsWon: stats.roundsWon + 1,
      };
      setStats(newStats);

      setRoundHistory([...roundHistory, {
        round: stats.round,
        won: true,
        attempts: newAttempts,
        points,
        numberToGuess,
      }]);
    } else if (newAttempts >= MAX_ATTEMPTS) {
      setGameOver(true);
      setMessage(`😞 Game Over! The number was ${numberToGuess}. You've used all ${MAX_ATTEMPTS} attempts.`);
      setMessageType('error');
      
      setStats({
        ...stats,
        roundsLost: stats.roundsLost + 1,
      });

      setRoundHistory([...roundHistory, {
        round: stats.round,
        won: false,
        attempts: newAttempts,
        points: 0,
        numberToGuess,
      }]);
    } else {
      const remaining = MAX_ATTEMPTS - newAttempts;
      if (guessNumber < numberToGuess) {
        setMessage(`📈 Too low! Try a higher number. (${remaining} attempt${remaining > 1 ? 's' : ''} left)`);
        setMessageType('warning');
      } else {
        setMessage(`📉 Too high! Try a lower number. (${remaining} attempt${remaining > 1 ? 's' : ''} left)`);
        setMessageType('warning');
      }
    }

    setGuess('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !gameOver) {
      handleGuess();
    }
  };

  const getMessageColor = () => {
    switch (messageType) {
      case 'success':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'error':
        return 'text-red-700 bg-red-50 border-red-200';
      case 'warning':
        return 'text-amber-700 bg-amber-50 border-amber-200';
      default:
        return 'text-blue-700 bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-4 sm:p-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-2">
            🎯 Number Guessing Game
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Test your intuition and logic skills!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Game Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Game Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
              {!gameStarted ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-6">🎲</div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Ready to Play?
                  </h2>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    I'll think of a number between {MIN_NUMBER} and {MAX_NUMBER}. 
                    You have {MAX_ATTEMPTS} attempts to guess it. The fewer attempts you use, 
                    the more points you earn!
                  </p>
                  <button
                    onClick={startGame}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all shadow-lg"
                  >
                    Start Game
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Stats Bar */}
                  <div className="flex flex-wrap gap-4 justify-between items-center pb-6 border-b border-gray-200">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">Round {stats.round}</div>
                      <div className="text-xs text-gray-500">Current Round</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{attempts}/{MAX_ATTEMPTS}</div>
                      <div className="text-xs text-gray-500">Attempts Used</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{stats.totalScore}</div>
                      <div className="text-xs text-gray-500">Total Score</div>
                    </div>
                  </div>

                  {/* Message */}
                  <div className={`p-4 rounded-lg border-2 ${getMessageColor()} transition-all`}>
                    <p className="font-medium text-center">{message}</p>
                  </div>

                  {/* Input Area */}
                  {!gameOver && (
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <input
                          type="number"
                          value={guess}
                          onChange={(e) => setGuess(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Enter your guess..."
                          min={MIN_NUMBER}
                          max={MAX_NUMBER}
                          className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none text-lg transition-all"
                          autoFocus
                        />
                        <button
                          onClick={handleGuess}
                          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all shadow-md"
                        >
                          Guess
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Game Over Actions */}
                  {gameOver && (
                    <div className="flex flex-wrap gap-3 justify-center pt-4">
                      <button
                        onClick={nextRound}
                        className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all shadow-md"
                      >
                        Next Round
                      </button>
                      <button
                        onClick={resetGame}
                        className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-gray-700 hover:to-gray-800 transform hover:scale-105 transition-all shadow-md"
                      >
                        New Game
                      </button>
                    </div>
                  )}

                  {/* Guess History */}
                  {history.length > 0 && (
                    <div className="pt-6 border-t border-gray-200">
                      <h3 className="font-semibold text-gray-700 mb-3">Your Guesses:</h3>
                      <div className="flex flex-wrap gap-2">
                        {history.map((h, idx) => (
                          <div
                            key={idx}
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              h < numberToGuess
                                ? 'bg-amber-100 text-amber-700'
                                : h > numberToGuess
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-green-100 text-green-700'
                            }`}
                          >
                            {h}
                            {h < numberToGuess ? ' ↑' : h > numberToGuess ? ' ↓' : ' ✓'}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Game Rules */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">📜 How to Play</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">1.</span>
                  <span>The computer will randomly select a number between {MIN_NUMBER} and {MAX_NUMBER}.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">2.</span>
                  <span>You have {MAX_ATTEMPTS} attempts to guess the correct number.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">3.</span>
                  <span>After each guess, you'll get a hint if your guess is too high or too low.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">4.</span>
                  <span>Guess correctly in fewer attempts to earn more points (max {MAX_POINTS_PER_ROUND} points per round).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">5.</span>
                  <span>Play multiple rounds to increase your total score!</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Sidebar - Stats & History */}
          <div className="space-y-6">
            {/* Overall Statistics */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Statistics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Rounds Played</span>
                  <span className="text-2xl font-bold text-purple-600">
                    {stats.roundsWon + stats.roundsLost}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Rounds Won</span>
                  <span className="text-2xl font-bold text-green-600">{stats.roundsWon}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Rounds Lost</span>
                  <span className="text-2xl font-bold text-red-600">{stats.roundsLost}</span>
                </div>
                {stats.roundsWon + stats.roundsLost > 0 && (
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-gray-700 font-medium">Win Rate</span>
                    <span className="text-2xl font-bold text-blue-600">
                      {Math.round((stats.roundsWon / (stats.roundsWon + stats.roundsLost)) * 100)}%
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Round History */}
            {roundHistory.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">🏆 Round History</h3>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {roundHistory.slice().reverse().map((round) => (
                    <div
                      key={round.round}
                      className={`p-4 rounded-lg border-2 ${
                        round.won
                          ? 'bg-green-50 border-green-200'
                          : 'bg-red-50 border-red-200'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-bold text-gray-700">Round {round.round}</span>
                        <span className={`text-2xl ${round.won ? 'text-green-600' : 'text-red-600'}`}>
                          {round.won ? '✓' : '✗'}
                        </span>
                      </div>
                      <div className="text-sm space-y-1 text-gray-600">
                        <div>Number: <span className="font-semibold">{round.numberToGuess}</span></div>
                        <div>Attempts: <span className="font-semibold">{round.attempts}</span></div>
                        {round.won && (
                          <div>Points: <span className="font-semibold text-green-600">+{round.points}</span></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
