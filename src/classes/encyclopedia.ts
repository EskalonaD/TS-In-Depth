import {ReferenceItem} from './reference-item'
export default class Encyclopedia extends ReferenceItem {       //we may remove Enciclopedia identificator
    constructor(title: string, year: number, public edition: number) {
      super(title, year);
    }
  
    printCitation(): void {
      console.log('some citation')
    }
    printItem(): void {
      super.printItem();
      console.log(`Edition: ${this.edition}(${this.year})`)
    }
  }