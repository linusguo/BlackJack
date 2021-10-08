// A class to control the game flow
import Dealer from './Dealer.js';

const RESTART_WAIT = 3000;
const MESSAGE_WAIT = 1000;

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

  hit() {
    this.dealer.hit();
  }

  setUpSubscription() {
    this.dealer.deal$.subscribe(c => {
      // Every time an item is received from deal$
      // make sure it's a card(an array) not a trigger
      if (Array.isArray(c)) {
        let card = c[1][1];
        let receiver = c[1][0];
        // If the dealer gets a card
        if (receiver === 'd') {
          this._dealerCards.push(card);
          // Check ace
          if (card.value === 1) {
            this.dealerHasAce = true;
          }
          this.dealerScore += card.value;
          // Check if dealer should hit
          if (this.dealerShouldHit()) {
            setTimeout(() => {
              this.dealer.dealToDealer();
            }, MESSAGE_WAIT);
          // Check if the player stays
          } else if (this.playerStays) {
            this.dealerStays = true;
            // Calculate the result
            this.calculateGameState();
          }
        // If player gets a cards
        } else if (receiver === 'p') {
          this._playerCards.push(card);
          // Check ace
          if (card.value === 1) {
            this.playerHasAce = true;
          }
          this.playerScore += card.value;
        }
        // Check if someone has the blackjack
        if (this.blackjack()) {
          this.gameState = 'Blackjack';
        }
        // Check if someone busts
        if (this.bust()) {
          this.gameState = 'Bust';
        }
        // Calculate the result
        this.calculateGameState();
      }
    })
  }

  // Initialize the game status at the beginning
  setup() {
    this.playerScore = 0;
    this.dealerScore = 0;
    this.playerHasAce = false;
    this.dealerHasAce = false;
    this.playerStays = false;
    this.dealerStays = false;
    this.gameState = 'Start';
    this.setUpSubscription();
  }
}
