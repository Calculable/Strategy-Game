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
                    progress={20}
                    buttonText={"edit"}
                    workers={"1"}
                    level={"1"}
                    modalTarget={"#" + WOOD_CUTTER_MODAL}>
                </Workplace>
                <WoodCutterDialog></WoodCutterDialog>
            </div>
        );
    }
}

class WoodCutterDialog extends React.Component {
    render() {
        return (
            <WorkplaceModalDialog id={WOOD_CUTTER_MODAL}
                                  title="I'm the wood-cutter modal dialog"></WorkplaceModalDialog>
        );
    }
}

export default WoodCutter;