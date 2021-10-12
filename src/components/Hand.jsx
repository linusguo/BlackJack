import React from 'react';
import { connect } from 'react-redux';
import CardView from './CardView.jsx';
import '../style/Hand.css';
import placeholder from '../assets/placeholder.png';


const Hand = ({ dealer, cards, tabindexbase }) => {
  const handContent =
    cards.length === 0 ?
      <div className='hand'>
        <div>
          <img src={placeholder} tabIndex={tabindexbase+1} alt="Placeholder. No cards dealt yet." />
        </div>
      </div>
    :
      cards.map((card, i) =>
        <div className='hand' key={i} tabIndex={i+tabindexbase+1}>
          <CardView card={card}></CardView>
        </div>)

  if (dealer && cards.length === 2) {
    handContent[0].props.children.props.card.flip = false;
  }

  return (
    <div
      className='hand-container'
      tabIndex={tabindexbase}
      role='contentinfo'
      aria-label={(dealer?'dealer':'player') + ' cards'}>
      {handContent}
    </div>
  )
};

const selectCards = (state, dealer) => {
    if (dealer) return state.dealerCards
    else return state.playerCards
}

const mapStateToProps = (state, ownProps) => ({
  cards: selectCards(state, ownProps.dealer),
});

export default connect(mapStateToProps)(Hand);

