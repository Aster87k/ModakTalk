"use client";

import React, { useEffect, useState } from "react";

interface TreeStylePropsType {
  left: string;
  width: string;
  height: string;
  opacity: number;
}
const Background: React.FC = () => {
  const [treeStyles, setTreeStyles] = useState<TreeStylePropsType[]>([]);
  useEffect(() => {
    setTreeStyles(
      [...Array(28)].map(() => ({
        left: `${Math.random() * 100}%`,
        width: `${20 + Math.random() * 30}px`,
        height: `${100 + Math.random() * 150}px`,
        opacity: 0.8 + Math.random() * 0.2,
      }))
    );
  }, []);
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-green-900 to-green-800 overflow-hidden">
      {/* Trees */}
      <div className="absolute bottom-0 left-0 right-0 h-2/3">
        {treeStyles.map((style: TreeStylePropsType, i: number) => (
          <div
            key={i}
            className="absolute bottom-0 bg-green-800 rounded-t-full"
            style={style}
          />
        ))}
      </div>
      {/* Campfire */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <div className="relative w-32 h-32">
          {/* Logs */}
          <div className="absolute bottom-0 left-1/4 w-12 h-4 bg-yellow-900 rounded-full transform -rotate-45" />
          <div className="absolute bottom-0 right-1/4 w-12 h-4 bg-yellow-900 rounded-full transform rotate-45" />
          {/* Flames */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
            <div className="w-16 h-16 bg-orange-500 rounded-full opacity-75 animate-pulse" />
            <div
              className="absolute bottom-1/2 left-1/2 w-12 h-12 bg-yellow-500 rounded-full opacity-75 animate-pulse"
              style={{ animationDelay: "0.1s" }}
            />
            <div
              className="absolute bottom-1/2 left-1/2 w-8 h-8 bg-red-500 rounded-full opacity-75 animate-pulse"
              style={{ animationDelay: "0.2s" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Background;
