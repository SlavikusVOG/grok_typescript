import { DBController } from "../controllers/db.controller";
import Express from "express";
import * as path from "path";

export class GroupsService{
    private readonly dataPath: string = path.resolve(__dirname, '..', 'model') + '/groups.json';
    private readonly urlPath: string = '/groups';
    private readonly controller: DBController;
    
    constructor(app: Express.Express){
        this.controller = new DBController(app, this.dataPath, this.urlPath);
    }
}