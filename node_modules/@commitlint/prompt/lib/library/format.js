"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
/**
 * Get formatted commit message
 * @param input object containing structured results
 * @param debug show debug information in commit message
 * @return formatted debug message
 */
function format(input, debug = false) {
    const defaultInput = Object.assign({ type: undefined, scope: undefined, subject: undefined, body: undefined, footer: undefined }, input);
    const results = debug
        ? Object.entries(defaultInput).reduce((registry, [name, value]) => {
            registry[name] =
                value === undefined ? chalk_1.default.grey(`<${name}>`) : chalk_1.default.bold(value);
            return registry;
        }, {})
        : defaultInput;
    // Return formatted string
    const { type, scope, subject, body, footer } = results;
    return [
        `${type || ''}${scope ? `(${scope})` : ''}${type || scope ? ':' : ''} ${subject || ''}`,
        body,
        footer,
    ]
        .filter(Boolean)
        .join('\n');
}
exports.default = format;
//# sourceMappingURL=format.js.map