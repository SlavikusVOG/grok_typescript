import path from "path";
import { IEntity } from "./IEntity";

export abstract class Entity<T extends IEntity> implements IEntity{
    readonly dbPath: string;

    constructor(dbPath: string){
        this.dbPath = dbPath;
    }
}