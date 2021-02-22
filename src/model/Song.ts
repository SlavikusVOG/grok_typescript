import * as path from "path";
import { Entity } from "./Entity";
import { IEntity } from "./IEntity";

export class Song extends Entity<Song>{
    static readonly dbPath: string = path.resolve(__dirname, "songs");
    constructor(
        private Id: string, 
        private Name: string,
        
        ){
            super(Song.dbPath);
        }
    get id(): string{
        return this.Id;
    }
    get name(): string{
        return this.Name;
    }
}