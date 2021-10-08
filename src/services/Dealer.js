import { Subject, from, timer, zip } from "rxjs";
import { concat } from "rxjs/operators";
import { suits, faces } from './CardValues.js';
import Card from './Card.js';

export default class Dealer {
  constructor() {
    this.deck = [];
    this.freshDeck();
  }

  // Generate a fresh shuffled deck of cards
  freshDeck() {
    // Distribute cards between player and dealer, string 'p' or 'd'
    this.distrubution$ = new Subject();
    // A boolean that control when the distribution begins
    this.trigger$ = new Subject();
    this.deck = this.shuffle(
      suits.map(s =>
        faces.map(f =>
          new Card(s, f)
          )
        ).reduce((acc, list) =>
          acc.concat(list)
        )
      );
    // Flip the first card
    this.deck[1].flip = true;

    this.deal$ = this.trigger$.pipe(concat(
      zip(
        timer(1000, 1000),
        zip(
          this.distrubution$,
          from(this.deck)
        )
      )
    ));
  }

  deal() {
    this.trigger$.next(true);
    // End the sequence
    this.trigger$.complete();
    // Deal the cards
    this.distrubution$.next('p');
    this.distrubution$.next('d');
    this.distrubution$.next('p');
    this.distrubution$.next('d');
  }

  // Hit button event handler
  hit() {
    this.distrubution$.next('p');
  }

  // Deal button event handler
  dealToDealer() {
    this.distrubution$.next('d');
  }

  // Create a shuffle of an array
  shuffle(array) {
    let currentInd = array.length, temp, randInd;
    while (0 !== currentInd) {
      randInd = Math.floor(Math.random() * currentInd);
      currentInd--;
      temp = array[currentInd];
      array[currentInd] = array[randInd];
      array[randInd] = temp;
    }
    return array;
  }
}
