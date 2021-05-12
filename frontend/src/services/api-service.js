//Contains Dummy-Methods to be replaced by API-Calls later
export class ApiService {

    constructor(httpService) {
        this.httpService = httpService;
    }


    /*async getRessourceStats() {
        return Promise.resolve({
            materials: {
                wood: 100,
                iron: 100,
                stone: 100,
                gold: 100,
                diamond: 100
            },
            freeWorkers: this.randomWorkerCount()
        });
    }*/

    async getWorkplaceStats() {
        return this.httpService.ajax("GET", "/api/buildingInformation/");
    }


    async updateWorkplace(workplace, amountOfWorkers, level) {
        return this.httpService.ajax("PUT", "/api/" + workplace, {
            amountDedicatedWorkers: amountOfWorkers,
            buildinglevel: level,
            //amountWood: 0,
            //amountCoal: 0,
            //amountIronOre: 0
        });
    }

    async getWoodcutterStats() {
        return this.httpService.ajax("GET", "/api/woodcutters");
    }

}