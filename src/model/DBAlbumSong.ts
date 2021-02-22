import * as path from "path";

export class DBAlbumSong{
    static readonly dbPath: string = path.resolve(__dirname, "albumsong");
    constructor(
        private id: string,
        private AlbumId: string,
        private SongId: string
        ){}

    get albumId(){
        return this.AlbumId;
    }

    get songId(){
        return this.SongId;
    }
}