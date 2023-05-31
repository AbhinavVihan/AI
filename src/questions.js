"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readShoppingList = exports.addToShoppingList = exports.handleQuestion = void 0;
var data_1 = require("./data");
// Mapping of questions and answers
var questionAnswerMap = {
    "Hey. How are you?": "Hello, I am doing great.",
    "How's the weather outside?": "It's pleasant outside. You should take a walk.",
};
// Function to handle a question and provide an answer
function handleQuestion(userId, question, startConversation) {
    var data = (0, data_1.loadData)(userId);
    var answer = questionAnswerMap[question];
    if (answer) {
        console.log("\x1b[36m%s\x1b[0m", "Answer: ".concat(answer));
    }
    else {
        console.log("\x1b[36m%s\x1b[0m", "I don't have an answer for that question.");
    }
    // Continue prompting for input
    startConversation(userId);
}
exports.handleQuestion = handleQuestion;
// Function to add an item to the shopping list
function addToShoppingList(userId, item, startConversation) {
    var data = (0, data_1.loadData)(userId);
    var shoppingList = data.shoppingList || [];
    if (shoppingList.includes(item)) {
        console.log("\x1b[36m%s\x1b[0m", "You already have \"".concat(item, "\" in your shopping list."));
    }
    else {
        shoppingList.push(item);
        data.shoppingList = shoppingList;
        (0, data_1.saveData)(userId, data);
        console.log("\x1b[36m%s\x1b[0m", "\"".concat(item, "\" added to your shopping list."));
    }
    startConversation(userId);
}
exports.addToShoppingList = addToShoppingList;
// Function to read the shopping list
function readShoppingList(userId, startConversation) {
    var data = (0, data_1.loadData)(userId);
    var shoppingList = data.shoppingList || [];
    if (shoppingList.length === 0) {
        console.log("\x1b[36m%s\x1b[0m", "Your shopping list is empty.");
    }
    else {
        console.log("\x1b[36m%s\x1b[0m", "Here is your shopping list:");
        shoppingList.forEach(function (item) { return console.log("\x1b[36m%s\x1b[0m", item); });
    }
    startConversation(userId);
}
exports.readShoppingList = readShoppingList;
