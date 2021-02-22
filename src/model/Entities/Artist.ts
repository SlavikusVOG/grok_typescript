import * as path from "path";
import { Award } from "./awards.enum";
import { Country } from "./countries.enum";

export class Artist{
    static readonly dbPath: string = path.resolve(__dirname, "artists");
    constructor(
        private _id: number,
        private roleInTheGroup: string,
        private artistName: string,
        private dateOfBirth: Date,
        private countryOfBirth: Country,
        private award: Award
        ){}
    get id(): number{
        return this._id;
    }
}