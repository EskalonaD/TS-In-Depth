import { Category } from "./enums";


interface Book {
    id: number;
    title: string;
    author: string;
    available: boolean;
    category: Category;
    pages?: number;
    // markedDamaged?: (reason: string) => void;   //function interface possible
    markedDamaged?: DamageLogger;
    markedDamaged1?(reason1: string): void;     //function interface unavailable;
};

interface DamageLogger {
    (reason: string): void
}

interface Person {
    name: string;
    email: string;
}

interface Author extends Person {
    numBooksPublished: number;
}

interface Librarian extends Person {
    department: string,
    assistCustomer: any,
}

interface Magazine {
    title: string;
    publisher: string;
}


interface ShelfItem{
    title: string;
}


interface libMgrCallback {
    (err: Error, titles: string[]) : void;
}

export { Book, libMgrCallback, DamageLogger as Logger, Person, Author, Librarian, Magazine, ShelfItem }
