import { Component } from '@angular/core';
import { Platform, PopoverController, ToastController } from 'ionic-angular';

import { CryptoService } from '../../services/crypto.service';
import { PhraseInfoPopover } from '../phrase-info-popover/phrase-info-popover';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  input = {
    phrase: 'AN_unsafe^MONER0$brainWALLET',
    // phrase: '',
    segment: 'BIP39',
    wordCount: 24,
    passphrase: '123',
    // passphrase: '',
    accountNumber: '',
  };
  bip39Mnemonic: string;
  bip32Mnemonic: string;
  mnemonic: string;
  isMobile = false;

  constructor(
    private platform: Platform,
    private popoverCtrl: PopoverController,
    private toastCtrl: ToastController,
    private cryptoSvc: CryptoService,
  ) {}

  ngOnInit() {
    this.isMobile = this.platform.is('mobile');
    this.changeForm();
  }

  clickPhraseInfo() {
    this.popoverCtrl.create(PhraseInfoPopover).present();
  }

  changeForm() {
    this.bip39Mnemonic = '';
    if (this.input.phrase) {
      this.bip39Mnemonic = this.cryptoSvc.buildBip39Mnemonic(this.input.phrase, +this.input.wordCount);
      this.bip32Mnemonic = this.cryptoSvc.buildBip32(this.bip39Mnemonic, this.input.passphrase, +this.input.accountNumber);
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
