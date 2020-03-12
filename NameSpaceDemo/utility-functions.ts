namespace Utility {
    export namespace Fees{
        export function calculateFee(daysLate: number): number {
            return daysLate * 0.25;
        } 
    }

    export function maxBooksAllowed(age: number): number {
        return age < 12 ? 3: 10;
    }

    function privateFunction(): void {
        console.log('This is private')
    }
}