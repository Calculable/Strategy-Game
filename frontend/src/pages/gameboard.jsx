import React from 'react'
import WoodCutters from "./gameboardComponents/woodCutters";
import Mine from "./gameboardComponents/mine";
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
                            buyAndSellArmyHandler={this.props.buyAndSellArmyHandler}>
                </ArmyCenter>

            </div>
        )
    }

}

export default Gameboard;