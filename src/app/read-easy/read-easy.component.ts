import { Component, OnInit } from '@angular/core';
import { toRomaji, toKatakana, toHiragana } from 'wanakana';
import { KANAS } from 'src/environments/kanaData';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { addClass, replaceClass, removeClass } from 'src/environments/dom';

@Component({
  selector: 'app-read-easy',
  templateUrl: './read-easy.component.html',
  styleUrls: ['./read-easy.component.scss']
})
export class ReadEasyComponent implements OnInit {

  availableKanas = KANAS.baseKanas;
  kanaToFound = "";
  totalWordsFound = 0;
  totalWordsFail = 0;
  lastFailed = "";
  isHiraganaChecked = true;
  isKatakanaChecked = true;
  hiraganaDisabled = false;
  katakanaDisabled = false;
  isDigraphsChecked = false;
  isDiacriticsChecked = false;

  constructor() {
    this.prepareNextWord();
  }

  ngOnInit(): void {
  }

  onKeyUp(changement: any) {
    let inputStr = changement.target.value.trim().toLocaleLowerCase();
    let romajiToFound = toRomaji(this.kanaToFound);
    if(inputStr === "" || inputStr.length > romajiToFound.length)
      this.resetInput(changement);
    else if(inputStr.length === romajiToFound.length) {
        if(inputStr !== romajiToFound) this.lastFailed = `(${romajiToFound})`; 
        inputStr === romajiToFound ? this.updateWordStatus(true) : this.updateWordStatus(false);
        this.resetInput(changement);
        this.prepareNextWord();
    }
  }

  updateWordStatus(found: boolean) {
    removeClass("kana", "correct"); removeClass("kana", "incorrect");
    if(found) {
      this.totalWordsFound++;
      addClass("correct", "kana");
    } else {
      this.totalWordsFail++;
      addClass("incorrect", "kana");
    }
  }

  resetInput(inputValue : any) {
    inputValue.target.value = "";
  }

  prepareNextWord() {
    let index = Math.floor(Math.random() * this.availableKanas.length);
    this.kanaToFound = this.availableKanas[index];
    if(this.isHiraganaChecked && this.isKatakanaChecked)
      Math.random() < 0.5 ? this.kanaToFound = toHiragana(this.kanaToFound) : this.kanaToFound = toKatakana(this.kanaToFound);
    else if(this.isHiraganaChecked)
      this.kanaToFound = toHiragana(this.kanaToFound);
    else
      this.kanaToFound = toKatakana(this.kanaToFound);
  }

  updateHiragana() {
    this.isHiraganaChecked = !this.isHiraganaChecked;
    if(this.katakanaDisabled) this.katakanaDisabled = false; else this.katakanaDisabled = true;
    this.prepareNextWord();
  }

  updateKatakana() {
    this.isKatakanaChecked = !this.isKatakanaChecked;
    if(this.hiraganaDisabled) this.hiraganaDisabled = false; else this.hiraganaDisabled = true;
    this.prepareNextWord();
  }

  /*
  updateDigraphs(event: any) {
    if(event.target.checked) this.addKanas(KANAS.digraphs);
    else { this.removeKanas(KANAS.digraphs); }
    this.prepareNextWord();
  }

  updateDiacritics(event: any) {
    if(event.target.checked) this.addKanas(KANAS.digraphs);
    else { this.removeKanas(KANAS.digraphs); }
    this.prepareNextWord();
  }

  private addKanas(kanas: string[]) {
    kanas.forEach(e => this.availableKanas.push(e));
  }

  private removeKanas(kanas: string[]) {
    let index = this.availableKanas.indexOf(kanas[0]);
    if(index !== -1) {
        this.availableKanas.splice(index, kanas.length);
    }
  }
  */

}
