import { Category } from "./enums";
import { Book, Logger as DamageLogger, Librarian, Author, Magazine } from './interfaces';
import { ReferenceItem, UniversityLibrarian, RefBook, Shelf} from './classes';
import {PersonBook, BookRequiredFields, UpdatedBook, CreateCutsomerFunctionType } from './types';
// import {purge } fr
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
  purge,
  getBooksByCategory,
  logCategorySearch,
  getBooksByCategoryPromise,
  logSearchResults,
  } from './functions';

showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
  const elt = document.getElementById(divName);
  elt.innerText = `Hello from ${name}`;
}


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
// console.log(bookTitleTransform(12)); //return error. should be recommented for learning

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


//task 07-01
const inventory: Book[] =[ 
  { id: 10, title: 'The C Programming Language', author: 'K & R', available: true, category: Category.Software }, 
  { id: 11, title: 'Code Complete', author: 'Steve McConnell', available: true, category: Category.Software }, 
  { id: 12, title: '8-Bit Graphics with Cobol', author: 'A. B.', available: true, category: Category.Software }, 
  { id: 13, title: 'Cool autoexec.bat Scripts!', author: 'C. D.', available: true, category: Category.Software } 
  ];

  // console.log(purge(inventory));
  // console.log(purge([1,2,3,4, '']))


  // task 07.02

  const bookShelf: Shelf<Book> = new Shelf<Book>(); //первый тип можно поустить или в классе опустить (тогда возьмет из типа переменной)

  inventory.forEach(book => bookShelf.add(book));

  const firstBook = bookShelf.getFirst();

  console.log(firstBook);

  const magazines: Magazine[] = [ { title: 'Programming Language Monthly', publisher: 'Code Mags' },     { title: 'Literary Fiction Quarterly', publisher: 'College Press' },     { title: 'Five Points', publisher: 'GSU' } ];

const magazineShelf = new Shelf();
magazines.forEach(mag => magazineShelf.add(mag));

const firstMag = magazineShelf.getFirst();  //unknown should add generic type;
console.log(firstMag);


// task07/03

magazineShelf.printTitle();

const result = magazineShelf.find('Five Points')
console.log(result);


//task 07/04

const book1: BookRequiredFields = {
  id: 1,
  title: 'title',
  available: true,
  author: 'author',
  category: Category.CSS,
  pages: 300,
  markedDamaged: null,
  markedDamaged1: null,
}

const updatedBook: UpdatedBook = {};

const params: Parameters<CreateCutsomerFunctionType> = [' string', 1];  //tuple?!
// const p: Parameters<typeof createCustomer> = [' string', 1] // varian investigate

createCustomer(...params);
// createCustomer(...p);


// task 08/01

const o = new UniversityLibrarian();
console.log(o)


//task 08/02

const fLibrarian = new UniversityLibrarian();
fLibrarian.name = 'Anna'; //age is unavailable cause of decorator; cannot find property;

(o as any).printLibrarian();
o['printLibrarian']();

//08.03

const fLibrarian1 = new UniversityLibrarian();
fLibrarian1.assistFaculty = null;
// fLibrarian1.teachComunity = null;  //should be false check why its wrong... however its work on regular code... why it's not seen as a mistake?!   techniclal comment. should be recommented for learning


//08.04

const refBook2 = new RefBook('title', 20202, 10)
refBook2.printItem()


//08.05

const o1 = new UniversityLibrarian();
o1.name = 'anna';

o.assistCustomer('boris');


//08.06

const o2 = new UniversityLibrarian();

o2.name = 'Anna;'

o2.assistCustomer('boris');
console.log(o2.name);


//task08.07

const refBook4 = new RefBook('title', 2020, 10);
refBook4.copies = 10;
// refBook.copies = -10;   // should throw an exception; techniclal comment. should be recommented for learning


// task 09.01

console.log('begin')
getBooksByCategory(Category.JavaScript, logCategorySearch);
getBooksByCategory(Category.Software, logCategorySearch);
console.log('end');


// task 09.02
console.log('begin')
getBooksByCategoryPromise(Category.JavaScript,)
  .then(titles => {
    console.log(titles)
    return titles.length
  })
  .then(numberOfBooks => console.log(numberOfBooks));
getBooksByCategoryPromise(Category.Software,)
  .catch(err => console.log(`err ${err}`));
console.log('end');


//09.03

console.log('begin')
logSearchResults(Category.JavaScript,)
  .catch(err => console.log(err));  // don't need to use try catch inside async-func we can use promise.prot.catch
console.log('end');

