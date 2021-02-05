import { DBController } from "../controllers/dbcontroller"

export class GroupsData{
    private readonly app: any;
    private readonly dataPath: string = '../data/groups.json';
    private readonly urlPath: string = '/groups';
    private readonly controller: DBController;
    
    constructor(app: any){
        this.app = app;
        this.controller = new DBController(this.app, this.dataPath, this.urlPath);
    }
}