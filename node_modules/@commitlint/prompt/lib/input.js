"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.input = void 0;
const load_1 = __importDefault(require("@commitlint/load"));
const format_1 = __importDefault(require("./library/format"));
const get_prompt_1 = __importDefault(require("./library/get-prompt"));
const settings_1 = __importDefault(require("./settings"));
const utils_1 = require("./library/utils");
const InputCustomPrompt_1 = __importDefault(require("./inquirer/InputCustomPrompt"));
/**
 * Get user input by interactive prompt based on
 * conventional-changelog-lint rules.
 * @param prompter
 * @return commit message
 */
async function input(prompter) {
    const { rules } = await (0, load_1.default)();
    const parts = ['type', 'scope', 'subject', 'body', 'footer'];
    const headerParts = ['type', 'scope', 'subject'];
    const headerLengthRule = (0, utils_1.getRules)('header', rules).find((0, utils_1.getHasName)('max-length'));
    const maxLength = (0, utils_1.getMaxLength)(headerLengthRule);
    try {
        const questions = [];
        prompter.registerPrompt('input-custom', InputCustomPrompt_1.default);
        for (const input of parts) {
            const inputSetting = settings_1.default[input];
            const inputRules = (0, utils_1.getRules)(input, rules);
            if (headerParts.includes(input) && maxLength < Infinity) {
                inputSetting.header = {
                    length: maxLength,
                };
            }
            const question = (0, get_prompt_1.default)(input, inputRules, inputSetting);
            if (question) {
                questions.push(question);
            }
        }
        const results = await prompter(questions);
        return (0, format_1.default)(results);
    }
    catch (err) {
        console.error(err);
        return '';
    }
}
exports.input = input;
//# sourceMappingURL=input.js.map