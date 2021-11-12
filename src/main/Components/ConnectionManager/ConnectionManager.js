/*
 * ConnectionManager
 *
 * This is a React component that serves as a graphical interface for the monero-javascript ConnectionManager class.
 *
 */

import React, {useState, useRef}from 'react';
import "./ConnectionManager.css";
import ReloadButtonImage from './reload.svg';
import CloseButtonImage from './close.svg';
import AddNodeButtonImage from './add_node.svg';

const DEFAULT_NODES = [
  {
    address: "https://node.melo.tools:18081",
    status: 1
  },
  {
    address: "https://moneroworld.com:18081",
    status: 1
  },
  {
    address: "https://youshouldrunyourownnode.com:18081",
    status: 1
  },
  {
    address: "https://localhost:18081",
    status: 1
  },
]

export default function(props) {
  
  /*
   * Refresh checks the status of each node and updates its "button" on the list
   * to reflect that status.
   *
   * Refresh runs when:
   * 1. the user clicks the refresh button
   * 2. the app starts
   * 3. the user opens the network selector menu
   */
  const refresh = function(){
      
  }
  
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  
  const nodes = useRef(DEFAULT_NODES.slice());
  
  const onHeaderClick = function(){
    if(!menuIsOpen) {
      setMenuIsOpen(true);
    }
  }
  
  const closeMenu = function() {
    setMenuIsOpen(false);
  }
  
  // Create an array of NetworkSelectorItems from the node list
  let selectorItems = nodes.current.map(function(item, index){
    return(
      <NetworkSelectorItem 
        networkStatus = {item.status}
        networkAddress = {item.address}
        key = {index}
      / >
    );
  })
  
  // Insert the network selector header bar at the beginning of the selectorItems array
  selectorItems.unshift();
  
  // blackout_screen: a translucent black background that serves to "fade out" the main page while the menu is open
  
  let clickFunction;
  /* 
   * The name of the CSS class (is_hidden) that sets the visibility of an 
   * element within the network selector to "hidden"
   */
  let visibilityClassname; 
  if(!menuIsOpen){
    clickFunction = onHeaderClick;
    visibilityClassname = "is_hidden"
  }
    
  return (
    <>
      <div 
        className = {"blackout_screen " + visibilityClassname}
        onClick = {closeMenu}
      >
      </div>
      <div className = "network_selector">
        <div 
          className = "network_selector_item network_selector_header"
          onClick = {clickFunction}
        >
          <img src = {CloseButtonImage} alt = "Close Button" />
          Select a node
          <img src = {ReloadButtonImage} alt = "Reload Button" />
          <img src = {AddNodeButtonImage} alt = "Add Node Button" />
        </div>
        <div 
          className = {"network_selector_items_container " + visibilityClassname}
        >
          {selectorItems}
        </div>
      </div>
    </> 
  )
}

function NetworkSelectorItem (props){
  /*
   * **PROPS**
   * networkStatus
   * networkAddress
   */
   
   console.log("Rendering node " + props.networkAddress);
   
  return(
    <div className = "network_selector_item">
      {props.networkAddress}
      <div className = "connection-indicator-circle">
      </div>
    </div>
  )
}