import * as path from "path";

export class Song{
    static readonly dbPath: string = path.resolve(__dirname, "songs");
    constructor(
        private _id: number, 
        private name: string
        ){}
    get id(): number{
        return this._id
    }
}