import React from 'react'
import Workplace from "./template/workplace";
import WorkplaceModalDialog from "./template/workplaceModalDialog";

let ARMY_CENTER_MODAL = "armyCenterModal";

class ArmyCenter extends React.Component {
    render() {
        return (
            <div>
                <Workplace
                    className="woodcutter"
                    displayName={"Army Center"}
                    icon={"bi bi-shield"}
                    buttonText={"manage army"}
                    modalTarget={"#" + ARMY_CENTER_MODAL}>
                </Workplace>
                <ArmyCenterDialog></ArmyCenterDialog>
            </div>
        );
    }
}

class ArmyCenterDialog extends React.Component {
    render() {
        return (
            <WorkplaceModalDialog id={ARMY_CENTER_MODAL}
                                  title="I'm the army center modal dialog"></WorkplaceModalDialog>
        );
    }
}

export default ArmyCenter;