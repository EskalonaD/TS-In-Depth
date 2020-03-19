import * as Interfaces from '../interfaces';
import { sealed, logger, writable, logMethod, logParameter, format } from '../decorators';


@logger
@sealed('UniversityLibrarian')
export class UniversityLibrarian implements Interfaces.Librarian {
    department: string;
    // assistCustomer;
    email: string;

    @format()
    name: string;

    @logMethod
    assistCustomer(@logParameter custname: string): void {
        console.log(`${this.name} is assisiting ${custname}`)
    }

    @writable(true)
    assistFaculty() {
        console.log('Assisting Faculty');
    }

    @writable(false)
    teachComunity() {
        console.log('Taching comunity')
    }
}