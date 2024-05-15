"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="./inquirer.d.ts" />
const chalk_1 = __importDefault(require("chalk"));
const input_1 = __importDefault(require("inquirer/lib/prompts/input"));
const events_1 = __importDefault(require("inquirer/lib/utils/events"));
class InputCustomPrompt extends input_1.default {
    constructor(question, readLine, answers) {
        super(question, readLine, answers);
        if (this.opt.log) {
            this.rl.write(this.opt.log(answers));
        }
        if (!this.opt.maxLength) {
            this.throwParamError('maxLength');
        }
        const events = (0, events_1.default)(this.rl);
        this.lineSubscription = events.keypress.subscribe(this.onKeyPress2.bind(this));
        this.tabCompletion = (this.opt.tabCompletion || [])
            .map((item) => item.value)
            .sort((a, b) => a.localeCompare(b));
    }
    onEnd(state) {
        this.lineSubscription.unsubscribe();
        super.onEnd(state);
    }
    /**
     * @see https://nodejs.org/api/readline.html#readline_rl_write_data_key
     * @see https://nodejs.org/api/readline.html#readline_rl_line
     */
    updateLine(line) {
        this.rl.write(null, { ctrl: true, name: 'b' });
        this.rl.write(null, { ctrl: true, name: 'd' });
        this.rl.write(line.substr(this.rl.line.length));
    }
    onKeyPress2(e) {
        if (e.key.name === 'tab' && this.tabCompletion.length > 0) {
            let line = this.rl.line.trim();
            if (line.length > 0) {
                for (const item of this.tabCompletion) {
                    if (item.startsWith(line) && item !== line) {
                        line = item;
                        break;
                    }
                }
            }
            this.updateLine(line);
        }
    }
    measureInput(input) {
        if (this.opt.filter) {
            return this.opt.filter(input).length;
        }
        return input.length;
    }
    render(error) {
        const answered = this.status === 'answered';
        let message = this.getQuestion();
        const length = this.measureInput(this.rl.line);
        if (answered) {
            message += chalk_1.default.cyan(this.answer);
        }
        else if (this.opt.transformer) {
            message += this.opt.transformer(this.rl.line, this.answers, {});
        }
        let bottomContent = '';
        if (error) {
            bottomContent = chalk_1.default.red('>> ') + error;
        }
        else if (!answered) {
            const maxLength = this.opt.maxLength(this.answers);
            if (maxLength < Infinity) {
                const lengthRemaining = maxLength - length;
                const color = lengthRemaining <= 5
                    ? chalk_1.default.red
                    : lengthRemaining <= 10
                        ? chalk_1.default.yellow
                        : chalk_1.default.grey;
                bottomContent = color(`${lengthRemaining} characters left`);
            }
        }
        this.screen.render(message, bottomContent);
    }
}
exports.default = InputCustomPrompt;
//# sourceMappingURL=InputCustomPrompt.js.map