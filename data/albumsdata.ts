import { DBController } from "../controllers/dbcontroller";

export class AlbumsData{
    private readonly app: any;
    private readonly dataPath = '../data/albums.json';
    private readonly urlPath = '/albums';
    private readonly controller: DBController;
    
    constructor(app: any){
        this.app = app;
        this.controller = new DBController(this.app, this.dataPath, this.urlPath);
    }
}