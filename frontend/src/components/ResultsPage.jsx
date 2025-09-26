import { motion } from 'framer-motion';

function ResultsPage({ score, total, results, questions, onRestart }) {
  const percentage = Math.round((score / total) * 100);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
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
        className="text-center mb-8"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div
          className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
        >
          <span className="text-2xl font-bold text-white">{percentage}%</span>
        </motion.div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Quiz Complete!</h1>
        <p className="text-xl text-gray-600">Your Score: <span className="font-semibold text-blue-600">{score} / {total}</span></p>
      </motion.div>

      <motion.div
        className="space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2
          className="text-xl font-semibold text-gray-700 mb-4"
          variants={itemVariants}
        >
          Detailed Results
        </motion.h2>
        {results.map((result, index) => (
          <motion.div
            key={index}
            className={`p-4 rounded-lg border-2 ${
              result.correct
                ? 'border-green-200 bg-green-50'
                : 'border-red-200 bg-red-50'
            }`}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-start space-x-3">
              <motion.div
                className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                  result.correct ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1, type: 'spring' }}
              >
                {result.correct ? '✓' : '✗'}
              </motion.div>
              <div className="flex-1">
                <p className="font-medium text-gray-800 mb-1">{questions[index].text}</p>
                <p className={`text-sm font-medium ${result.correct ? 'text-green-600' : 'text-red-600'}`}>
                  {result.correct ? 'Correct Answer' : 'Incorrect Answer'}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <motion.button
          onClick={onRestart}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg"
          whileHover={{ scale: 1.05, backgroundColor: '#2563eb' }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          Take Quiz Again
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default ResultsPage;