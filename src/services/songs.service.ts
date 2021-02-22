import { DBController } from "../controllers/db.controller";
import Express from "express";
import * as path from "path";

export class SongsService{
    private readonly dataPath: string = path.resolve(__dirname) + '/song.json';
    private readonly urlPath: string = '/songs';
    private readonly controller: DBController;
    
    constructor(app: Express.Express){
        this.controller = new DBController(app, this.dataPath, this.urlPath);
    }
}