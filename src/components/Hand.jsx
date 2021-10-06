import React from 'react';
import CardView from './CardView.jsx';
import '../style/Hand.css';
// import placeholder from '../assets/placeholder.png';

export default function Hand({ dealer, cards }) {
  const handContent =
    cards.map((card, i) =>
      <div className='hand' key={i}>
        <CardView card={card}></CardView>
      </div>
    )

  return (
    <div className='hand-container'>
      { handContent }
    </div>
  )
}