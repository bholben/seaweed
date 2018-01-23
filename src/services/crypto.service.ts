import { Injectable } from '@angular/core';
import * as jssha from 'jssha';
import { entropyToMnemonic, mnemonicToSeedHex } from 'bip39';
import * as bitcoin from 'bitcoinjs-lib';
import * as base58check from 'base58check';

@Injectable() export class CryptoService {

  getBip39Mnemonic(phrase: string, wordCount: number): string {
    const hashLength = 8 * wordCount / 3;
    const shaObj = new jssha('SHA-256', 'TEXT');
    shaObj.update(phrase);
    const hash = shaObj.getHash('HEX').substr(0, hashLength);
    return entropyToMnemonic(hash);
  }

  getMonero(
    mnemonic: string,
    passphrase: string = '',
    derivation: string = "m/44'/128'/0'"
  ): any {
    const seedHex = mnemonicToSeedHex(mnemonic, passphrase);
    const root = bitcoin.HDNode.fromSeedHex(seedHex);
    const privateKeyHd = root.derivePath(derivation).toBase58();
    const privateKeyWifEc = root.derivePath(derivation).keyPair.toWIF();
    const privateKeyEc = base58check.decode(privateKeyWifEc, 'hex').data.substr(0, 64);
    return privateKeyEc;
  }

}
