"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const format_1 = __importDefault(require("./format"));
const get_forced_case_fn_1 = __importDefault(require("./get-forced-case-fn"));
const get_forced_leading_fn_1 = __importDefault(require("./get-forced-leading-fn"));
const meta_1 = __importDefault(require("./meta"));
const utils_1 = require("./utils");
const EOL = '\n';
/**
 * Get a cli prompt based on rule configuration
 * @param type type of the data to gather
 * @param rules
 * @param settings
 * @return prompt instance
 */
function getPrompt(type, rules = [], settings = {}) {
    const emptyRule = rules.filter((0, utils_1.getHasName)('empty')).find(utils_1.ruleIsActive);
    const mustBeEmpty = emptyRule ? (0, utils_1.ruleIsApplicable)(emptyRule) : false;
    if (mustBeEmpty) {
        return null;
    }
    const required = emptyRule ? (0, utils_1.ruleIsNotApplicable)(emptyRule) : false;
    const forceCaseFn = (0, get_forced_case_fn_1.default)(rules.find((0, utils_1.getHasName)('case')));
    const forceLeadingBlankFn = (0, get_forced_leading_fn_1.default)(rules.find((0, utils_1.getHasName)('leading-blank')));
    const maxLengthRule = rules.find((0, utils_1.getHasName)('max-length'));
    const inputMaxLength = (0, utils_1.getMaxLength)(maxLengthRule);
    const enumRule = rules.filter((0, utils_1.getHasName)('enum')).find(utils_1.enumRuleIsActive);
    const tabCompletion = enumRule
        ? enumRule[1][2].map((enumerable) => {
            const enumSettings = (settings.enumerables || {})[enumerable] || {};
            return {
                value: forceLeadingBlankFn(forceCaseFn(enumerable)),
                description: enumSettings.description || '',
            };
        })
        : [];
    const maxLength = (res) => {
        let remainingHeaderLength = Infinity;
        if (settings.header && settings.header.length) {
            const header = (0, format_1.default)({
                type: res.type,
                scope: res.scope,
                subject: res.subject,
            });
            remainingHeaderLength = settings.header.length - header.length;
        }
        return Math.min(inputMaxLength, remainingHeaderLength);
    };
    return {
        type: 'input-custom',
        name: type,
        message: `${type}:`,
        validate(input, answers) {
            if (input.length > maxLength(answers || {})) {
                return 'Input contains too many characters!';
            }
            if (required && input.trim().length === 0) {
                // Show help if enum is defined and input may not be empty
                return `⚠ ${chalk_1.default.bold(type)} may not be empty.`;
            }
            const tabValues = tabCompletion.map((item) => item.value);
            if (input.length > 0 &&
                tabValues.length > 0 &&
                !tabValues.includes(input)) {
                return `⚠ ${chalk_1.default.bold(type)} must be one of ${tabValues.join(', ')}.`;
            }
            return true;
        },
        tabCompletion,
        log(answers) {
            let prefix = `${chalk_1.default.white('Please enter a')} ${chalk_1.default.bold(type)}: ${(0, meta_1.default)({
                optional: !required,
                required: required,
                'tab-completion': typeof enumRule !== 'undefined',
                header: typeof settings.header !== 'undefined',
                'multi-line': settings.multiline,
            })}` + EOL;
            if (settings.description) {
                prefix += chalk_1.default.grey(`${settings.description}`) + EOL;
            }
            if (answers) {
                prefix += EOL + `${(0, format_1.default)(answers, true)}` + EOL;
            }
            return prefix + EOL;
        },
        maxLength,
        transformer(value) {
            return forceCaseFn(value);
        },
    };
}
exports.default = getPrompt;
//# sourceMappingURL=get-prompt.js.map