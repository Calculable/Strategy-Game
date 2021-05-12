import React from 'react'

class WorkplaceModalDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {assignedWorkers: this.props.workers ? this.props.workers : 0};
    }

    render() {

        return (
            <div class="modal fade" id={this.props.id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">{this.props.title}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">


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


                            <button type="button" className="btn btn-outline-secondary mt-1"
                                    onClick={this.levelUp.bind(this)}>Upgrade to
                                Level {this.props.level ? this.props.level + 1 : ""}</button>


                            {/*
                            {(this.props.levelUpCondition.wood <= this.props.resourceStats.materials.wood) &&
                            (this.props.levelUpCondition.iron <= this.props.resourceStats.materials.iron) &&
                            (this.props.levelUpCondition.stone <= this.props.resourceStats.materials.stone) &&
                            (this.props.levelUpCondition.gold <= this.props.resourceStats.materials.gold) &&
                            (this.props.levelUpCondition.diamond <= this.props.resourceStats.materials.diamond) &&
                                <button type="button" className="btn btn-outline-secondary mt-1"
                                    onClick={this.levelUp.bind(this)}>Upgrade to
                                Level {this.props.level ? this.props.level + 1 : ""}</button>
                            }

                            {((this.props.levelUpCondition.wood > this.props.resourceStats.materials.wood) ||
                            (this.props.levelUpCondition.iron > this.props.resourceStats.materials.iron) ||
                            (this.props.levelUpCondition.stone > this.props.resourceStats.materials.stone) ||
                            (this.props.levelUpCondition.gold > this.props.resourceStats.materials.gold) ||
                            (this.props.levelUpCondition.diamond > this.props.resourceStats.materials.diamond)) &&
                                    <button type="button" className="btn btn-outline-secondary mt-1 btn-warning" disabled>Not enough resources to upgrade to Level {this.props.level ? this.props.level + 1 : ""}</button>
                            }


                            <br/>


                            {this.props.levelUpCondition && this.props.levelUpCondition.wood > 0 &&
                            <span className="badge badge-danger mr-1">- {this.props.levelUpCondition.wood}x Wood</span>}
                            {this.props.levelUpCondition && this.props.levelUpCondition.iron > 0 &&
                            <span className="badge badge-danger mr-1">- {this.props.levelUpCondition.iron}x Iron</span>}
                            {this.props.levelUpCondition && this.props.levelUpCondition.stone > 0 && <span
                                className="badge badge-danger mr-1">- {this.props.levelUpCondition.stone}x Stone</span>}
                            {this.props.levelUpCondition && this.props.levelUpCondition.gold > 0 &&
                            <span className="badge badge-danger mr-1">- {this.props.levelUpCondition.gold}x Gold</span>}
                            {this.props.levelUpCondition && this.props.levelUpCondition.diamond > 0 && <span
                                className="badge badge-danger mr-1">- {this.props.levelUpCondition.diamond}x Diamond</span>}

                            <h6 className="mt-3">Current Performance</h6>

                            {this.props.performance && this.props.performance.wood > 0 &&
                            <span className="badge badge-info mr-1">+ {this.props.performance.wood}x Wood</span>}
                            {this.props.performance && this.props.performance.iron > 0 &&
                            <span className="badge badge-info mr-1">+ {this.props.performance.iron}x Iron</span>}
                            {this.props.performance && this.props.performance.stone > 0 &&
                            <span className="badge badge-info mr-1">+ {this.props.performance.stone}x Stone</span>}
                            {this.props.performance && this.props.performance.gold > 0 &&
                            <span className="badge badge-info mr-1">+ {this.props.performance.gold}x Gold</span>}
                            {this.props.performance && this.props.performance.diamond > 0 &&
                            <span className="badge badge-info mr-1">+ {this.props.performance.diamond}x Diamond</span>}

                            <span> / </span> <span className="badge badge-secondary">5min</span>
                            <span> / </span> <span className="badge badge-secondary">Worker</span>

*/}

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

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