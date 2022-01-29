import React, { useState, useEffect, useCallback } from 'react';
//import { words } from './assets/words.json';
import Header from './components/Header';
import Footer from './components/Footer';
import Test from './components/Test';
import Results from './components/Results';

interface State {
  currWord: string;
  typedWord: string;
  timer: number;
  timeUp: NodeJS.Timeout | null;
  timeLimit: number;
  typedHistory: string[];
}

const words = [
  'a',
  'able',
  'about',
  'absolute',
  'accept',
  'account',
  'achieve',
  'across',
  'act',
  'active',
  'actual',
  'add',
  'address',
  'admit',
  'advertise',
  'affect',
  'afford',
  'after',
  'afternoon',
  'again',
  'against',
  'age',
  'agent',
  'ago',
  'agree',
  'air',
  'all',
  'allow',
  'almost',
  'along',
  'already',
  'alright',
  'also',
  'although',
  'always',
  'america',
  'amount',
  'and',
  'another',
  'answer',
  'any',
  'apart',
  'apparent',
  'appear',
  'apply',
  'appoint',
  'approach',
  'appropriate',
  'area',
  'argue',
  'arm',
  'around',
  'arrange',
  'art',
  'as',
  'ask',
  'associate',
  'assume',
  'at',
  'attend',
  'authority',
  'available',
  'aware',
  'away',
  'awful',
  'baby',
  'back',
  'bad',
  'bag',
  'balance',
  'ball',
  'bank',
  'bar',
  'base',
  'basis',
  'be',
  'bear',
  'beat',
  'beauty',
  'because',
  'become',
  'bed',
  'before',
  'begin',
  'behind',
  'believe',
  'benefit',
  'best',
  'bet',
  'between',
  'big',
  'bill',
  'birth',
  'bit',
  'black',
  'bloke',
  'blood',
  'blow',
  'blue',
  'board',
  'boat',
  'body',
  'book',
  'both',
  'bother',
  'bottle',
  'bottom',
  'box',
  'boy',
  'break',
  'brief',
  'brilliant',
  'bring',
  'britain',
  'brother',
  'budget',
  'build',
  'bus',
  'business',
  'busy',
  'but',
  'buy',
  'by',
  'cake',
  'call',
  'can',
  'car',
  'card',
  'care',
  'carry',
  'case',
  'cat',
  'catch',
  'cause',
  'cent',
  'centre',
  'certain',
  'chair',
  'chairman',
  'chance',
  'change',
  'chap',
  'character',
  'charge',
  'cheap',
  'check',
  'child',
  'choice',
  'choose',
  'Christ',
  'Christmas',
  'church',
  'city',
  'claim',
  'class',
  'clean',
  'clear',
  'client',
  'clock',
  'close',
  'closes',
  'clothe',
  'club',
  'coffee',
  'cold',
  'colleague',
  'collect',
  'college',
  'colour',
  'come',
  'comment',
  'commit',
  'committee',
  'common',
  'community',
  'company',
  'compare',
  'complete',
  'compute',
  'concern',
  'condition',
  'confer',
  'consider',
  'consult',
  'contact',
  'continue',
  'contract',
  'control',
  'converse',
  'cook',
  'copy',
  'corner',
  'correct',
  'cost',
  'could',
  'council',
  'count',
  'country',
  'county',
  'couple',
  'course',
  'court',
  'cover',
  'create',
  'cross',
  'cup',
  'current',
  'cut',
  'dad',
  'danger',
  'date',
  'day',
  'dead',
  'deal',
  'dear',
  'debate',
  'decide',
  'decision',
  'deep',
  'definite',
  'degree',
  'department',
  'depend',
  'describe',
  'design',
  'detail',
  'develop',
  'die',
  'difference',
  'difficult',
  'dinner',
  'direct',
  'discuss',
  'district',
  'divide',
  'do',
  'doctor',
  'document',
  'dog',
  'door',
  'double',
  'doubt',
  'down',
  'draw',
  'dress',
  'drink',
  'drive',
  'drop',
  'dry',
  'due',
  'during',
  'each',
  'early',
  'east',
  'easy',
  'eat',
  'economy',
  'educate',
  'effect',
  'egg',
  'eight',
  'either',
  'elect',
  'electric',
  'eleven',
  'else',
  'employ',
  'encourage',
  'end',
  'engine',
  'english',
  'enjoy',
  'enough',
  'enter',
  'environment',
  'equal',
  'especial',
  'europe',
  'even',
  'evening',
  'ever',
  'every',
  'evidence',
  'exact',
  'example',
  'except',
  'excuse',
  'exercise',
  'exist',
  'expect',
  'expense',
  'experience',
  'explain',
  'express',
  'extra',
  'eye',
  'face',
  'fact',
  'fair',
  'fall',
  'family',
  'far',
  'farm',
  'fast',
  'father',
  'favour',
  'feed',
  'feel',
  'few',
  'field',
  'fight',
  'figure',
  'file',
  'fill',
  'film',
  'final',
  'finance',
  'find',
  'fine',
  'finish',
  'fire',
  'first',
  'fish',
  'fit',
  'five',
  'flat',
  'floor',
  'fly',
  'follow',
  'food',
  'foot',
  'for',
  'force',
  'forget',
  'form',
  'fortune',
  'forward',
  'four',
  'france',
  'free',
  'friday',
  'friend',
  'from',
  'front',
  'full',
  'fun',
  'function',
  'fund',
  'further',
  'future',
  'game',
  'garden',
  'gas',
  'general',
  'germany',
  'get',
  'girl',
  'give',
  'glass',
  'go',
  'god',
  'good',
  'goodbye',
  'govern',
  'grand',
  'grant',
  'great',
  'green',
  'ground',
  'group',
  'grow',
  'guess',
  'guy',
  'hair',
  'half',
  'hall',
  'hand',
  'hang',
  'happen',
  'happy',
  'hard',
  'hate',
  'have',
  'he',
  'head',
  'health',
  'hear',
  'heart',
  'heat',
  'heavy',
  'hell',
  'help',
  'here',
  'high',
  'history',
  'hit',
  'hold',
  'holiday',
  'home',
  'honest',
  'hope',
  'horse',
  'hospital',
  'hot',
  'hour',
  'house',
  'how',
  'however',
  'hullo',
  'hundred',
  'husband',
  'idea',
  'identify',
  'if',
  'imagine',
  'important',
  'improve',
  'in',
  'include',
  'income',
  'increase',
  'indeed',
  'individual',
  'industry',
  'inform',
  'inside',
  'instead',
  'insure',
  'interest',
  'into',
  'introduce',
  'invest',
  'involve',
  'issue',
  'it',
  'item',
  'jesus',
  'job',
  'join',
  'judge',
  'jump',
  'just',
  'keep',
  'key',
  'kid',
  'kill',
  'kind',
  'king',
  'kitchen',
  'knock',
  'know',
  'labour',
  'lad',
  'lady',
  'land',
  'language',
  'large',
  'last',
  'late',
  'laugh',
  'law',
  'lay',
  'lead',
  'learn',
  'leave',
];

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
      if (timer === 0 && timeUp) {
        clearInterval(timeUp);
        setTimeUp(null);
      }
    }, 1000);
    setTimeUp(intervalId);
  }, [timer, timeUp]);

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
      {timer !== 0 ? (
        <Test
          words={wordList}
          currWord={currWord}
          typedWord={typedWord}
          typedHistory={typedHistory}
          timer={timer}
        />
      ) : (
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
