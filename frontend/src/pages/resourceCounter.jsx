import React from 'react'

class ResourceCounter extends React.Component {
    render() {
        return (
            <div className="resource-counter mt-3">
                <h5>Wood: <span className="badge badge-info">{this.props.resources.amountWood}</span>
                    , Coal: <span className="badge badge-info">{this.props.resources.amountCoal}</span>
                    , Iron Ore: <span className="badge badge-info">{this.props.resources.amountIronOre}</span>
                    , Money: <span className="badge badge-info">{this.props.resources.money}</span>
                    <br/><br/>
                    Free Workers: <span className="badge badge-light">{this.props.resources.workers}</span>
                    <br/><br/>
                </h5>
            </div>
        );
    }
}

export default ResourceCounter;