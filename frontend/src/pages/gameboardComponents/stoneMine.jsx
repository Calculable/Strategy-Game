import React from 'react'
import Workplace from "./template/workplace";
import WorkplaceModalDialog from "./template/workplaceModalDialog";

let STONE_MINE_MODAL = "stoneMineModal";

class StoneMine extends React.Component {
    render() {
        return (
            <div>
                <Workplace
                    className="woodcutter"
                    displayName={"Stone Mine"}
                    icon={"bi bi-gem"}
                    progress={70}
                    buttonText={"edit"}
                    workers={"3"}
                    level={"4"}
                    modalTarget={"#" + STONE_MINE_MODAL}>
                </Workplace>
                <StoneMineDialog></StoneMineDialog>
            </div>
        );
    }
}

class StoneMineDialog extends React.Component {
    render() {
        return (
            <WorkplaceModalDialog id={STONE_MINE_MODAL} title="I'm the stone mine modal dialog"></WorkplaceModalDialog>
        );
    }
}

export default StoneMine;