# Installation & Running Instructions

## For Instructor/Reviewer

This is a React-based Number Guessing Game. Here's how to run it:

### Prerequisites
- Node.js (v18 or higher) - Download from https://nodejs.org/

### Installation Steps

1. **Extract the ZIP file** (if submitted as ZIP)

2. **Open terminal/command prompt** in the project folder

3. **Install dependencies:**
   ```bash
   npm install
   ```
   (This will take 1-2 minutes)

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open in browser:**
   - Look for the link in terminal: `http://localhost:5173/`
   - Or manually open browser and go to: `http://localhost:5173/`

### Alternative: Production Build

To create a production build:
```bash
npm run build
```

Then open `dist/index.html` in any browser.

## Game Features

- Random number generation (1-100)
- 10 attempts per round
- Smart hints (higher/lower)
- Points system (max 100 points per round)
- Multiple rounds
- Statistics tracking
- Round history
- Fully responsive design

## Technologies Used

- **React 18** - Modern UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS framework

## Project Structure

```
src/
  ├── App.tsx       - Main game component (all game logic)
  ├── main.tsx      - Application entry point
  └── index.css     - Global styles
```

## Troubleshooting

If you encounter any issues:

1. Make sure Node.js is installed: `node --version`
2. Delete `node_modules` and run `npm install` again
3. Try a different port: `npm run dev -- --port 3000`

---

**Project created for internship submission**
**All code is original and fully functional**
