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
                    Archers (<i className={"bi bi-bullseye"}></i>): <span className="badge badge-info">{this.props.armyCenter.amountArchers}</span>
                    , Blockers (<i className={"bi bi-bricks"}></i>): <span className="badge badge-info">{this.props.armyCenter.amountBlockers}</span>
                    , Swordsman (<i className={"bi bi-cone"}></i>): <span className="badge badge-info">{this.props.armyCenter.amountSwordsman}</span>
                </h5>
            </div>
        );
    }
}

export default ResourceCounter;