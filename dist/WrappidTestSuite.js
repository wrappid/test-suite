"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WrappidTestSuite = void 0;
const globals_1 = require("@jest/globals");
const supertest_1 = __importDefault(require("supertest"));
const service_core_1 = require("@wrappid/service-core");
class WrappidTestSuite {
    constructor(app) {
        this.wrappidApp = app;
    }
    init() {
        (0, globals_1.describe)("Wrappid Automation Testing Suite: Testing", () => {
            (0, globals_1.test)("Testing Wrappid Service: Testing", async () => {
                console.log("Wrappid Test Suite is working fine!");
                console.log(service_core_1.databaseProvider);
                const response = await (0, supertest_1.default)(this.wrappidApp.wrappidApp).get('/version');
                (0, globals_1.expect)(response.status).toBe(200);
            }, 20000);
        });
    }
}
exports.WrappidTestSuite = WrappidTestSuite;
//# sourceMappingURL=WrappidTestSuite.js.map