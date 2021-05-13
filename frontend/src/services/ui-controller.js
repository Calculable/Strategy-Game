import {ApiService} from "./api-service";

export class UiController {

    constructor(uiComponent, httpService) {
        this.uiComponent = uiComponent;
        this.apiService = new ApiService(httpService);
    }

    async updateUI() {

        let fetchedWorkplaceStats = await this.apiService.getWorkplaceStats();

        this.uiComponent.setState({
            workplaceStats: fetchedWorkplaceStats
        });
    }

    pollInformation() {
        setInterval(this.updateUI.bind(this), 60000);
    }

    async updateWorkplaceHandler(workplace, amountOfWorkers, level) {
        await this.apiService.updateWorkplace(workplace, amountOfWorkers, level);
        this.updateUI();
    }

    async buyAndSellHandler(amountWoodToSell = 0, amountCoalToSell = 0, amountIronOreToSell = 0, amountWorkersToBuy = 0, buildingLevel) {
        await this.apiService.updateTownhall(amountWoodToSell, amountCoalToSell, amountIronOreToSell, amountWorkersToBuy, buildingLevel);
        this.updateUI();
    }

    async buyAndSellArmyHandler(amountArchersToBuy, amountBlockersToBuy, amountSwordsmanToBuy, buildingLevel) {
        await this.apiService.updateArmyCenter(amountArchersToBuy, amountBlockersToBuy, amountSwordsmanToBuy, buildingLevel);
        this.updateUI();
    }


}