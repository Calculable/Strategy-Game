export class FakeApiService {

    constructor(httpService) {
        this.httpService = httpService;
    }


    async getRessourceStats() {
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
    }


    async getWorkplaceStats() {
        return Promise.resolve({
            woodCutter: this.getRandomWorkplaceStats(),
            stoneMine: this.getRandomWorkplaceStats(),
            coalMine: this.getRandomWorkplaceStats(),
            fisherSquare: this.getRandomWorkplaceStats(),
            cornfield: this.getRandomWorkplaceStats(),
        });
    }


    async setWorkerForWorkplace(workplace, amountOfWorkers) {
        return this.httpService.ajax("PUT", "/api/" + workplace, {amoundDedicatedWorkers: amountOfWorkers});
    }

    async levelUpWorkplace(workplace, newLevel) {
        return this.httpService.ajax("PUT", "/api/" + workplace, {buildingLevel: newLevel});
    }

    async getWoodcutterStats() {
        return this.httpService.ajax("GET", "/api/woodcutters");
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