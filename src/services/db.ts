import { Grok_Random } from "./grok_random";
import * as fs from "fs";
import * as path from "path";
import { Country } from "./Entities/countries.enum";
import { Style } from "./Entities/styles.enum";
import { Award } from "./Entities/awards.enum";
import { JsonDB } from "node-json-db";
import { Config } from "node-json-db/dist/lib/JsonDBConfig";
import { DBAlbumSong } from "./Entities/DBAlbumSong";
import { DBGroupAlbum } from "./Entities/DBGroupAlbum";
import { DBGroupArtist } from "./Entities/DBGroupArtist";
import { Group } from "./Entities/Group";
import { Album } from "./Entities/Album";
import { Artist } from "./Entities/Artist";
import { Song } from "./Entities/Song";
import { v4 as uuidv4 } from "uuid";

export class DB{
    private readonly dataDir: string = path.resolve(__dirname);
    private readonly grok_random: Grok_Random;
    private groups: Group[] = [];
    private artists: Artist[] = [];
    private albums: Album[] = [];
    private songs: Song[] = [];
    private groups_artists_mapping: DBGroupArtist[] = [];
    private groups_albums_mapping:DBGroupAlbum[] = [];
    private albums_songs_mapping: DBAlbumSong[] = [];
    constructor(grok_random: Grok_Random){
        this.grok_random = grok_random;
    }

    initdatafile(){
        try{
            if(fs.existsSync(Group.dbPath +  '.json')){
                console.log(`files exist`)
            }else{
                console.log(`generating files...`)
                this.CreateData();
                this.insertDataToDB<Group>(Group.dbPath, this.groups);
                this.insertDataToDB<Album>(Album.dbPath, this.albums)
                this.insertDataToDB<Artist>(Artist.dbPath, this.artists)
                this.insertDataToDB<Song>(Song.dbPath, this.songs)
                this.insertDataToDB<DBGroupAlbum>(DBGroupAlbum.dbPath, this.groups_albums_mapping)
                this.insertDataToDB<DBGroupArtist>(DBGroupArtist.dbPath, this.groups_artists_mapping)
                this.insertDataToDB<DBAlbumSong>(DBAlbumSong.dbPath, this.albums_songs_mapping)
            }
        }catch(err){
            throw err;
        }
    }

    private CreateDate(): Date{
        return new Date();
    }

    private CreateData(): void
    {
        let groups : Group[] = [];
        for(let i: number= this.groups.length, count: number = this.grok_random.getRandomInt(10); i < count; i++){
            let group: Group = new Group(
                uuidv4(),
                `GroupName${i}`,
                this.grok_random.getRandomEnum(Style),
                this.CreateDate(),
                this.grok_random.getRandomEnum(Country)
                );
            let albums: Album[] = this.CreateAlbumsForGroup();
            this.createGroupAndAlbumsMapping(group, albums);
            let artists: Artist[] = this.CreateArtistsForGroup();
            this.createGroupAndArtistsMapping(group, artists);
            this.groups.push(group)
            groups.push(group);
        }
    }

    private CreateSongsForAlbum(): Song[]
    {
        let songs: Song[] = [];
        for(let i: number = this.songs.length, 
            count: number = i + this.grok_random.getRandomArbitrary(1, 30); i < count; i++){
            let song: Song = new Song(
                uuidv4(),
                `Song${i}`);
            this.songs.push(song);
            songs.push(song);
        }
        return songs;
    }

    private CreateArtistsForGroup(): Artist[]
    {
        let artists: Artist[] = [];
        for(
            let i: number = this.artists.length, 
            count: number = this.grok_random.getRandomArbitrary(1, 10) + this.artists.length;
            i < count; i++
            )
        {
            let artist: Artist = new Artist(
                uuidv4(),
                `Role${i}`,
                `ArtistName${i}`,
                this.CreateDate(),
                this.grok_random.getRandomEnum(Country),
                this.grok_random.getRandomEnum(Award)
            );
            this.artists.push(artist);
            artists.push(artist);
        }
        return artists;
    }

    private CreateAlbumsForGroup(): Album[]
    {
        let albums: Album[] = [];
        for(let i: number = this.albums.length, 
            count: number = i + this.grok_random.getRandomArbitrary(1, 50);
            i < count; i++)
        {
            let songs: Song[] = this.CreateSongsForAlbum();
            let songsCount: number = songs.length;
            let album: Album = new Album(
                uuidv4(),
                `AlbumName${i}`,
                this.CreateDate(),               
                this.grok_random.getRandomArbitrary(1000, 1000000),
                this.grok_random.getRandomInt(10),
                songsCount,
                this.grok_random.getRandomEnum(Award)
            )
            album.img_src_src = i
            this.createAlbumsAndSongsMapping(album, songs);
            this.albums.push(album);
            albums.push(album);
        }
        return albums;
    }

    private createGroupAndArtistsMapping(group: Group, artists: Artist[]): void{
        for(let artist of artists){
            let dbGroupArtist = new DBGroupArtist(uuidv4(),group.id,artist.id);
            this.groups_artists_mapping.push(dbGroupArtist);
        }        
    }

    private createGroupAndAlbumsMapping(group: Group, albums: Album[]): void{
        for(let album of albums){
            let dbGroupAlbum = new DBGroupAlbum(uuidv4(), group.id,album.id);
            this.groups_albums_mapping.push(dbGroupAlbum);
        }
    }

    private createAlbumsAndSongsMapping(album: Album, songs: Song[]): void{
        for(let song of songs){
            let dbAlbumSong = new DBAlbumSong(uuidv4(), album.id, song.id)
            this.albums_songs_mapping.push(dbAlbumSong);
        }
    }

    private insertDataToDB<T>(filename: string, objs: T[]): void{
        const jsondb = new JsonDB(new Config(filename, true, true));
        for(let obj of objs){
            jsondb.push(filename, objs);
        } 
        console.log(`${filename} created`);
    }
}

