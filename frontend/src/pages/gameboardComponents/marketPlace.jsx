import React from 'react'
import Workplace from "./template/workplace";
import WorkplaceModalDialog from "./template/workplaceModalDialog";

let MARKET_MODAL = "marketModal";

class MarketPlace extends React.Component {
    render() {
        return (
            <div>
                <Workplace
                    className="woodcutter"
                    displayName={"Market"}
                    icon={"bi bi-shop"}
                    buttonText={"trade"}
                    modalTarget={"#" + MARKET_MODAL}>
                </Workplace>
                <MarketDialog></MarketDialog>
            </div>
        );
    }
}


class MarketDialog extends React.Component {
    render() {
        return (
            <WorkplaceModalDialog id={MARKET_MODAL} title="I'm the market modal dialog"></WorkplaceModalDialog>
        );
    }
}


export default MarketPlace;