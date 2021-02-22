import * as path from "path";

export class DBGroupAlbum{
    static readonly dbPath: string = path.resolve(__dirname, "dbgroupalbum");
    constructor(
        private id: string,
        private GroupId: string,
        private AlbumId: string
        ){}
    
    get albumId(){
        return this.AlbumId;
    }

    get groupId(){
        return this.GroupId;
    }
}