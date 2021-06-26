import { Component } from '@angular/core';
import { toRomaji } from 'wanakana';
import { Chronometer } from 'ngx-chronometer';
import { addClass, replaceClass, removeClass } from 'src/environments/dom';

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
  chronometer: Chronometer = new Chronometer();
  chronoStarted = false;
  chronoPaused = true;

  constructor() {
    this.generateNewTab();
  }

  ngAfterViewInit(): void {
    this.prepareNextWord();
  }

  onKeyUp(changement: any) {
    let inputStr = changement.target.value.trim().toLocaleLowerCase();
    let toFound = toRomaji(this.selectedWords[this.wordFoundIndex]);
    if(inputStr === "" || inputStr.length > toFound.length)
      this.resetInput(changement);
    else if(inputStr.length === toFound.length) {
        inputStr === toFound ? this.updateWordStatus("word-found") : this.updateWordStatus("word-fail");
        this.resetInput(changement);
        this.wordFoundIndex++;
        if(this.wordFoundIndex === this.selectedWords.length) {
          this.resetCss();
          this.wordFoundIndex = 0;
          this.generateNewTab();
        }
        this.prepareNextWord();
    }
  }

  updateWordStatus(status : string) {
    addClass(status, "word-" + (this.wordFoundIndex + 1));
    status === "word-found" ? this.totalWordsFound++ : this.totalWordsFail++;
    removeClass("word-"+ (this.wordFoundIndex + 1), "word-current");
  }

  prepareNextWord() {
    addClass("word-current", "word-" + (this.wordFoundIndex + 1)); 
  }

  resetInput(inputValue : any) {
    inputValue.target.value = "";
  }




  
  // Vider puis remplir le tableau selectedWords avec des mots randoms du fichier "../../assets/res/jap.txt"
  // Les mots ne doivent pas contenir de kanji (remplacés par des hiragana ou katakana correspondants ou furigana)
  // Soit changer le txt et remplacer tous les kanjis soit utiliser un truc et le faire ici à la volée.
  // La méthode est appelée automatiquement au chargement de la page ou lorsque le tableau est complété par l'utilisateur
  generateNewTab() {
    this.selectedWords = ["という", "という", "という", "という", "という", "という", "という"];
  }





  resetCss() {
    for(let i = 1; i <= this.wordFoundIndex; i++) {
      removeClass("word-"+ i, "word-found");
      removeClass("word-"+ i, "word-fail");
    }
  }

  startChrono() {
    if(!this.chronoStarted) {
      this.chronometer.start();
      this.chronoStarted = true;
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
