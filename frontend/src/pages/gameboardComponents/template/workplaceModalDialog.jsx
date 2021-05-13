import React from 'react'
import ModalDialogTemplate from "./modalDialogTemplate";

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
                                        className="badge badge-secondary">{this.props.workers ? this.props.workers : ""}</span>
                                    </h6>

                                    <input type="number" min="0" max="100" className="form-control"
                                           value={this.state.assignedWorkers}
                                           onChange={this.handleAssignedWorkerChange.bind(this)}/>
                                </label>



                                 {(this.state.assignedWorkers <= (this.props.freeWorkers + this.props.workers)) &&
                                <button type="button" className="btn btn-outline-secondary ml-1"
                                        onClick={this.assignWorkers.bind(this)}>Set</button>
                                }

                                {(this.state.assignedWorkers > (this.props.freeWorkers + this.props.workers)) &&
                                <button type="button" className="btn btn-outline-secondary ml-1 btn-warning"
                                        disabled>Not enough workers</button>
                                }

                            </div>


                            <h6 className="mt-3">Level: <span
                                className="badge badge-secondary">{this.props.level ? this.props.level : ""}</span></h6>

                            {(this.props.levelUpCost <= this.props.money) &&
                                <button type="button" className="btn btn-outline-secondary mt-1"
                                    onClick={this.levelUp.bind(this)}>Upgrade to
                                Level {this.props.level ? this.props.level + 1 : ""}</button>
                            }

                            {(this.props.levelUpCost > this.props.money) &&
                                    <button type="button" className="btn btn-outline-secondary mt-1 btn-warning" disabled>Not enough resources to upgrade to Level {this.props.level ? this.props.level + 1 : ""}</button>
                            }

                            <br/>

                            {(this.props.levelUpCost < this.props.money) &&
                            <span className="badge badge-danger mr-1">- {this.props.levelUpCost}x Money</span>}


                {(this.state.assignedWorkers > 0) &&
                <div>
                    <h6 className="mt-3">Current Performance</h6>

                    {(this.props.woodPerMinute > 0) &&
                    <span className="badge badge-info mr-1">+ {this.props.woodPerMinute}x Wood</span>}
                    {(this.props.coalPerMinute > 0) &&
                    <span className="badge badge-info mr-1">+ {this.props.coalPerMinute}x Coal</span>}
                    {(this.props.ironOrePerMinute > 0) &&
                    <span className="badge badge-info mr-1">+ {this.props.ironOrePerMinute}x Iron Ore</span>}

                    <span> per </span> <span className="badge badge-secondary"> minute </span>
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