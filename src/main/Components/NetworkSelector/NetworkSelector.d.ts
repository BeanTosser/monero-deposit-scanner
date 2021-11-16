import React from 'react';
const monerojs = require("monero-javascript");
const MoneroNetworkType = monerojs.MoneroNetworkType;

export interface NetworkSelectorProps {
  networkTypeFlags: number,
  setNetworkType: (networkType: MoneroNetworkType) => void
}

declare const NetworkSelector: React.FunctionComponent<NetworkSelectorProps>

export default NetworkSelector;