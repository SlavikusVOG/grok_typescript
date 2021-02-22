import * as path from "path";

export class DBGroupArtist{
    static readonly dbPath: string = path.resolve(__dirname, "dbgroupartist");
    constructor(
        private id: string,
        private groupIndex: string,
        private artistsIndex: string 
        ){}
}