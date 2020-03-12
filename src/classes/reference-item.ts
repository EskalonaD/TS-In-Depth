export abstract class ReferenceItem {
    // title: string;
    // year: number;
    // someParam?: any;

    // constructor(newTitle: string, newYear: number, addParam?: any) {
    //   console.log('Creating a new ReferenceItem...');

    //   this.title = newTitle;
    //   this.year = newYear;
    //   if(addParam !== undefined) {

    //     this.someParam = addParam
    //   }
    // }
    private _publisher: string;
    static department: string = 'Classical';


    constructor(public title: string, protected year: number, public addParam?: any) { }


    get publisher(): string {
        return this._publisher.toUpperCase();
    }

    set publisher(newPublisher: string) {
        this._publisher = newPublisher;


    }

    printItem(): void {
        console.log(`${this.title} from ${this.year}`);
        console.log(`Department: ${ReferenceItem.department}`);
    }

    abstract printCitation(): void;
}