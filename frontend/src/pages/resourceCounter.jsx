import React from 'react'

class ResourceCounter extends React.Component {
    render() {
        return (
            <div className="resource-counter mt-3">
                <h5>Wood: <span className="badge bg-info pr-4}">{this.props.resources.amountWood}</span>
                    <span className={"resource-item"}> Coal: </span><span
                        className="badge bg-info">{this.props.resources.amountCoal}</span>
                    <span className={"resource-item"}> Iron Ore: </span><span
                        className="badge bg-info">{this.props.resources.amountIronOre}</span>
                    <span className={"resource-item"}> Gold: </span><span
                        className="badge bg-info">{this.props.resources.money}</span>
                    <br/><br/>
                    Free Workers: <span className="badge bg-light text-dark">{this.props.resources.workers}</span>
                    <br/><br/>
                    <span className={"resource-item"}> Archers </span><i className={"bi bi-bullseye"}></i>: <span
                        className="badge bg-info">{this.props.armyCenter.amountArchers}</span>
                    <span className={"resource-item"}> Blockers </span><i className={"bi bi-bricks"}></i>: <span
                        className="badge bg-info">{this.props.armyCenter.amountBlockers}</span>
                    <span className={"resource-item"}> Swordsman </span><i className={"bi bi-cone"}></i>: <span
                        className="badge bg-info">{this.props.armyCenter.amountSwordsman}</span>
                </h5>
            </div>
        );
    }
}

export default ResourceCounter;