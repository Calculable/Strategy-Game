import React from 'react'
import Workplace from "./template/workplace";
import WorkplaceModalDialog from "./template/workplaceModalDialog";

let CORNFIELD_MODAL = "cornfieldModal";

class Cornfield extends React.Component {
    render() {
        return (
            <div>
                <Workplace
                    className="woodcutter"
                    displayName={"Cornfield"}
                    icon={"bi bi-pause"}
                    progress={80}
                    buttonText={"edit"}
                    workers={"14"}
                    level={"3"}
                    modalTarget={"#" + CORNFIELD_MODAL}>
                </Workplace>
                <CornfieldDialog></CornfieldDialog>
            </div>
        );
    }
}

class CornfieldDialog extends React.Component {
    render() {
        return (
            <WorkplaceModalDialog id={CORNFIELD_MODAL} title="I'm the cornfield modal dialog"></WorkplaceModalDialog>
        );
    }
}

export default Cornfield;