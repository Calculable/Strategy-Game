import React from 'react'
import ModalDialogTemplate from "./modalDialogTemplate";
import LevelUpgrader from "./levelUpgrader";

class WorkplaceModalDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {assignedWorkers: this.props.workers ? this.props.workers : 0};
    }

    render() {

        return (
            <ModalDialogTemplate id={this.props.id} title={this.props.title}>

                <div className="form-group">
                    <label>
                        <h6>Worker: <span
                            className="badge bg-secondary">{this.props.workers ? this.props.workers : ""}</span>
                        </h6>

                                    <input type="number" min="0" className="form-control"
                                           value={this.state.assignedWorkers}
                                           onChange={this.handleAssignedWorkerChange.bind(this)}/>
                                </label>


                    {(this.state.assignedWorkers <= (this.props.freeWorkers + this.props.workers)) &&
                    <button type="button" className="btn btn-outline-secondary set-button"
                            onClick={this.assignWorkers.bind(this)}>Set</button>
                    }

                    {(this.state.assignedWorkers > (this.props.freeWorkers + this.props.workers)) &&
                    <button type="button" className="btn btn-outline-secondary ml-1 btn-warning set-button"
                            disabled>Not enough workers</button>
                    }

                </div>

                <LevelUpgrader level={this.props.level} levelUpCost={this.props.levelUpCost} money={this.props.money} levelUpHandler={this.levelUp.bind(this)}></LevelUpgrader>


                {(this.state.assignedWorkers > 0) &&
                <div>
                    <h6 className="mt-3">Current Performance</h6>
                    {(this.props.woodPerMinute > 0) &&
                    <span className="badge bg-info mr-1 resource-item">+ {this.props.woodPerMinute}x Wood</span>}
                    {(this.props.coalPerMinute > 0) &&
                    <span className="badge bg-info mr-1 resource-item">+ {this.props.coalPerMinute}x Coal</span>}
                    {(this.props.ironOrePerMinute > 0) &&
                    <span className="badge bg-info mr-1 resource-item">+ {this.props.ironOrePerMinute}x Iron Ore</span>}

                    <span> per minute </span>
                </div>
                }

            </ModalDialogTemplate>

        );
    }

    handleAssignedWorkerChange(e) {
        this.setState({assignedWorkers: e.target.value});
    };

    levelUp() {
        this.props.updateWorkplaceHandler(this.props.shortName, this.props.workers, this.props.level + 1);

    }

    assignWorkers() {
        this.props.updateWorkplaceHandler(this.props.shortName, parseInt(this.state.assignedWorkers), this.props.level);
    }
}

export default WorkplaceModalDialog;