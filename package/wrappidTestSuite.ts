import { describe, expect, it, test } from "@jest/globals";
import request from "supertest";
import { WrappidApp, databaseProvider } from "@wrappid/service-core";
import { GenericObject } from "@wrappid/service-core/types/generic.types";
import axios from "axios";

export class WrappidTestSuite {
  wrappidApp: WrappidApp;
  apiRoutes: GenericObject[];

  constructor(app: WrappidApp){
    this.wrappidApp = app;
    this.wrappidApp.init();
  }

  async getRoutes() {
    try {
      const url:string = "https://stageapi.rxefy.com/noauth/business/all/Routes?limit=2";
      const response = await axios.get(url);
      if (response.status === 200) {
          this.apiRoutes = response.data.data.rows;
      } else {
          console.error("Failed to fetch data. Status code:", response.status);
      }
    } catch (error) {
        console.error("An error occurred:", error);
    }
  }

  async init() {
      await this.getRoutes();

    describe("Wrappid Automation Testing Suite: Testing", async () => {
      test("Testing Wrappid Service: Testing", async () => {
        console.log("Wrappid Test Suite is working fine!");
        const response = await request(this.wrappidApp.wrappidApp).get('/version');
        expect(response.status).toBe(200);
      }, 20000);
      
      this.apiRoutes.forEach(route => {
       it.each([this.apiRoutes])(`Testing Route: ${route.name}`, async () => {
          const response = await request(this.wrappidApp.wrappidApp).get(route.url);
          expect(response.status).toBe(200);
        }, 20000);
      });
    });
  }
}
