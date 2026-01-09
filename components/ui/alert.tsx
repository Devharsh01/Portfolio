"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, AlertTriangle, Info } from "lucide-react";

export type AlertType = "success" | "warning" | "info" | "error";

export interface AlertProps {
  type: AlertType;
  title?: string;
  message: string;
  isVisible: boolean;
  onClose?: () => void;
  autoClose?: boolean;
  autoCloseDelay?: number;
}

const alertIcons = {
  success: CheckCircle,
  warning: AlertTriangle,
  info: Info,
  error: XCircle,
};

const Alert: React.FC<AlertProps> = ({
  type,
  title,
  message,
  isVisible,
  onClose,
  autoClose = true,
  autoCloseDelay = 3000,
}) => {
  const [islandExpanded, setIslandExpanded] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isVisible) {
      setIslandExpanded(true);

      timer = setTimeout(() => {
        setIslandExpanded(false);

        setTimeout(() => {
          onClose?.();
        }, 500);
      }, autoCloseDelay);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isVisible, autoCloseDelay, onClose]);

  const IconComponent = alertIcons[type];

  const getColors = () => {
    switch (type) {
      case "success":
        return {
          bg: "bg-[#0E1016]/90 border-[#e4ded7]/30 shadow-[#e4ded7]/10",
          iconColor: "text-[#e4ded7]",
          textColor: "text-[#e4ded7]",
        };
      case "error":
        return {
          bg: "bg-[#0E1016]/90 border-[#e4ded7]/30 shadow-[#e4ded7]/10",
          iconColor: "text-red-400",
          textColor: "text-red-300",
        };
      case "warning":
        return {
          bg: "bg-[#0E1016]/90 border-[#e4ded7]/30 shadow-[#e4ded7]/10",
          iconColor: "text-yellow-400",
          textColor: "text-yellow-300",
        };
      case "info":
        return {
          bg: "bg-[#0E1016]/90 border-[#e4ded7]/30 shadow-[#e4ded7]/10",
          iconColor: "text-blue-400",
          textColor: "text-blue-300",
        };
      default:
        return {
          bg: "bg-[#0E1016]/90 border-[#e4ded7]/30 shadow-[#e4ded7]/10",
          iconColor: "text-[#e4ded7]",
          textColor: "text-[#e4ded7]",
        };
    }
  };

  const colors = getColors();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{
            width: "120px",
            height: "40px",
            y: -100,
            x: "-50%",
            borderRadius: "20px",
            opacity: 0,
          }}
          animate={{
            width: islandExpanded ? "300px" : "120px",
            height: islandExpanded ? "60px" : "40px",
            y: islandExpanded ? 30 : 20,
            x: "-50%",
            borderRadius: islandExpanded ? "16px" : "20px",
            opacity: 1,
          }}
          exit={{
            width: "120px",
            height: "40px",
            y: -100,
            opacity: 0,
          }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 300,
          }}
          className={`fixed top-0 left-1/2 z-[60] flex items-center justify-center shadow-2xl backdrop-blur-lg border-2 ${colors.bg}`}
        >
          <AnimatePresence>
            {islandExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3 px-4"
              >
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <IconComponent className={`w-6 h-6 ${colors.iconColor}`} />
                </motion.div>
                <motion.p
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className={`text-sm font-semibold ${colors.textColor}`}
                >
                  {title || message}
                </motion.p>
              </motion.div>
            )}
            {!islandExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center"
              >
                <IconComponent className={`w-5 h-5 ${colors.iconColor}`} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Alert;