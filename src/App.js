import React from 'react';
import './App.css';
import GameManager from './components/GameManager';


export default class App extends React.Component {
  constructor() {
    super();
    this.mounted = false;
  }

  componentDidMount() {
    this.mounted = true;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 tabIndex="0">
            Blackjack!
          </h1>
        </header>
        <GameManager />
      </div>
    );
  }
}
