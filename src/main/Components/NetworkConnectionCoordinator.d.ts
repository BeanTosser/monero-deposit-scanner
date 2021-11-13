import React from 'react';
import MoneroNetworkType from "monero-javascript";

export interface NetworkConnectionCoordinatorProps {
      mainnetNodeAddress?: string[],
      stagenetNodeAddress?: string[],
      testnetNodeAddress?: string[]
}

declare const NetworkSelector: React.FunctionComponent<NetworkSelectorProps>

export default NetworkSelector;