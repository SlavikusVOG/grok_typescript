import fs from "fs";

export class ServerUpload{
    private readonly app: any;
    private readonly dirname: string = '../imgs';
    constructor(app: any){
        this.app = app;
    }

    Post(){
        this.app.post('/upload', async (req: any,res: any)=>{
            try{
                if(!req.files){
                    res.send({
                        status: false,
                        message: "No file uploaded"
                    });
                }else{
                    let file = req.files.upload;
                    
                    //Use the mv() method to place the file in upload
                    file.mv(`${this.dirname}/` + file.name);
                    
                    //send response
                    res.send({
                        status: "server",
                        message: "File is uploaded",
                        data:{
                            name: file.name,
                            mimetype: file.mimetype,
                            size: file.size
                        }
                    });
                }
            }catch(err){
                res.status(500).send(err);
            }
        });
    }

    Get(){
        this.app.get('/upload', (req: any, res: any)=>{
            const files = fs.readdirSync(`${this.dirname}`);
            res.send(files);
        })
    }
}