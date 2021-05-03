import React from 'react'
import Workplace from "./template/workplace";
import WorkplaceModalDialog from "./template/workplaceModalDialog";

let WOOD_CUTTER_MODAL = "woodCutterModal";

class WoodCutter extends React.Component {
    render() {
        return (
            <div>
                <Workplace
                    className="woodcutter"
                    displayName={"Wood Cutter"}
                    icon={"bi bi-hexagon"}
                    progress={this.props.stats ? this.props.stats.progress : 0}
                    buttonText={"edit"}
                    buttonDisabled={false}
                    workers={this.props.stats ? this.props.stats.worker : 0}
                    level={this.props.stats ? this.props.stats.level : 0}
                    levelUpCondition={this.props.stats ? this.props.stats.level : 0}
                    performance={this.props.stats ? this.props.stats.level : 0}
                    modalTarget={"#" + WOOD_CUTTER_MODAL}>
                </Workplace>
                <WoodCutterDialog
                    stats={this.props.stats ? this.props.stats : {}}
                    assignWorkerHandler={this.props.assignWorkerHandler ? this.props.assignWorkerHandler : () => {
                    }}
                    levelUpHandler={this.props.levelUpHandler ? this.props.levelUpHandler : () => {
                    }}
                    resourceStats={this.props.resourceStats}>
                </WoodCutterDialog>
            </div>
        );
    }
}

class WoodCutterDialog extends React.Component {
    render() {
        return (
            <WorkplaceModalDialog id={WOOD_CUTTER_MODAL}
                                  title="Edit wood-cutter"
                                  levelUpCondition={this.props.stats ? this.props.stats.levelUpCondition : {}}
                                  performance={this.props.stats ? this.props.stats.performance : {}}
                                  level={this.props.stats ? this.props.stats.level : 0}
                                  workers={this.props.stats ? this.props.stats.worker : 0}
                                  assignWorkerHandler={this.props.assignWorkerHandler ? this.props.assignWorkerHandler : () => {
                                  }}
                                  levelUpHandler={this.props.levelUpHandler ? this.props.levelUpHandler : () => {
                                  }}
                                  shortName={"woodcutter"}
                                  resourceStats={this.props.resourceStats}


            >

            </WorkplaceModalDialog>
        );
    }
}

export default WoodCutter;