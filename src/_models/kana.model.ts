export class Kana {
    
    name: string;
    hiraganaUsed: boolean;
    katakanaUsed: boolean;
    isDiacritic: boolean;
    isDigraph: boolean;

    constructor(name: string) {
        this.name = name;
        this.hiraganaUsed = false;
        this.katakanaUsed = false;
        this.isDiacritic = false;
        this.isDigraph = false;
    }
}