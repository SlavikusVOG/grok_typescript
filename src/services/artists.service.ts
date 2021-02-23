import { DBController } from "../controllers/db.controller";
import Express from "express";
import * as path from "path";

export class ArtistsService{
    private readonly dataPath = path.resolve(__dirname, '..', 'model') + '/artists.json';
    private readonly urlPath = '/artists';
    private readonly dbController: DBController;

    constructor(app: Express.Express){
        this.dbController = new DBController(app, this.dataPath, this.urlPath);        
    }
}