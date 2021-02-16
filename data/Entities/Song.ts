import * as path from "path";

export class Song{
    static readonly dbPath: string = path.resolve(__dirname, "songs");
    constructor(
        private _id: number, 
        private _name: string
        ){}
    get id(): number{
        return this._id;
    }
    get name(): string{
        return this._name;
    }
}