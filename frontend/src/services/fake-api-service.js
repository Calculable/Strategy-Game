export class FakeApiService {

    constructor(httpService) {
        this.httpService = httpService;
    }


    /*async getRessourceStats() {
        return Promise.resolve({
            materials: {
                wood: this.randomRessourceCount(),
                iron: this.randomRessourceCount(),
                stone: this.randomRessourceCount(),
                gold: this.randomRessourceCount(),
                diamond: this.randomRessourceCount()
            },
            freeWorkers: this.randomWorkerCount()
        });
    }*/


    async getWorkplaceStats() {
        /*return Promise.resolve({
            woodCutter: this.getRandomWorkplaceStats(),
            stoneMine: this.getRandomWorkplaceStats(),
            coalMine: this.getRandomWorkplaceStats(),
            fisherSquare: this.getRandomWorkplaceStats(),
            cornfield: this.getRandomWorkplaceStats(),
        });
    }*/

        return Promise.resolve(
            {
                "woodcutters":{
                    "amountWood":0,
                    "amountDedicatedWorkers":0,
                    "buildinglevel":1
                },
                "mine":{
                    "amountCoal":0,
                    "amountIronOre":0,
                    "amountDedicatedWorkers":0,
                    "buildinglevel":1
                },
                "townhall":{
                    "amountWorkersOwned":2,
                    "money":100,
                    "buildinglevel":1
                },
                "armyCenter":{
                    "amountArchers":0,
                    "archerLevel":1,
                    "amountBlockers":0,
                    "blockerLevel":1,
                    "amountSwordsman":0,
                    "swordsmanLevel":1,
                    "buildinglevel":1
                }
            }
        );

    }

    async updateWorkplace(workplace, amountOfWorkers, level) {
        return Promise.resolve({
                "amountDedicatedWorkers":amountOfWorkers,
                "buildinglevel":level
            });
    }

    async getWoodcutterStats() {
    }

    /*Helper Functions*/
    getRandomWorkplaceStats() {
        return {
            level: this.randomLevel(),
            levelUpCondition: {
                wood: this.randomRessourceCount(),
                iron: this.randomRessourceCount(),
                stone: this.randomRessourceCount(),
                gold: this.randomRessourceCount(),
                diamond: this.randomRessourceCount(),
            },
            worker: this.randomWorkerCount(),
            progress: this.randomNumberProgress(),
            performance: {
                timeInMinutes: 5,
                wood: this.randomRessourceCount(),
                iron: this.randomRessourceCount(),
                stone: this.randomRessourceCount(),
                gold: this.randomRessourceCount(),
                diamond: this.randomRessourceCount(),
            },
        };
    }

    randomLevel() {
        return Math.floor(Math.random() * 10) + 1;
    }

    randomWorkerCount() {
        return Math.floor(Math.random() * 10) + 1;
    }

    randomNumberProgress() {
        return Math.floor(Math.random() * 100) + 1;
    }

    randomRessourceCount() {
        return Math.floor(Math.random() * 1000) + 1;
    }
}

export const fakeApiService = new FakeApiService();