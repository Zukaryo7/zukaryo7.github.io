import { Component } from '@angular/core';
import { toHiragana, toKatakana, toRomaji } from 'wanakana';
import { Chronometer } from 'ngx-chronometer'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  kana = "";
  kanaType = "";
  hiragana = this.getKanas();
  katakana = this.getKanas();
  romaji = true;
  progression = 0;
  progressIncrement = 1.08695652173913;
  first = true;
  isKatakanaChecked = true;
  isHiraganaChecked = true;
  hiraganaDisabled = false;
  katakanaDisabled = false;
  chronometer: Chronometer = new Chronometer();


  constructor() {
    this.generateKana();
  }

  generateKana() {
    let isHiragana = this.selectKanaType();
    if(this.kana !== "Terminé !") {
      this.getKana(isHiragana);
      if(!this.first) {
        this.katakanaDisabled = true; 
        this.hiraganaDisabled = true;
        this.progression += this.progressIncrement;
      }
    }
    this.first = false;
  }

  selectKanaType() {
    if(this.katakana.length == 0 && this.hiragana.length == 0) {
      this.kana = "Terminé !";
      this.kanaType = "";
      this.progression += this.progressIncrement;
      return false;
    } else if(this.hiragana.length == 0) {
      return false;
    } else if(this.katakana.length == 0) {
      return true;
    } else {
      return Math.random() < 0.5;
    }
  }

  getKana(isHiragana : boolean) {
    if(isHiragana) {
      let indice = Math.floor(Math.random() * this.hiragana.length);
      this.kana = this.hiragana[indice];
      this.hiragana.splice(indice, 1);
      this.kanaType = "Hiragana";
    } else {
      let indice = Math.floor(Math.random() * this.katakana.length);
      this.kana = this.katakana[indice];
      this.katakana.splice(indice, 1);
      this.kanaType = "Katakana";
    }
    this.chronometer.start();
  }

  reinitializeAll() {
    this.hiragana = this.getKanas();
    this.katakana = this.getKanas();
    this.kana = "";
    this.generateKana();
    this.progression = 0;
    this.isHiraganaChecked = true;
    this.isKatakanaChecked = true;
    this.progressIncrement = 1.08695652173913;
    this.hiraganaDisabled = false;
    this.katakanaDisabled = false;
    this.chronometer.restart();
  }

  swap(kanaType: string) {
    if(!this.romaji) {
      this.kana = toRomaji(this.kana);
      this.romaji = true;
    } else if(kanaType == "Hiragana") {
      this.kana = toHiragana(this.kana);
      this.romaji = false;
    } else {
      this.kana = toKatakana(this.kana);
      this.romaji = false;
    }
  }

  updateHiragana() {
    this.isHiraganaChecked = !this.isHiraganaChecked;
    if(this.isHiraganaChecked) {
      this.hiragana = this.getKanas();
    } else {
      this.progressIncrement *= 2;
      this.hiragana = [];
    }
    this.generateKana();
  }

  updateKatakana() {
    this.isKatakanaChecked = !this.isKatakanaChecked;
    if(this.isKatakanaChecked) {
      this.katakana = this.getKanas();
    } else {
      this.progressIncrement *= 2;
      this.katakana = [];
    }
    this.generateKana();
  }


  private getKanas() {
    return ["a", "i", "u", "e", "o", "ka", "ki", "ku", "ke", "ko", "sa", "shi", "su", "se", "so", "ta", "chi", "tsu", "te", "to",
    "na", "ni", "nu", "ne", "no", "ha", "hi", "fu", "he", "ho", "ma", "mi", "mu", "me", "mo", "ya", "yu", "yo", "ra", "ri",
    "ru", "re", "ro", "wa", "wo", "n"];
  }

}
