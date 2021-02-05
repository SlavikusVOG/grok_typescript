import { DBController } from "../controllers/dbcontroller"

export class ListOfRecordsData{
    private readonly app: any;
    private readonly dataPath: string = '../data/listOfRecords.json';
    private readonly urlPath: string = '/listOfRecords';
    private readonly controller: DBController;
    
    constructor(app: any){
        this.app = app;
        this.controller = new DBController(this.app, this.dataPath, this.urlPath);
    }
}