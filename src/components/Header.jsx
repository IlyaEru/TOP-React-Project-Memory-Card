import React, { useState } from 'react';
import xImg from '../img/x.svg';

export default function Header() {
  const [showRules, setShowRules] = useState(false);
  const handleRules = () => {
    setShowRules(!showRules);
  };
  return (
    <header className="header">
      <h1 className="hero">Custom Memory Game</h1>
      <button onClick={handleRules} className="btn rules-btn" type="button">Rules</button>
      {showRules && (
        <div tabIndex={0} role="button" onKeyUp={handleRules} onClick={handleRules} className="rules">
          <div className="rules-content">
            <button onClick={handleRules} type="button" className="btn close-rules-btn">
              <img src={xImg} alt="close-rules" />
            </button>
            Get points by clicking on an Image but don&apos;t click on any more than once!
          </div>
        </div>
      )}
    </header>
  );
}
