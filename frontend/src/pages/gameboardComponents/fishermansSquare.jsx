import React from 'react'
import Workplace from "./template/workplace";
import WorkplaceModalDialog from "./template/workplaceModalDialog";
import ResourceCounter from "../resourceCounter";

let FISHERMANS_SQUARE_MODAL = "fishermansSquareModal";

class FishermansSquare extends React.Component {
    render() {
        return (
            <div>
                <Workplace
                    className="woodcutter"
                    displayName={"Fisher Square"}
                    icon={"bi bi-water"}
                    progress={this.props.stats ? this.props.stats.progress : 0}
                    buttonText={"edit"}
                    buttonDisabled={false}
                    workers={this.props.stats ? this.props.stats.worker : 0}
                    level={this.props.stats ? this.props.stats.level : 0}
                    levelUpCondition={this.props.stats ? this.props.stats.level : 0}
                    performance={this.props.stats ? this.props.stats.level : 0}
                    modalTarget={"#" + FISHERMANS_SQUARE_MODAL}>
                </Workplace>
                <FishermansSquareDialog
                    stats={this.props.stats ? this.props.stats : {}}
                    assignWorkerHandler={this.props.assignWorkerHandler ? this.props.assignWorkerHandler : () => {
                    }}
                    levelUpHandler={this.props.levelUpHandler ? this.props.levelUpHandler : () => {
                    }}
                    resourceStats={this.props.resourceStats}
                >
                </FishermansSquareDialog>
            </div>
        );
    }
}

class FishermansSquareDialog extends React.Component {
    render() {
        return (
            <WorkplaceModalDialog id={FISHERMANS_SQUARE_MODAL}
                                  title="Edit fishermans square"
                                  levelUpCondition={this.props.stats ? this.props.stats.levelUpCondition : {}}
                                  performance={this.props.stats ? this.props.stats.performance : {}}
                                  level={this.props.stats ? this.props.stats.level : 0}
                                  workers={this.props.stats ? this.props.stats.worker : 0}
                                  assignWorkerHandler={this.props.assignWorkerHandler ? this.props.assignWorkerHandler : () => {
                                  }}
                                  levelUpHandler={this.props.levelUpHandler ? this.props.levelUpHandler : () => {
                                  }}
                                  shortName={"fishersquare"}
                                  resourceStats={this.props.resourceStats}

            >

            </WorkplaceModalDialog>
        );
    }
}

export default FishermansSquare;