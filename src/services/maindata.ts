import { DBController } from "../controllers/db.controller"
import Express from "express";
import * as path from "path";

export class MainService{
    private readonly dataPath: string = path.resolve(__dirname, '..', 'model') + '/data.json';
    private readonly urlPath: string = '/maindata';
    private readonly controller: DBController;
    
    constructor(app: Express.Express){
        this.controller = new DBController(app, this.dataPath, this.urlPath);
    }
}