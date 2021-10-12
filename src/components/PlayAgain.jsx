import React from 'react';
import { connect } from 'react-redux';
import '../style/ButtonPanel.css';
import '../style/PlayAgain.css';

 const PlayAgain = ({  gc, status, tabindexbase  }) => {
   if (status === 'Win' || status === 'Lose' || status === 'Tie') {
    return (
      <div>
        <button type="button" onClick={() => {gc.playAgain()}}  className="playAgain" tabIndex={tabindexbase+1}>
          <strong>PLAY AGAIN</strong>
        </button>
      </div>
    )
   } else {
     return (
       <div className="playAgainPlaceholder"></div>
     )
   }
 };

const mapStateToProps = state => ({
  status: state.status,
});

export default connect(mapStateToProps)(PlayAgain)
