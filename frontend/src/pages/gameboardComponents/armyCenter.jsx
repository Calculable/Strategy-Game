import React from 'react'
import Workplace from "./template/workplace";
import ModalDialogTemplate from "./template/modalDialogTemplate";
import TradeOption from "./tradeOption";

let ARMY_CENTER_MODAL = "armyCenterModal";

class ArmyCenter extends React.Component {
    render() {
        return (
            <div>
                <Workplace
                    className="army-center"
                    displayName={"Army Center"}
                    icon={"bi bi-shield"}
                    buttonText={"Manage Army"}
                    buttonDisabled={false}
                    modalTarget={"#" + ARMY_CENTER_MODAL}
                    level={this.props.stats ? this.props.stats.buildinglevel : 0}>
                </Workplace>
                <ArmyCenterDialog
                    resources={this.props.resources ? this.props.resources : {}}
                    levelUpCost={this.props.stats.levelUpCost ? this.props.stats.levelUpCost : Number.POSITIVE_INFINITY}
                    buyArmyPrice={{
                        archers: this.props.stats.archerCost,
                        blockers: this.props.stats.blockerCost,
                        swordsman: this.props.stats.swordsmanCost
                    }}
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

    render() {
        return (

            <div>
                <ModalDialogTemplate id={ARMY_CENTER_MODAL} title="Army Center">
                    <TradeOption titleSell={"Gold"} titleGet={"Archers"} maxAmount={this.props.resources.money}
                                 sellPrice={1 / this.props.buyArmyPrice.archers} selectedAmount="0"
                                 sellHandler={this.buyArcherHandler.bind(this)}
                                 step={this.props.buyArmyPrice.archers}></TradeOption>
                    <TradeOption titleSell={"Gold"} titleGet={"Blockers"} maxAmount={this.props.resources.money}
                                 sellPrice={1 / this.props.buyArmyPrice.blockers} selectedAmount="0"
                                 sellHandler={this.buyBlockerHandler.bind(this)}
                                 step={this.props.buyArmyPrice.blockers}></TradeOption>
                    <TradeOption titleSell={"Gold"} titleGet={"Swordsman"} maxAmount={this.props.resources.money}
                                 sellPrice={1 / this.props.buyArmyPrice.swordsman} selectedAmount="0"
                                 sellHandler={this.buySowrdsmanHandler.bind(this)}
                                 step={this.props.buyArmyPrice.swordsman}></TradeOption>
                </ModalDialogTemplate>
            </div>
        );
    }

    levelUp() {
        this.props.buyAndSellArmyHandler(0, 0, this.props.level + 1, true);
    }

    buyArcherHandler(amountOfMoney) {
        this.props.buyAndSellArmyHandler(amountOfMoney * (1 / this.props.buyArmyPrice.archers), 0, 0, this.props.level, false);
    }

    buyBlockerHandler(amountOfMoney) {
        this.props.buyAndSellArmyHandler(0, amountOfMoney * (1 / this.props.buyArmyPrice.blockers), 0, this.props.level, false);
    }

    buySowrdsmanHandler(amountOfMoney) {
        this.props.buyAndSellArmyHandler(0, 0, amountOfMoney * (1 / this.props.buyArmyPrice.swordsman), this.props.level, false);
    }
}


export default ArmyCenter;