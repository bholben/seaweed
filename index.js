const bitcoin = require('bitcoinjs-lib');
const bip39 = require('bip39');
const base58check = require('base58check');

const mnemonic = 'mom old mention equip myth stairs daring quit plastic civil patient slender young gown tank primary topple work pet source lecture chair load sorry';
const seedHex = bip39.mnemonicToSeedHex(mnemonic, '123');
const root = bitcoin.HDNode.fromSeedHex(seedHex);

const privateKeyHd = root.derivePath("m/44'/128'/0'").toBase58();
console.log({privateKeyHd});

const privateKeyWifEc = root.derivePath("m/44'/128'/0'").keyPair.toWIF();
const privateKeyEc = base58check.decode(privateKeyWifEc, 'hex').data.substr(0, 64);
console.log({privateKeyEc});


'xprv9zT58WBjqRCXJyWsYvHgP3JW7SjvFL7gAR6rD4AvyEuUacT3qmHk56JEpowmpf8tmSJ14Fv7VSV2dozzhThPysaBy8HXnxBhbyQcRwdqYMV'
'3f7206193bd0a465848455ab111391219bfe65aaa0375ec4bed28b2fc3908244' // <--- WINNER
