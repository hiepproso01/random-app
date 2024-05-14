import React, { useState, useEffect } from 'react';

const App = () => {
  const [diceResults, setDiceResults] = useState([null, null, null]);
  const [rolling, setRolling] = useState(false);
  const [resultText, setResultText] = useState('');
  const [userChoice, setUserChoice] = useState('');
  const [choiceMessage, setChoiceMessage] = useState('');

  useEffect(() => {
    let interval;
    if (rolling) {
      interval = setInterval(() => {
        const randomResults = Array.from({ length: 3 }, () => Math.floor(Math.random() * 6) + 1);
        setDiceResults(randomResults);
      }, 10); // 100 milliseconds interval for smoother animation

      setTimeout(() => {
        clearInterval(interval);
        setRolling(false);
      }, 2000); // Stop rolling after 2 seconds
    }
    return () => clearInterval(interval);
  }, [rolling]);

  useEffect(() => {
    if (!rolling && diceResults[0] !== null) {
      const total = diceResults.reduce((sum, value) => sum + value, 0);
      const result = (total >= 11 && total <= 17) ? 'Tài' : 'Xỉu';
      
      setResultText(result);

      if (userChoice) {
        if (userChoice === result) {
          setChoiceMessage('Bạn chọn đúng');
        } else {
          setChoiceMessage('Bạn chọn không đúng');
        }
      }
    }
  }, [rolling, diceResults, userChoice]);

  const rollDice = () => {
    setDiceResults([null, null, null]); // Reset dice results
    setRolling(true); // Start rolling
    setResultText(''); // Reset result text
    setChoiceMessage(''); // Reset choice message
  };

  const handleChoice = (choice) => {
    setUserChoice(choice);
    setChoiceMessage(`Bạn đã chọn ${choice}`);
  };
  const resetGame = () => {
    setDiceResults([null, null, null]);
    setRolling(false);
    setResultText('');
    setUserChoice('');
    setChoiceMessage('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div>{rolling ? 'Rolling...' : 'Press Roll to Start'}</div>
      <div style={{ display: 'flex', flexDirection: 'row', margin: '20px 0' }}>
        {diceResults.map((result, index) => (
          <div key={index} style={{ fontSize: '48px', margin: '0 10px' }}>
            {result !== null ? result : '?'}
          </div>
        ))}
      </div>
      <div style={{ display: rolling ? 'none' : 'block', fontSize: '24px', margin: '10px 0' }}>
        {resultText}
      </div>
      <div style={{ display: rolling ? 'none' : 'block', fontSize: '18px', margin: '10px 0' }}>
        {choiceMessage}
      </div>
      <div>
        <button onClick={rollDice} disabled={rolling}>
          Roll
        </button>
        <button onClick={() => handleChoice('Tài')} disabled={rolling || userChoice === 'Tài'} style={{ marginLeft: '10px' }}>
          Tài
        </button>
        <button onClick={() => handleChoice('Xỉu')} disabled={rolling || userChoice === 'Xỉu'} style={{ marginLeft: '10px' }}>
          Xỉu
        </button>
        <button onClick={resetGame} disabled={rolling} style={{ marginLeft: '10px' }}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default App;
