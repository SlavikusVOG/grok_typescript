import Express from "Express";

import { GroupsData } from "./groupsdata";
import { ArtistsData } from "./artistsdata";
import { AlbumsData } from "./albumsdata";
import { SongsData } from "./songsdata";
import { MainData } from "./maindata";
import { ListOfRecordsData } from "./listOfRecordsData"
import { ServerUpload } from "../controllers/serverUpload"; 

export class AppData{
    private groupsData: GroupsData;
    private artistsData: ArtistsData;
    private albumsData: AlbumsData;
    private songsData: SongsData;
    private mainData: MainData;
    private listOfRecordsData: ListOfRecordsData;
    private serverUpload: ServerUpload;

    constructor(app: Express.Express)
    {
        this.groupsData = new GroupsData(app);
        this.artistsData = new ArtistsData();
        this.albumsData = new AlbumsData();
        this.songsData = new SongsData();
        this.mainData = new MainData();
        this.listOfRecordsData = new ListOfRecordsData();
        this.serverUpload = new ServerUpload();
    }
}