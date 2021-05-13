import React from 'react'

class TradeOption extends React.Component {

    constructor(props) {
        super(props);
        this.state = {selectedAmount: this.props.selectedAmount ? this.props.selectedAmount : 0};
    }

    render() {
        return (

            <div className="form-group">
                <label>
                    <h6>Trade <span>{this.props.titleSell} for {this.props.titleGet}</span></h6>

                    <input type="number" min="0" className="form-control" step={this.props.step}
                           value={this.state.selectedAmount}
                           onChange={this.handleAmountChange.bind(this)}/>
                </label>


                {(this.state.selectedAmount <= this.props.maxAmount && (this.state.selectedAmount % this.props.step === 0)) &&
                <button type="button" className="btn btn-outline-secondary ml-1 set-button"
                        onClick={this.sellHandler.bind(this)}>Sell
                    for {this.state.selectedAmount * this.props.sellPrice} {this.props.titleGet}!</button>
                }

                {(this.state.selectedAmount > this.props.maxAmount && (this.state.selectedAmount % this.props.step === 0)) &&
                <button type="button" className="btn btn-outline-secondary ml-1 btn-warning set-button"
                        disabled>Not enough {this.props.titleSell} available</button>
                }

                {(this.state.selectedAmount % this.props.step !== 0) &&
                <button type="button" className="btn btn-outline-secondary ml-1 btn-warning set-button"
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

export default TradeOption;