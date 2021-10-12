import React from 'react';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import { suits, faces } from '../services/CardValues.js';

const images = {}
suits.forEach(suit => {
  faces.forEach(face => {
    images[`./${face}_${suit}.png`] = require(`../assets/png/1x/${face}_${suit}.png`);
  })
})

const cardBack = require('../assets/png/1x/back-blue.png');

const CardView = ({ card:{face, suit, flip} }) => {
  const readface = face === '1'? 'ace' : face;
  return (
    <Flippy isFlipped={flip} >
      <FrontSide>
        <img src={images[`./${face}_${suit}.png`]} alt={`${readface} of ${suit}`} />
      </FrontSide>
      <BackSide>
        <img src={cardBack} alt="" />
      </BackSide>
    </Flippy>
  )
  };

export default CardView;