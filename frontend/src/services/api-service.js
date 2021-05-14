//Contains Dummy-Methods to be replaced by API-Calls later

export class ApiService {

    constructor(httpService) {
        this.httpService = httpService;
    }

    async getWorkplaceStats() {
        let buildingInformation = await this.httpService.ajax("GET", "/api/buildingInformation/");

        if (buildingInformation !== undefined) {
            buildingInformation.resources = {
                amountWood: buildingInformation.woodcutters.amountWood,
                amountCoal: buildingInformation.mine.amountCoal,
                amountIronOre: buildingInformation.mine.amountIronOre,
                money: buildingInformation.townhall.money,
                workers: buildingInformation.townhall.amountWorkersFree
            };
            buildingInformation.sellPrice = {
                wood: buildingInformation.woodcutters.woodSellPrice,
                coal: buildingInformation.mine.coalSellPrice,
                ironOre: buildingInformation.mine.ironOreSellPrice,
                workers: buildingInformation.townhall.workerCost
            };
        }
        return buildingInformation;
    }


    async updateWorkplace(workplace, amountOfWorkers, level, shouldLevelUp=true) {
        return this.httpService.ajax("PUT", "/api/" + workplace, {
            amountDedicatedWorkers: amountOfWorkers,
            buildinglevel: shouldLevelUp?level:undefined,
        });
    }

    async updateTownhall(amountWoodToSell, amountCoalToSell, amountIronOreToSell, amountWorkersToBuy, buildingLevel, shouldLevelUp) {
        return this.httpService.ajax("PUT", "/api/townhall", {
            amountWoodToSell: parseInt(amountWoodToSell),
            amountCoalToSell: parseInt(amountCoalToSell),
            amountIronOreToSell: parseInt(amountIronOreToSell),
            amountWorkersToBuy: parseInt(amountWorkersToBuy),
            buildinglevel: shouldLevelUp?parseInt(buildingLevel):undefined
        });
    }

    async updateArmyCenter(amountArchersToBuy, amountBlockersToBuy, amountSwordsmanToBuy, buildingLevel, shouldLevelUp) {
        return this.httpService.ajax("PUT", "/api/armyCenter", {
            amountArchersToBuy: parseInt(amountArchersToBuy),
            amountBlockersToBuy: parseInt(amountBlockersToBuy),
            amountSwordsmanToBuy: parseInt(amountSwordsmanToBuy),
            buildinglevel: shouldLevelUp?parseInt(buildingLevel):undefined
        });
    }

}