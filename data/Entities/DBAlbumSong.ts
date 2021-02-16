import * as path from "path";

export class DBAlbumSong{
    static readonly dbPath: string = path.resolve(__dirname, "albumsong");
    constructor(
        private id: number,
        private albumIndex: number,
        private songIndex: number
        ){}
}