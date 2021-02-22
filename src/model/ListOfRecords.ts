import * as path from "path";
import { Entity } from "./Entity";
import { IEntity } from "./IEntity";

export class ListOfRecords extends Entity<ListOfRecords>{
    static readonly dbPath: string = path.resolve(__dirname, "listOfRecords");
    constructor(
        private id: string,
        private albumId: string,
    ){
        super(ListOfRecords.dbPath);
    }
}