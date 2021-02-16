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
    private readonly bindedData: BindedData[] = [];
    constructor(app: Express.Express){
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
            let groupName: string = "";
            for(let data of groupalbumsdata){
                if(album.id == data.albumId){
                    let groupIndex = groupsdata.findIndex((element: Group, index: number, groups: Group[])=>{
                        if(data.groupId == element.id){
                            return true;
                        }
                    });
                    if(groupIndex > -1){
                        groupName = groupsdata[groupIndex].name;
                        break;
                    }          
                }
            }
            let songNames: string[] = [];
            for(let data of albumsongsdata){
                if(album.id == data.albumId){
                    let songIndex = songsdata.findIndex((element: Song, index: number, songs: Song[])=>{
                        if(data.songId == element.id){
                            return true;
                        }
                    });
                    if(songIndex > -1){
                        songNames.push(songsdata[songIndex].name);
                    }
                }
            }
            this.bindedData.push(new BindedData(
                album.id,
                album.img_src_src,
                groupName,
                album.albumName,
                album.awards || [],
                songNames || []              
            )) 
        }

        this.controller = new DataController(app, this.bindedData, this.urlPath);
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