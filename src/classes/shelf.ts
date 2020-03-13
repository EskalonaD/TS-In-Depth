import { ShelfItem } from "../interfaces";

// import
export default class Shelf<T extends ShelfItem> {
    private _items: Array<T> = [];

    add(item: T): void {
        this._items.push(item);
    }

    getFirst(): T {
        return this._items[0];
    }

    find(title: string): T {
        return this._items.find(el => el.title === title) //при просто Т ошибка. у дженерика не обязательно есть тайтл. like an object type
    }

    printTitle(): void {
        this._items.forEach(el => console.log(el.title));
    }
}