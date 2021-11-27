
import fs from 'fs';
type fs = typeof fs;

declare module 'monero-javascript' {
  export module LibraryUtils {
    function loadFullModule(): Promise<MoneroWalletFull>;
  }
  
  export function connectToDaemonRpc(uriOrConfigOrConnection: MoneroRpcConnection): MoneroDaemonRpc;
  
  export function createWalletFull(config: {
    path?: string,
    password?: string,
    networkType?: string | number,
    mnemonic?: string,
    seedOffset?: string,
    primaryAddress?: string,
    privateViewKey?: string,
    privateSpendKey?: string,
    restoreHeight?: number,
    language?: string,
    serverUri?: string,
    serverUsername?: string,
    serverPassword?: string,
    rejectUnauthorized?: boolean,
    server?: MoneroRpcConnection | MoneroRpcConfig,
    proxyToWorker?: boolean,
    fs?: fs
  }): MoneroWalletFull
  
  type MoneroRpcConfig = {
    uri: string,
    username?: string,
    password?: string,
    rejectUnauthorized?: boolean
  }
  
  export module MoneroNetworkType {
    const MAINNET: number;
    const STAGENET: number;
    const TESTNET: number;
  }
  
  export class MoneroTxWallet {
    getReceivedTimestamp(): number;
    getFee(): BigInteger;
    getIncomingAmount(): BigInteger;
    getHeight(): number;
    getHash(): string;
    isConfirmed(): boolean;
  }
  
  export class MoneroRpcConnection {
    constructor(uriOrConfigOrConnection);
  }
  
  export class MoneroDaemonRpc {
    getBlockHeaderByHeight(height: number): Promise<MoneroBlockHeader>;
    getRpcConnection(): Promise<MoneroRpcConnection>;
    getHeight(): Promise<number>;
  }
  
  export class MoneroBlockHeader {
    getTimestamp(): number;
  }
  
  export module MoneroUtils {
    function validatePrivateViewKey(viewKey: string): void;
    function isValidAddress(address: string, networkType: MoneroNetworkType): boolean;
  }
  

  
  export class MoneroWalletFull{
    addListener(listener: MoneroWalletListener): Promise<void>;
    sync(listener: any, startHeight: any, allowConcurrentCalls: boolean): Promise<any>;
    startSyncing(syncPeriod: any): Promise<void>;
    isSynced(): Promise<boolean>;
    getHeightByDate(year: number, month: number, day: number): Promise<number>;
    getTx(hash: string): Promise<MoneroTxWallet>;
    getTxs(query: any): Promise<MoneroTxWallet[]>;
    getPrivateViewKey(): Promise<string>;
    getAddress(accountIdx: number, subaddressIdx: number): Promise<string>; 
  }
  
  export class MoneroWalletListener {
    
  }
  
  export class MoneroOutputWallet {
    getTx(): MoneroTxWallet;
  }
  
  export class MoneroNetworkType {
    MAINNET: number;
    STAGENET: number;
    TESTNET: number;
  }
 
  //function BigInteger(n: number): Uint8Array;
  
  export class BigInteger {
    BigInteger(): Uint8Array;
    BigInteger(n: number): Uint8Array;
  }
}