import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function QuizPage({ questions, answers, setAnswers, onSubmit }) {
  const [current, setCurrent] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // 1 minutes

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      onSubmit();
    }
  }, [timeLeft, onSubmit]);

  const handleAnswer = (optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[current] = optionIndex;
    setAnswers(newAnswers);
  };

  const next = () => {
    if (current < questions.length - 1) setCurrent(current + 1);
  };

  const prev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const isLast = current === questions.length - 1;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const questionVariants = {
    enter: { x: 300, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -300, opacity: 0 }
  };

  const optionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        type: 'spring',
        stiffness: 100
      }
    })
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg p-8 border border-gray-200"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <motion.div
        className="flex justify-between items-center mb-6"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="text-sm text-gray-600">
          Question {current + 1} of {questions.length}
        </div>
        <motion.div
          className={`px-3 py-1 rounded-full text-sm font-semibold ${timeLeft < 60 ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}
          animate={{ scale: timeLeft < 60 ? [1, 1.1, 1] : 1 }}
          transition={{ duration: 0.5, repeat: timeLeft < 60 ? Infinity : 0 }}
        >
          ⏰ {formatTime(timeLeft)}
        </motion.div>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="mb-6"
          variants={questionVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          <motion.h2
            className="text-2xl font-bold text-gray-800 mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {questions[current].text}
          </motion.h2>
          <motion.div className="space-y-3">
            {questions[current].options.map((option, index) => (
              <motion.button
                key={index}
                onClick={() => handleAnswer(index)}
                className={`w-full p-4 text-left border-2 rounded-lg ${
                  answers[current] === index
                    ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
                variants={optionVariants}
                initial="hidden"
                animate="visible"
                custom={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <motion.div
        className="flex justify-between"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <motion.button
          onClick={prev}
          disabled={current === 0}
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: current === 0 ? 1 : 1.05, backgroundColor: current === 0 ? '#e5e7eb' : '#d1d5db' }}
          whileTap={{ scale: 0.95 }}
        >
          ← Previous
        </motion.button>
        {isLast ? (
          <motion.button
            onClick={onSubmit}
            className="px-6 py-2 bg-green-500 text-white rounded-lg shadow-lg"
            whileHover={{ scale: 1.05, backgroundColor: '#16a34a' }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            Submit Quiz
          </motion.button>
        ) : (
          <motion.button
            onClick={next}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-lg"
            whileHover={{ scale: 1.05, backgroundColor: '#2563eb' }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            Next →
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  );
}

export default QuizPage;