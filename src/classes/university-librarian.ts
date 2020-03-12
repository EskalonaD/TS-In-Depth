import * as Interfaces from '../interfaces';
export class UniversityLibrarian implements Interfaces.Librarian {
    department;
    // assistCustomer;
    email;
    name;
    assistCustomer(custname: string): void {
        console.log(`${this.name} is assisiting custname`)
    }
}