/// <reference path="../../src/inquirer/inquirer.d.ts" />
/// <reference types="node" />
import inquirer from 'inquirer';
import InputPrompt from 'inquirer/lib/prompts/input';
import type { Interface as ReadlineInterface, Key } from 'readline';
import Answers = inquirer.Answers;
import InputCustomOptions = inquirer.InputCustomOptions;
import SuccessfulPromptStateData = inquirer.prompts.SuccessfulPromptStateData;
interface KeyDescriptor {
    value: string;
    key: Key;
}
export default class InputCustomPrompt<TQuestion extends InputCustomOptions = InputCustomOptions> extends InputPrompt<TQuestion> {
    private lineSubscription;
    private readonly tabCompletion;
    constructor(question: TQuestion, readLine: ReadlineInterface, answers: Answers);
    onEnd(state: SuccessfulPromptStateData): void;
    /**
     * @see https://nodejs.org/api/readline.html#readline_rl_write_data_key
     * @see https://nodejs.org/api/readline.html#readline_rl_line
     */
    updateLine(line: string): void;
    onKeyPress2(e: KeyDescriptor): void;
    measureInput(input: string): number;
    render(error?: string): void;
}
export {};
//# sourceMappingURL=InputCustomPrompt.d.ts.map