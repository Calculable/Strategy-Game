import {FakeApiService} from "./fake-api-service";
import {ApiService} from "./api-service";

export class UiController {

    constructor(uiComponent, httpService) {
        this.uiComponent = uiComponent;

        this.apiService = new ApiService(httpService);

    }

    async updateUI() {

        //let fetchedResourceStats = await this.apiService.getRessourceStats();
        let fetchedWorkplaceStats = await this.apiService.getWorkplaceStats();

        this.uiComponent.setState({
            //resourceStats: fetchedResourceStats,
            workplaceStats: fetchedWorkplaceStats
        });

       /* this.realApiService.getWorkplaceStats().then(result => console.log("Real Stats: " + JSON.stringify(result)));

        this.apiService.getWorkplaceStats().then(result => console.log("Workplace Stats: " + JSON.stringify(result)));
        this.apiService.getRessourceStats().then(result => console.log("Resource Stats: " + JSON.stringify(result)));

        this.apiService.getWoodcutterStats().then(result => console.log("Woodcutter Stats: " + JSON.stringify(result)));
        this.apiService.levelUpWorkplace("woodcutters", 2).then(result => console.log("Level up Workplace: " + JSON.stringify(result)));
        this.apiService.setWorkerForWorkplace("woodcutters", 2).then(result => console.log("Set Worker for Workplace: " + JSON.stringify(result)));
*/
    }

    pollInformation() {
        setInterval(this.updateUI.bind(this), 60000);
    }


    async updateWorkplaceHandler(workplace, amountOfWorkers, level) {
        await this.apiService.updateWorkplace(workplace, amountOfWorkers, level);
    }

}