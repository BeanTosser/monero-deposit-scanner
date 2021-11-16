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
 
import React, { useRef } from 'react';
const monerojs = require("monero-javascript");
const MoneroNetworkType = monerojs.MoneroNetworkType;

export default function(props) {
  console.log("Rendering networkselector");
  
  /*
   * props:
   * networkTypeFlags
   * setNetworkType
   */ 
   
  const availableNetworkOptions = useRef(null);
  
  const handleSelect = function(event) {
    console.log("You chose the network type: " + event.target.value);

    if (event.target.value === "mainnet") {
      console.log("set network type to " + MoneroNetworkType.MAINNET);
      props.setNetworkType(MoneroNetworkType.MAINNET);
    } else if (event.target.value === "stagenet") {
      console.log("set network type to " + MoneroNetworkType.STAGENET);
      props.setNetworkType(MoneroNetworkType.STAGENET);
    } else if (event.target.value === "testnet") {
      props.setNetworkType(MoneroNetworkType.TESTNET);
    } else {
      thow("Something went wrong with network selection");
    }

  }
  
  // Sanity check networkTypeFlags value - there must be at least two and no more than three available networks
  if(props.networkTypeFlags < 2 || props.networkTypeFlags > 7) {
    throw(props.networkTypeFlags + " is not a valid networkTypeFlag!");
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
  
  availableNetworkOptions.current = availableJsxOptions;
  
  return (
    <>
      <label htmlFor="network-select">Choose a Monero network</label>

      <select 
        name = "network-select" 
        className = "network-select"
        onChange = {handleSelect}>
          {availableNetworkOptions.current}
      </select>
    </>
  )
}