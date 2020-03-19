import { Book, libMgrCallback,  } from './interfaces';
import { BookProperties, BookOrUndefined } from './types';
import { Category } from './enums'

export function getAllBooks(): readonly /*object[]/**//*{ id: number, title: string, author: string, available: boolean, category: Category }[] */ Book[] {
  return <const>[
    { id:1 ,title: 'Refactoring JavaScript', author: 'Evan Burchard', available: true, category: Category.JavaScript},
    { id:2 ,title: 'JavaScript Testing', author: 'Liang Yuxian Eugene', available: false, category: Category.JavaScript },
    { id:3 ,title: 'CSS Secrets', author: 'Lea Verou', available: true, category: Category.CSS },
    { id:4 ,title: 'Mastering JavaScript Object-Oriented Programming', author: 'Andrea Chiarelli', available: true, category: Category.JavaScript }
    ];
}

export function logFirstAvailable(books: readonly { title: string, author: string, available: boolean }[] = getAllBooks()): void {
  console.log(books.length, books.reduce((acc, el) => {
    if(acc) return acc;
    if(el.available) return el.title
  },''))
}



export function getBookTitlesByCategory(category: Category = Category.JavaScript): string[] {
  const books = getAllBooks();
  const titles: string[] = []; // убираем ошибку any[]

  for( const book of books) {
    if (book.category === category) {
      titles.push(book.title);
    }
  }

  return titles;
}

export function logBookTitles(titles: string[]): void {
  titles.forEach( title => console.log(title));
}


export function getBookAuthorByIndex(index: number): [string, string] /* tuple*/ {
  const books = getAllBooks();
  const { title, author } = books[index];

  return [title, author];
}

export function calcTotalPages(): bigint {
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

export function getBookByID (id: number): BookOrUndefined {
  const books = getAllBooks();
  return books.find(x => x.id === id);
}

export function createCustomerID(name:string, id: number): string {
  return `${id} - ${name}`;
}

export function createCustomer( name: string, age?: number, city?: string): void {
  console.log(`Create customer ${name}`);

  if(age) {
    console.log(`Customer Age: ${age}`);
  }

  if (city) {
    console.log(`Customer City: ${city}`);
  }
}

export function checkoutBooks( customer: string, ...bookIDs: number[] ): string[] {
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

export function getTitles(author: string): string[];
export function getTitles(available: boolean): string[];
export function getTitles(...args: [number, boolean]): string[]; //function getTitles(id: number, available: boolean): string[] //
export function getTitles(...args: any[]): string[] {    //not needed???
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


export function assertSringValue(value: any): asserts value is string {
  if (typeof value !== 'string') {
    throw new Error('value should be string');
  }
}

export function bookTitleTransform(title: any): string {
  assertSringValue(title);
  return title.split('').reverse().join();
}

export function printBook(book: Book): void {
  const phrase = `${book.title} by ${book.author}`;
  console.log(phrase);
}

export function getBookProp( book: Book, prop: BookProperties) {
  if( typeof book[prop] === 'function') {
    return (book[prop] as Function).name;
  }

  return book[prop];
}


export function purge<T> (inventory: Array<T>): Array<T> {
  return inventory.slice(2);
}


export function getBooksByCategory(category: Category, callback: libMgrCallback): void{
  setTimeout(() => {
    try {
      const titles: string[] = getBookTitlesByCategory(category);
      if(titles.length > 0) {
        callback(null, titles);
      } else {
        throw new Error('no books Found')
      }
    }
    catch (error) {
      callback(error, null);
    }
  }, 2000)
}

export function logCategorySearch(err: Error, titles: string[]): void { //for funcExpression we may use interface libMgr
  if(err) {
    console.log(`err.msg: ${err.message}`)

  } else {
    console.log(titles);
  }
}

export function getBooksByCategoryPromise(category: Category,): Promise<string[]>{
  return new Promise<string[]>(
    (resolve, reject) => {
      setTimeout(() => {
        const titles: string[] = getBookTitlesByCategory(category);
          
          if(titles.length > 0) {
            resolve(titles);
          } else {
            reject('no books Found')
          }
        }
      , 2000)

    }
  );
  
  

}


export async function logSearchResults(category: Category): Promise<any> { //as async-func actually void
  const numberOfBooks = await getBooksByCategoryPromise(category); //await return not promise bu it result
  console.log(numberOfBooks.length);
}
