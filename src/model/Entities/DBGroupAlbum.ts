import * as path from "path";

export class DBGroupAlbum{
    static readonly dbPath: string = path.resolve(__dirname, "dbgroupalbum");
    constructor(
        private id: number,
        private _groupId: number,
        private _albumId: number
        ){}
    
    get albumId(){
        return this._albumId;
    }

    get groupId(){
        return this._groupId;
    }
}