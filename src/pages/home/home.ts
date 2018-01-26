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
    // phrase: 'Congrats with your success!',
    // phrase: 'AN_unsafe^MONER0$brainWALLET',
    phrase: '',
    bip: 'BIP39',
    wordCount: 24,
    // passphrase: '123',
    passphrase: '',
  };
  bip39Mnemonic: string;
  bip32Mnemonic: string;
  mnemonic: string;
  isMobile = false;
  clickPhraseDetails = () => this.popoverCtrl.create(PhraseInfoPopover).present();

  constructor(
    private platform: Platform,
    private popoverCtrl: PopoverController,
    private toastCtrl: ToastController,
    private cryptoSvc: CryptoService,
  ) {}

  ngOnInit() {
    console.log(this);
    this.isMobile = this.platform.is('mobile');
    this.changeModel();
  }

  changeModel() {
    this.bip39Mnemonic = '';
    if (this.model.phrase) {
      this.bip39Mnemonic = this.cryptoSvc.getBip39Mnemonic(this.model.phrase, +this.model.wordCount);
      this.bip32Mnemonic = this.cryptoSvc.getMonero(this.bip39Mnemonic, this.model.passphrase);
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
