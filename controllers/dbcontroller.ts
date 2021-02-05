import fs from "fs";
import Express from "express";

export class DBController{
    private readonly app: Express.Express;
    private readonly dataPath: string;
    private readonly urlPath: string;

    constructor(app: Express.Express, dataPath: string, urlPath: string){
        this.app = app;
        this.dataPath = dataPath;
        this.urlPath = urlPath;
    }

    private ReadFile(
        callback: any,
        returnJson: boolean = false,
        filePath: string = this.dataPath,
        encoding: string = 'utf-8'
    ):void{
        fs.readFile(filePath, encoding, (err: any, data: any) =>{
            if(err){
                throw err;
            }
            callback(returnJson ? JSON.parse(data) : data);
        })
    }

    private WriteFile(
        fileData: any,
        callback: any,
        filePath: string = this.dataPath,
        encoding: string = 'utf-8'
    ): void{
        fs.writeFile(filePath, fileData, encoding, (err: any)=>{
            if(err){
                throw err;
            }
            callback();
        })
    }
    //create new record
    Post(): void{
        this.app.post(this.urlPath, (req, res)=>{
            this.ReadFile((data: any)=>{
                const NewGroupId = Object.keys(data).length + 1;

                data[NewGroupId] = req.body.id;

                this.WriteFile(JSON.stringify(data), ()=>{
                    res.status(200).send(data);
                });
            }, true);
        });
    }
    //update record
    Put(){
        this.app.put(this.urlPath, (req, res)=>{
            this.ReadFile((data: any)=>{
                const groupId: string = req.params.id;//TODO: find issue for this situation
                data[groupId] = req.body;
                this.WriteFile(JSON.stringify(data), ()=>{
                    res.status(200).send(data);
                });
            }, true);
        });
    }
    //delete record
    Delete(){
        this.app.delete(this.urlPath, (req, res) =>{
            this.ReadFile((data: any)=>{
                const groupId: string = req.params.id;
                delete data[groupId];
                this.WriteFile(JSON.stringify(data),()=>{
                    res.status(200).send(data);
                })
            },true);
        })
    }
    
    Get(){
        this.app.get(this.urlPath, (req, res)=>{
            this.ReadFile((data: any)=>{
                res.send(data);
            },true);
        })
    }
}