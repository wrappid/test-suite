"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WrappidTestSuite = void 0;
const globals_1 = require("@jest/globals");
const supertest_1 = __importDefault(require("supertest"));
const axios_1 = __importDefault(require("axios"));
class WrappidTestSuite {
    constructor(app) {
        this.wrappidApp = app;
        this.wrappidApp.init();
    }
    async getRoutes() {
        try {
            const url = "https://stageapi.rxefy.com/noauth/business/all/Routes?limit=2";
            const response = await axios_1.default.get(url);
            if (response.status === 200) {
                this.apiRoutes = response.data.data.rows;
            }
            else {
                console.error("Failed to fetch data. Status code:", response.status);
            }
        }
        catch (error) {
            console.error("An error occurred:", error);
        }
    }
    async init() {
        await this.getRoutes();
        (0, globals_1.describe)("Wrappid Automation Testing Suite: Testing", async () => {
            (0, globals_1.test)("Testing Wrappid Service: Testing", async () => {
                console.log("Wrappid Test Suite is working fine!");
                const response = await (0, supertest_1.default)(this.wrappidApp.wrappidApp).get('/version');
                (0, globals_1.expect)(response.status).toBe(200);
            }, 20000);
            this.apiRoutes.forEach(route => {
                globals_1.it.each([this.apiRoutes])(`Testing Route: ${route.name}`, async () => {
                    const response = await (0, supertest_1.default)(this.wrappidApp.wrappidApp).get(route.url);
                    (0, globals_1.expect)(response.status).toBe(200);
                }, 20000);
            });
        });
    }
}
exports.WrappidTestSuite = WrappidTestSuite;
//# sourceMappingURL=WrappidTestSuite.js.map