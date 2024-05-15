import { describe, expect, test } from "@jest/globals";
import request from "supertest";
import { WrappidApp, databaseProvider } from "@wrappid/service-core";
export class WrappidTestSuite {
  wrappidApp: WrappidApp;

  constructor(app: WrappidApp){
    this.wrappidApp = app;
  }

  init() {
    
    describe("Wrappid Automation Testing Suite: Testing", () => {
      test("Testing Wrappid Service: Testing", async () => {
        console.log("Wrappid Test Suite is working fine!");
        console.log(databaseProvider );
        const response = await request(this.wrappidApp.wrappidApp).get('/version');
        expect(response.status).toBe(200);
      }, 20000);
    });
    
    
  }
}
