import React from 'react'

import MarketPlace from "./gameboardComponents/marketPlace";
import ArmyCenter from "./gameboardComponents/armyCenter";
import WoodCutter from "./gameboardComponents/woodCutter";
import StoneMine from "./gameboardComponents/stoneMine";
import CoalMine from "./gameboardComponents/coalMine";
import FishermansSquare from "./gameboardComponents/fishermansSquare";
import Cornfield from "./gameboardComponents/cornfield";

class Gameboard extends React.Component {

    render() {
        return (
            <div className="board">
                <MarketPlace></MarketPlace>
                <ArmyCenter></ArmyCenter>
                <WoodCutter></WoodCutter>
                <StoneMine></StoneMine>
                <CoalMine></CoalMine>
                <FishermansSquare></FishermansSquare>
                <Cornfield></Cornfield>
            </div>
        );
    }
}

export default Gameboard;