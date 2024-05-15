import inquirer from 'inquirer';
type Commit = (input: string) => void;
/**
 * Entry point for commitizen
 * @param cz inquirer instance passed by commitizen, unused
 * @param commit callback to execute with complete commit message
 * @return {void}
 */
export declare function prompter(cz: typeof inquirer, commit: Commit): void;
export {};
//# sourceMappingURL=index.d.ts.map