import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StartPage from './components/StartPage';
import QuizPage from './components/QuizPage';
import ResultsPage from './components/ResultsPage';

function App() {
  const [page, setPage] = useState('start');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState([]);

  const startQuiz = async () => {
    try {
      const res = await fetch('http://localhost:5000/questions');
      const data = await res.json();
      setQuestions(data);
      setAnswers(new Array(data.length).fill(null));
      setPage('quiz');
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const submitQuiz = async () => {
    try {
      const res = await fetch('http://localhost:5000/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers })
      });
      const data = await res.json();
      setScore(data.score);
      setResults(data.results);
      setPage('results');
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  const pageVariants = {
    initial: { opacity: 0, scale: 0.8, y: 20 },
    in: { opacity: 1, scale: 1, y: 0 },
    out: { opacity: 0, scale: 0.8, y: -20 }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <AnimatePresence mode="wait">
          {page === 'start' && (
            <motion.div
              key="start"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <StartPage onStart={startQuiz} />
            </motion.div>
          )}
          {page === 'quiz' && (
            <motion.div
              key="quiz"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <QuizPage questions={questions} answers={answers} setAnswers={setAnswers} onSubmit={submitQuiz} />
            </motion.div>
          )}
          {page === 'results' && (
            <motion.div
              key="results"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <ResultsPage score={score} total={questions.length} results={results} questions={questions} onRestart={() => setPage('start')} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
