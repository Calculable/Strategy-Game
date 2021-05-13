import {render, screen} from '@testing-library/react';
import App from './App';
import AboutPage from "./pages/about";
import {fakeApiService} from "./services/fake-api-service"
import {ApiService} from "./services/api-service";
import {AuthService} from "./services/auth-service";
import {valueStorage} from "./services/value-storage";

const sinon = require('sinon');

describe("React", function () { //Fixture

    it('renders title', () => {
        render(<App/>);
        const textElement = screen.getByText(/Say hello to Strategy Game/i);
        expect(textElement).toBeInTheDocument();
    });

    it('renders about', () => {
        render(<AboutPage/>);
        const textElement = screen.getByText(/Distributed Systems and Blockchain/i);
        expect(textElement).toBeInTheDocument();
    });

});


describe("The Auth-Service", function () {

    let authService;
    let spyHttpService;

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidXNlciJ9.Z8Zp7wwOkITEMpvgFI-XTd7322RxIkV38NJqIiv4IvA";
    const validUsername = "user";
    const invalidUsername = "invalidUser";
    const validPassword = "1234";
    const invalidPassword = "invalidPassword";

    beforeEach(function () {

        const httpServiceFake = {
            ajax: (method, url, data, headers) => {
                if (data.username === validUsername && data.password === validPassword) {
                    return Promise.resolve({token: token})
                } else {
                    return Promise.resolve("invalid login")
                }
            },
            setAuthToken: (token) => {
            },
            removeAuthToken: _ => {
            },
            hasAuthToken: _ => false
        };

        spyHttpService = sinon.spy(httpServiceFake);
        authService = new AuthService(httpServiceFake);
    });

    it('sets the auth token after successful login', () => {

        return authService.login(validUsername, validPassword).then(result => {
            expect(spyHttpService.ajax.calledOnce).toBe(true);
            expect(spyHttpService.setAuthToken.getCall(0).args[0]).toEqual(token);

        });
    });

    it('does not set the auth token after unsuccessful login', () => {

        return authService.login(validUsername, invalidPassword).then(result => {
            expect(spyHttpService.ajax.calledOnce).toBe(true);
            expect(spyHttpService.setAuthToken.getCall(0).args[0]).toEqual(undefined);

        });
    });

    it('removes auth-token on logout', () => {

        return authService.logout();
        expect(spyHttpService.removeAuthToken.calledOnce).toBe(true);

    });

    it('uses auth token to check if user is logged in', () => {

        expect(authService.isLoggedIn()).toBe(false);
        expect(spyHttpService.hasAuthToken.calledOnce).toBe(true);

    });

    describe("The Fake API-Service", function () {

        it('returns workplaces', () => {
            return fakeApiService.getWorkplaceStats().then(result => {
                expect(Object.keys(result).length).toBeGreaterThan(0);
            });
        });

        it('returns result on update workplace', () => {
            return fakeApiService.updateWorkplace("woodcutters", 1, 1).then(result => {
                expect(result.amountDedicatedWorkers).toEqual(1);
                expect(result.buildinglevel).toEqual(1);
            });
        });


    });


    describe("The API-Service", function () {

        let apiService;
        let spyHttpServiceAjax;

        beforeEach(function () {

            const httpServiceStub = {
                ajax: (method, url, data, headers) => {
                    return Promise.resolve(undefined);
                }
            };

            spyHttpServiceAjax = sinon.spy(httpServiceStub.ajax);
            apiService = new ApiService(httpServiceStub);
        });

        it('uses httpService to getWorkplaceStats', () => {
            return apiService.getWorkplaceStats().then(result => {
                spyHttpServiceAjax.calledWith("GET", "/api/buildingInformation/");
            });
        });

        it('uses httpService to updateWorkplace', () => {
            return apiService.updateWorkplace("woodcutters", 1, 1).then(result => {
                spyHttpServiceAjax.calledWith("PUT", "/api/woodcutters", {
                    amountDedicatedWorkers: 1,
                    buildinglevel: 1,
                    //amountWood: 0,
                    //amountCoal: 0,
                    //amountIronOre: 0
                });
            });
        });

    });


    describe("The Value Storage", function () {

        const exampleKey = "exampleKey";
        const exampleValue = "exampleValue1";
        const secondExampleValue = "exampleValue1";

        beforeEach(function () {
            valueStorage.setItem(exampleKey, exampleValue);
        });

        afterEach(function () {
            valueStorage.setItem(exampleKey, null);
        });

        it('returns null for unknown keys', () => {
            expect(valueStorage.getItem("unknown")).toBeNull();
        });

        it('returns value for known keys', () => {
            expect(valueStorage.getItem(exampleKey)).toEqual(exampleValue);
        });

        it('can overwrite keys', () => {
            valueStorage.setItem(exampleKey, secondExampleValue);
            expect(valueStorage.getItem(exampleKey)).toEqual(secondExampleValue);
        });

        it('can overwrite keys with null', () => {
            valueStorage.setItem(exampleKey, null);
            expect(valueStorage.getItem(exampleKey)).toBeNull();
        });
    });

});

