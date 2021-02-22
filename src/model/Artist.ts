import * as path from "path";
import { Award } from "./awards.enum";
import { Country } from "./countries.enum";
import { Entity } from "./Entity";
import { IEntity } from "./IEntity";

export class Artist extends Entity<Artist>{
    static readonly dbPath: string = path.resolve(__dirname, "artists")
    constructor(
        private Id: string,
        private roleInTheGroup: string,
        private artistName: string,
        private dateOfBirth: Date,
        private countryOfBirth: Country,
        private award: Award
        ){
            super(Artist.dbPath);
        }
    get id(): string{
        return this.Id;
    }
}