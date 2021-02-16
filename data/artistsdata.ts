import { DBController } from "../controllers/dbcontroller";
import Express from "express";
import * as path from "path";

export class ArtistsData{
    private readonly dataPath = path.resolve(__dirname) + '/artists.json';
    private readonly urlPath = '/artists';
    private readonly dbController: DBController;

    constructor(app: Express.Express){
        this.dbController = new DBController(app, this.dataPath, this.urlPath);        
    }
}