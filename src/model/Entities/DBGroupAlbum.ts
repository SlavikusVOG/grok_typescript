import * as path from "path";

export class DBGroupAlbum{
    static readonly dbPath: string = path.resolve(__dirname, "dbgroupalbum");
    constructor(
        private id: string,
        private _groupId: string,
        private _albumId: string
        ){}
    
    get albumId(){
        return this._albumId;
    }

    get groupId(){
        return this._groupId;
    }
}