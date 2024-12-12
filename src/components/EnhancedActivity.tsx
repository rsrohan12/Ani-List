import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LoginTimeProps {
  loginTime: string | null;
  pickQuery: string | null;
}

export default function EnhancedActivity({ loginTime, pickQuery }: LoginTimeProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex items-center space-x-4 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 max-w-sm mx-auto"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 10 }}
          className="h-3 w-3 rounded-full bg-green-500"
        />
        <div className="flex-1 space-y-1">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Logged in at:
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-xs font-semibold text-blue-600 dark:text-blue-400"
          >
            {loginTime || "2 hours ago"}
          </motion.p>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex items-center space-x-4 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 max-w-sm mx-auto"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 10 }}
          className="h-3 w-3 rounded-full bg-green-500"
        />
        <div className="flex-1 space-y-1">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Recent search by you:
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-xs font-semibold text-blue-600 dark:text-blue-400"
          >
            {pickQuery || "No search results"}
          </motion.p>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex items-center space-x-4 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 max-w-sm mx-auto"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 10 }}
          className="h-3 w-3 rounded-full bg-green-500"
        />
        <div className="flex-1 space-y-1">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Updated your profile picture
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-xs font-semibold text-blue-600 dark:text-blue-400"
          >
            Nothing changed
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}

