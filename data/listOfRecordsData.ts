import { DBController } from "../controllers/dbcontroller";
import Express from "express";
import * as path from "path";

export class ListOfRecordsData{
    private readonly dataPath: string = path.resolve(__dirname) + '/data.json';
    private readonly urlPath: string = '/listOfRecords';
    private readonly controller: DBController;
    
    constructor(app: Express.Express){
        this.controller = new DBController(app, this.dataPath, this.urlPath);
    }
}