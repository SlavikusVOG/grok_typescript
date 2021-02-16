import { DBController } from "../controllers/dbcontroller";
import Express from "express";
import * as path from "path";

export class AlbumsData{
    private readonly dataPath = path.resolve(__dirname) + '/data.json';
    private readonly urlPath = '/albums';
    private readonly controller: DBController;
    
    constructor(app: Express.Express){
        this.controller = new DBController(app, this.dataPath, this.urlPath);
    }
}