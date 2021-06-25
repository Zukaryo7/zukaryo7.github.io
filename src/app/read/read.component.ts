import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { toHiragana, toKatakana, toRomaji } from 'wanakana';
import { Chronometer } from 'ngx-chronometer';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss']
})
export class ReadComponent implements OnInit {

  selectedWords = ["まし", "この", "という", "その", "この", "という", "その", "この", "という", "その", "この", "という", "その", "この", "という", "その", "この", "という", "その"];
  wordFoundIndex = 0;
  isRegenAuto = false;
  isPaused = true;
  chronometer: Chronometer = new Chronometer();
  chronoStarted = false;
  foundCounter = 0;
  failCounter = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.addClass("word-current", "word-" + (this.wordFoundIndex + 1));
    //this.readFile();
  }

  regen() {
    this.selectedWords = [];
    this.generateNewTab();
  }

  regenAuto() {
    this.isRegenAuto = !this.isRegenAuto;
  }

  onKeydown(changement: any) {
    let inputStr = changement.target.value;
    this.checkChrono();

    if(inputStr.trim().toLocaleLowerCase() === toRomaji(this.selectedWords[this.wordFoundIndex])) {
      this.addClass("word-found", "word-" + (this.wordFoundIndex + 1));
      this.foundCounter++;
      this.prepareNextWord(changement);
    } else if(inputStr.trim().length !== 0 && inputStr.slice(inputStr.length - 1) === " ") {
      this.addClass("word-fail", "word-" + (this.wordFoundIndex + 1));
      this.failCounter++;
      this.prepareNextWord(changement);
    }
  }

  pause() {
    this.isPaused = !this.isPaused;
    if(this.isPaused) {
      this.chronometer.start();
      this.replaceClass("pause", "fa-play", "fa-pause");
    } else {
      this.chronometer.pause();
      this.replaceClass("pause", "fa-pause", "fa-play");
    }
  }

  private addClass(className: string, elementName: string) {
    let element = document.getElementById(elementName);
    element?.classList.add(className);
  }

  private replaceClass(id: string, oldClass: string, newClass: string) {
    let element = document.getElementById(id);
    element?.classList.replace(oldClass, newClass);

  }

  private prepareNextWord(inputValue : any) {
    this.wordFoundIndex++;
    inputValue.target.value = "";
    this.addClass("word-current", "word-" + (this.wordFoundIndex + 1));
  }

  private checkChrono() {
    if(!this.chronoStarted) {
      this.chronometer.start(); 
      this.chronoStarted = true;
    }
  }


  // Vider puis remplir le tableau selectedWords avec des mots randoms du fichier "../../assets/res/jap.txt"
  // Les mots ne doivent pas contenir de kanji (soit replacé par les hiragana ou katakana correspondants 
  // ou alors en mode Furigana
  // Donc soit faut changer le txt et remplacer tous les kanjis soit utiliser un truc et le faire ici à la volée.

  // Méthode à utiliser lors d'un click depuis la méthode regen
  private generateNewTab() {
    this.selectedWords = [];
    
  }


  /*
  private readFile() {
    let array : string[] = [];
    this.http.get("../../assets/res/jap.txt", {responseType: 'text'})
        .subscribe(data => { console.log(data) });

  }
  */

}
