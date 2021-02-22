import * as path from "path";

export class DBAlbumSong{
    static readonly dbPath: string = path.resolve(__dirname, "albumsong");
    constructor(
        private id: string,
        private _albumId: string,
        private _songId: string
        ){}

    get albumId(){
        return this._albumId;
    }

    get songId(){
        return this._songId;
    }
}