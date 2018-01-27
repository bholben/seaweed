import { Component } from '@angular/core';
import { Platform, PopoverController, ToastController } from 'ionic-angular';

import { CryptoService } from '../../services/crypto.service';
import { PhraseInfoPopover } from '../phrase-info-popover/phrase-info-popover';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  model = {
    // phrase: 'AN_unsafe^MONER0$brainWALLET',
    // passphrase: '123',
    phrase: '',
    bip: 'BIP39',
    wordCount: 24,
    passphrase: '',
    accountNumber: '',
  };
  bip39Mnemonic: string;
  bip32Mnemonic: string;
  mnemonic: string;
  isMobile = false;
  clickPhraseInfo = () => this.popoverCtrl.create(PhraseInfoPopover).present();

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

  changeForm() {
    this.bip39Mnemonic = '';
    if (this.model.phrase) {
      this.bip39Mnemonic = this.cryptoSvc.buildBip39Mnemonic(this.model.phrase, +this.model.wordCount);
      this.bip32Mnemonic = this.cryptoSvc.buildBip32(this.bip39Mnemonic, this.model.passphrase, +this.model.accountNumber);
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
