import React from 'react';
import MoneroNetworkType from "monero-javascript";

export interface NetworkSelectorProps {
    setNetworkType: (networkType: MoneroNetworkType) => void
}

declare const NetworkSelector: React.FunctionComponent<NetworkSelectorProps>

export default NetworkSelector;