import { DBController } from "../controllers/dbcontroller";
import Express from "express";
import * as path from "path";

export class SongsData{
    private readonly dataPath: string = path.resolve(__dirname) + '/data.json';
    private readonly urlPath: string = '/songs';
    private readonly controller: DBController;
    
    constructor(app: any){
        this.controller = new DBController(app, this.dataPath, this.urlPath);
    }
}