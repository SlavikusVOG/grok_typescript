import Express from "express";

import { GroupsService } from "./groups.service";
import { ArtistsService } from "./artists.service";
import { AlbumsService } from "./albums.service";
import { SongsService } from "./songs.service";
import { MainService } from "./maindata";
import { ListOfRecordsService } from "./listOfRecords.service"
import { ServerUpload } from "../controllers/serverUpload.controller"; 

export class AppData{
    private groupsData: GroupsService;
    private artistsData: ArtistsService;
    private albumsData: AlbumsService;
    private songsData: SongsService;
    private mainData: MainService;
    private listOfRecordsData: ListOfRecordsService;
    private serverUpload: ServerUpload;

    constructor(app: Express.Express)
    {
        this.groupsData = new GroupsService(app);
        this.artistsData = new ArtistsService(app);
        this.albumsData = new AlbumsService(app);
        this.songsData = new SongsService(app);
        this.mainData = new MainService(app);
        this.listOfRecordsData = new ListOfRecordsService(app);
        this.serverUpload = new ServerUpload(app);
    }
}