import React from 'react'
import Workplace from "./template/workplace";
import WorkplaceModalDialog from "./template/workplaceModalDialog";
import ModalDialogTemplate from "./template/modalDialogTemplate";
import LevelUpgrader from "./template/levelUpgrader";
import TradeOption from "./tradeOption";

let ARMY_CENTER_MODAL = "armyCenterModal";

class ArmyCenter extends React.Component {
    render() {
        return (
            <div>
                <Workplace
                    className="armyCenter"
                    displayName={"Army Center"}
                    icon={"bi bi-shield"}
                    buttonText={"Manage Army"}
                    buttonDisabled={false}
                    modalTarget={"#" + ARMY_CENTER_MODAL}
                    level={this.props.stats ? this.props.stats.buildinglevel : 0}
                >
                </Workplace>
                <ArmyCenterDialog
                    resources={this.props.resources ? this.props.resources : {}}
                    levelUpCost={this.props.stats.levelUpCost ? this.props.stats.levelUpCost : Number.POSITIVE_INFINITY}
                    buyArmyPrice={{archers: this.props.stats.archerCost, blockers: this.props.stats.blockerCost, swordsman: this.props.stats.swordsmanCost}}
                    buyAndSellArmyHandler={this.props.buyAndSellArmyHandler}
                    stats={this.props.stats.armyCenter}
                    level={this.props.stats.buildinglevel ? this.props.stats.buildinglevel : 0}
                    >
                </ArmyCenterDialog>
            </div>
        );
    }
}

class ArmyCenterDialog extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (

            <div>
                <ModalDialogTemplate id={ARMY_CENTER_MODAL} title="Army Center">
                    {/*<LevelUpgrader level={this.props.level} levelUpCost={this.props.levelUpCost} money={this.props.resources.money} levelUpHandler={this.levelUp.bind(this)}></LevelUpgrader>*/}

                    <TradeOption titleSell={"Money"} titleGet={"Archers"} maxAmount={this.props.resources.money} sellPrice={this.props.buyArmyPrice.archers} selectedAmount="0" sellHandler={this.buyArcherHandler.bind(this)} step={this.props.buyArmyPrice.archers}></TradeOption>
                    <TradeOption titleSell={"Money"} titleGet={"Blockers"} maxAmount={this.props.resources.money} sellPrice={this.props.buyArmyPrice.blockers} selectedAmount="0" sellHandler={this.buyArcherHandler.bind(this)} step={this.props.buyArmyPrice.blockers}></TradeOption>
                    <TradeOption titleSell={"Money"} titleGet={"Swordsman"} maxAmount={this.props.resources.money} sellPrice={this.props.buyArmyPrice.swordsman} selectedAmount="0" sellHandler={this.buyArcherHandler.bind(this)} step={this.props.buyArmyPrice.swordsman}></TradeOption>

                </ModalDialogTemplate>

            </div>
        );
    }

    levelUp() {
        this.props.buyAndSellHandler(0, 0, this.props.level + 1);
    }

    buyArcherHandler(amountOfMoney) {
        this.props.buyAndSellArmyHandler(amountOfMoney*(1/this.props.buyArmyPrice.archers), 0, 0, this.props.level);
    }

    buyBlockerHandler(amountOfMoney) {
        this.props.buyAndSellArmyHandler(0, amountOfMoney*(1/this.props.buyArmyPrice.blockers), 0, this.props.level);
    }
    buySowrdsmanHandler(amountOfMoney) {
        this.props.buyAndSellArmyHandler(0, 0, amountOfMoney*(1/this.props.buyArmyPrice.swordsman), this.props.level);
    }


}




export default ArmyCenter;