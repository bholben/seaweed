import { Component } from '@angular/core';
import { PopoverController, ToastController } from 'ionic-angular';
import * as jssha from 'jssha';
import { entropyToMnemonic } from 'bip39';

import { PhraseInfoPopover } from '../phrase-info-popover/phrase-info-popover';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  generator = 'BIP39';
  phrase: string;
  wordCount = 24;
  generated: string;
  mnemonic: string;
  isEmptyError = false;

  isCopied = false;

  constructor(
    private popoverCtrl: PopoverController,
    private toastCtrl: ToastController,
  ) {}

  ngOnInit() {
    console.log(this);
  }

  clickPhraseQuestion(ev) {
    this.popoverCtrl.create(PhraseInfoPopover).present({ ev });
  }

  clickGenerate() {
    this.mnemonic = '';
    if (this.phrase) {
      this.generated = this.generator;
      this.buildMnemonic(this.phrase, +this.wordCount);
      this.isEmptyError = false;
    } else {
      this.isEmptyError = true;
    }
  }

  clickClipboard(event) {
    this.toastCtrl.create({
      message: 'Seed words copied to clipboard',
      duration: 2500,
      cssClass: 'seed-toast',
    }).present();
  }

  private buildMnemonic(phrase: string, wordCount: number) {
    const hashLength = 8 * wordCount / 3;
    const shaObj = new jssha('SHA-256', 'TEXT');
    shaObj.update(phrase);
    const hash = shaObj.getHash('HEX').substr(0, hashLength);
    this.mnemonic = entropyToMnemonic(hash);

    console.log({phrase});
    console.log({hash});
    console.log({mnemonic: this.mnemonic});
  }

}
