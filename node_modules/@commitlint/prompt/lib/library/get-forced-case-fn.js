"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ensure_1 = require("@commitlint/ensure");
const utils_1 = require("./utils");
/**
 * Get forced case for rule
 * @param rule to parse
 * @return transform function applying the enforced case
 */
function getForcedCaseFn(rule) {
    const noop = (input) => input;
    if (!rule || !(0, utils_1.ruleIsActive)(rule) || (0, utils_1.ruleIsNotApplicable)(rule)) {
        return noop;
    }
    const target = rule[1][2];
    if (Array.isArray(target)) {
        return noop;
    }
    return (input) => (0, ensure_1.toCase)(input, target);
}
exports.default = getForcedCaseFn;
//# sourceMappingURL=get-forced-case-fn.js.map