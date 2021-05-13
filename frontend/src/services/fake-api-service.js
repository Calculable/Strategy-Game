export class FakeApiService {

    constructor(httpService) {
        this.httpService = httpService;
    }

    async getWorkplaceStats() {
        return Promise.resolve(
            {
                "woodcutters": {
                    "amountWood": 15,
                    "amountDedicatedWorkers": 1,
                    "buildinglevel": 1,
                    "levelUpCost": 5.0,
                    "woodPerMinute": 4.0,
                    "woodSellPrice": 1,
                },
                "mine": {
                    "amountCoal": 39,
                    "amountIronOre": 42,
                    "amountDedicatedWorkers": 5,
                    "buildinglevel": 2,
                    "levelUpCost": 5.0,
                    "coalPerMinute": 6.0,
                    "ironOrePerMinute": 7.0,
                    "coalSellPrice": 1,
                    "ironOreSellPrice": 2
                },
                "townhall": {
                    "amountWorkersFree": 2,
                    "money": 100,
                    "buildinglevel": 2,
                    "levelUpCost": 10,
                    "workerCost": 100
                },
                "armyCenter": {
                    "amountArchers": 0,
                    "archerLevel": 1,
                    "amountBlockers": 0,
                    "blockerLevel": 1,
                    "amountSwordsman": 0,
                    "swordsmanLevel": 1,
                    "buildinglevel": 1,
                    "archerCost": 10,
                    "blockerCost": 15,
                    "swordsmanCost": 20
                },
                "resources": {
                    "amountWood": 15,
                    "amountCoal": 39,
                    "amountIronOre": 42,
                    "money": 100,
                    "workers": 2
                },
                "sellPrice": {
                    "wood": 5,
                    "coal": 5,
                    "ironOre": 5,
                    "workers": 5
                }
            }
        );

    }

    async updateWorkplace(workplace, amountOfWorkers, level) {
        return Promise.resolve({
            "amountDedicatedWorkers": amountOfWorkers,
            "buildinglevel": level
        });
    }

    async updateTownhall(amountWoodToSell, amountCoalToSell, amountIronOreToSell, amountWorkersToBuy, buildingLevel) {
        return Promise.resolve();
    }

    async updateArmyCenter(amountArchersToBuy, amountBlockersToBuy, amountSwordsmanToBuy, buildingLevel) {
        return Promise.resolve();
    }

}

export const fakeApiService = new FakeApiService(undefined);
