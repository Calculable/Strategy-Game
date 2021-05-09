import {FakeApiService} from "./fake-api-service";
import {ApiService} from "./api-service";

export class UiController {

    constructor(uiComponent, httpService) {
        this.uiComponent = uiComponent;

        this.apiService = new FakeApiService(httpService);
        this.realApiService = new ApiService(httpService);

    }

    async updateUI() {

        let fetchedResourceStats = await this.apiService.getRessourceStats();
        let fetchedWorkplaceStats = await this.apiService.getWorkplaceStats();

        this.uiComponent.setState({
            resourceStats: fetchedResourceStats,
            workplaceStats: fetchedWorkplaceStats
        });

        this.realApiService.getWorkplaceStats().then(result => console.log("Real Stats: " + JSON.stringify(result)));

        this.apiService.getWorkplaceStats().then(result => console.log("Workplace Stats: " + JSON.stringify(result)));
        this.apiService.getRessourceStats().then(result => console.log("Resource Stats: " + JSON.stringify(result)));

        this.apiService.getWoodcutterStats().then(result => console.log("Woodcutter Stats: " + JSON.stringify(result)));
        this.apiService.levelUpWorkplace("woodcutters", 2).then(result => console.log("Level up Workplace: " + JSON.stringify(result)));
        this.apiService.setWorkerForWorkplace("woodcutters", 2).then(result => console.log("Set Worker for Workplace: " + JSON.stringify(result)));

    }

    pollInformation() {
        setInterval(this.updateUI.bind(this), 10000);
    }

    async levelUpHandler(workplace) {
        await this.apiService.levelUpWorkplace(workplace);
        await this.updateUI();
    }

    async assignWorkerHandler(amountOfWorkers, workplace) {
        alert("Set " + workplace + " to " + amountOfWorkers + " workers");
        await this.apiService.setWorkerForWorkplace(amountOfWorkers, workplace);
        await this.updateUI();
    }


}