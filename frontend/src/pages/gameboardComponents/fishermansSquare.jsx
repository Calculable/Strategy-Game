import React from 'react'
import Workplace from "./template/workplace";
import WorkplaceModalDialog from "./template/workplaceModalDialog";

let FISHERMANS_SQUARE_MODAL = "fishermansSquareModal";

class FishermansSquare extends React.Component {
    render() {
        return (
            <div>
                <Workplace
                    className="woodcutter"
                    displayName={"Fisher Square"}
                    icon={"bi bi-water"}
                    progress={10}
                    buttonText={"edit"}
                    workers={"1"}
                    level={"4"}
                    modalTarget={"#" + FISHERMANS_SQUARE_MODAL}>
                </Workplace>
                <FishermansSquareDialog></FishermansSquareDialog>
            </div>
        );
    }
}

class FishermansSquareDialog extends React.Component {
    render() {
        return (
            <WorkplaceModalDialog id={FISHERMANS_SQUARE_MODAL}
                                  title="I'm the fisherman's square modal dialog"></WorkplaceModalDialog>
        );
    }
}

export default FishermansSquare;