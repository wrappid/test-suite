import { WrappidApp } from "@wrappid/service-core";
import { GenericObject } from "@wrappid/service-core/types/generic.types";
export declare class WrappidTestSuite {
    wrappidApp: WrappidApp;
    apiRoutes: GenericObject[];
    constructor(app: WrappidApp);
    getRoutes(): Promise<void>;
    init(): Promise<void>;
}
