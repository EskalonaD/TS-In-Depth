showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
  const elt = document.getElementById(divName);
  elt.innerText = `Hello from ${name}`;
}
//==================================

enum Category {
 JavaScript,
 CSS,
 HTML,
 TypeScript,
 Angular 
}
function getAllBooks(): readonly /*object[]/**/{ id: number, title: string, author: string, available: boolean, category: Category }[] {
  return <const>[
    { id:1 ,title: 'Refactoring JavaScript', author: 'Evan Burchard', available: true, category: Category.JavaScript},
    { id:2 ,title: 'JavaScript Testing', author: 'Liang Yuxian Eugene', available: false, category: Category.JavaScript },
    { id:3 ,title: 'CSS Secrets', author: 'Lea Verou', available: true, category: Category.CSS },
    { id:4 ,title: 'Mastering JavaScript Object-Oriented Programming', author: 'Andrea Chiarelli', available: true, category: Category.JavaScript }
    ];
}

function logFirstAvailable(books: readonly { title: string, author: string, available: boolean }[] = getAllBooks()): void {
  console.log(books.length, books.reduce((acc, el) => {
    if(acc) return acc;
    if(el.available) return el.title
  },''))
}



function getBookTitlesByCategory(category: Category = Category.JavaScript): string[] {
  const books = getAllBooks();
  const titles: string[] = []; // убираем ошибку any[]

  for( const book of books) {
    if (book.category === category) {
      titles.push(book.title);
    }
  }

  return titles;
}

function logBookTitles(titles: string[]): void {
  titles.forEach( title => console.log(title));
}


function getBookAuthorByIndex(index: number): [string, string] /* tuple*/ {
  const books = getAllBooks();
  const { title, author } = books[index];

  return [title, author];
}

function calcTotalPages(): bigint {
  const data = <const>[
    { lib: 'libName1', books: 1_000_000_000, avgPagesPerBook: 250 },
    { lib: 'libName2', books: 5_000_000_000, avgPagesPerBook: 300 },
    { lib: 'libName3', books: 3_000_000_000, avgPagesPerBook: 280 }
  ];

  const result = data.reduce((acc: bigint, item) => {
    return acc + BigInt(item.books*item.avgPagesPerBook);
  }, BigInt(0))

  return result;
}

function getBookByID (id: number): any {
  const books = getAllBooks();
  return books.find(x => x.id === id);
}

function createCustomerID(name:string, id: number): string {
  return `${id} - ${name}`;
}

function createCustomer( name: string, age?: number, city?: string): void {
  console.log(`Create customer ${name}`);

  if(age) {
    console.log(`Customer Age: ${age}`);
  }

  if (city) {
    console.log(`Customer City: ${city}`);
  }
}

function checkoutBooks( customer: string, ...bookIDs: number[] ): string[] {
  console.log(`checking out books for ${customer}`);
  const titles: string[] = [];

  for (const id of bookIDs) {
    const book = getBookByID(id);

    if( book && book.available) {
      titles.push(book.title);
    }
  }

  return titles;
}

function getTitles(author: string): string[];
function getTitles(available: boolean): string[];
function getTitles(...args: [number, boolean]): string[]; //function getTitles(id: number, available: boolean): string[] //
function getTitles(...args: any[]): string[] {    //not needed???
  const books = getAllBooks();

  if (args.length < 1 || args.length > 2) {
    return [];
  }

  if (args.length === 1) {
    const arg = args[0];
    if(typeof arg === 'string') {
      return books.filter((book: any) => book.author === arg).map(book => book.title); 
  }
    if(typeof arg === 'boolean') {
      return books.filter((book: any) => book.available === arg).map(book => book.title); 


    }
  }

  if(args.length === 2) {
    const [id, available] = args;
    if(typeof id === 'number' && typeof available === 'boolean') {
      return books.filter((book: any) => book.author === available && book.id === id).map((book: any) => book.title); 

    }
  }
}


function assertSringValue(value: any): asserts value is string {
  if (typeof value !== 'string') {
    throw new Error('value should be string');
  }
}

function bookTitleTransform(title: any): string {
  assertSringValue(title);
  return title.split('').reverse().join();
}
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
console.log(bookTitleTransform(12))
