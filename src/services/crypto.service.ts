import { Injectable } from '@angular/core';
import * as jssha from 'jssha';
import { entropyToMnemonic, mnemonicToSeedHex } from 'bip39';
import * as bitcoin from 'bitcoinjs-lib';
import * as base58check from 'base58check';
import { monero_utils as mu, monero_wallet_utils as mwu } from 'mymonero-core-js';

// import { cnBase58 } from '../assets/js/cryptonote_base58.js';

@Injectable() export class CryptoService {

  buildBip39Mnemonic(phrase: string, wordCount: number): string {
    const hashLength = 8 * wordCount / 3;
    const shaObj = new jssha('SHA-256', 'TEXT');
    shaObj.update(phrase);
    const hash = shaObj.getHash('HEX').substr(0, hashLength);
    return entropyToMnemonic(hash);
  }

  buildBip32( mnemonic: string, passphrase: string = '', accountNumber: number): any {
    accountNumber = accountNumber || 0;
    const derivation = `m/44'/128'/${accountNumber}'`;
    const seedHex = mnemonicToSeedHex(mnemonic, passphrase);
    const root = bitcoin.HDNode.fromSeedHex(seedHex);
    // const privateKeyHd = root.derivePath(derivation).toBase58();
    const privateKeyWifEc = root.derivePath(derivation).keyPair.toWIF();
    const privateKeyEc = base58check.decode(privateKeyWifEc, 'hex').data.substr(0, 64);

    return this.buildMonero(privateKeyEc).mn;
  }

  private buildMonero(hexSeed: string): any {
    const privSpendKey = mu.sc_reduce32(hexSeed);
    const privViewKey = mu.sc_reduce32(mu.cn_fast_hash(privSpendKey));
    const pubSpendKey = mu.sec_key_to_pub(privSpendKey);
    const pubViewKey = mu.sec_key_to_pub(privViewKey);
    const mn = mwu.MnemonicStringFromSeed(privSpendKey);
    const moneroAddress = this.buildMoneroAddress(pubSpendKey, pubViewKey);

    return {
      privSpendKey,
      privViewKey,
      pubSpendKey,
      pubViewKey,
      mn,
      moneroAddress,
    };
  }

  private buildMoneroAddress(
    pubSpendKey: string,
    pubViewKey: string,
    netbyte = '12',
    pid = '',
  ): string {
    const preAddr = netbyte + pubSpendKey + pubViewKey + pid;
    const hash = mu.cn_fast_hash(preAddr);
    const addrHex = preAddr + hash.slice(0,8);
    // const address = cnBase58.encode(addrHex);
    // return cnBase58.encode(addrHex);

    return 'not implemented yet' || addrHex;
  }

}
