import React from 'react'
import Workplace from "./template/workplace";
import WorkplaceModalDialog from "./template/workplaceModalDialog";
import ModalDialogTemplate from "./template/modalDialogTemplate";
import LevelUpgrader from "./template/levelUpgrader";

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
                <ArmyCenterDialog>
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
                You can manage your army here (work in progress)
            </ModalDialogTemplate>

            </div>
        );
    }

    levelUp() {
        this.props.buyAndSellHandler(0, 0, 0, 0, this.props.level + 1);
    }

    sellWoodHandler(amountOfWood, buyAndSellHandler) {
        buyAndSellHandler(amountOfWood, 0, 0, 0, this.props.level + 1);
    }

    sellCoalHandler(amountOfCoal, buyAndSellHandler) {
        buyAndSellHandler(0, amountOfCoal, 0, 0, this.props.level + 1);
    }
    sellIronOreHandler(amountOfIronOre, buyAndSellHandler) {
        buyAndSellHandler(0, 0, amountOfIronOre, 0, this.props.level + 1);
    }

    buyWorkerHandler(amountOfMoney, buyAndSellHandler) {
        buyAndSellHandler(0, 0, 0, amountOfMoney*this.props.resourcesSellPrice.workerPerMoney, this.props.level + 1);
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
        this.props.sellHandler(this.state.selectedAmount, this.props.buyAndSellHandler);
        this.state.selectedAmount = 0;
    }

}


export default ArmyCenter;