import React from "react";
import { motion } from "framer-motion";

interface AIChatAnimationProps {
  onAnimationComplete?: () => void;
  buttonPosition?: { x: number; y: number } | null;
}

export const AIChatAnimation: React.FC<AIChatAnimationProps> = ({
  onAnimationComplete,
  buttonPosition = null,
}) => {
  // Default position (bottom right) if no button position is provided
  const defaultPosition = {
    x: window.innerWidth - 80,
    y: window.innerHeight - 80,
  };
  const startPosition = buttonPosition || defaultPosition;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="fixed inset-0 bg-[#0E1016]/60 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      />

      <motion.div
        className="bg-[#0E1016]/95 backdrop-blur-xl border border-[#e4ded7]/20 rounded-3xl overflow-hidden shadow-2xl shadow-[#e4ded7]/10 w-full max-w-3xl mx-4 sm:mx-auto"
        initial={{
          position: "fixed",
          top: startPosition.y,
          left: startPosition.x,
          width: "56px",
          height: "56px",
          borderRadius: "28px",
          opacity: 0.5,
        }}
        animate={{
          top: "50%",
          left: "50%",
          x: "-50%",
          y: "-50%",
          width: "100%",
          height: "auto",
          borderRadius: "24px",
          opacity: 1,
        }}
        transition={{
          type: "spring",
          damping: 28,
          stiffness: 280,
          duration: 0.5,
        }}
        onAnimationComplete={onAnimationComplete}
      >
        {/* Placeholder content that fades in after the zoom animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          className="h-[500px] flex flex-col items-center justify-center"
        >
          <motion.div
            className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#e4ded7]/20 to-[#e4ded7]/10 border border-[#e4ded7]/30 flex items-center justify-center shadow-xl shadow-[#e4ded7]/10 mb-6"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 2.5,
              ease: "easeInOut",
            }}
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut",
              }}
              className="text-[#e4ded7] text-4xl font-bold"
            >
              AI
            </motion.div>
          </motion.div>

          <motion.div
            className="text-xl font-semibold text-[#e4ded7] mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            AI Assistant
          </motion.div>

          <motion.div
            className="text-sm text-[#e4ded7]/60 mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Powered by Kimi k2 & Web Search
          </motion.div>

          <motion.div
            className="mt-4 flex space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <motion.div
              className="w-2.5 h-2.5 bg-[#e4ded7]/60 rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                times: [0, 0.5, 1],
              }}
            />
            <motion.div
              className="w-2.5 h-2.5 bg-[#e4ded7]/70 rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                delay: 0.2,
                times: [0, 0.5, 1],
              }}
            />
            <motion.div
              className="w-2.5 h-2.5 bg-[#e4ded7]/80 rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                delay: 0.4,
                times: [0, 0.5, 1],
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default AIChatAnimation;
//           >
//             <div className="flex space-x-2">
//               <div
//                 className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
//                 style={{ animationDelay: "0ms" }}
//               ></div>
//               <div
//                 className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce"
//                 style={{ animationDelay: "150ms" }}
//               ></div>
//               <div
//                 className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"
//                 style={{ animationDelay: "300ms" }}
//               ></div>
//             </div>
//           </motion.div>
//         </motion.div>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default AIChatAnimation;
