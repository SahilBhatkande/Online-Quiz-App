![alt text](<Screenshot 2025-09-27 002827.png>)
![alt text](<Screenshot 2025-09-27 002840.png>)
![alt text](<Screenshot 2025-09-27 002918.png>)


# Online Quiz App

Hey there! This is a simple quiz application I built using React and Node.js. It lets users take a quiz with a timer, navigate between questions, and see their results at the end.

## What it does

- Shows questions one at a time in a clean interface
- Has a 5-minute timer that counts down
- Lets you go back and forth between questions
- Shows your score and which answers were right/wrong
- Looks pretty good with some animations

## Tech stuff I used

**Frontend:**
- React (the latest version)
- Tailwind CSS for styling
- Framer Motion for animations
- Vite for development

**Backend:**
- Node.js with Express
- SQLite database (super simple, no setup needed)
- Jest for testing

## Getting it running

First, make sure you have Node.js installed (version 18 or newer should work).

### Backend setup

```bash
cd backend
npm install
node server.js
```

This starts the server on port 5000.

### Frontend setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

This runs on port 5174. Open http://localhost:5174 in your browser.

## Running tests

```bash
cd backend
npm test
```

Tests the scoring logic and API stuff.

## How to use it

1. Click "Start Quiz" on the first page
2. Answer questions by clicking the options
3. Use Next/Previous to move around
4. Watch the timer - you have 5 minutes
5. Submit when done (or it auto-submits when time's up)
6. See your results and click "Take Quiz Again" if you want

## API stuff (for developers)

**GET /questions** - Gets all questions (no answers shown)

**POST /submit** - Sends your answers, gets back score and details

## Why I made certain choices

- **Cards everywhere**: Just looks clean and organized
- **Light theme**: Easy on the eyes, works for everyone
- **Centered everything**: Looks good on any screen size
- **SQLite**: No database server to set up, perfect for demos
- **React SPA**: Fast and responsive
- **Tailwind v4**: New hotness, should be faster

## Assumptions I made

- People will run this locally for now
- 3 sample questions is enough to show it works
- 5 minutes is a good quiz length
- One quiz at a time is fine

## If something breaks

**Port issues:** Change the port numbers in the code if needed

**Database problems:** Delete the quiz.db file and restart the backend

**Styles not loading:** Make sure npm install worked in both folders

**Can't connect:** Check that both servers are running

## Contributing

Feel free to fork it and make changes. Just make a pull request if you improve something!

---

Built with ❤️ using modern web tech