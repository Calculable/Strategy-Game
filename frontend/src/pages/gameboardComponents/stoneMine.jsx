import React from 'react'
import Workplace from "./template/workplace";
import WorkplaceModalDialog from "./template/workplaceModalDialog";
import ResourceCounter from "../resourceCounter";

let STONE_MINE_MODAL = "stoneMineModal";

class StoneMine extends React.Component {
    render() {
        return (
            <div>
                <Workplace
                    className="woodcutter"
                    displayName={"Stone Mine"}
                    icon={"bi bi-gem"}
                    progress={this.props.stats ? this.props.stats.progress : 0}
                    buttonText={"edit"}
                    buttonDisabled={false}
                    workers={this.props.stats ? this.props.stats.worker : 0}
                    level={this.props.stats ? this.props.stats.level : 0}
                    levelUpCondition={this.props.stats ? this.props.stats.level : 0}
                    performance={this.props.stats ? this.props.stats.level : 0}
                    modalTarget={"#" + STONE_MINE_MODAL}>
                </Workplace>
                <StoneMineDialog
                    stats={this.props.stats ? this.props.stats : {}}
                    assignWorkerHandler={this.props.assignWorkerHandler ? this.props.assignWorkerHandler : () => {
                    }}
                    levelUpHandler={this.props.levelUpHandler ? this.props.levelUpHandler : () => {
                    }}
                    resourceStats={this.props.resourceStats}

                >
                </StoneMineDialog>
            </div>
        );
    }
}

class StoneMineDialog extends React.Component {
    render() {
        return (
            <WorkplaceModalDialog
                id={STONE_MINE_MODAL}
                title="Edit stone mine"
                levelUpCondition={this.props.stats ? this.props.stats.levelUpCondition : {}}
                performance={this.props.stats ? this.props.stats.performance : {}}
                level={this.props.stats ? this.props.stats.level : 0}
                workers={this.props.stats ? this.props.stats.worker : 0}
                assignWorkerHandler={this.props.assignWorkerHandler ? this.props.assignWorkerHandler : () => {
                }}
                levelUpHandler={this.props.levelUpHandler ? this.props.levelUpHandler : () => {
                }}
                shortName={"stonemine"}
                resourceStats={this.props.resourceStats}

            ></WorkplaceModalDialog>
        );
    }
}

export default StoneMine;