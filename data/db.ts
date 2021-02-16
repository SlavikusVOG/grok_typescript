import { Grok_Random } from "./grok_random";
import * as fs from "fs";
import * as path from "path";
import { Country } from "./countries.enum";
import { Style } from "./styles.enum";
import { Award } from "./awards.enum";
import { JsonDB } from "node-json-db";
import { Config } from "node-json-db/dist/lib/JsonDBConfig"

export class DB{
    private readonly dataDir: string = path.resolve(__dirname);
    private readonly dataFile: string = "data.json";
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
            if(fs.existsSync(this.dataDir + '/' + this.dataFile)){
                console.log(`${this.dataFile} exists`)
            }else{
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
        for(let i: number = this.groups.length, count: number = this.grok_random.getRandomInt(10); i < count; i++){
            let group: Group = new Group(
                i,
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
                i,
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
                i,
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
                i,
                this.CreateDate(),
                this.grok_random.getRandomArbitrary(1000, 1000000),
                this.grok_random.getRandomInt(10),
                songsCount
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
            let dbGroupArtist = new DBGroupArtist(this.groups_artists_mapping.length,group.id,artist.id);
            this.groups_artists_mapping.push(dbGroupArtist);
        }        
    }

    private createGroupAndAlbumsMapping(group: Group, albums: Album[]): void{
        for(let album of albums){
            let dbGroupAlbum = new DBGroupAlbum(this.groups_albums_mapping.length, group.id,album.id);
            this.groups_albums_mapping.push(dbGroupAlbum);
        }
    }

    private createAlbumsAndSongsMapping(album: Album, songs: Song[]): void{
        for(let song of songs){
            let dbAlbumSong = new DBAlbumSong(this.albums_songs_mapping.length, album.id, song.id)
            this.albums_songs_mapping.push(dbAlbumSong);
        }
    }

    private insertDataToDB<T>(filename: string, objs: T[]): void{
        const jsondb = new JsonDB(new Config(filename, true, true));
        for(let obj of objs){
            jsondb.push(filename, objs);
        }      
    }
}

class Artist{
    static readonly dbPath: string = path.resolve(__dirname, "artists");
    constructor(
        private _id: number,
        private roleInTheGroup: string,
        private artistName: string,
        private dateOfBirth: Date,
        private countryOfBirth: Country,
        private award: Award
        ){}
    get id(): number{
        return this._id;
    }
}

class Song{
    static readonly dbPath: string = path.resolve(__dirname, "songs");
    constructor(
        private _id: number, 
        private name: string
        ){}
    get id(): number{
        return this._id
    }
}

class Album{
    static readonly dbPath: string = path.resolve(__dirname, "albums");
    private zeroPad = (num: number, place: number) => String(num).padStart(place, '0');
    constructor(
        private _id: number, 
        private release_date: Date,
        private number_of_issued_copies: number,
        private removal_backet: number,
        private number_of_songs: number,
        private _img_src_src?: string
        ){}
    get id(){
        return this._id;
    }
    set img_src_src(albumIndex: number){
        this._img_src_src = `imgs/img${this.zeroPad(albumIndex, 4)}`
    }
}

class Group{
    static readonly dbPath: string = path.resolve(__dirname, "groups");
    constructor(
        private _id: number,
        private groupName: string,
        private musicStyle: Style,                
        private groupCreactionDate: Date,
        private countryOfFoundation: Country
        ){}   
    get id(){
        return this._id;
    }
}

class DBGroupArtist{
    static readonly dbPath: string = path.resolve(__dirname, "dbgroupartist");
    constructor(
        private id: number,
        private groupIndex: number,
        private artistsIndex: number
        ){}
}

class DBGroupAlbum{
    static readonly dbPath: string = path.resolve(__dirname, "dbgroupalbum");
    constructor(
        private id: number,
        private groupIndex: number,
        private albumIndex: number
        ){}
}

class DBAlbumSong{
    static readonly dbPath: string = path.resolve(__dirname, "albumsong");
    constructor(
        private id: number,
        private albumIndex: number,
        private songIndex: number
        ){}
}