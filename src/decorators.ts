export function sealed(param: string) {
    return function(constructor: Function): void {
        console.log(`sealing the constructor ${param}`);
        console.log(constructor);
        console.log(constructor.prototype);
        Object.seal(constructor);
        Object.seal(constructor.prototype);

    }
}


export function logger<TFunction extends Function>(target: TFunction): TFunction {
    const newConstructor: Function = function() {
        console.log('creating new instance')
        console.log(target);

        this.age = 30;
    }

    newConstructor.prototype = Object.create(target.prototype);
    newConstructor.prototype.constructor = newConstructor //циклическая ссылка - коммон апроач


    newConstructor.prototype.printLibrarian = function() {
        console.log(`librarian name: ${this.name}< Librarian age: ${this.age}`)

    }
    return newConstructor as TFunction;
}