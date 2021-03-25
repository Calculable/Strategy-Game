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
                    progress={10}
                    buttonText={"edit"}
                    workers={"3"}
                    level={"2"}
                    modalTarget={"#" + COAL_MINE_MODAL}>
                </Workplace>
                <CoalMineDialog></CoalMineDialog>
            </div>
        );
    }
}

class CoalMineDialog extends React.Component {
    render() {
        return (
            <WorkplaceModalDialog id={COAL_MINE_MODAL} title="I'm the coal mine modal dialog"></WorkplaceModalDialog>
        );
    }
}

export default CoalMine;