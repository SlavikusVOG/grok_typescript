import * as path from "path";

export class DBAlbumSong{
    static readonly dbPath: string = path.resolve(__dirname, "albumsong");
    constructor(
        private id: number,
        private _albumId: number,
        private _songId: number
        ){}

    get albumId(){
        return this._albumId;
    }

    get songId(){
        return this._songId;
    }
}