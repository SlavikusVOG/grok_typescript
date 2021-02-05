import { Grok_Random } from "./grok_random";
import fs from "fs";
import { Country } from "./countries.enum";
import { Style } from "./styles.enum";
import { Award } from "./awards.enum";

export class DB{
    private readonly dataFile: string = "../data/data.json";
    private readonly grok_random: Grok_Random;
    private data: Group[] = [];
    constructor(grok_random: Grok_Random){
        this.grok_random = grok_random;
    }

    initdatafile(){
        try{
            if(fs.existsSync(this.dataFile)){
                console.log(`${this.dataFile} exists`)
            }else{
                const zeroPad = (num: number, place: number) => String(num).padStart(place, '0');
                for(let i: number = 0, count: number = this.grok_random.getRandomInt(10); i < count; i++){
                    let group: Group = new Group(i,
                                                `GroupName${i}`,
                                                this.grok_random.getRandomEnum(Style),
                                                this.CreateDate(),
                                                this.grok_random.getRandomEnum(Country));
                    this.data.push(group);
                }
                fs.writeFileSync(this.dataFile,JSON.stringify(this.data));
            }
        }catch(err){
            throw err;
        }
    }

    CreateDate(): Date{
        return new Date();
    }

    CreateSongs(groupIndex: number){
        let songs: Song[] = [];
    }

    CreateArtists(groupIndex: number){

    }

    CreateAlbums(groupIndex: number){

    }

}

class Artist{
    constructor(private id: number,
                private group: Group,
                private roleInTheGroup: string,
                private groupMemberName: string,
                private dateOfBirth: Date,
                private countryOfBirth: Country,
                private awards: Award[]){}
}

class Song{
    constructor(private _id: number, private name: string, private album: Album){}
    get id(): number{
        return this._id
    }
}

class Album{
    constructor(private id: number, 
                private group: Group, 
                private album: Album,
                private release_date: Date,
                private songs: Song[],
                private number_of_songs: number,
                private number_of_issued_copies: number,
                private removal_backet: number,
                private img_src_src: string){}
}

class Group{
    constructor(private id: number,
                private groupName: string,
                private musicStyle: Style,                
                private groupCreactionDate: Date,
                private countryOfFoundation: Country,
                private compositions?: Song[],
                private artists?: Artist[],
                private albums?: Album[]){}
    
}

