import * as path from 'path'
import BodyParser from 'body-parser';
import FileUpload from 'express-fileupload';
import Cors from 'cors';
import Express from 'express';

import { InitialDBService } from "./src/services/initialDB.service";
import { Grok_Random } from "./src/services/grok_random";
import { AppData } from "./src/services/appdata";

const app = Express();
const PORT: number = 3000;
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
app.use(Express.static(path.resolve(__dirname, "views")));
app.use(Express.static(path.resolve(__dirname, "libs/webix/")));

const grok_random = new Grok_Random(app);

const db = new InitialDBService(grok_random);

db.initdatafile();

const appData = new AppData(app)

app.get( "/", ( req, res ) => {
    res.send( "Server started" );
} );

app.listen(PORT, () => {
    console.log(`server started at http://localhost: ${PORT}`);
});