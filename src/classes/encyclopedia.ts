import {ReferenceItem} from './reference-item'
import { positiveInteger } from '../decorators';
export default class Encyclopedia extends ReferenceItem {       //we may remove Enciclopedia identificator
    constructor(title: string, year: number, public edition: number) {
      super(title, year);
    }

    private _copies: number;

    get copies() {
      return this._copies;
    }

    @positiveInteger
    set copies(value) {
      this._copies = value;
    }
  
    printCitation(): void {
      console.log('some citation')
    }
    printItem(): void {
      super.printItem();
      console.log(`Edition: ${this.edition}(${this.year})`)
    }
  }