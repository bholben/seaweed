import { Component } from '@angular/core';
import { PopoverController } from 'ionic-angular';
import * as jsSha from 'jssha';
import * as bip39 from 'bip39';

import { PhraseInfoPopover } from '../phrase-info-popover/phrase-info-popover';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  generator = 'single';
  phrase: string;
  wordCount = 24;
  mnemonic: string;
  isEmptyError = false;

  constructor(
    private popoverCtrl: PopoverController,
  ) {}

  ngOnInit() {
    console.log(this);
  }

  clickPhraseQuestion(ev) {
    this.popoverCtrl.create(PhraseInfoPopover).present({ ev });
  }

  clickSubmit() {
    this.toMnemonic(this.phrase, +this.wordCount);
  }

  private toMnemonic(phrase: string, wordCount: number) {
    if (!phrase) return this.isEmptyError = true;

    const hashLength = 8 * wordCount / 3;
    let shaObj = new jsSha('SHA-256', 'TEXT');
    shaObj.update(phrase + '\n');
    const x = shaObj.getHash('HEX').substr(0, hashLength);
    this.mnemonic = bip39.entropyToMnemonic(x);
  }

}
