import React, { useState, useLayoutEffect } from 'react';
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

export const App = () => {
  const wordList = words.sort(() => Math.random() - 0.5);

  const [currWord, setCurrWord] = useState<State['currWord']>(words[0]);
  const [typedWord, setTypedWord] = useState<State['typedWord']>('');
  const [timer, setTimer] = useState<State['timer']>(60);
  const [timeUp, setTimeUp] = useState<State['timeUp']>(null);
  const [timeLimit, setTimeLimit] = useState<State['timeLimit']>(60);
  const [typedHistory, setTypedHistory] = useState<State['typedHistory']>([]);

  const startTimer = () => {
    const intervalId = setInterval(() => {
      setTimer(timer - 1);
    }, 1000);
    setTimeUp(intervalId);
  };

  const recordTest = (e: KeyboardEvent) => {
    if (timer === 0) {
      if (e.key === 'Tab') {
        e.preventDefault();
      }
      return;
    }
    if (timeUp === null && e.key !== 'Tab') startTimer();
  };

  useLayoutEffect(() => {
    if (timer === 0 && timeUp) {
      clearInterval(timeUp);
      setTimeUp(null);
    }
  }, [timer, timeUp]);

  return <></>;
};
