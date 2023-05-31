import { loadData, saveData } from "../data";
import { isSameDay } from "../utils";
import { startConversation } from "../index";

// Function to clean the room
export function cleanRoom(userId: string) {
  const data = loadData(userId);
  const currentTime = new Date();
  const lastCleaningTime = data.lastCleaningTime
    ? new Date(data.lastCleaningTime)
    : null;
  if (
    lastCleaningTime &&
    (currentTime.getTime() - lastCleaningTime.getTime()) / 1000 / 60 < 10
  ) {
    const minutesSinceLastCleaning = Math.round(
      (currentTime.getTime() - lastCleaningTime.getTime()) / 1000 / 60
    );
    console.log(
      "\x1b[36m%s\x1b[0m",
      `The room was just cleaned ${minutesSinceLastCleaning} minute(s) ago. I hope it's not dirty.`
    );
  } else {
    data.lastCleaningTime = currentTime.toISOString();
    saveData(userId, data);
    console.log(
      "\x1b[36m%s\x1b[0m",
      `Room is cleaned. It looks tidy now. Job completed at ${currentTime.toLocaleTimeString()}`
    );
  }

  startConversation(userId);
}

// Function to fetch the newspaper
export function fetchNewspaper(userId: string) {
  const data = loadData(userId);
  const lastNewspaperFetchTime = data.lastNewspaperFetchTime
    ? new Date(data.lastNewspaperFetchTime)
    : null;
  if (lastNewspaperFetchTime && isSameDay(lastNewspaperFetchTime, new Date())) {
    console.log(
      "\x1b[36m%s\x1b[0m",
      "I think you don't get another newspaper the same day."
    );
  } else {
    data.lastNewspaperFetchTime = new Date().toISOString();
    saveData(userId, data);
    console.log("\x1b[36m%s\x1b[0m", "Newspaper fetched!");
  }
  startConversation(userId);
}
