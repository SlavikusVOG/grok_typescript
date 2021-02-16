import { DataController } from "../controllers/datacontroller";
import Express from "express";
import * as path from "path";
import { Group } from "./Entities/Group";
import { Album } from "./Entities/Album";
import { Song } from "./Entities/Song";
import { Artist } from "./Entities/Artist";
import { DBAlbumSong } from "./Entities/DBAlbumSong";
import { DBGroupAlbum } from "./Entities/DBGroupAlbum";
import { DBGroupArtist } from "./Entities/DBGroupArtist";
import { JsonDB } from "node-json-db";
import { Config } from "node-json-db/dist/lib/JsonDBConfig";
import { Award } from "./Entities/awards.enum";

export class ListOfRecordsData{
    private readonly urlPath: string = '/listOfRecords';
    private readonly controller: DataController;
    constructor(app: Express.Express){
        let bindedData: BindedData[] = [];
        const groupDB = new DB(Group.dbPath);
        const albumDB = new DB(Album.dbPath);
        const artistDB = new DB(Artist.dbPath);
        const songDB = new DB(Song.dbPath);
        const albumSongsDB = new DB(DBAlbumSong.dbPath);
        const groupAlbumsDB = new DB(DBGroupAlbum.dbPath);
        const groupArtistsDB = new DB(DBGroupArtist.dbPath);

        let songsdata: Song[] = songDB.getData(Song.dbPath);
        let albumsdata: Album[] = albumDB.getData(Album.dbPath);
        let groupsdata: Group[] = groupDB.getData(Group.dbPath);
        let artistsdata: Artist = artistDB.getData(Artist.dbPath);
        let albumsongsdata: DBAlbumSong[] = albumSongsDB.getData(DBAlbumSong.dbPath);
        let groupalbumsdata: DBGroupAlbum[] = groupAlbumsDB.getData(DBGroupAlbum.dbPath);
        let groupartistsdata: DBGroupArtist[] = groupArtistsDB.getData(DBGroupArtist.dbPath);

        for(let album of albumsdata){
            let groupName: string;
            for(let data of groupalbumsdata){
                if(album.id == data.albumId){
                    let groupId = {id: data.groupId};
                }
            }
            let data = new BindedData(
                album.id,
                album.img_src_src,
                "groupName",
                "albumTitle",
                [Award.ARIA],
                ["songsName"]                
            )
        }

        this.controller = new DataController(app, bindedData, this.urlPath);
    }    
}

class DB<T> extends JsonDB{
    constructor(filename: string){
        super(new Config(filename, true, true));
    }
}

class BindedData{
    constructor(
        private readonly albumId: number,
        private readonly albumImgSrc: string,
        private readonly groupName: string,
        private readonly albumTitle: string,
        private readonly awards: Award[],
        private readonly songsName: string[],
    ){}
}