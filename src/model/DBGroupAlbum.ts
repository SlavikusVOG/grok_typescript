import * as path from "path";
import { Entity } from "./Entity";
import { IEntity } from "./IEntity";

export class DBGroupAlbum extends Entity<DBGroupAlbum>{
    static readonly dbPath: string = path.resolve(__dirname, "dbgroupalbum");
    constructor(
        private id: string,
        private GroupId: string,
        private AlbumId: string
        ){
            super(DBGroupAlbum.dbPath);
        }
    
    get albumId(){
        return this.AlbumId;
    }

    get groupId(){
        return this.GroupId;
    }
}