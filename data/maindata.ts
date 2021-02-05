import { DBController } from "../controllers/dbcontroller"

export class MainData{
    private readonly app: any;
    private readonly dataPath: string = '../data/maindata.json';
    private readonly urlPath: string = '/maindata';
    private readonly controller: DBController;
    
    constructor(app: any){
        this.app = app;
        this.controller = new DBController(this.app, this.dataPath, this.urlPath);
    }
}