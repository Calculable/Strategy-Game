import React from 'react'
import Workplace from "./template/workplace";
import WorkplaceModalDialog from "./template/workplaceModalDialog";

let COAL_MINE_MODAL = "coalMineModal";

class Mine extends React.Component {
    render() {
        return (
            <div>
                <Workplace
                    className="mine"
                    displayName={"Mine"}
                    icon={"bi bi-triangle"}
                    buttonText={"edit"}
                    buttonDisabled={false}
                    workers={this.props.stats ? this.props.stats.amountDedicatedWorkers : 0}
                    level={this.props.stats ? this.props.stats.buildinglevel : 0}
                    modalTarget={"#" + COAL_MINE_MODAL}>
                </Workplace>
                <MineDialog
                    stats={this.props.stats ? this.props.stats : {}}
                    updateWorkplaceHandler={this.props.updateWorkplaceHandler ? this.props.updateWorkplaceHandler : () => {
                    }}

                    freeWorkers={this.props.freeWorkers}
                    levelUpCost={this.props.stats.levelUpCost ? this.props.stats.levelUpCost : 0}
                    money={this.props.money ? this.props.money : 0}
                >
                </MineDialog>
            </div>
        );
    }
}

class MineDialog extends React.Component {
    render() {
        return (
            <WorkplaceModalDialog
                id={COAL_MINE_MODAL}
                title="Edit mine"
                levelUpCost={this.props.levelUpCost ? this.props.levelUpCost : 0}
                money={this.props.money ? this.props.money : 0}
                level={this.props.stats ? this.props.stats.buildinglevel : 0}
                workers={this.props.stats ? this.props.stats.amountDedicatedWorkers : 0}
                updateWorkplaceHandler={this.props.updateWorkplaceHandler ? this.props.updateWorkplaceHandler : () => {
                }}
                shortName={"mine"}
                freeWorkers={this.props.freeWorkers}
                woodPerMinute={this.props.stats.woodPerMinute ? this.props.stats.woodPerMinute : 0}
                coalPerMinute={this.props.stats.coalPerMinute ? this.props.stats.coalPerMinute : 0}
                ironOrePerMinute={this.props.stats.ironOrePerMinute ? this.props.stats.ironOrePerMinute : 0}
            >
            </WorkplaceModalDialog>
        );
    }
}

export default Mine;
