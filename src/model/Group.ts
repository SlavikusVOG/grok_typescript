import * as path from "path";
import { Style } from "./styles.enum";
import { Country } from "./countries.enum"
import { IEntity } from "./IEntity";
import { Entity } from "./Entity";

export class Group extends Entity<Group>{
    static readonly dbPath: string = path.resolve(__dirname, "groups");
    constructor(
        private Id: string,
        private GroupName: string,
        private musicStyle: Style,                
        private groupCreactionDate: Date,
        private countryOfFoundation: Country
        ){
            super(Group.dbPath);
        }   
    get id(){
        return this.Id;
    }
    get name(){
        return this.GroupName;
    }
}