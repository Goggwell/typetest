import React from 'react';

interface Props {
  words: string[];
  typedHistory: string[];
  timeLimit: number;
  spaces: number;
  resetTest: React.MouseEventHandler;
}

const Results = (props: Props) => {
  const { words, typedHistory, timeLimit, spaces, resetTest } = props;
  let correctChars = 0;
  const result = typedHistory.map((typedWord, idx) => typedWord === words[idx]);
  result.forEach((r, idx) => {
    if (r) correctChars += words[idx].length;
  });
  const wpm = ((correctChars + spaces) * 60) / timeLimit / 5;

  return (
    <div className='result'>
      <table>
        <tbody>
          <tr>
            <td colSpan={2} align='center'>
              <h1>{Math.round(wpm) + 'wpm'}</h1>
            </td>
          </tr>
          <tr>
            <th>Correct Words:</th>
            <td>{result.filter((x) => x).length}</td>
          </tr>
          <tr className='wrong'>
            <th>Incorrect Words:</th>
            <td>{result.filter((x) => !x).length}</td>
          </tr>
          <tr>
            <td colSpan={2} align='center'>
              <button onClick={resetTest}>Restart</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Results;
