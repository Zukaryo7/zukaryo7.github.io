import { KANAS } from './../../environments/kanaData';
import { Component, OnInit } from '@angular/core';
import { toRomaji, toKatakana, toHiragana } from 'wanakana';


@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  kanas = KANAS.baseKanas;

  constructor() { }

  ngOnInit(): void {
  }

  toHiragana(string: string) {
    return toHiragana(string);
  }

  toKatakana(string: string) {
    return toKatakana(string);
  }

}
