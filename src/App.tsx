import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from 'react';
import { words } from './assets/words.json';
import Header from './components/Header';
import Footer from './components/Footer';
import Results from './components/Results';

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

  const startTimer = useCallback(() => {
    const intervalId = setInterval(() => {
      setTimer(timer - 1);
    }, 1000);
    setTimeUp(intervalId);
  }, [timer]);

  const resetTest = useCallback(() => {
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
  }, [timeLimit, timeUp, wordList]);

  const recordTest = useCallback(
    (e: KeyboardEvent) => {
      if (timer === 0) {
        if (e.key === 'Tab') {
          resetTest();
          e.preventDefault();
        }
        return;
      }
      if (timeUp === null && e.key !== 'Tab') startTimer();
      const currIdx = wordList.indexOf(currWord);
      const currWordEl = document.getElementById('active')!;
      currWordEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const caret = document.getElementById('caret')!;
      caret.classList.remove('blink');
      setTimeout(() => caret?.classList.add('blink'), 500);
      switch (e.key) {
        case 'Tab':
          if (timer !== timeLimit || timeUp) {
            resetTest();
            document.getElementsByClassName('word')[0].scrollIntoView();
          }
          e.preventDefault();
          break;
        case ' ':
          if (typedWord === '') return;
          currWordEl.classList.add(typedWord !== currWord ? 'wrong' : 'right');
          setTypedWord('');
          setCurrWord(wordList[currIdx + 1]);
          setTypedHistory([...typedHistory, typedWord]);
          break;
        case 'Backspace':
          if (
            typedWord.length === 0 &&
            typedHistory[currIdx - 1] !== wordList[currIdx - 1]
          ) {
            setCurrWord(wordList[currIdx - 1]);
            setTypedWord(!e.ctrlKey ? typedHistory[currIdx - 1] : '');
            setTypedHistory(typedHistory.splice(0, typedHistory.length - 1));
            currWordEl.previousElementSibling!.classList.remove(
              'right',
              'wrong'
            );
            if (e.ctrlKey) {
              currWordEl.previousElementSibling!.childNodes.forEach((char) => {
                if (char instanceof HTMLSpanElement)
                  char.classList.remove('wrong', 'right');
              });
            }
          } else {
            if (e.ctrlKey) {
              setTypedWord('');
              currWordEl.childNodes.forEach((char) => {
                if (char instanceof HTMLSpanElement)
                  char.classList.remove('wrong', 'right');
              });
            } else {
              setTypedWord(typedWord.slice(0, typedWord.length - 1));
              let idx = typedWord.length;
              if (idx < currWord.length) {
                currWordEl.children[idx + 1].classList.remove('wrong', 'right');
              }
            }
          }
          break;
        default:
          setTypedWord(typedWord + e.key);
          let idx = typedWord.length - 1;
          currWordEl.children[idx + 1].classList.add(
            currWord[idx] !== typedWord[idx] ? 'wrong' : 'right'
          );
          break;
      }
    },
    [
      resetTest,
      startTimer,
      timeUp,
      timer,
      currWord,
      wordList,
      timeLimit,
      typedHistory,
      typedWord,
    ]
  );

  const changeTimeLimit = (newLimit: number) => {
    setTimeLimit(newLimit);
    resetTest();
  };

  useLayoutEffect(() => {
    if (timer === 0 && timeUp) {
      clearInterval(timeUp);
      setTimeUp(null);
    }
  }, [timer, timeUp]);

  useEffect(() => {
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
  }, [recordTest]);

  return (
    <>
      {!timeUp ? (
        <Header
          changeTimeLimit={(newLimit: number) => changeTimeLimit(newLimit)}
        />
      ) : null}
      {timer !== 0 ? null : (
        <Results
          words={wordList}
          typedHistory={typedHistory}
          timeLimit={timeLimit}
          spaces={wordList.indexOf(currWord)}
          resetTest={() => resetTest()}
        />
      )}
      {!setTimer ? <Footer /> : null}
    </>
  );
};

export default App;
