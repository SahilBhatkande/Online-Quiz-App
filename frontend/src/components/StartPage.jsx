import { motion } from 'framer-motion';

function StartPage({ onStart }) {
  return (
    <motion.div
      className="relative bg-gradient-to-br from-white via-blue-50 to-indigo-100 rounded-2xl shadow-2xl p-10 text-center border border-gray-200 overflow-hidden"
      initial={{ scale: 0.8, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500 rounded-full"></div>
        <div className="absolute top-20 right-20 w-16 h-16 bg-purple-500 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-indigo-500 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-pink-500 rounded-full"></div>
      </div>

      <motion.div
        className="relative z-10 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <motion.div
          className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
          whileHover={{ rotate: 360, scale: 1.1 }}
        >
          <motion.svg
            className="w-12 h-12 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.8, duration: 1.5 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </motion.svg>
        </motion.div>

        <motion.h1
          className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, type: 'spring' }}
        >
          Online Quiz
        </motion.h1>

        <motion.div
          className="flex justify-center space-x-2 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {['🧠', '⚡', '🎯', '🏆'].map((emoji, index) => (
            <motion.span
              key={index}
              className="text-2xl"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                delay: 1 + index * 0.1,
                type: 'spring',
                stiffness: 300
              }}
              whileHover={{ scale: 1.2, rotate: 10 }}
            >
              {emoji}
            </motion.span>
          ))}
        </motion.div>

        <motion.p
          className="text-lg text-gray-600 max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          Challenge yourself with our interactive quiz! Test your knowledge and see how you rank among others.
        </motion.p>
      </motion.div>

      <motion.button
        onClick={onStart}
        className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold px-10 py-4 rounded-xl shadow-xl hover:shadow-2xl border-2 border-transparent hover:border-white overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        whileHover={{
          scale: 1.05,
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
        }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.span
          className="relative z-10 flex items-center space-x-2"
          whileHover={{ x: 5 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          <span>🚀 Start Quiz</span>
          <motion.svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            initial={{ x: -5, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.6 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </motion.svg>
        </motion.span>

        {/* Button shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
          whileHover={{ opacity: 0.3, x: ['-100%', '100%'] }}
          transition={{ duration: 0.6 }}
        />
      </motion.button>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-20"
          style={{
            top: `${20 + i * 10}%`,
            left: `${10 + i * 15}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </motion.div>
  );
}

export default StartPage;