import { Category } from "./enums";
import { Book, Logger as DamageLogger, Librarian, Author } from './interfaces';
import { ReferenceItem, UniversityLibrarian, RefBook} from './classes';
import {PersonBook } from './types';
import {
  getAllBooks,
  getBookAuthorByIndex,
  getBookByID,
  getBookProp,
  getBookTitlesByCategory,
  getTitles,
  logBookTitles,
  logFirstAvailable,
  calcTotalPages,
  createCustomer,
  createCustomerID,
  checkoutBooks,
  bookTitleTransform,
  printBook,
  } from './functions';
// import RefBook from './classes/encyclopedia';
// imoprt { Category}

showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
  const elt = document.getElementById(divName);
  elt.innerText = `Hello from ${name}`;
}
//==================================






//=====================================================




//=====================================








//=====================================

logFirstAvailable(getAllBooks());
logBookTitles(getBookTitlesByCategory(Category.JavaScript));
console.log(getBookAuthorByIndex(1));
console.log(calcTotalPages());

//task 03.01

// const titles = getBookTitlesByCategory(Category.JavaScript);

// titles.forEach((x: string, index: number) => console.log(x));

const book = getBookByID(1);
console.log(book);



//task 03.02
const myID: string = createCustomerID('ann', 10);
console.log(myID);

let idGenerator: (name:string, id: number) => string = (name, id) => `${id} - ${name}`;

idGenerator = createCustomerID;

console.log(idGenerator('boris', 20));

//task 03.03

createCustomer('ann');
createCustomer('bores', 45);
createCustomer('clara', 45, 'kiev');

console.log(getBookTitlesByCategory())
console.log(logFirstAvailable());


const myBooks: string[] = checkoutBooks('ann', 1,2,4);
console.log(myBooks);
//task 03.04

const checkedOutBooks: string[] = getTitles(false);

console.log(checkedOutBooks);

//task 03.05

console.log(bookTitleTransform(getAllBooks()[0].title));
console.log(bookTitleTransform(12));

//task 04.01

const myBook = {    //int. Book can't be assaigned;
  id: 5,
  title: 'Colors, Backgrounds, and Gradients',
  author: 'Eric A. Meyer',
  available: true,
  category: Category.CSS,
  year: 2015,
  copies: 4,
  pages: 200,
  markedDamaged(reason) { console.log('damaged cause of ' + reason)}
}

printBook(myBook);

myBook.markedDamaged('missing back cover');

// task 04.02

const logDamage: DamageLogger = (reason) => console.log('damaged');

const favouriteAuthor1: Author = {
  name: 'anna',
  email: 'anna@gmail.com',
  numBooksPublished: 5,
}

const favouriteAuthor: Librarian = {
  name: 'boris',
  email: 'boris@gmail.com',
  department: 'Classical Literature',
  assistCustomer: null
}

// task 04.04

const offer: any = {
  book: {
    title: 'Essential typescript'
  }
};

console.log(offer.book?.magazine?.getType())


let a: 'name'; // can be only 'name'


// task 04.05

console.log(getBookProp(getAllBooks()[0], 'title'))
console.log(getBookProp(getAllBooks()[0], 'markedDamaged'))
// console.log(getBookProp(getAllBooks()[0], 'isbn'))       //error


//task 05.01 

// const ref = new ReferenceItem('myTitle', 2020);
// console.log(ref);
// ref.printItem();
// ref.publisher = 'my publisher';
// console.log(ref.publisher);

//task 05.02

const refBook = new RefBook('Title', 20202, 10);
console.log(refBook);
refBook.printItem();

refBook.publisher = 'abc';
console.log(refBook.publisher);

// task 05.03

const refBook1 = new RefBook('Title', 2020, 10);

refBook1.printCitation();
console.log(refBook1);

// task 05.04
const favouriteLibrarian: Librarian = new UniversityLibrarian();
console.log(favouriteLibrarian);

favouriteLibrarian.name='Anna';
favouriteLibrarian.assistCustomer('Boris');

//task 05.05

const personBook: PersonBook = {
  name: 'string',
  email: 'email',
  id: 1,
  title: 'title',
  available: true,
  category: Category.CSS,
  author: 'author',
}

console.log(personBook);

// task 06/05

import('./classes').then(module =>{
  const reader = new module.Reader();
  console.log(reader);
  reader.name = 'anna';
  reader.take(getAllBooks()[0]);
  console.log(reader.name)
})