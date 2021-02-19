import * as path from "path";
import { Style } from "./styles.enum";
import { Country } from "./countries.enum"

export class Group{
    static readonly dbPath: string = path.resolve(__dirname, "groups");
    constructor(
        private _id: number,
        private _groupName: string,
        private musicStyle: Style,                
        private groupCreactionDate: Date,
        private countryOfFoundation: Country
        ){}   
    get id(){
        return this._id;
    }
    get name(){
        return this._groupName;
    }
}