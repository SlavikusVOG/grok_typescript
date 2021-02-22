import * as path from "path";
import { Award } from "./awards.enum";

export class Album{
    static readonly dbPath: string = path.resolve(__dirname, "albums");
    private zeroPad = (num: number, place: number) => String(num).padStart(place, '0');
    constructor(
        private _id: string, 
        private _albumName: string,
        private release_date: Date,
        private number_of_issued_copies: number,
        private removal_backet: number,
        private number_of_songs: number,
        private _awards?: Award[],
        private _img_src_src?: string
        ){}
    get id(){
        return this._id;
    }
    set img_src_src(albumIndex: any){
        this._img_src_src = `imgs/img${this.zeroPad(albumIndex, 4)}`
    }

    get img_src_src(){
        return this._img_src_src;
    }

    get albumName(){
        return this._albumName;
    }

    get awards(){
        return this._awards;
    }
}