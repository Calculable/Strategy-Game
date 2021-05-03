//Contains Dummy-Methods to be replaced by API-Calls later
export class ApiService {

    constructor(httpService) {
        this.httpService = httpService;
    }


    getRessourceStats() {
        //....
    }

    async getWorkplaceStats() {
        return await this.httpService.ajax("GET", "/api/buildingInformation/");
    }


    setWorkerForWorkplace(amountOfWorkers, workplace) {
        //...
    }

    levelUpWorkplace(workplace) {
        //....
    }

}