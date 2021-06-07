import { Component } from '@angular/core';
import { toKana, toHiragana, toKatakana, toRomaji } from 'wanakana';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  kana = "";
  kanaType = "";
  hiragana = ["a", "i", "u", "e", "o", "ka", "ki", "ku", "ke", "ko", "sa", "shi", "su", "se", "so", "ta", "chi", "tsu", "te", "to",
              "na", "ni", "nu", "ne", "no", "ha", "hi", "fu", "he", "ho", "ma", "mi", "mu", "me", "mo", "ya", "yu", "yo", "ra", "ri",
              "ru", "re", "ro", "wa", "wo", "n"];
  katakana = ["a", "i", "u", "e", "o", "ka", "ki", "ku", "ke", "ko", "sa", "shi", "su", "se", "so", "ta", "chi", "tsu", "te", "to",
              "na", "ni", "nu", "ne", "no", "ha", "hi", "fu", "he", "ho", "ma", "mi", "mu", "me", "mo", "ya", "yu", "yo", "ra", "ri",
              "ru", "re", "ro", "wa", "wo", "n"];
  reinitializationMessage = "";
  counter = 0;
  romaji = true;

  constructor() {
    this.generateKana();
  }

  generateKana() {
    let isHiragana = this.selectKanaType();
    if(this.kana !== "Terminé !") {
      this.getKana(isHiragana);
    }
  }

  selectKanaType() {
    if(this.katakana.length == 0 && this.hiragana.length == 0) {
      this.kana = "Terminé !";
      this.kanaType = "";
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
  }

  reinitialize() {
    this.counter++;
    this.hiragana = ["a", "i", "u", "e", "o", "ka", "ki", "ku", "ke", "ko", "sa", "shi", "su", "se", "so", "ta", "chi", "tsu", "te", "to",
                     "na", "ni", "nu", "ne", "no", "ha", "hi", "fu", "he", "ho", "ma", "mi", "mu", "me", "mo", "ya", "yu", "yo", "ra", "ri",
                     "ru", "re", "ro", "wa", "wo", "n"];
    this.katakana = ["a", "i", "u", "e", "o", "ka", "ki", "ku", "ke", "ko", "sa", "shi", "su", "se", "so", "ta", "chi", "tsu", "te", "to",
                     "na", "ni", "nu", "ne", "no", "ha", "hi", "fu", "he", "ho", "ma", "mi", "mu", "me", "mo", "ya", "yu", "yo", "ra", "ri",
                     "ru", "re", "ro", "wa", "wo", "n"];
    this.reinitializationMessage = "Liste réinitialisée ! (" + this.counter + ")";
    this.kana = "";
    this.generateKana();
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

}
