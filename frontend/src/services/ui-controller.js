import {apiService} from './api-service'

export class UiController {

    constructor(uiComponent) {
        this.uiComponent = uiComponent;
    }

    updateUI() {
        let fetchedResourceStats = apiService.getRessourceStats();
        let fetchedWorkplaceStats = apiService.getWorkplaceStats();

        this.uiComponent.setState({
            resourceStats: fetchedResourceStats,
            workplaceStats: fetchedWorkplaceStats
        })
    }

    pollInformation() {
        setInterval(this.updateUI.bind(this), 10000);
    }

    levelUpHandler(workplace) {
        apiService.levelUpWorkplace(workplace);
        this.updateUI();
    }

    assignWorkerHandler(amountOfWorkers, workplace) {
        alert("Set " + workplace + " to " + amountOfWorkers + " workers");
        apiService.setWorkerForWorkplace(amountOfWorkers, workplace);
        this.updateUI();
    }


}