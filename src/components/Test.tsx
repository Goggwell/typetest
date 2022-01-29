import React from 'react';

interface Props {
  typedWord: string;
  currWord: string;
  timer: number;
  typedHistory: string[];
  words: string[];
}

const Test = (props: Props) => {
  const { typedWord, currWord, timer, typedHistory, words } = props;
  let extraLetters = typedWord.slice(currWord.length).split('');

  return (
    <div className='test'>
      <div className='timer'>{timer}</div>
      <div className='box'>
        {words.map((word, idx) => {
          return (
            <div
              key={word + idx}
              className='word'
              id={currWord === word ? 'active' : undefined}
            >
              {currWord === word ? (
                <span
                  id='caret'
                  className='blink'
                  style={{
                    left: typedWord.length * 14.8533,
                  }}
                >
                  |
                </span>
              ) : null}
              {word.split('').map((char, charId) => {
                return <span key={char + charId}>{char}</span>;
              })}
              {currWord === word
                ? extraLetters.map((char, charId) => {
                    return (
                      <span key={char + charId} className='wrong extra'>
                        {char}
                      </span>
                    );
                  })
                : typedHistory[idx]
                ? typedHistory[idx]
                    .slice(words[idx].length)
                    .split('')
                    .map((char, charId) => {
                      return (
                        <span key={char + charId} className='wrong extra'>
                          {char}
                        </span>
                      );
                    })
                : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Test;