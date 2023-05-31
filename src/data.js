"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveData = exports.loadData = exports.getDataFilePath = void 0;
var fs = require("fs");
// Function to get the user-specific data file path
function getDataFilePath(userId) {
    return "src/data/".concat(userId, ".json");
}
exports.getDataFilePath = getDataFilePath;
// Function to load user-specific data from the file or initialize with an empty object
function loadData(userId) {
    var dataFilePath = getDataFilePath(userId);
    var data = {};
    if (fs.existsSync(dataFilePath)) {
        var dataFile = fs.readFileSync(dataFilePath, "utf8");
        data = JSON.parse(dataFile);
    }
    return data;
}
exports.loadData = loadData;
// Function to save user-specific data to the file
function saveData(userId, data) {
    var dataFilePath = getDataFilePath(userId);
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf8");
}
exports.saveData = saveData;
