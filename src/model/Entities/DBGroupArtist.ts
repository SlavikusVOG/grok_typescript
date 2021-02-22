import * as path from "path";

export class DBGroupArtist{
    static readonly dbPath: string = path.resolve(__dirname, "dbgroupartist");
    constructor(
        private id: number,
        private groupIndex: number,
        private artistsIndex: number
        ){}
}