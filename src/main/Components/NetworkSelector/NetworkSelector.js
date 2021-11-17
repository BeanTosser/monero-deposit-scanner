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
   * networkTypes
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
  
  // Sanity check networkTypes
  // There must be at least two and no more than three available networks
  if(props.networkTypes.length >= 2 && props.networkTypes.length <= 3) {
    // Keep track of selected network types to check for invalid repeats
    let chosenNetworks = [];
    availableNetworkOptions.current = props.networkTypes.map(networkTypeInteger => {
      //Make sure the value is not a repeat
      if(chosenNetworks.indexOf(networkTypeInteger) === -1){
        // The value is valid. add it to the available network types
        chosenNetworks.push(networkTypeInteger);
        switch(networkTypeInteger) {
          case 0:
            console.log("adding mainnet");
            return (
              <option
                value = "mainnet"
                key = "mainnet"
              >
                mainnet
              </option>
            )
          case 1:
          console.log("Adding stagenet");
            return (
              <option
                value = "stagenet"
                key = "stagenet"
              >
                stagenet
              </option>
            )
          case 2:
            console.log("Adding testnet");
            return (
              <option
                value = "testnet"
                key = "testnet"
              >
                testnet
              </option>
            )
          default:
            throw("networkTypes values must be between 0 and 2");
        }
      } else {
          throw("The networkTypes array must not contain duplicate values");
      }

    })
  } else {
    throw("networkTypes must have exactly two or three elements");
  }
  
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