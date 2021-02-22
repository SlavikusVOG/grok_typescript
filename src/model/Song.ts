import * as path from "path";

export class Song{
    static readonly dbPath: string = path.resolve(__dirname, "songs");
    constructor(
        private Id: string, 
        private Name: string
        ){}
    get id(): string{
        return this.Id;
    }
    get name(): string{
        return this.Name;
    }
}