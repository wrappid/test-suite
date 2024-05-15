"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
/**
 * Get formatted meta hints for configuration
 * @param settings dictionary to parse
 * @return formatted meta information
 */
function meta(settings) {
    return chalk_1.default.grey(Object.entries(settings || {})
        .filter((item) => item[1])
        .map((item) => {
        const [name, value] = item;
        return typeof value === 'boolean' ? `[${name}]` : `[${name}=${value}]`;
    })
        .join(' '));
}
exports.default = meta;
//# sourceMappingURL=meta.js.map