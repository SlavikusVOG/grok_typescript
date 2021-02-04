import Path from 'path'
import BodyParser from 'body-parser';
import FileUpload from 'express-fileupload';
import Cors from 'cors';
import Express from 'express';
import fs from 'fs';

import { DB } from "../data/db";
import { Grok_Random } from "../data/grok_random";
import { AppData } from "../data/appdata";

const app = Express();
// const PORT: number = 8000;
// app.get('/', (req, res) => res.send('Express + Typescript server'));
// app.listen(PORT, ()=>{
//     console.log(`[server]: Server is running at https://localhost:${PORT}`);
// });

app.use(FileUpload({
    createParentPath: true
}));

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended: true}));
app.use(Cors());
app.use(Express.static("../public"));

const db = new DB();

const grok_random = new Grok_Random();

db.initdatafile(grok_random);

const appData = new AppData(app)

const server = app.listen(3000, ()=>{
    console.log(`listening on port %s...`, server.address());
})