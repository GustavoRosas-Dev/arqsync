import React, { useState, useEffect } from "react";

const TypeWriter = ({ words, textColor, fontSize, fontFamily }) => {
  const [currentWord, setCurrentWord] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const startTyping = () => {
      const wordIndex = index % words.length;
      const word = words[wordIndex];

      setCurrentWord((prevWord) => {
        if (prevWord === word) {
          clearInterval(typewriterInterval);
          const timer = setTimeout(() => {
            let interval = setInterval(() => {
              setCurrentWord((prevWord) => {
                const nextWord = prevWord.slice(0, -1);
                if (nextWord === "") {
                  clearInterval(interval);
                  setIndex((prevIndex) => prevIndex + 1);
                }
                return nextWord;
              });
            }, 100);
          }, 1350);
          return prevWord;
        }

        const nextWord = prevWord + word[prevWord.length];
        return nextWord;
      });
    };

    const typewriterInterval = setInterval(startTyping, 140);

    return () => {
      clearInterval(typewriterInterval);
    };
  }, [index, words]);

  return (
    <span
      style={{
        color: textColor,
        fontSize: fontSize,
        fontFamily: fontFamily,
      }}
    >
      {currentWord}
    </span>
  );
};

export default TypeWriter;
