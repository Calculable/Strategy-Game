import React from 'react'
import WoodCutters from "./gameboardComponents/woodCutters";
import StoneMine from "./gameboardComponents/stoneMine";
import Mine from "./gameboardComponents/mine";
import FishermansSquare from "./gameboardComponents/fishermansSquare";
import Cornfield from "./gameboardComponents/cornfield";
import TownHall from "./gameboardComponents/townHall";
import ArmyCenter from "./gameboardComponents/armyCenter";

class Gameboard extends React.Component {


    render() {
        return (
            <div className="board">

                <WoodCutters stats={this.props.workplaceStats.woodcutters}
                             freeWorkers={this.props.workplaceStats.townhall.amountWorkersFree}
                             updateWorkplaceHandler={this.props.updateWorkplaceHandler}
                            money={this.props.money}>
                </WoodCutters>

                <Mine stats={this.props.workplaceStats.mine}
                      freeWorkers={this.props.workplaceStats.townhall.amountWorkersFree}
                      updateWorkplaceHandler={this.props.updateWorkplaceHandler}
                      money={this.props.money}>
                </Mine>

                <TownHall stats={this.props.workplaceStats.townhall}
                          resources={this.props.workplaceStats.resources}
                          buyAndSellHandler={this.props.buyAndSellHandler}
                          sellPrice={this.props.sellPrice}>
                </TownHall>

                <ArmyCenter stats={this.props.workplaceStats.armyCenter}
                          resources={this.props.workplaceStats.resources}
                          buyAndSellHandler={this.props.buyAndSellHandler}>
                </ArmyCenter>

                {/*<StoneMine stats={this.props.workplaceStats.stoneMine}
                           resourceStats={this.props.resourceStats}
                           assignWorkerHandler={this.props.assignWorkerHandler}
                           levelUpHandler={this.props.levelUpHandler}></StoneMine>
                <FishermansSquare stats={this.props.workplaceStats.fisherSquare}
                                  resourceStats={this.props.resourceStats}
                                  assignWorkerHandler={this.props.assignWorkerHandler}
                                  levelUpHandler={this.props.levelUpHandler}></FishermansSquare>
                <Cornfield stats={this.props.workplaceStats.cornfield}
                           resourceStats={this.props.resourceStats}
                           assignWorkerHandler={this.props.assignWorkerHandler}
                           levelUpHandler={this.props.levelUpHandler}></Cornfield>*/}
            </div>
        )
    }

}

export default Gameboard;