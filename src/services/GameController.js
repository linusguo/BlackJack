// A class to control the game flow
import Dealer from './Dealer.js';

export default class GameController {
  constructor(app) {
    this.app = app;
    // Use underscore to indicate that the attribute is private
    this._playerCards = [];
    this._dealerCards = [];
    this.dealer = new Dealer();
    this.setup();
  }

  get gameState() {
    return this._gameState;
  }

  set gameState(s) {
    this._gameState = s;
  }

  deal() {
    this.gameState = 'Dealing';
    this.app.setState({});
    this.dealer.deal();
  }

  // Initialize the game status at the beginning
  setup() {
    this.playerScore = 0;
    this.dealerScore = 0;
    this.playerHasAce = false;
    this.dealerhasAce = false;
    this.playerStays = false;
    this.dealerStays = false;
    this.gameState = 'Start';
  }
}
