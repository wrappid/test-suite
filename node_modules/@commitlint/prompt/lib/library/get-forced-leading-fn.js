"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
/**
 * Get forced leading for rule
 * @param rule to parse
 * @return transform function applying the leading
 */
function getForcedLeadingFn(rule) {
    if (!rule || !(0, utils_1.ruleIsActive)(rule)) {
        return (input) => input;
    }
    const remove = (input) => {
        const fragments = input.split('\n');
        return fragments[0] === '' ? fragments.slice(1).join('\n') : input;
    };
    const lead = (input) => {
        const fragments = input.split('\n');
        return fragments[0] === '' ? input : ['', ...fragments].join('\n');
    };
    return !(0, utils_1.ruleIsNotApplicable)(rule) ? lead : remove;
}
exports.default = getForcedLeadingFn;
//# sourceMappingURL=get-forced-leading-fn.js.map