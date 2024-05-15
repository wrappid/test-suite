"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prompter = void 0;
const input_1 = require("./input");
/**
 * Entry point for commitizen
 * @param cz inquirer instance passed by commitizen, unused
 * @param commit callback to execute with complete commit message
 * @return {void}
 */
function prompter(cz, commit) {
    (0, input_1.input)(cz.prompt).then((message) => {
        commit(message);
    });
}
exports.prompter = prompter;
//# sourceMappingURL=index.js.map