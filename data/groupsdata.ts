import { DBController } from "../controllers/dbcontroller";
import Express from "express";
import path from "path";

export class GroupsData{
    private readonly dataPath: string = path.resolve(__dirname) + '/data.json';
    private readonly urlPath: string = '/groups';
    private readonly controller: DBController;
    
    constructor(app: Express.Express){
        this.controller = new DBController(app, this.dataPath, this.urlPath);
    }
}