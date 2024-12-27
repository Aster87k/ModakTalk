import React from "react";
import { motion } from "framer-motion";
import LoadingDots from "./LoadingDot";

interface QuestionCardProps {
  question: string;
  onCreateQuestion: () => void;
  onClose: () => void;
  onPrev: () => void;
  isLoading: boolean;
  isDisablePrev: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question = "질문을 찾을 수 없습니다.",
  onCreateQuestion = () => {},
  onPrev = () => {},
  isLoading = false,
  isDisablePrev = false,
  onClose,
}) => {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-yellow-100 rounded-lg p-6 m-4 max-w-md h-md w-full border-4 border-yellow-700 flex flex-col"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <h2 className="text-xl font-semibold mb-4 text-yellow-900">
            질문 카드
          </h2>
        </div>
        {isLoading ? (
          <LoadingDots className="text-yellow-800 mb-6 min-h-16" />
        ) : (
          <p className="text-yellow-800 mb-6 min-h-16">{question}</p>
        )}
        <div className="flex justify-end gap-1">
          <button
            className={
              isDisablePrev
                ? "bg-yellow-700 text-yellow-100 px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-grey-300"
                : "bg-yellow-700 text-yellow-100 px-4 py-2 rounded hover:bg-yellow-800 transition-colors"
            }
            onClick={isDisablePrev ? undefined : onPrev}
            disabled={isDisablePrev}
          >
            이전
          </button>
          <button
            className="bg-yellow-700 text-yellow-100 px-4 py-2 rounded hover:bg-yellow-800 transition-colors"
            onClick={onCreateQuestion}
          >
            새 질문
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default QuestionCard;
