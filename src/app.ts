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
function getAllBooks()/*: Array<{ title: string, author: string, available: boolean, category: Category }> */{
  return <const>[
    { title: 'Refactoring JavaScript', author: 'Evan Burchard', available: true, category: Category.JavaScript},
    { title: 'JavaScript Testing', author: 'Liang Yuxian Eugene', available: false, category: Category.JavaScript },
    { title: 'CSS Secrets', author: 'Lea Verou', available: true, category: Category.CSS },
    { title: 'Mastering JavaScript Object-Oriented Programming', author: 'Andrea Chiarelli', available: true, category: Category.JavaScript }
    ];
}

function logFirstAvailable(books: readonly { title: string, author: string, available: boolean }[]): void {
  console.log(books.length, books.reduce((acc, el) => {
    if(acc) return acc;
    if(el.available) return el.title
  },''))
}



function getBookTitlesByCategory(category: Category): string[] {
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

function calcTotalPages()/*: bigint*/ {
  const data = [
    { lib: 'libName1', books: 1_000_000_000, avgPagesPerBook: 250 },
    { lib: 'libName2', books: 5_000_000_000, avgPagesPerBook: 300 },
    { lib: 'libName3', books: 3_000_000_000, avgPagesPerBook: 280 }
  ];

  const result = data.reduce((acc: bigint, item) => {
    return acc + BigInt(item.books*item.avgPagesPerBook);
  }, BigInt(0))

  return result;
}
//=====================================

logFirstAvailable(getAllBooks());
logBookTitles(getBookTitlesByCategory(Category.JavaScript));
console.log(getBookAuthorByIndex(1));
console.log(calcTotalPages());

