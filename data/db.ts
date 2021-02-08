import { Grok_Random } from "./grok_random";
import fs from "fs";
import { Country } from "./countries.enum";
import { Style } from "./styles.enum";
import { Award } from "./awards.enum";
import { ArtistsData } from "./artistsdata";

export class DB{
    private readonly dataFile: string = "../data/data.json";
    private readonly grok_random: Grok_Random;
    private data: [Group[], Artist[], Album[], Song[], DBGroupArtist[], DBGroupAlbum[], DBAlbumSong[]] =
        [[],[],[],[],[],[],[]];
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
            if(fs.existsSync(this.dataFile)){
                console.log(`${this.dataFile} exists`)
            }else{
                this.groups = this.CreateGroups();
                // let artists: Artist[] = this.CreateArtists();
                // let albums: Album[] = this.CreateAlbums();
                // let songs: Song[] = this.CreateSongs();
                this.createGroupsAndArtistsMapping(this.groups);
                this.createGroupsAndAlbumsMapping(this.groups);
                this.createAlbumsAndSongsMapping(this.albums);
                this.data = [
                    this.groups,
                    this.artists,
                    this.albums,
                    this.songs,
                    this.groups_artists_mapping,
                    this.groups_albums_mapping,
                    this.albums_songs_mapping
                ];
                fs.writeFileSync(this.dataFile,JSON.stringify(this.data));
            }
        }catch(err){
            throw err;
        }
    }

    CreateDate(): Date{
        return new Date();
    }

    CreateGroups(): Group[]
    {
        let groups : Group[] = [];
        for(let i: number = 0, count: number = this.grok_random.getRandomInt(10); i < count; i++){
            let group: Group = new Group(
                i,
                `GroupName${i}`,
                this.grok_random.getRandomEnum(Style),
                this.CreateDate(),
                this.grok_random.getRandomEnum(Country)
                );
            groups.push(group);
        }
        return groups;
    }

    CreateSongs(): Song[]
    {
        let songs: Song[] = [];
        for(let i: number = 0, count: number = this.grok_random.getRandomArbitrary(100, 500); i < count; i++){
            let song: Song = new Song(
                i,
                `Song${i}`);
            songs.push(song);
        }
        return songs;
    }

    CreateArtists(): Artist[]
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
            artists.push(artist);
        }
        return artists;
    }

    CreateAlbums(): Album[]
    {
        let albums: Album[] = [];
        for(let i: number = 0, count: number = this.grok_random.getRandomArbitrary(50, 100); i < count; i++){
            let album: Album = new Album(
                i,
                this.CreateDate(),
                this.grok_random.getRandomArbitrary(1000, 1000000),
                this.grok_random.getRandomInt(10)
            )
            albums.push(album);
        }
        return albums;
    }

    createGroupsAndArtistsMapping(groups: Group[]): void{
        for(let i = 0, count = groups.length; i < count; i++){
            let artists = this.CreateArtists();
            for(let artist of artists){
                let dbGroupArtist = new DBGroupArtist(this.groups_artists_mapping.length,groups[i].id,artist.id);
                this.artists.push(artist);
                this.groups_artists_mapping.push(dbGroupArtist);
            }
        }
    }

    createGroupsAndAlbumsMapping(groups: Group[]): void{
        for(let i = 0, count = groups.length; i < count; i++){
            let albums = this.CreateAlbums();
            for(let album of albums){
                let dbGroupAlbum = new DBGroupAlbum(this.groups_albums_mapping.length, groups[i].id,album.id)
            }
        }
    }

    createAlbumsAndSongsMapping(albums: Album[]): void{
        const zeroPad = (num: number, place: number) => String(num).padStart(place, '0');
        for(let i = 0, count = albums.length; i < count; i++){
            let songs = this.CreateSongs();
            for(let song of songs){
                let dbGroupAlbum = new DBGroupAlbum(this.groups_albums_mapping.length, albums[i].id,song.id)
            }
        }
    }
}

class Artist{
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
    constructor(
        private _id: number, 
        private name: string
        ){}
    get id(): number{
        return this._id
    }
}

class Album{
    constructor(
        private _id: number, 
        private release_date: Date,
        private number_of_issued_copies: number,
        private removal_backet: number,
        private img_src_src?: string
        ){}
    get id(){
        return this._id;
    }
}

class Group{
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
    constructor(
        private id: number,
        private groupIndex: number,
        private artistsIndex: number
        ){}
}

class DBGroupAlbum{
    constructor(
        private id: number,
        private groupIndex: number,
        private albumIndex: number
        ){}
}

class DBAlbumSong{
    constructor(
        private id: number,
        private albumIndex: number,
        private songIndex: number
        ){}
}