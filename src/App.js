import React from 'react';
import './App.css';
import Hand from './components/Hand.jsx';
import ButtonPanel from './components/ButtonPanel.jsx';

//Temporarily import Card
import Card from './services/Card.js'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      dealerCards: [new Card('heart', 'queen')],
      playerCards: [new Card('spade', '5'), new Card('heart', '10')]
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">

          <Hand
            dealer={true}
            cards={this.state.dealerCards}
          />

          <ButtonPanel
          // will need a property to connect it with the
          // controller's functionality
          />

          <Hand
            dealer={false}
            cards={this.state.playerCards}
          />

        </header>
      </div>
    );
  }
}

export default App;
