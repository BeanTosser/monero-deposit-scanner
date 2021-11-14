/*
 * Network Selector
 *
 * The Network Selector is a basic dropdown menu that allows the user to select a Monero network
 * on which the app will run. The app can then use that information to choose a node running
 * on the chosen network, properly validate wallet addresses for the chosen network type,
 * and so forth.
 */
/*
 * NetworkSelector
 *
 * This is a basic UI for selecting which of the three Monero networks (mainnet, stagenet, and testnet) to used within
 * a monero-javascript-based web application.
 *
 */
 
import React from 'react';
import MoneroNetworkType from "monero-javascript"

export default function(props) {
  
  /*
   * props:
   * networkTypeFlags
   * setNetworkType
   */ 
  
  const handleSelect = function(event) {
    console.log("You chose the network type: " + event.target.value);
    switch(event.target.value){
      case "mainnet":
        props.setNetworkType(MoneroNetworkType.MAINNET);
        break;
      case "stagenet":
        props.setNetworkType(MoneroNetworkType.STAGENET);
        break;
      case "testnet":
        props.setNetworkType(MoneroNetworkType.TESTNET);
        break;
      default:
        thow("Something went wrong with network selection");
    }
  }
  
  // Sanity check networkTypeFlags value - there must be at least two and no more than three available networks
  if(networkTypeFlags < 2 || networkTypeFlags > 7) {
    throw("The value of networkTypeFlags is invalid.");
  }
  
  let availableJsxOptions = [];
  
  if(0b100 & props.networkTypeFlags) {
    availableJsxOptions.push(<option value="mainnet">mainnet</option>)
  } 
  if(0b010 & props.networkTypeFlags) {
    availableJsxOptions.push(<option value="stagenet">stagenet</option>)
  }
  if(0b001 & props.networkTypeFlags) {
    availableJsxOptions.push(<option value="testnet">testnet</option>)
  }
  
  return (
    <>
      <label for="network-select">Choose a Monero network</label>

      <select 
        name = "network-select" 
        className = "network-select"
        onChange = {handleSelect}>
          {availableNetworkOptions}
      </select>
    </>
  )
}