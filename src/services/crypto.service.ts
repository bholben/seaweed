import { Injectable } from '@angular/core';
import * as jssha from 'jssha';
import { entropyToMnemonic } from 'bip39';
import * as bitcoin from 'bitcoinjs-lib';
import * as bip32utils from 'bip32-utils';

@Injectable() export class CryptoService {

  constructor() {
    console.log(this);
    console.log(bip32utils);
    this.fiddle();
  }

  getBip39Mnemonic(phrase: string, wordCount: number) {
    const hashLength = 8 * wordCount / 3;
    const shaObj = new jssha('SHA-256', 'TEXT');
    shaObj.update(phrase);
    const hash = shaObj.getHash('HEX').substr(0, hashLength);
    const mnemonic = entropyToMnemonic(hash);

    console.log({phrase});
    console.log({hash});
    console.log({mnemonic});

    return mnemonic;
  }

  fiddle() {

    var m = bitcoin.HDNode.fromSeedHex('12345678123456781234567812345678')
    var i = m.deriveHardened(0)
    var external = i.derive(0)
    var internal = i.derive(1)
    var account = new bip32utils.Account([
      new bip32utils.Chain(external.neutered()),
      new bip32utils.Chain(internal.neutered())
    ])

    console.log(account.getChainAddress(0))
    // => 1QEj2WQD9vxTzsGEvnmLpvzeLVrpzyKkGt

    account.nextChainAddress(0)

    console.log(account.getChainAddress(1))
    // => 1DAi282VN7Ack9o5BqWYkiEsS8Vgx1rLn

    console.log(account.getChainAddress(1))
    // => 1CXKM323V3kkrHmZQYPUTftGh9VrAWuAYX

    console.log(account.derive('1QEj2WQD9vxTzsGEvnmLpvzeLVrpzyKkGt'))
    // => xpub6A5Fz4JZg4kd8pLTTaMBKsvVgzRBrvai6ChoxWNTtYQ3UDVG1VyAWQqi6SNqkpsfsx9F8pRqwtKUbU4j4gqpuN2gpgQs4DiJxsJQvTjdzfA

    // NOTE: passing in the parent nodes allows for private key escalation (see xprv vs xpub)

    console.log(account.derive('1QEj2WQD9vxTzsGEvnmLpvzeLVrpzyKkGt', [external, internal]))
    // => xprv9vodQPEygdPGUWeKUVNd6M2N533PvEYP21tYxznauyhrYBBCmdKxRJzmnsTsSNqfTJPrDF98GbLCm6xRnjceZ238Qkf5GQGHk79CrFqtG4d
  }

}
