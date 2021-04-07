import React from 'react'
import WoodCutter from "./gameboardComponents/woodCutter";
import StoneMine from "./gameboardComponents/stoneMine";
import CoalMine from "./gameboardComponents/coalMine";
import FishermansSquare from "./gameboardComponents/fishermansSquare";
import Cornfield from "./gameboardComponents/cornfield";

class Gameboard extends React.Component {


    render() {
        return (
            <div className="board">
                <WoodCutter stats={this.props.workplaceStats.woodCutter}
                            assignWorkerHandler={this.props.assignWorkerHandler}
                            levelUpHandler={this.props.levelUpHandler}></WoodCutter>
                <StoneMine stats={this.props.workplaceStats.stoneMine}
                           assignWorkerHandler={this.props.assignWorkerHandler}
                           levelUpHandler={this.props.levelUpHandler}></StoneMine>
                <CoalMine stats={this.props.workplaceStats.coalMine}
                          assignWorkerHandler={this.props.assignWorkerHandler}
                          levelUpHandler={this.props.levelUpHandler}></CoalMine>
                <FishermansSquare stats={this.props.workplaceStats.fisherSquare}
                                  assignWorkerHandler={this.props.assignWorkerHandler}
                                  levelUpHandler={this.props.levelUpHandler}></FishermansSquare>
                <Cornfield stats={this.props.workplaceStats.cornfield}
                           assignWorkerHandler={this.props.assignWorkerHandler}
                           levelUpHandler={this.props.levelUpHandler}></Cornfield>
            </div>
        )
    }

}

export default Gameboard;