/*
 * NetworkConnectionCoordinator
 *
 * This react component encapsulates coordinates the NetworkSelector and ConnectionManager components when they are used together.
 * Specifically, this component notifies the ConnectionManager when the user changes the current network type.
 * This allows the ConnectionManager to automatically switch to a node or set of nodes running on the specified network.
 *
 * Applications implementing this component must supply at least two and no more than three arrays of default node addresses as props:
 *    mainnetNodeAddresses[]
 *    stagenetNodeAddresses[]
 *    testnetNodeAddresses[]
 * If only one default node array is specified, this component throws an exception explaining that the implementing app should implement
 * ConnectionManager directly as they have no need for a NetworkSelector.
 * Given two or three nodes, this component creates:
 *   1. A NetworkSelector component allowing app users to select from among the three monero networks
 *   2. A ConnectionManager that will contain and manage connections to the supplied nodes in the current selected network
 */

import React, {useState, useEffect, useRef} from "React";
import MoneroNetworkType from 'monero-javascript';

import ConnectionManager from './ConnectionManager/ConnectionManager.js';
import NetworkSelector from './NetworkSelector/NetworkSelector.js';
export default function(props){
  /*
   * PROPS:
   *   mainnetNodeAddresses[]
   *   stagenetNodeAddresses[]
   *   testnetNodeAddresses[]
   *   
   */
  // On first render, the coordinator will check the supplied default nodes
  const networkTypeFlags = useRef(0);
  useEffect(
    function(){
      // TODO - default node lists should only be able to be set once - on the first render. This will prevent errors
      /*
       * networkTypeFlags is an integer representation of a 3-digit binary value between 0 and 7 ()inclusive)
       * each digit represents whether a node list was supplied (1) or not (0) for one of the three monero networks in the order:
       *   1. Mainnet
       *   2. Stagenet
       *   3. Testnet
       * For example, the binary value to indicate that the app implementing this component provided only a stagenet node 
       * list would be:
       *   010
       * So the integer value of networkTypeFlags would be 2
       * Based on this system, this component can make the following deductions:
       *   If networkTypeFlags === 0: no node lists were supplied
       *   if networkTypeFlags === 1, 2, or 4, only one node list was provided
       *   if networkTypeFlags > 7, more than three node lists were provided
       *   otherwise exactly 2 or 3 nodes were provided
       * Only the last case in the above list is valid!
       */
      
      if(props.mainnetNodeAddresses !== null && props.mainnetNodeAddresses !== undefined) {
        networkTypeFlags += 1;
      }
      if(props.stagenetNodeAddresses !== null && props.sstagenetNodeAddresses !== undefined) {
        networkTypeFlags += 2;
      }
      if(props.testetNodeAddresses !== null && props.stagenetNodeAddresses !== undefined) {
        networkTypeFlags += 4;
      }
    }
  , [])

  const [currentNodeList, setCurrentNodeList] = useState();

  const setNetworkType = function(networkType){
    switch(networkType){
      case MoneroNetworkType.MAINNET:
        setCurrentNodeList(props.mainnetNodeAddresses);
        break;
      case MoneroNetworkTYpe.STAGENET:
        setCurrentNodeList(props.stagenetNodeAddresses);
        break;
      case MoneroNetworkType.TESTNET:
        setCurrentNodeList(propse.testnetNodeAddresses);
        break;
      default:
        throw("Invalid network type selected");
    }
  }

  return(
    <div>
      <NetworkSelector 
        setNetworkType = {setNetworkType}
      />
      <ConnectionManager
        nodes = {currentNodeList}
      />
    </div>
  )
}