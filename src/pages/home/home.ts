import { Component } from '@angular/core';
import { Platform, PopoverController, ToastController } from 'ionic-angular';

import { CryptoService } from '../../services/crypto.service';
import { PhraseInfoPopover } from '../phrase-info-popover/phrase-info-popover';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  generator = 'BIP39';
  phrase: string;
  wordCount = 24;
  passphrase: string = '123';
  generated: string;
  mnemonic: string;
  isMobile = false;

  constructor(
    private platform: Platform,
    private popoverCtrl: PopoverController,
    private toastCtrl: ToastController,
    private cryptoSvc: CryptoService,
  ) {}

  ngOnInit() {
    console.log(this);
    this.isMobile = this.platform.is('mobile');
  }

  clickPhraseQuestion(ev) {
    this.popoverCtrl.create(PhraseInfoPopover).present({ ev });
  }

  clickGenerate() {
    this.mnemonic = '';
    if (this.phrase) {
      this.generated = this.generator;
      const bip39Mnemonic = this.cryptoSvc.getBip39Mnemonic(this.phrase, +this.wordCount);
      if (this.generated === 'BIP39') {
        this.mnemonic = bip39Mnemonic;
      }
      if (this.generated === 'Electrum') {
        this.mnemonic = this.cryptoSvc.getMonero(bip39Mnemonic, this.passphrase);
      }
    }
  }

  clickClipboard(event) {
    this.toastCtrl.create({
      message: 'Seed words copied to clipboard',
      duration: 2500,
      cssClass: 'seed-toast',
    }).present();
  }

}
