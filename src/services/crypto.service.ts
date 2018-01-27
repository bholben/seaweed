import { Injectable } from '@angular/core';
import * as jssha from 'jssha';
import { entropyToMnemonic, mnemonicToSeedHex } from 'bip39';
import * as bitcoin from 'bitcoinjs-lib';
import * as base58check from 'base58check';

// import { cnUtil } from '../assets/js/cryptonote_utils.js';
// import * as mnemonic from '../assets/js/mnemonic.js';
// import { cnBase58 } from '../assets/js/cryptonote_base58.js';

@Injectable() export class CryptoService {

  buildBip39Mnemonic(phrase: string, wordCount: number): string {
    const hashLength = 8 * wordCount / 3;
    const shaObj = new jssha('SHA-256', 'TEXT');
    shaObj.update(phrase);
    const hash = shaObj.getHash('HEX').substr(0, hashLength);
    return entropyToMnemonic(hash);
  }

  buildBip32(
    mnemonic: string,
    passphrase: string = '',
    derivation: string = "m/44'/128'/0'"
  ): any {
    const seedHex = mnemonicToSeedHex(mnemonic, passphrase);
    const root = bitcoin.HDNode.fromSeedHex(seedHex);
    // const privateKeyHd = root.derivePath(derivation).toBase58();
    const privateKeyWifEc = root.derivePath(derivation).keyPair.toWIF();
    const privateKeyEc = base58check.decode(privateKeyWifEc, 'hex').data.substr(0, 64);

    // return this.buildMonero(privateKeyEc).mn;
  }

  // private buildMonero(hexSeed: string): any {
  //   const privSpendKey = cnUtil().sc_reduce32(hexSeed);
  //   const privViewKey = cnUtil().sc_reduce32(cnUtil().cn_fast_hash(privSpendKey));
  //   const pubSpendKey = cnUtil().sec_key_to_pub(privSpendKey);
  //   const pubViewKey = cnUtil().sec_key_to_pub(privViewKey);
  //   const mn = mnemonic.mn_encode(privSpendKey);
  //   const moneroAddress = this.buildMoneroAddress(pubSpendKey, pubViewKey);

  //   return {
  //     privSpendKey,
  //     privViewKey,
  //     pubSpendKey,
  //     pubViewKey,
  //     mn,
  //     moneroAddress,
  //   };
  // }

  // private buildMoneroAddress(
  //   pubSpendKey: string,
  //   pubViewKey: string,
  //   netbyte = '12',
  //   pid = '',
  // ): string {
  //   const preAddr = netbyte + pubSpendKey + pubViewKey + pid;
  //   const hash = cnUtil().cn_fast_hash(preAddr);
  //   const addrHex = preAddr + hash.slice(0,8);

  //   return cnBase58.encode(addrHex);
  // }

}
