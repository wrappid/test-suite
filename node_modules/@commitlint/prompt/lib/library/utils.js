"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMaxLength = exports.getRules = exports.enumRuleIsActive = exports.ruleIsNotApplicable = exports.ruleIsApplicable = exports.ruleIsActive = exports.getHasName = exports.getRulePrefix = exports.getRuleName = void 0;
const types_1 = require("@commitlint/types");
/**
 * Get name for a given rule id
 * @param id of the rule
 * @return name of the rule
 */
function getRuleName(id) {
    const fragments = id.split('-');
    return fragments.length > 1 ? fragments.slice(1).join('-') : fragments[0];
}
exports.getRuleName = getRuleName;
/**
 * Get prefix for a given rule id
 * @param id of the rule
 * @return prefix of the rule
 */
function getRulePrefix(id) {
    const fragments = id.split('-');
    return fragments.length > 1 ? fragments[0] : null;
}
exports.getRulePrefix = getRulePrefix;
/**
 * Get a predicate matching rule definitions with a given name
 */
function getHasName(name) {
    return (rule) => getRuleName(rule[0]) === name;
}
exports.getHasName = getHasName;
/**
 * Check if a rule definition is active
 * @param rule to check
 * @return if the rule definition is active
 */
function ruleIsActive(rule) {
    const [, value] = rule;
    if (value && Array.isArray(value)) {
        return value[0] > types_1.RuleConfigSeverity.Disabled;
    }
    return false;
}
exports.ruleIsActive = ruleIsActive;
/**
 * Check if a rule definition is applicable
 * @param rule to check
 * @return if the rule definition is applicable
 */
function ruleIsApplicable(rule) {
    const [, value] = rule;
    if (value && Array.isArray(value)) {
        return value[1] === 'always';
    }
    return false;
}
exports.ruleIsApplicable = ruleIsApplicable;
/**
 * Check if a rule definition is applicable
 * @param rule to check
 * @return if the rule definition is applicable
 */
function ruleIsNotApplicable(rule) {
    const [, value] = rule;
    if (value && Array.isArray(value)) {
        return value[1] === 'never';
    }
    return false;
}
exports.ruleIsNotApplicable = ruleIsNotApplicable;
function enumRuleIsActive(rule) {
    return (ruleIsActive(rule) &&
        ruleIsApplicable(rule) &&
        Array.isArray(rule[1][2]) &&
        rule[1][2].length > 0);
}
exports.enumRuleIsActive = enumRuleIsActive;
/**
 * Get rules for a given prefix
 * @param prefix to search in rule names
 * @param rules rules to search in
 * @return rules matching the prefix search
 */
function getRules(prefix, rules) {
    return Object.entries(rules).filter((rule) => getRulePrefix(rule[0]) === prefix);
}
exports.getRules = getRules;
function getMaxLength(rule) {
    if (rule &&
        ruleIsActive(rule) &&
        ruleIsApplicable(rule) &&
        typeof rule[1][2] === 'number') {
        return rule[1][2];
    }
    return Infinity;
}
exports.getMaxLength = getMaxLength;
//# sourceMappingURL=utils.js.map