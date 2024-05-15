import { RuleConfigSeverity } from '@commitlint/types';
import type { QualifiedRules } from '@commitlint/types';
import type { RuleEntry } from './types';
/**
 * Get name for a given rule id
 * @param id of the rule
 * @return name of the rule
 */
export declare function getRuleName(id: string): string;
/**
 * Get prefix for a given rule id
 * @param id of the rule
 * @return prefix of the rule
 */
export declare function getRulePrefix(id: string): string | null;
/**
 * Get a predicate matching rule definitions with a given name
 */
export declare function getHasName(name: string): <T extends RuleEntry>(rule: RuleEntry) => rule is Exclude<T, [string, undefined]>;
/**
 * Check if a rule definition is active
 * @param rule to check
 * @return if the rule definition is active
 */
export declare function ruleIsActive<T extends RuleEntry>(rule: T): rule is Exclude<T, [string, Readonly<[RuleConfigSeverity.Disabled]>]>;
/**
 * Check if a rule definition is applicable
 * @param rule to check
 * @return if the rule definition is applicable
 */
export declare function ruleIsApplicable(rule: RuleEntry): rule is [string, Readonly<[RuleConfigSeverity, 'always']>] | [string, Readonly<[RuleConfigSeverity, 'always', unknown]>];
/**
 * Check if a rule definition is applicable
 * @param rule to check
 * @return if the rule definition is applicable
 */
export declare function ruleIsNotApplicable(rule: RuleEntry): rule is [string, Readonly<[RuleConfigSeverity, 'never']>] | [string, Readonly<[RuleConfigSeverity, 'never', unknown]>];
export declare function enumRuleIsActive(rule: RuleEntry): rule is [
    string,
    Readonly<[
        RuleConfigSeverity.Warning | RuleConfigSeverity.Error,
        'always',
        string[]
    ]>
];
/**
 * Get rules for a given prefix
 * @param prefix to search in rule names
 * @param rules rules to search in
 * @return rules matching the prefix search
 */
export declare function getRules(prefix: string, rules: QualifiedRules): RuleEntry[];
export declare function getMaxLength(rule?: RuleEntry): number;
//# sourceMappingURL=utils.d.ts.map