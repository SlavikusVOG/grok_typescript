/// <reference path="../data/db.ts"/>
/// <reference path="../data/grok_random.ts"/>

import Path from 'path'
import BodyParser from 'body-parser';
import FileUpload from 'express-fileupload';
import Cors from 'cors';
import Express from 'express';
import fs from 'fs';

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

