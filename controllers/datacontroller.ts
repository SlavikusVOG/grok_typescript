import * as Express from "express";

export class DataController{
    private readonly app: Express.Express;
    private readonly data: any;
    private readonly urlPath: string;

    constructor(app: Express.Express, data: any, urlPath: string){
        this.app = app;
        this.data = data;
        this.urlPath = urlPath;
    }

    Get(){
        this.app.get(this.urlPath, (req: any, res: any)=>{
            res.send(this.data);
        });
    }
}