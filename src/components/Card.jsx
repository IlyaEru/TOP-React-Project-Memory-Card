import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function Card({
  imgSrc,
  handleScoreReset,
  handleScoreUpdate,
  handleCardsShuffle,
  handleChildStateReset,
}) {
  const [beenClicked, setBeenClicked] = useState(false);
  const handleImgClick = () => {
    if (beenClicked === false) {
      setBeenClicked(true);
      handleScoreUpdate();
    } else {
      handleScoreReset();
      handleChildStateReset();
    }
    handleCardsShuffle();
  };
  return (
    <div role="button" tabIndex={0} onKeyUp={handleImgClick} onClick={handleImgClick} className="card">
      <img className="card-img" src={imgSrc} alt="card" />
    </div>
  );
}
Card.propTypes = {
  // eslint-disable-next-line react/require-default-props
  imgSrc: PropTypes.string,
  handleScoreUpdate: PropTypes.func.isRequired,
  handleScoreReset: PropTypes.func.isRequired,
  handleCardsShuffle: PropTypes.func.isRequired,
  handleChildStateReset: PropTypes.func.isRequired,
};
