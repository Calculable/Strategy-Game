//Contains Dummy-Methods to be replaced by API-Calls later
class ApiService {

    getRessourceStats() {
        return {
            materials: {
                wood: this.randomRessourceCount(),
                iron: this.randomRessourceCount(),
                stone: this.randomRessourceCount(),
                gold: this.randomRessourceCount(),
                diamond: this.randomRessourceCount()
            },
            freeWorkers: this.randomWorkerCount()
        };
    }

    getWorkplaceStats() {
        return {
            woodCutter: this.getRandomWorkplaceStats(),
            stoneMine: this.getRandomWorkplaceStats(),
            coalMine: this.getRandomWorkplaceStats(),
            fisherSquare: this.getRandomWorkplaceStats(),
            cornfield: this.getRandomWorkplaceStats(),
        };
    }

    setWorkerForWorkplace(amountOfWorkers, workplace) {
        //...
    }

    levelUpWorkplace(workplace) {

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

export const apiService = new ApiService();