//Contains Dummy-Methods to be replaced by API-Calls later
import ResourceCounter from "../pages/resourceCounter";
import React from "react";

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


    async updateWorkplace(workplace, amountOfWorkers, level) {
        return this.httpService.ajax("PUT", "/api/" + workplace, {
            amountDedicatedWorkers: amountOfWorkers,
            buildinglevel: level,
            //amountWood: 0,
            //amountCoal: 0,
            //amountIronOre: 0
        });
    }

    /*async getWoodcutterStats() {
        return this.httpService.ajax("GET", "/api/woodcutters");
    }*/

    async updateTownhall(amountWoodToSell, amountCoalToSell, amountIronOreToSell, amountWorkersToBuy, buildingLevel) {
        return this.httpService.ajax("PUT", "/api/townhall", {
            amountWoodToSell: parseInt(amountWoodToSell),
            amountCoalToSell: parseInt(amountCoalToSell),
            amountIronOreToSell: parseInt(amountIronOreToSell),
            amountWorkersToBuy: parseInt(amountWorkersToBuy),
            buildinglevel: parseInt(buildingLevel)
        });
    }

    async updateArmyCenter(amountArchersToBuy, amountBlockersToBuy, amountSwordsmanToBuy, buildingLevel) {
        return this.httpService.ajax("PUT", "/api/townhall", {
            amountArchersToBuy: parseInt(amountArchersToBuy),
            amountBlockersToBuy: parseInt(amountBlockersToBuy),
            amountSwordsmanToBuy: parseInt(amountSwordsmanToBuy),
            buildinglevel: parseInt(buildingLevel)
        });
    }

}