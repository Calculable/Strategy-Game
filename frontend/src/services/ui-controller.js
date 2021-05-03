import {ApiService, FakeApiService} from "./fake-api-service";

export class UiController {

    constructor(uiComponent, httpService) {
        this.uiComponent = uiComponent;

        this.apiService = new FakeApiService(httpService);

    }

    updateUI() {

        console.log(this.apiService.getWorkplaceStats());
        let fetchedResourceStats = this.apiService.getRessourceStats();
        let fetchedWorkplaceStats = this.apiService.getWorkplaceStats();

        this.uiComponent.setState({
            resourceStats: fetchedResourceStats,
            workplaceStats: fetchedWorkplaceStats
        })
    }

    pollInformation() {
        setInterval(this.updateUI.bind(this), 10000);
    }

    levelUpHandler(workplace) {
        this.apiService.levelUpWorkplace(workplace);
        this.updateUI();
    }

    assignWorkerHandler(amountOfWorkers, workplace) {
        alert("Set " + workplace + " to " + amountOfWorkers + " workers");
        this.apiService.setWorkerForWorkplace(amountOfWorkers, workplace);
        this.updateUI();
    }


}