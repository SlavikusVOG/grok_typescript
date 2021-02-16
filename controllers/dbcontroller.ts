import * as fs from "fs";
import Express from "express";

export class DBController{
    private readonly app: Express.Express;
    private readonly dataPath: string;
    private readonly urlPath: string;

    constructor(app: Express.Express, dataPath: string, urlPath: string){
        this.app = app;
        this.dataPath = dataPath;
        this.urlPath = urlPath;
        app.post(this.urlPath, (req, res)=>{
            this.ReadFile((data: any)=>{
                const NewGroupId = Object.keys(data).length + 1;

                data[NewGroupId] = req.body.id;

                this.WriteFile(JSON.stringify(data), ()=>{
                    res.status(200).send(data);
                });
            }, true);
        });

        app.put(this.urlPath, (req, res)=>{
            this.ReadFile((data: any)=>{
                const groupId: string = req.params.id;//TODO: find issue for this situation
                data[groupId] = req.body;
                this.WriteFile(JSON.stringify(data), ()=>{
                    res.status(200).send(data);
                });
            }, true);
        });

        app.delete(this.urlPath, (req, res) =>{
            this.ReadFile((data: any)=>{
                const groupId: string = req.params.id;
                delete data[groupId];
                this.WriteFile(JSON.stringify(data),()=>{
                    res.status(200).send(data);
                })
            },true);
        })

        this.app.get(this.urlPath, (req, res)=>{
            this.ReadFile((data: any)=>{
                res.send(data);
            },true);
        })
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
}