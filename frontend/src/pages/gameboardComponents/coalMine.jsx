import React from 'react'
import Workplace from "./template/workplace";
import WorkplaceModalDialog from "./template/workplaceModalDialog";

let COAL_MINE_MODAL = "coalMineModal";

class CoalMine extends React.Component {
    render() {
        return (
            <div>
                <Workplace
                    className="woodcutter"
                    displayName={"Coal Mine"}
                    icon={"bi bi-triangle"}
                    progress={this.props.stats ? this.props.stats.progress : 0}
                    buttonText={"edit"}
                    buttonDisabled={false}
                    workers={this.props.stats ? this.props.stats.worker : 0}
                    level={this.props.stats ? this.props.stats.level : 0}
                    levelUpCondition={this.props.stats ? this.props.stats.level : 0}
                    performance={this.props.stats ? this.props.stats.level : 0}
                    modalTarget={"#" + COAL_MINE_MODAL}>
                </Workplace>
                <CoalMineDialog
                    stats={this.props.stats ? this.props.stats : {}}
                    assignWorkerHandler={this.props.assignWorkerHandler ? this.props.assignWorkerHandler : () => {
                    }}
                    levelUpHandler={this.props.levelUpHandler ? this.props.levelUpHandler : () => {
                    }}
                >
                </CoalMineDialog>
            </div>
        );
    }
}

class CoalMineDialog extends React.Component {
    render() {
        return (
            <WorkplaceModalDialog
                id={COAL_MINE_MODAL}
                title="Edit coal mine"
                levelUpCondition={this.props.stats ? this.props.stats.levelUpCondition : {}}
                performance={this.props.stats ? this.props.stats.performance : {}}
                level={this.props.stats ? this.props.stats.level : 0}
                workers={this.props.stats ? this.props.stats.worker : 0}
                assignWorkerHandler={this.props.assignWorkerHandler ? this.props.assignWorkerHandler : () => {
                }}
                levelUpHandler={this.props.levelUpHandler ? this.props.levelUpHandler : () => {
                }}
                shortName={"coalmine"}
            >
            </WorkplaceModalDialog>
        );
    }
}

export default CoalMine;
