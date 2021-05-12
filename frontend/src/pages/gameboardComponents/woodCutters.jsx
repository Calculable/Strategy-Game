import React from 'react'
import Workplace from "./template/workplace";
import WorkplaceModalDialog from "./template/workplaceModalDialog";

let WOOD_CUTTER_MODAL = "woodCutterModal";

class WoodCutters extends React.Component {
    render() {
        return (
            <div>
                <Workplace
                    className="woodcutter"
                    displayName={"Wood Cutters"}
                    icon={"bi bi-hexagon"}
                    /*progress={this.props.stats ? this.props.stats.progress : 0}*/
                    buttonText={"edit"}
                    buttonDisabled={false}
                    workers={this.props.stats ? this.props.stats.amountDedicatedWorkers : 0}
                    level={this.props.stats ? this.props.stats.buildinglevel : 0}
                    /*performance={this.props.stats ? this.props.stats.level : 0}*/
                    modalTarget={"#" + WOOD_CUTTER_MODAL}>
                </Workplace>
                <WoodCuttersDialog
                    stats={this.props.stats ? this.props.stats : {}}
                    updateWorkplaceHandler={this.props.updateWorkplaceHandler ? this.props.updateWorkplaceHandler : () => {
                    }}
                    freeWorkers={this.props.freeWorkers}
                    levelUpCost={this.props.stats.levelUpCost ? this.props.stats.levelUpCost : 0}
                    money={this.props.money ? this.props.money : 0}
                    >
                </WoodCuttersDialog>
            </div>
        );
    }
}

class WoodCuttersDialog extends React.Component {
    render() {
        return (
            <WorkplaceModalDialog id={WOOD_CUTTER_MODAL}
                                  title="Edit wood-cutter"
                                  levelUpCost={this.props.levelUpCost ? this.props.levelUpCost : 0}
                                  money={this.props.money ? this.props.money : 0}
                /*performance={this.props.stats ? this.props.stats.performance : {}}*/
                                  level={this.props.stats ? this.props.stats.buildinglevel : 0}
                                  workers={this.props.stats ? this.props.stats.amountDedicatedWorkers : 0}
                                  updateWorkplaceHandler={this.props.updateWorkplaceHandler ? this.props.updateWorkplaceHandler : () => {
                                  }}
                                  shortName={"woodcutters"}
                                  freeWorkers={this.props.freeWorkers}
                                  woodPerMinute={this.props.stats.woodPerMinute ? this.props.stats.woodPerMinute : 0}
                                  coalPerMinute={this.props.stats.coalPerMinute ? this.props.stats.coalPerMinute : 0}
                                  ironOrePerMinute={this.props.stats.ironOrePerMinute ? this.props.stats.ironOrePerMinute : 0}

            >

            </WorkplaceModalDialog>
        );
    }
}

export default WoodCutters;