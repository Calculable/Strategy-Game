import React from 'react'
import Workplace from "./template/workplace";
import WorkplaceModalDialog from "./template/workplaceModalDialog";
import ModalDialogTemplate from "./template/modalDialogTemplate";

let MARKET_MODAL = "marketModal";

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
                    modalTarget={"#" + MARKET_MODAL}
                    level={this.props.stats ? this.props.stats.buildinglevel : 0}
                >
                </Workplace>
                <MarketDialog
                    resources={this.props.resources ? this.props.resources : {}}
                    resourcesBuyPrice={{
                        worker: this.props.stats.workerCost
                    }}
                    resourcesSellPrice={{
                        wood: 1,
                        coal: 1,
                        ironOre: 2,
                    }}
                    level={this.props.stats ? this.props.stats.buildinglevel : 0}
                    levelUpCost={this.props.stats.levelUpCost ? this.props.stats.levelUpCost : 0}
                    buyAndSellHandler={this.props.buyAndSellHandler ? this.props.buyAndSellHandler : () => {
                    }}
                >
                </MarketDialog>
            </div>
        );
    }
}

class MarketDialog extends React.Component {
    render() {
        return (
            <ModalDialogTemplate id={MARKET_MODAL} title="Townhall">
                Here you can buy and sell stuff. (Work in Progress)
            </ModalDialogTemplate>

        );
    }
}


export default TownHall;