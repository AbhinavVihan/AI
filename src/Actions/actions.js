"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchNewspaper = exports.cleanRoom = void 0;
var data_1 = require("../data");
var utils_1 = require("../utils");
var index_1 = require("../index");
// Function to clean the room
function cleanRoom(userId) {
    var data = (0, data_1.loadData)(userId);
    var currentTime = new Date();
    var lastCleaningTime = data.lastCleaningTime
        ? new Date(data.lastCleaningTime)
        : null;
    if (lastCleaningTime &&
        (currentTime.getTime() - lastCleaningTime.getTime()) / 1000 / 60 < 10) {
        var minutesSinceLastCleaning = Math.round((currentTime.getTime() - lastCleaningTime.getTime()) / 1000 / 60);
        console.log("\x1b[36m%s\x1b[0m", "The room was just cleaned ".concat(minutesSinceLastCleaning, " minute(s) ago. I hope it's not dirty."));
    }
    else {
        data.lastCleaningTime = currentTime.toISOString();
        (0, data_1.saveData)(userId, data);
        console.log("\x1b[36m%s\x1b[0m", "Room is cleaned. It looks tidy now. Job completed at ".concat(currentTime.toLocaleTimeString()));
    }
    (0, index_1.startConversation)(userId);
}
exports.cleanRoom = cleanRoom;
// Function to fetch the newspaper
function fetchNewspaper(userId) {
    var data = (0, data_1.loadData)(userId);
    var lastNewspaperFetchTime = data.lastNewspaperFetchTime
        ? new Date(data.lastNewspaperFetchTime)
        : null;
    if (lastNewspaperFetchTime && (0, utils_1.isSameDay)(lastNewspaperFetchTime, new Date())) {
        console.log("\x1b[36m%s\x1b[0m", "I think you don't get another newspaper the same day.");
    }
    else {
        data.lastNewspaperFetchTime = new Date().toISOString();
        (0, data_1.saveData)(userId, data);
        console.log("\x1b[36m%s\x1b[0m", "Newspaper fetched!");
    }
    (0, index_1.startConversation)(userId);
}
exports.fetchNewspaper = fetchNewspaper;
