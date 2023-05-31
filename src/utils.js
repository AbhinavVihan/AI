"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSameDay = void 0;
// Function to check if two dates are the same day
function isSameDay(date1, date2) {
    return (date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate());
}
exports.isSameDay = isSameDay;
