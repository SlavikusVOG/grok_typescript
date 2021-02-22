import * as path from "path";
import { Style } from "./styles.enum";
import { Country } from "./countries.enum"

export class Group{
    static readonly dbPath: string = path.resolve(__dirname, "groups");
    constructor(
        private Id: string,
        private GroupName: string,
        private musicStyle: Style,                
        private groupCreactionDate: Date,
        private countryOfFoundation: Country
        ){}   
    get id(){
        return this.Id;
    }
    get name(){
        return this.GroupName;
    }
}