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
                            resourceStats={this.props.resourceStats}
                            assignWorkerHandler={this.props.assignWorkerHandler}
                            levelUpHandler={this.props.levelUpHandler}></WoodCutter>
                <StoneMine stats={this.props.workplaceStats.stoneMine}
                           resourceStats={this.props.resourceStats}
                           assignWorkerHandler={this.props.assignWorkerHandler}
                           levelUpHandler={this.props.levelUpHandler}></StoneMine>
                <CoalMine stats={this.props.workplaceStats.coalMine}
                          resourceStats={this.props.resourceStats}
                          assignWorkerHandler={this.props.assignWorkerHandler}
                          levelUpHandler={this.props.levelUpHandler}></CoalMine>
                <FishermansSquare stats={this.props.workplaceStats.fisherSquare}
                                  resourceStats={this.props.resourceStats}
                                  assignWorkerHandler={this.props.assignWorkerHandler}
                                  levelUpHandler={this.props.levelUpHandler}></FishermansSquare>
                <Cornfield stats={this.props.workplaceStats.cornfield}
                           resourceStats={this.props.resourceStats}
                           assignWorkerHandler={this.props.assignWorkerHandler}
                           levelUpHandler={this.props.levelUpHandler}></Cornfield>
            </div>
        )
    }

}

export default Gameboard;