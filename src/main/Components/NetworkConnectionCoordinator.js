/*
 * NetworkConnectionCoordinator
 *
 * This react component encapsulates coordinates the NetworkSelector and ConnectionManager components when they are used together.
 * Specifically, this component notifies the ConnectionManager when the user changes the current network type.
 * This allows the ConnectionManager to automatically switch to a node or set of nodes running on the specified network.
 *
 * Applications implementing this component must supply at least two and no more than three arrays of default node addresses as props:
 *    mainnetNodeAddress[]
 *    stagenetNodeAddress[]
 *    testnetNodeAddress[]
 * If only one default node array is specified, this component throws an exception explaining that the implementing app should implement
 * ConnectionManager directly as they have no need for a NetworkSelector.
 * Given two or three nodes, this component creates:
 *   1. A NetworkSelector component allowing app users to select from among the relevant nodes
 *   2. A ConnectionManager that will contain and manage connection to the supplied nodes belonging to the currently selected network
 */

import React, {useEffect} from "React";

export default function(props){

  // On first render, the coordinator will check the supplied default nodes

  const [currentNetworkType, setCurrentNetworkType] = useState();

  const setNetworkType = function(networkType){
    currentNetworkType.current = networkType; 
  }

  return(
    <div>
      
    </div>
  )
}