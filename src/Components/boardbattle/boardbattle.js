import React from 'react'

import arrToItarate from "../board/utils"

import "../board.scss"

import Carrier from "../ships/carrier"
import Battleship from "../ships/battleship"
import Destroyer from "../ships/destroyer"
import Submarine from "../ships/submarine"
import Patrol from "../ships/patrol"

import Cell from "../cell/cell"
 
import {useState} from "react"

const Boardbattle = ({shipsStartPosition}) => {
    return (
        <div className="boards-container">
            <div className="board-container">
                <div className="board-grid battle">
                    <Carrier hasCarrierPlaced={true} startPosition = {shipsStartPosition.carrier.start} axis={shipsStartPosition.carrier.axis}/>
                    <Battleship hasBattleshipPLaced={true} startPosition = {shipsStartPosition.battleship.start} axis={shipsStartPosition.battleship.axis}/>
                    <Destroyer hasDestroyerPLaced={true} startPosition = {shipsStartPosition.destroyer.start} axis={shipsStartPosition.destroyer.axis}/>
                    <Submarine hasSubmarinePLaced={true} startPosition = {shipsStartPosition.submarine.start} axis={shipsStartPosition.submarine.axis}/>
                    <Patrol hasPatrolPLaced={true} startPosition = {shipsStartPosition.patrol.start} axis={shipsStartPosition.patrol.axis}/>                    
                </div>
            </div>
            <div className="board-container">
                <div className="board-grid">
                    {
                        arrToItarate.map((item, i)=>(
                            <Cell key={i}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Boardbattle
