import React from 'react'
import Workplace from "./template/workplace";
import WorkplaceModalDialog from "./template/workplaceModalDialog";
import ResourceCounter from "../resourceCounter";

let CORNFIELD_MODAL = "cornfieldModal";

class Cornfield extends React.Component {
    render() {
        return (
            <div>
                <Workplace
                    className="woodcutter"
                    displayName={"Cornfield"}
                    icon={"bi bi-pause"}
                    progress={this.props.stats ? this.props.stats.progress : 0}
                    buttonText={"edit"}
                    buttonDisabled={false}
                    workers={this.props.stats ? this.props.stats.worker : 0}
                    level={this.props.stats ? this.props.stats.level : 0}
                    levelUpCondition={this.props.stats ? this.props.stats.level : 0}
                    performance={this.props.stats ? this.props.stats.level : 0}
                    modalTarget={"#" + CORNFIELD_MODAL}>
                </Workplace>
                <CornfieldDialog
                    stats={this.props.stats ? this.props.stats : {}}
                    assignWorkerHandler={this.props.assignWorkerHandler ? this.props.assignWorkerHandler : () => {
                    }}
                    levelUpHandler={this.props.levelUpHandler ? this.props.levelUpHandler : () => {
                    }}
                    resourceStats={this.props.resourceStats}
                >
                </CornfieldDialog>
            </div>
        );
    }
}

class CornfieldDialog extends React.Component {
    render() {
        return (
            <WorkplaceModalDialog
                id={CORNFIELD_MODAL}
                title="Edit cornfield"
                levelUpCondition={this.props.stats ? this.props.stats.levelUpCondition : {}}
                performance={this.props.stats ? this.props.stats.performance : {}}
                level={this.props.stats ? this.props.stats.level : 0}
                workers={this.props.stats ? this.props.stats.worker : 0}
                assignWorkerHandler={this.props.assignWorkerHandler ? this.props.assignWorkerHandler : () => {
                }}
                levelUpHandler={this.props.levelUpHandler ? this.props.levelUpHandler : () => {
                }}
                shortName={"cornfield"}
                resourceStats={this.props.resourceStats}

            >
            </WorkplaceModalDialog>
        );
    }
}

export default Cornfield;