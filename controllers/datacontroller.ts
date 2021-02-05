export class DataController{
    private readonly app: any;
    private readonly data: any;
    private readonly urlPath: any;

    constructor(app: any, data: any, urlPath: any){
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