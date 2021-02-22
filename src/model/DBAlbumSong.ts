import * as path from "path";
import { Entity } from "./Entity";
import { IEntity } from "./IEntity";

export class DBAlbumSong extends Entity<DBAlbumSong>{
    static readonly dbPath: string = path.resolve(__dirname, "albumsong");
    constructor(
        private id: string,
        private AlbumId: string,
        private SongId: string
        ){
            super(DBAlbumSong.dbPath);
        }

    get albumId(){
        return this.AlbumId;
    }

    get songId(){
        return this.SongId;
    }
}