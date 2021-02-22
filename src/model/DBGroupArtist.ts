import * as path from "path";
import { Entity } from "./Entity";
import { IEntity } from "./IEntity";

export class DBGroupArtist extends Entity<DBGroupArtist>{
    static readonly dbPath: string = path.resolve(__dirname, "dbgroupartist");
    constructor(
        private id: string,
        private groupIndex: string,
        private artistsIndex: string 
        ){
            super(DBGroupArtist.dbPath);
        }
}