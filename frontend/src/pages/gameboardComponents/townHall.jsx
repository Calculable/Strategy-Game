import React from 'react'
import Workplace from "./template/workplace";
import WorkplaceModalDialog from "./template/workplaceModalDialog";
import ModalDialogTemplate from "./template/modalDialogTemplate";
import LevelUpgrader from "./template/levelUpgrader";

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
                        workerPerMoney: 1/this.props.sellPrice.worker
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

                <SellingOption titleSell={"Wood"} titleGet={"Money"} maxAmount={this.props.resources.amountWood} sellPrice={this.props.resourcesSellPrice.wood} selectedAmount="0" sellHandler={this.sellWoodHandler.bind(this)} step={1}></SellingOption>
                <SellingOption titleSell={"Coal"} titleGet={"Money"} maxAmount={this.props.resources.amountCoal} sellPrice={this.props.resourcesSellPrice.coal} selectedAmount="0" sellHandler={this.sellCoalHandler.bind(this)} step={1}></SellingOption>
                <SellingOption titleSell={"Iron Ore"} titleGet={"Money"} maxAmount={this.props.resources.amountIronOre} sellPrice={this.props.resourcesSellPrice.ironOre} selectedAmount="0" sellHandler={this.sellIronOreHandler.bind(this)} step={1}></SellingOption>
                <SellingOption titleSell={"Money"} titleGet={"Workers"} maxAmount={this.props.resources.money} sellPrice={this.props.resourcesSellPrice.workerPerMoney} selectedAmount="0" sellHandler={this.buyWorkerHandler.bind(this)} step={1/this.props.resourcesSellPrice.workerPerMoney}></SellingOption>

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

class SellingOption extends React.Component {

    constructor(props) {
        super(props);
        this.state = {selectedAmount: this.props.selectedAmount ? this.props.selectedAmount : 0};
    }

    render() {
        return (

            <div className="form-group">
                <label>
                    <h6>Trade <span>{this.props.titleSell} for {this.props.titleGet}</span></h6>

                    <input type="number" min="0" max={this.props.maxAmount} className="form-control" step={this.props.step}
                           value={this.state.selectedAmount}
                           onChange={this.handleAmountChange.bind(this)}/>
                </label>


                {(this.state.selectedAmount <= this.props.maxAmount && (this.state.selectedAmount % this.props.step == 0)) &&
                <button type="button" className="btn btn-outline-secondary ml-1"
                        onClick={this.sellHandler.bind(this)}>Sell for {this.state.selectedAmount*this.props.sellPrice} {this.props.titleGet}!</button>
                }

                {(this.state.selectedAmount > this.props.maxAmount && (this.state.selectedAmount % this.props.step == 0)) &&
                <button type="button" className="btn btn-outline-secondary ml-1 btn-warning"
                        disabled>Not enough {this.props.title} available</button>
                }

                {(this.state.selectedAmount % this.props.step != 0) &&
                <button type="button" className="btn btn-outline-secondary ml-1 btn-warning"
                        disabled>Amount must be divisible by {this.props.step}</button>
                }

            </div>

        );
    }

    handleAmountChange(e) {
        this.setState({selectedAmount: e.target.value});
    }

    sellHandler() {
        this.props.sellHandler(this.state.selectedAmount);
        this.state.selectedAmount = 0;
    }

}


export default TownHall;