import React, { useState, useEffect } from "react";

const LoadingDots = ({ className }) => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setDots((prev) => (prev.length >= 5 ? "" : prev + "."));
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return <p className={className}>Loading{dots}</p>;
};

export default LoadingDots;
