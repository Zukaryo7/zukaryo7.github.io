import { Component } from '@angular/core';
import { toRomaji, toKatakana, toHiragana } from 'wanakana';
import { Chronometer } from 'ngx-chronometer';
import { addClass, replaceClass, removeClass } from 'src/environments/dom';
import { KANAS } from 'src/environments/kanaData';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss']
})
export class ReadComponent {

  selectedWords : string[] = [];
  wordFoundIndex = 0;
  totalWordsFound = 0;
  totalWordsFail = 0;
  lastFailed = "";
  chronometer: Chronometer = new Chronometer();
  chronoPaused = true;
  isHiraganaChecked = true;
  isKatakanaChecked = true;
  hiraganaDisabled = false;
  katakanaDisabled = false;
  wpm = 0;
  wpmInterval = setInterval(() => {
    if(this.chronometer !== undefined && this.chronometer.second > 0) {
      this.wpm = (this.totalWordsFound / this.chronometer.second) * 60;
    }
  }, 1000);

  constructor() {
    this.generateNewTab();
  }

  ngAfterViewInit(): void {
    this.prepareNextWord();
  }

  ngOnDestroy() {
    clearInterval(this.wpmInterval);
  }

  onKeyUp(changement: any) {
    this.startChrono();
    let inputStr = changement.target.value.trim().toLocaleLowerCase();
    let toFound = toRomaji(this.selectedWords[this.wordFoundIndex]);
    if(inputStr === "" || inputStr.length > toFound.length)
      this.resetInput(changement);
    else if(inputStr.length === toFound.length) {
        if(inputStr !== toFound) this.lastFailed = `(${toFound})`; 
        inputStr === toFound ? this.updateWord("word-found") : this.updateWord("word-fail");
        this.resetInput(changement);
        this.wordFoundIndex++;
        if(this.wordFoundIndex === this.selectedWords.length) {
          this.resetTab();
        }
        this.prepareNextWord();
    }
  }

  updateWord(status : string) {
    removeClass("word-"+ (this.wordFoundIndex + 1), "word-current");
    addClass(status, "word-" + (this.wordFoundIndex + 1));
    status === "word-found" ? this.totalWordsFound++ : this.totalWordsFail++;
  }

  prepareNextWord() {
    addClass("word-current", "word-" + (this.wordFoundIndex + 1)); 
  }

  resetInput(inputValue : any) {
    inputValue.target.value = "";
  }

  updateHiragana() {
    this.isHiraganaChecked = !this.isHiraganaChecked
    if(this.katakanaDisabled) this.katakanaDisabled = false; else this.katakanaDisabled = true;
    this.resetTab();
  }

  updateKatakana() {
    this.isKatakanaChecked = !this.isKatakanaChecked
    if(this.hiraganaDisabled) this.hiraganaDisabled = false; else this.hiraganaDisabled = true;
    this.resetTab();
  }

  generateNewTab() {
    this.selectedWords = [];
    for(let i = 0; i < 20; i++) {
      let word = "";
      let syllableNbr = Math.floor(Math.random() * 3) + 2;
      for(let j = 0; j < syllableNbr; j++) {
        let kanaIndex = Math.floor(Math.random() * 46);
        word += KANAS.baseKanas[kanaIndex];
      }
      word = this.convertWordToKana(word);
      this.selectedWords.push(word);
    }
  }

  convertWordToKana(word : string) {
    if(this.isHiraganaChecked && this.isKatakanaChecked)
      return Math.random() < 0.5 ? toHiragana(word) : toKatakana(word);
    else if(this.isHiraganaChecked)
      return toHiragana(word);
    else 
      return toKatakana(word);
  }

  resetTab() {
    this.resetCss();
    this.wordFoundIndex = 0;
    this.generateNewTab();
  }

  resetCss() {
    for(let i = 1; i <= this.wordFoundIndex; i++) {
      removeClass("word-"+ i, "word-found");
      removeClass("word-"+ i, "word-fail");
    }
  }

  startChrono() {
    if(this.chronoPaused) {
      this.chronometer.start();
      this.chronoPaused = false;
      replaceClass("pause", "fa-play", "fa-pause");
    }
  }

  pauseChrono() {
    this.chronoPaused = !this.chronoPaused;
    if(!this.chronoPaused) {
      this.chronometer.start();
      replaceClass("pause", "fa-play", "fa-pause");
    } else {
      this.chronometer.pause();
      replaceClass("pause", "fa-pause", "fa-play");
    }
  }

}
