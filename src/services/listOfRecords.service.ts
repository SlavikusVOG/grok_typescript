import { DataController } from "../controllers/data.controller";
import Express from "express";
import { Group } from "../model/Group";
import { Album } from "../model/Album";
import { Song } from "../model/Song";
import { Artist } from "../model/Artist";
import { DBAlbumSong } from "../model/DBAlbumSong";
import { DBGroupAlbum } from "../model/DBGroupAlbum";
import { DBGroupArtist } from "../model/DBGroupArtist";
import { JsonDB } from "node-json-db";
import { Config } from "node-json-db/dist/lib/JsonDBConfig";
import { Award } from "../model/awards.enum";
import { Entity } from "../model/Entity";
import { pathToFileURL } from "url";
import path from "path";
import { DBController } from "../controllers/db.controller";

export class ListOfRecordsService{
    private readonly urlPath: string = '/listOfRecords';
    private readonly controller: DataController;
    private readonly bindedData: BindedData[] = [];
    constructor(app: Express.Express){
        // const groupDB = new DB<Group>(Group.dbPath);
        // const albumDB = new DB<Album>(Album.dbPath);
        // const artistDB = new DB<Artist>(Artist.dbPath);
        // const songDB = new DB<Song>(Song.dbPath);
        // const albumSongsDB = new DB<DBAlbumSong>(DBAlbumSong.dbPath);
        // const groupAlbumsDB = new DB<DBGroupAlbum>(DBGroupAlbum.dbPath);
        // const groupArtistsDB = new DB<DBGroupArtist>(DBGroupArtist.dbPath);


        // let songsdata: Song[] = songDB.getData(Song.dbPath);
        // let albumsdata: Album[] = albumDB.getData(Album.dbPath);
        // let groupsdata: Group[] = groupDB.getData(Group.dbPath);
        // let artistsdata: Artist[] = artistDB.getData(Artist.dbPath);
        // let albumsongsdata: DBAlbumSong[] = albumSongsDB.getData(DBAlbumSong.dbPath);
        // let groupalbumsdata: DBGroupAlbum[] = groupAlbumsDB.getData(DBGroupAlbum.dbPath);
        // let groupartistsdata: DBGroupArtist[] = groupArtistsDB.getData(DBGroupArtist.dbPath);

        let songsdata: Song[] = this.getDataFromDB<Song>(Song.dbPath);
        let albumsdata: Album[] = this.getDataFromDB<Album>(Album.dbPath);
        let groupsdata: Group[] = this.getDataFromDB<Group>(Group.dbPath);
        let artistsdata: Artist[] = this.getDataFromDB<Artist>(Artist.dbPath);
        let albumsongsdata: DBAlbumSong[] = this.getDataFromDB<DBAlbumSong>(DBAlbumSong.dbPath);
        let groupalbumsdata: DBGroupAlbum[] = this.getDataFromDB<DBGroupAlbum>(DBGroupAlbum.dbPath);
        let groupartistsdata: DBGroupArtist[] = this.getDataFromDB<DBGroupArtist>(DBGroupArtist.dbPath);

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

    getDataFromDB<T>(filename: string): T[]{
        let data: T[] = [];
        const jsondb = new JsonDB(new Config(filename, true, true));
        data = jsondb.getData(filename);
        return data;
    } 
}

class BindedData{
    constructor(
        private readonly albumId: string,
        private readonly albumImgSrc: string,
        private readonly groupName: string,
        private readonly albumTitle: string,
        private readonly awards: Award[],
        private readonly songsName: string[],
    ){}
}