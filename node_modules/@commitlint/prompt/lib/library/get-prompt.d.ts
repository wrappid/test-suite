import type { InputCustomOptions } from 'inquirer';
import type { InputSetting, RuleEntry, Result, ResultPart } from './types';
/**
 * Get a cli prompt based on rule configuration
 * @param type type of the data to gather
 * @param rules
 * @param settings
 * @return prompt instance
 */
export default function getPrompt(type: ResultPart, rules?: RuleEntry[], settings?: InputSetting): InputCustomOptions<Result> | null;
//# sourceMappingURL=get-prompt.d.ts.map