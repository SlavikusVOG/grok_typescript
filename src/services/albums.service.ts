import { DBController } from "../controllers/db.controller";
import Express from "express";
import * as path from "path";

export class AlbumsService{
    private readonly dataPath = path.resolve(__dirname) + '/ablums.json';
    private readonly urlPath = '/albums';
    private readonly controller: DBController;
    
    constructor(app: Express.Express){
        this.controller = new DBController(app, this.dataPath, this.urlPath);
    }
}