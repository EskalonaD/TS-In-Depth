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


export function writable(isWritable: boolean) {
    return function(target: Object,
        methodName: string,
        descriptor: PropertyDescriptor
        ) {
            console.log(`Method decorator writable with value ${isWritable}`);
            descriptor.writable = isWritable;
            return descriptor; //можно не возвращать, но лектор когда обновлял материал по декораторам встретил практику возвращать дескриптор после изменения!
        }
}

export function timeout (ms: number = 0) {
    return function(target: Object,
        methodName: string,
        descriptor: PropertyDescriptor
        ) {
            console.log(`Method decorator timeot with value ${ms}`);

            const originalMethod = descriptor.value;

            descriptor.value = function(...args: any[]){
                setTimeout(() =>{
                    return originalMethod.apply(this, args) //check return in set Timeout;
                }, ms)
            }
        }
}

export function logParameter(
    target: any,
    methodName: string,
    index: number
    ) {
    const key = `${methodName}_decor_params_indexes`;

    if(Array.isArray(target[key])) {
        target[key].push(index);
    } else {
        target[key] = [index];
    }
}

export function logMethod (
    target: Object,
    methodName: string,
    descriptor: PropertyDescriptor
    ) {
        const originalMethod = descriptor.value;

        descriptor.value = function(...args: any[]) {
            const key = `${methodName}_decor_params_indexes`;
            const indexes = target[key];

            if(Array.isArray(indexes)) {
                args.forEach((arg, i) => {
                    if(indexes.includes(i)) {
                        console.log(`method: ${methodName}, PaaramIndex: ${i}, ParamVAlue: ${arg}`)
                    }
                })
            }

            return originalMethod.apply(this, args); // this should be context of fun descripto.value. if not - reassign it ;
        }
        return descriptor;
}

function makeProperty<T>(
    prototype: any,
    propertyName: string,
    getTransformer: (value: any) => T,
    setTransformer: (value: any) => T
   ) {
    const values = new Map<any, T>();
    Object.defineProperty(prototype, propertyName, {
    set(firstValue: any) {
    Object.defineProperty(this, propertyName, {
    get() {
    if (getTransformer) {
    return getTransformer(values.get(this));
    } else {
    values.get(this);
    }
    },
    set(value: any) {
    if (setTransformer) {
    values.set(this, setTransformer(value));
    } else {
    values.set(this, value);
    }
    },
    enumerable: true
    });
    this[propertyName] = firstValue;
    },
    enumerable: true,
    configurable: true
    }
    )}
   


export function format (pref: string = `mr./ mrs.`) {
    return function(target: any, propertyName: string) {
        makeProperty(target, propertyName, value => `${pref} ${value}`, value => value)
    }
}


export function positiveInteger(
    target: object,
    propertyName: string,
    descriptor: PropertyDescriptor,
) {
    const originalSet = descriptor.set;

    descriptor.set = function(value: number) {
        if(value < 0 || !Number.isInteger(value)) {
            throw new Error(`Invalid value`);
        }

        if(originalSet) {
            originalSet.call(this, value);
        }
    }
    return descriptor;
}