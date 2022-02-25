/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import Card from './Card';

export default function Main() {
  const [cardsTheme, setCardsTheme] = useState('galaxy');
  const [staticKey, setStaticKey] = useState(0);
  const [imagesSrc, setImageSrc] = useState([]);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState({ 'current-score': 0, 'best-score': 0 });
  const [cards, setCards] = useState(14);

  const handleScoreReset = () => {
    setScore({ 'current-score': 0, 'best-score': score['best-score'] });
  };
  const handleChildStateReset = () => {
    setStaticKey(staticKey + 1);
  };
  const handleScoreUpdate = () => {
    if (score['current-score'] + 1 > score['best-score']) {
      setScore({ 'current-score': score['current-score'] + 1, 'best-score': score['best-score'] + 1 });
    } else {
      setScore({ 'current-score': score['current-score'] + 1, 'best-score': score['best-score'] });
    }
  };
  const handleCardsShuffle = () => {
    const shuffled = imagesSrc
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
    setImageSrc(shuffled);
  };
  const url = `https://pixabay.com/api/?key=25876679-d5a33d89c7d57aa8868e07a09&q=${cardsTheme}&per_page=${cards}`;

  const fetchImage = async () => {
    const response = await fetch(url);
    const data = await response.json();
    const newImagesArray = [];
    data.hits.map((hit) => newImagesArray.push(hit.webformatURL));
    setImageSrc(newImagesArray);
  };

  const handleCardsChange = () => {
    let cardsInput = Number(document.querySelector('#card-number-input').value);
    if (cardsInput < 3) {
      cardsInput = 3;
    } else if (cardsInput > 30) {
      cardsInput = 30;
    } else if (!cardsInput) {
      cardsInput = cards;
    }
    setCards(cardsInput);
  };

  const handleThemeChange = () => {
    handleCardsChange();
    const newTheme = document.querySelector('#card-theme-input').value;
    setCardsTheme(newTheme);
    handleChildStateReset();
    handleScoreReset();
  };

  const handleThemeKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleThemeChange();
    }
  };

  const handleCardKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleCardsChange();
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchImage();
    setLoading(false);
  }, [cardsTheme, cards]);

  if (loading) {
    return (
      <main>
        <div className="input">
          <label htmlFor="card-theme-input">
            Cards theme
            <input id="card-theme-input" type="text" />
          </label>
          <button onClick={handleThemeChange} type="button" className="btn">Confirm</button>
        </div>
        <div className="cards">
          <h2>Loading</h2>
        </div>
      </main>
    );
  }
  return (
    <main>
      <div className="input">
        <div className="input-wraper theme-input-wraper">
          <input onKeyPress={handleThemeKeyPress} placeholder=" " id="card-theme-input" type="text" />
          <label className="theme-label" htmlFor="card-theme-input">
            Choose Theme
          </label>
        </div>
        <div className="input-wraper card-input-wraper">
          <input defaultValue={cards} min={1} max={30} onKeyPress={handleCardKeyPress} placeholder=" " id="card-number-input" type="number" />
          <label className="cards-label" htmlFor="card-number-input">
            Cards
          </label>
        </div>
        <button onClick={handleThemeChange} type="button" className="btn">Confirm</button>
      </div>
      <div className="result-wraper">
        <div className="current-score">
          Current score:
          {' '}
          {score['current-score']}
        </div>
        <div className="best-score">
          Best score:
          {' '}
          {score['best-score']}
        </div>
      </div>
      <div className="cards">
        {imagesSrc.map((src) => (
          <Card
            handleScoreReset={handleScoreReset}
            handleScoreUpdate={handleScoreUpdate}
            handleCardsShuffle={handleCardsShuffle}
            handleChildStateReset={handleChildStateReset}
            key={staticKey + src}
            imgSrc={src}
          />
        ))}
      </div>
      <a href="https://pixabay.com/">
        Images From Pixabay
      </a>
    </main>
  );
}
