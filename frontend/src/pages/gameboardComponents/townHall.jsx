import React from 'react'
import Workplace from "./template/workplace";
import WorkplaceModalDialog from "./template/workplaceModalDialog";
import ModalDialogTemplate from "./template/modalDialogTemplate";
import LevelUpgrader from "./template/levelUpgrader";
import TradeOption from "./tradeOption"

let TOWNHALL_MODAL = "townhallModal";

class TownHall extends React.Component {
    render() {
        return (
            <div>
                <Workplace
                    className="townhall"
                    displayName={"Townhall"}
                    icon={"bi bi-shop"}
                    buttonText={"trade"}
                    buttonDisabled={false}
                    modalTarget={"#" + TOWNHALL_MODAL}
                    level={this.props.stats ? this.props.stats.buildinglevel : 0}
                >
                </Workplace>
                <TownHallDialog
                    resources={this.props.resources ? this.props.resources : {}}
                    resourcesBuyPrice={{
                        worker: this.props.stats.workerCost
                    }}
                    resourcesSellPrice={{
                        wood: this.props.sellPrice.wood,
                        coal: this.props.sellPrice.coal,
                        ironOre: this.props.sellPrice.ironOre,
                        workerPerMoney: (1/this.props.sellPrice.workers)
                    }}
                    level={this.props.stats ? this.props.stats.buildinglevel : 0}
                    levelUpCost={this.props.stats.levelUpCost ? this.props.stats.levelUpCost : 0}
                    buyAndSellHandler={this.props.buyAndSellHandler ? this.props.buyAndSellHandler : () => {
                    }}
                >
                </TownHallDialog>
            </div>
        );
    }
}

class TownHallDialog extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (

            <div>
            <ModalDialogTemplate id={TOWNHALL_MODAL} title="Townhall">
                <LevelUpgrader level={this.props.level} levelUpCost={this.props.levelUpCost} money={this.props.resources.money} levelUpHandler={this.levelUp.bind(this)}></LevelUpgrader>

                <TradeOption titleSell={"Wood"} titleGet={"Money"} maxAmount={this.props.resources.amountWood} sellPrice={this.props.resourcesSellPrice.wood} selectedAmount="0" sellHandler={this.sellWoodHandler.bind(this)} step={1}></TradeOption>
                <TradeOption titleSell={"Coal"} titleGet={"Money"} maxAmount={this.props.resources.amountCoal} sellPrice={this.props.resourcesSellPrice.coal} selectedAmount="0" sellHandler={this.sellCoalHandler.bind(this)} step={1}></TradeOption>
                <TradeOption titleSell={"Iron Ore"} titleGet={"Money"} maxAmount={this.props.resources.amountIronOre} sellPrice={this.props.resourcesSellPrice.ironOre} selectedAmount="0" sellHandler={this.sellIronOreHandler.bind(this)} step={1}></TradeOption>
                <TradeOption titleSell={"Money"} titleGet={"Workers"} maxAmount={this.props.resources.money} sellPrice={this.props.resourcesSellPrice.workerPerMoney} selectedAmount="0" sellHandler={this.buyWorkerHandler.bind(this)} step={1/this.props.resourcesSellPrice.workerPerMoney}></TradeOption>

            </ModalDialogTemplate>

            </div>
        );
    }

    levelUp() {
        this.props.buyAndSellHandler(0, 0, 0, 0, this.props.level + 1);
    }

    sellWoodHandler(amountOfWood) {
        this.props.buyAndSellHandler(amountOfWood, 0, 0, 0, this.props.level);
    }

    sellCoalHandler(amountOfCoal) {
        this.props.buyAndSellHandler(0, amountOfCoal, 0, 0, this.props.level);
    }
    sellIronOreHandler(amountOfIronOre) {
        this.props.buyAndSellHandler(0, 0, amountOfIronOre, 0, this.props.level);
    }

    buyWorkerHandler(amountOfMoney) {
        this.props.buyAndSellHandler(0, 0, 0, amountOfMoney*this.props.resourcesSellPrice.workerPerMoney, this.props.level);
    }

}


export default TownHall;