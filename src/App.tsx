import React, { useState, useEffect, useLayoutEffect } from 'react';
import { words } from './assets/words.json';
import './App.scss';

interface State {
  currWord: string;
  typedWord: string;
  timer: number;
  timeUp: NodeJS.Timeout | null;
  timeLimit: number;
  typedHistory: string[];
}

const App = () => {
  const wordList = words.sort(() => Math.random() - 0.5);

  const [currWord, setCurrWord] = useState<State['currWord']>(wordList[0]);
  const [typedWord, setTypedWord] = useState<State['typedWord']>('');
  const [timer, setTimer] = useState<State['timer']>(60);
  const [timeUp, setTimeUp] = useState<State['timeUp']>(null);
  const [timeLimit, setTimeLimit] = useState<State['timeLimit']>(60);
  const [typedHistory, setTypedHistory] = useState<State['typedHistory']>([]);

  useLayoutEffect(() => {
    if (timer === 0 && timeUp) {
      clearInterval(timeUp);
      setTimeUp(null);
    }
  }, [timer, timeUp]);

  useEffect(() => {
    const startTimer = () => {
      const intervalId = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      setTimeUp(intervalId);
    };

    const recordTest = (e: KeyboardEvent) => {
      if (timer === 0) {
        if (e.key === 'Tab') {
          resetTest();
          e.preventDefault();
        }
        return;
      }
      if (timeUp === null && e.key !== 'Tab') startTimer();
    };

    const resetTest = () => {
      document
        .querySelectorAll('.wrong, .right')
        .forEach((el) => el.classList.remove('wrong', 'right'));
      if (timeUp) {
        clearInterval(timeUp);
      }
      setTimer(timeLimit);
      setCurrWord(wordList[0]);
      setTypedWord('');
      setTimeUp(null);
      setTypedHistory([]);
    };

    const time = parseInt(localStorage.getItem('time') || '60', 10);
    setTimer(time);
    setTimeLimit(time);
    window.onkeydown = (e) => {
      if (e.key.length === 1 || e.key === 'Backspace' || e.key === 'Tab')
        recordTest(e);
    };

    return () => {
      window.onkeydown = null;
    };
  }, [timeUp, timer, timeLimit, wordList]);

  return <></>;
};

export default App;
