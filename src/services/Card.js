// A class for card object
export default class Card {
  constructor(suit, face) {
    this._suit = suit;
    this._face = face;
    this._flip = false;
  }
  // Return the suit of the card
  get suit() {
    return this._suit;
  }
  // Return the face of the card
  get face() {
    return this._face;
  }
  // Return the flip status of the card
  get flip() {
    return this._flip;
  }
  // Toggle the flip of the card
  set flip(f) {
    this._flip = f;
  }
  // Return the value of the card
  get value() {
    return (this.face === 'king' ||
            this.face === 'queen' ||
            this.face === 'jack') ? 10 : Number(this.face);
  }
}
