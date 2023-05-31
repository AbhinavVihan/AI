"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCLI = void 0;
var readline = require("readline");
function createCLI() {
    return readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
}
exports.createCLI = createCLI;
