// A component to display a collection of card views
import React from 'react';
import CardView from './CardView.jsx';
import '../style/Hand.css';
// import placeholder from '../assets/placeholder.png';

export default function Hand({ dealer, cards }) {
  // Create a collection of divs that hold CardView components
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
