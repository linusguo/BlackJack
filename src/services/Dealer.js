import { Subject, from, timer, zip } from 'rxjs';
import { concat } from 'rxjs/operators';
import { suits, faces } from './CardValues.js';
import Card from './Card.js';

export default class Dealer {
  constructor() {
    this.deck = [];
    this.freshDeck();
  }

  freshDeck() {
    this.distribution$ = new Subject(); // strings: 'p' or 'd'
    this.trigger$ = new Subject(); // booleans

    this.deck = this.shuffle(
      suits.map(s =>
        faces.map(f =>
          new Card(s, f)
          )
        ).reduce((acc, list) =>
          acc.concat(list)
        )
      );

    this.deck[1].flip = true;


    this.deal$ = this.trigger$.pipe(concat(
      zip(
        timer(1000, 1000),
        zip(
          this.distribution$,
          from(this.deck)
          )
        )
      )
    )
  }

  deal() {
    this.trigger$.next(true);
    this.trigger$.complete();

    this.distribution$.next('p');
    this.distribution$.next('d');
    this.distribution$.next('p');
    this.distribution$.next('d');
  }

  hit() {
    this.distribution$.next('p');
  }

  dealToDealer() {
    this.distribution$.next('d');
  }

  shuffle(array) {
    let currentInd = array.length, temp, randInd;
    while ( 0 !== currentInd ) {
      randInd = Math.floor(Math.random() * currentInd);
      currentInd--;
      temp = array[currentInd];
      array[currentInd] = array[randInd];
      array[randInd] = temp;
    }
    return array;
  }
}