export class Grok_Random{
    private readonly app: any;
    constructor(app: any){
        this.app = app;
    }

    getRandomInt(max: number): number{
        return Math.floor(Math.random() * Math.floor(max));
    }

    getRandomArbitrary(min: number, max: number): number{
        return Math.floor(Math.random() * (max - min) + min);
    }

    getRandomEnum<T>(anEnum: T): any{
        const enumValues = Object.keys(anEnum)
            .map(n => Number.parseInt(n))
            .filter(n => !Number.isNaN(n) as unknown as T[keyof T][]);
        const randomIndex = Math. floor(Math.random() * enumValues.length);
        const randomEnumValue = enumValues[randomIndex];
        randomEnumValue;
    }
}
