# 🎯 Number Guessing Game

A fun and interactive number guessing game built with React, TypeScript, Vite, and Tailwind CSS.

![Game Screenshot](https://img.shields.io/badge/React-18.3-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-3.4-blue) ![Vite](https://img.shields.io/badge/Vite-7.3-purple)

## 🎮 Game Features

- **Random Number Generation**: Computer generates a random number (1-100)
- **Limited Attempts**: 10 attempts per round to guess the number
- **Smart Hints**: Get feedback if your guess is too high or too low
- **Scoring System**: Earn up to 100 points per round (fewer attempts = more points)
- **Multiple Rounds**: Play unlimited rounds with cumulative scoring
- **Detailed Statistics**: Track wins, losses, win rate, and total score
- **Round History**: View all past rounds with details
- **Guess History**: See all your previous guesses with visual indicators
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Beautiful UI**: Modern gradient design with smooth animations

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **VS Code** (recommended) - [Download here](https://code.visualstudio.com/)

### Installation

1. **Clone or download this project**

2. **Open terminal in project folder**

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

5. **Open in browser:**
   ```
   http://localhost:5173/
   ```

## 📖 Detailed Setup Guides

For step-by-step instructions, see:

- **[QUICK_START.md](QUICK_START.md)** - 3-step quick setup
- **[COMPLETE_GUIDE.md](COMPLETE_GUIDE.md)** - Comprehensive guide with troubleshooting
- **[VSCODE_EXTENSIONS.md](VSCODE_EXTENSIONS.md)** - Recommended VS Code extensions
- **[SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md)** - Basic setup instructions

## 🎯 How to Play

1. Click **"Start Game"**
2. Computer randomly selects a number between 1-100
3. Enter your guess in the input field
4. Get instant feedback (too high, too low, or correct!)
5. You have **10 attempts** to guess correctly
6. Win points based on how many attempts you used
7. Play multiple rounds to increase your score!

## 🏆 Scoring System

- **1 attempt** = 100 points 🎉
- **2 attempts** = 90 points
- **3 attempts** = 80 points
- ...and so on
- **10 attempts** = 10 points

The faster you guess, the more points you earn!

## 🛠️ Technologies Used

- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Modern ES6+** - Latest JavaScript features

## 📁 Project Structure

```
number-guessing-game/
├── src/
│   ├── App.tsx          # Main game component
│   ├── main.tsx         # Entry point
│   ├── index.css        # Global styles
│   └── utils/
│       └── cn.ts        # Utility functions
├── index.html           # HTML template
├── package.json         # Dependencies
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript config
├── tailwind.config.js   # Tailwind config
└── postcss.config.js    # PostCSS config
```

## 🎨 Customization Ideas

Want to make it your own? Try these:

- **Change number range:** Edit `MIN_NUMBER` and `MAX_NUMBER` in `App.tsx`
- **Adjust attempts:** Modify `MAX_ATTEMPTS` constant
- **Change colors:** Update Tailwind classes (e.g., `from-purple-600` to `from-red-600`)
- **Add difficulty levels:** Create easy/medium/hard modes
- **Add sounds:** Use Web Audio API for feedback sounds
- **Add timer:** Create a time-based challenge mode
- **Leaderboard:** Save high scores to localStorage

## 🐛 Troubleshooting

### Common Issues

**"npm is not recognized"**
- Install Node.js from https://nodejs.org/
- Restart your terminal/computer

**Port already in use**
- Stop other dev servers
- Or run: `npm run dev -- --port 3000`

**Changes not showing**
- Save the file (Ctrl+S)
- Refresh browser (F5)
- Check terminal for errors

**Module errors**
- Delete `node_modules` folder
- Run `npm install` again

For more help, see [COMPLETE_GUIDE.md](COMPLETE_GUIDE.md)

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## 🤝 Contributing

Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Created with ❤️ as a learning project

## 🎉 Acknowledgments

- React team for the amazing library
- Tailwind CSS for the utility classes
- Vite team for the blazing fast build tool

---

**Happy Gaming! 🎮**

If you enjoy this game, give it a ⭐!
