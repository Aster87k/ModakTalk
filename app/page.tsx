"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Background from "./components/Background";
import QuestionCard from "./components/QuestionCard";
import SplashScreen from "./components/SplashScreen";

export default function Home() {
  const [questions, setQuestions] = useState<string[]>([]);
  const [showSplash, setShowSplash] = useState(true);
  const [showCard, setShowCard] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [prevQuestionIndexes, setPrevQuestionIndexes] = useState<Array<number>>(
    []
  );
  const [questionCardLoading, setQuestionCardLoading] =
    useState<boolean>(false);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  const getRandomIndex = () => {
    return Math.floor(Math.random() * questions.length);
  };

  const wrapProgressBar = (cb = () => {}) => {
    return () => {
      setQuestionCardLoading(true);
      cb();
      setTimeout(() => {
        setQuestionCardLoading(false);
      }, 500);
    };
  };

  const handleShowQuestion = () => {
    const randomIndex = getRandomIndex();
    const question = questions[randomIndex];
    prevQuestionIndexes.push(randomIndex);
    setPrevQuestionIndexes([...prevQuestionIndexes]);
    setCurrentQuestion(question);
    setShowCard(true);
  };

  const handleCloseCard = () => {
    setShowCard(false);
  };

  // 1 2 3 4 5 ...
  // 5를 보고 있을때는 top이 5, 이전이 4
  // 이 상태에서 이전버튼을 누르면 5 pop, 4
  // 이전 질문을 가져오고, 삭제하는 알고리즘

  const handleClickPrev = () => {
    //    let prevIndex = prevQuestionIndexes.at(-1) || -1;
    // 만약 이전 버튼을 눌렀을때, 현재 보여지고 있는 질문이 이미 prev question stack에 들어간 상태라면
    // if (currentQuestion === questions[prevIndex])
    //   prevIndex = prevQuestionIndexes.pop() || -1;
    //prevIndex = prevQuestionIndexes.pop() || -1;

    prevQuestionIndexes.pop();

    let prevIndex = prevQuestionIndexes.at(-1) || -1;

    if (prevQuestionIndexes.length === 0) {
      setCurrentQuestion("이전 질문을 모두 확인하였습니다.");
    } else setCurrentQuestion(questions[prevIndex]);

    setPrevQuestionIndexes([...prevQuestionIndexes]);
  };

  const handleClickCreateQuestion = () => {
    const randomIndex = getRandomIndex();
    const question = questions[randomIndex];
    setCurrentQuestion(question);
    prevQuestionIndexes.push(randomIndex);
    setPrevQuestionIndexes([...prevQuestionIndexes]);
  };

  useEffect(() => {
    const loadText = async () => {
      try {
        const response = await fetch("/questions.txt");
        const content = await response.text();
        const jsonQuestionArray = content
          .split("\n")
          .map((line) => line.trim());
        setQuestions(jsonQuestionArray || []);
      } catch (error) {
        alert("질문 목록을 불러오는데 실패했습니다:");
        console.log(error);
      }
    };

    loadText();
  }, []);

  return (
    <main className="min-h-screen flex justify-center">
      <Background />
      <AnimatePresence>
        {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
      </AnimatePresence>
      <div className="absolute flex flex-col items-center justify-end min-h-screen p-4 pb-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 1 }}
        >
          <h1 className="text-4xl font-bold text-yellow-100 mb-8 text-center">
            도란도란 모닥톡
          </h1>
          <p className="text-lg text-yellow-200 mb-8 text-center">
            주변 사람들과 함께, 길었던 24년을 되돌아보고, 25년에 대해 이야기 해
            보세요!
          </p>
          <div className="flex place-content-center">
            <motion.button
              className="bg-yellow-700 text-yellow-100 px-6 py-3 rounded-full text-xl font-semibold hover:bg-yellow-800 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={wrapProgressBar(handleShowQuestion)}
            >
              질문지 보기
            </motion.button>
          </div>
        </motion.div>
      </div>
      <AnimatePresence>
        {showCard && (
          <QuestionCard
            question={currentQuestion}
            onClose={handleCloseCard}
            onPrev={wrapProgressBar(handleClickPrev)}
            onCreateQuestion={wrapProgressBar(handleClickCreateQuestion)}
            isLoading={questionCardLoading}
            isDisablePrev={prevQuestionIndexes.length === 0}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
