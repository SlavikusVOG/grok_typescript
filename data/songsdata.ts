import { DBController } from "../controllers/dbcontroller"

export class SongsData{
    private readonly app: any;
    private readonly dataPath: string = '../data/songs.json';
    private readonly urlPath: string = '/songs';
    private readonly controller: DBController;
    
    constructor(app: any){
        this.app = app;
        this.controller = new DBController(this.app, this.dataPath, this.urlPath);
    }
}