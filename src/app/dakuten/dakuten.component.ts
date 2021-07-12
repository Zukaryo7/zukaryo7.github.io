import { Component, OnInit } from '@angular/core';
import { KANAS } from 'src/environments/kanaData';
import { toRomaji, toKatakana, toHiragana } from 'wanakana';

@Component({
  selector: 'app-dakuten',
  templateUrl: './dakuten.component.html',
  styleUrls: ['./dakuten.component.scss']
})
export class DakutenComponent {

  kanas = KANAS.diacritics;

  constructor() {

  }

  toHiragana(string: string) {
    return toHiragana(string);
  }

  toKatakana(string: string) {
    return toKatakana(string);
  }

}
