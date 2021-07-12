import { Component, OnInit } from '@angular/core';
import { KANAS } from 'src/environments/kanaData';
import { toRomaji, toKatakana, toHiragana } from 'wanakana';

@Component({
  selector: 'app-combos',
  templateUrl: './combos.component.html',
  styleUrls: ['./combos.component.scss']
})
export class CombosComponent {

  kanas = KANAS.digraphs;

  constructor() {

  }

  toHiragana(string: string) {
    return toHiragana(string);
  }

  toKatakana(string: string) {
    return toKatakana(string);
  }

}
