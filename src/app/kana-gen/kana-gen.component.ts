import { KANAS } from '../../environments/kanaData';
import { Component } from '@angular/core';
import { toHiragana, toKatakana, toRomaji } from 'wanakana';
import { Chronometer } from 'ngx-chronometer'; 
import { Kana } from 'src/_models/kana.model';

@Component({
  selector: 'app-kana-gen',
  templateUrl: './kana-gen.component.html',
  styleUrls: ['./kana-gen.component.scss']
})
export class KanaGenComponent {

  kana = " ";
  kanaType = "";
  romajiVisible = true;
  progression = 0;
  progressString = "";
  first = true;
  isKatakanaChecked = true;
  isHiraganaChecked = true;
  hiraganaDisabled = false;
  katakanaDisabled = false;
  isDiacriticChecked = false;
  isDigraphChecked = false;
  chronometer: Chronometer = new Chronometer();
  chronoStarted = false;

  selectedKanas : Kana[] = [];


  constructor() { this.addKanas(KANAS.baseKanas); }

  generateKana() {
    if(!this.chronoStarted) {
      this.chronometer.start();
      this.chronoStarted = true;
    } 
    if(this.kana !== "") {
      this.nextKana();
    }
  }

  nextKana() {
    if(this.isOver()) {
      this.kana = "";
      this.kanaType = "";
      this.chronometer.pause();
    } else {
      let avalaibleKanas = this.selectedKanas.filter(kana => kana.hiraganaUsed == false || kana.katakanaUsed == false);
      let kana = avalaibleKanas[Math.floor(Math.random() * avalaibleKanas.length)];
      this.kana = kana.name;
      
      let hiraganaNext = this.isKatakanaChecked ? Math.random() < 0.5 : true;
      if((kana.hiraganaUsed == false && kana.katakanaUsed == false && hiraganaNext) || (kana.hiraganaUsed == false && kana.katakanaUsed == true)) {
        this.kanaType = "Hiragana";
        kana.hiraganaUsed = true;
      } else {
        this.kanaType = "Katakana";
        kana.katakanaUsed = true;
      }
    }
    this.updateProgress();
    this.romajiVisible = true;
  }

  

  swap(kanaType: string) {
    if(kanaType !== " ") {
      if(!this.romajiVisible) {
        this.kana = toRomaji(this.kana);
        this.romajiVisible = true;
      } else if(kanaType == "Hiragana") {
        this.kana = toHiragana(this.kana);
        this.romajiVisible = false;
      } else {
        this.kana = toKatakana(this.kana);
        this.romajiVisible = false;
      }
    }
  }

  reinitialize() {
    this.kana = " "; this.kanaType = "";
    this.selectedKanas = [];
    this.addKanas(KANAS.baseKanas);
    this.progression = 0;
    this.resetCheckboxes();
    this.chronometer.restart();
    this.chronometer.pause();
    this.chronoStarted = false;
  }

  updateHiragana() {
    this.isHiraganaChecked = !this.isHiraganaChecked
    if(this.isHiraganaChecked) this.selectedKanas.forEach(k => k.hiraganaUsed = false);
    else this.selectedKanas.forEach(k => k.hiraganaUsed = true);
    if(this.katakanaDisabled) this.katakanaDisabled = false; else this.katakanaDisabled = true;
  }

  updateKatakana() {
    this.isKatakanaChecked = !this.isKatakanaChecked
    if(this.isKatakanaChecked) this.selectedKanas.forEach(k => k.katakanaUsed = false);
    else this.selectedKanas.forEach(k => k.katakanaUsed = true);
    if(this.hiraganaDisabled) this.hiraganaDisabled = false; else this.hiraganaDisabled = true;
  }

  updateDiacritics() {
    this.isDiacriticChecked = !this.isDiacriticChecked
    if(this.isDiacriticChecked) this.addKanas(KANAS.diacritics);
    else {
      KANAS.diacritics.forEach(kanaStr => {
        let index = this.selectedKanas.findIndex(k => k.name === kanaStr);
        if(index !== -1) this.selectedKanas.splice(index, 1);
      });
    }  
  }

  updateDigraphs() {
    this.isDigraphChecked = !this.isDigraphChecked
    if(this.isDigraphChecked) this.addKanas(KANAS.digraphs);
    else {
      KANAS.digraphs.forEach(kanaStr => {
        let index = this.selectedKanas.findIndex(k => k.name === kanaStr);
        if(index !== -1) this.selectedKanas.splice(index, 1);
      });
    }    
  }   

  private isOver() {
    let over = true;
    this.selectedKanas.forEach(function (kana) {
      if(!kana.hiraganaUsed || !kana.katakanaUsed) over = false;
    });
    return over;
  }

  private updateProgress() {
    let counter = 0; let hiraChecked = this.isHiraganaChecked; let kataChecked = this.isKatakanaChecked;
    this.selectedKanas.forEach(function (kana) {
      if(kana.hiraganaUsed && hiraChecked) counter++;
      if(kana.katakanaUsed && kataChecked) counter++;
    })

    let allSelected = false;
    
    if(hiraChecked && kataChecked) { this.progression = (counter/(this.selectedKanas.length*2))*100; allSelected = true; }
    else if(hiraChecked || kataChecked) this.progression = (counter/(this.selectedKanas.length))*100;

    this.progressString = counter + "/" + (allSelected ? this.selectedKanas.length*2 : this.selectedKanas.length);
  }

  private resetCheckboxes() {
    this.isHiraganaChecked = true;
    this.isKatakanaChecked = true;
    this.hiraganaDisabled = false;
    this.katakanaDisabled = false;
    this.isDiacriticChecked = false;
    this.isDigraphChecked = false;
  }

  private addKanas(kanas: string[]) {
    kanas.forEach(e => this.selectedKanas.push(new Kana(e)));
  }

}
