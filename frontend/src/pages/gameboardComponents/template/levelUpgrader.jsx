import React from "react";
import WorkplaceModalDialog from "./workplaceModalDialog";

class LevelUpgrader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {assignedWorkers: this.props.workers ? this.props.workers : 0};
    }

    render() {
        return (

            <div>

                <h6 className="mt-3">Level: <span
                    className="badge badge-secondary">{this.props.level ? this.props.level : ""}</span></h6>

                {(this.props.levelUpCost <= this.props.money) &&
                <button type="button" className="btn btn-outline-secondary mt-1"
                        onClick={this.props.levelUpHandler}>Upgrade to
                    Level {this.props.level ? this.props.level + 1 : ""}</button>
                }

                {(this.props.levelUpCost > this.props.money) &&
                <button type="button" className="btn btn-outline-secondary mt-1 btn-warning" disabled>Not enough
                    resources to upgrade to Level {this.props.level ? this.props.level + 1 : ""}</button>
                }

                <br/>

                {(this.props.levelUpCost < this.props.money) &&
                <span className="badge badge-danger mr-1">- {this.props.levelUpCost}x Money</span>}
            </div>
        );
    }
}

export default LevelUpgrader;