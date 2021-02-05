import { DBController } from "../controllers/dbcontroller";

export class ArtistsData{
    private readonly app: any;
    private readonly dataPath = '../data/artists.json';
    private readonly urlPath = '/artists';
    private readonly dbController: DBController;

    constructor(app: any){
        this.app = app;
        this.dbController = new DBController(this.app, this.dataPath, this.urlPath);        
    }
}