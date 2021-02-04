import { DBController } from "../controllers/dbcontroller"

export class GroupsData{
    private readonly dataPath: string = '../data/groups.json';
    private readonly urlPath: string = '/groups';
    private readonly controller: DBController;
    private readonly app: any;
    
    constructor(app: any){
        this.controller = new DBController(app, this.dataPath, this.urlPath);
    }
}