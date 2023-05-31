"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startConversation = void 0;
var cli_1 = require("./cli");
var questions_1 = require("./questions");
var actions_1 = require("./Actions/actions");
var os = require("os");
// Function to get the current username
function getCurrentUsername() {
    return os.userInfo().username;
}
function comparable(question, arg, start) {
    if (start) {
        return question.toLowerCase().startsWith("add");
    }
    else {
        return question.toLowerCase().match(arg);
    }
}
var cli;
// Start asking questions
function startConversation(userId) {
    if (!cli) {
        // Create the cli instance if it doesn't exist
        cli = (0, cli_1.createCLI)();
    }
    cli.question("Ask me a question (Type 'exit' to quit): ", function (question) {
        if (question.toLowerCase() === "exit") {
            cli === null || cli === void 0 ? void 0 : cli.close();
        }
        else if (comparable(question, undefined, true)) {
            var item = question.split(" ")[1];
            (0, questions_1.addToShoppingList)(userId, item, startConversation);
        }
        else if (comparable(question, /clean\s+my\s+room/i)) {
            (0, actions_1.cleanRoom)(userId);
        }
        else if (comparable(question, /fetch\s+my\s+newspaper/i)) {
            (0, actions_1.fetchNewspaper)(userId);
        }
        else if (comparable(question, /read\s+my\s+shopping\s+list/i)) {
            (0, questions_1.readShoppingList)(userId, startConversation);
        }
        else {
            (0, questions_1.handleQuestion)(userId, question, startConversation);
        }
    });
}
exports.startConversation = startConversation;
// Start the conversation with the current user
startConversation(getCurrentUsername());
