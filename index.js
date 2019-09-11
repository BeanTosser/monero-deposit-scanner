/**
 * Sample browser application which uses a JavaScript library to interact
 * with a Monero daemon using RPC and a Monero wallet using RPC and WASM
 * bindings.
 */

"use strict"

// import what you want to use
const MoneroDaemonRpc = require("monero-javascript").MoneroDaemonRpc;
const MoneroWalletRpc = require("monero-javascript").MoneroWalletRpc;
const MoneroWalletLocal = require("monero-javascript").MoneroWalletLocal;

// start the application
startApp();
async function startApp() {
  console.log("Starting app...");
  
  // connect to monero-daemon-rpc
  let daemon = new MoneroDaemonRpc({uri: "http://localhost:38081", user: "superuser", pass: "abctesting123"});
  console.log("Daemon height: " + await daemon.getHeight());
  
  // connect to monero-wallet-rpc
  let walletRpc = new MoneroWalletRpc({uri: "http://localhost:38083", user: "rpc_user", pass: "abc123"});
  await walletRpc.openWallet("test_wallet_1", "supersecretpassword123");
  console.log("Wallet rpc mnemonic: " + await walletRpc.getMnemonic());
  console.log("Wallet rpc balance: " + await walletRpc.getBalance());
  
  // create a wallet from mnemonic using local wasm bindings
  let mnemonic = "nagged giddy virtual bias spying arsenic fowls hexagon oars frying lava dialect copy gasp utensils muffin tattoo ritual exotic inmate kisses either sprig sunken sprig";
  let primaryAddress = "59aZULsUF3YNSKGiHz4JPMfjGYkm1S4TB3sPsTr3j85HhXb9crZqGa7jJ8cA87U48kT5wzi2VzGZnN2PKojEwoyaHqtpeZh";  // just for reference
  let walletLocal = new MoneroWalletLocal({daemon: daemon, mnemonic: mnemonic});
  console.log("Local wallet address: " + await walletLocal.getPrimaryAddress());
  console.log("Local wallet height: " + await walletLocal.getHeight());
  if (primaryAddress !== await walletLocal.getPrimaryAddress()) throw "Addresses do not match";
  
  // sync the wallet
//  await wallet.sync(undefined, function(progress) {
//    console.log(progress.percent);
//  });
//  console.log("Done syncing?");
  console.log("Done");
}