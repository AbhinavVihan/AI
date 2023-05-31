import { cleanRoom, fetchNewspaper } from "./actions";
import { loadData, saveData } from "../data";
import { isSameDay } from "../utils";

// Mock the loadData and saveData functions
jest.mock("../data", () => ({
  loadData: jest.fn(),
  saveData: jest.fn(),
}));

// Mock the isSameDay function
jest.mock("../utils", () => ({
  isSameDay: jest.fn(),
}));

describe("cleanRoom", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should clean the room when enough time has passed since the last cleaning", () => {
    const userId = "user123";
    const currentTime = new Date("2023-05-31T10:00:00");
    const lastCleaningTime = new Date("2023-05-31T09:45:00");

    // Mock the loadData function to return the data object
    loadData.mockReturnValue({
      lastCleaningTime: lastCleaningTime.toISOString(),
    });

    // Mock the Date constructor to return the current time
    jest.spyOn(global, "Date").mockImplementation(() => currentTime);

    cleanRoom(userId);

    // Expectations
    expect(saveData).toHaveBeenCalledWith(userId, {
      lastCleaningTime: currentTime.toISOString(),
    });
    expect(console.log).toHaveBeenCalledWith(
      "\x1b[36m%s\x1b[0m",
      "Room is cleaned. It looks tidy now. Job completed at 10:00:00"
    );
    expect(startConversation).toHaveBeenCalledWith(userId);

    // Restore the Date constructor
    global.Date.mockRestore();
  });

  it("should not clean the room when not enough time has passed since the last cleaning", () => {
    const userId = "user123";
    const currentTime = new Date("2023-05-31T10:00:00");
    const lastCleaningTime = new Date("2023-05-31T09:58:00");

    // Mock the loadData function to return the data object
    loadData.mockReturnValue({
      lastCleaningTime: lastCleaningTime.toISOString(),
    });

    // Mock the Date constructor to return the current time
    jest.spyOn(global, "Date").mockImplementation(() => currentTime);

    cleanRoom(userId);

    // Expectations
    expect(saveData).not.toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith(
      "\x1b[36m%s\x1b[0m",
      "The room was just cleaned 2 minute(s) ago. I hope it's not dirty."
    );
    expect(startConversation).toHaveBeenCalledWith(userId);

    // Restore the Date constructor
    global.Date.mockRestore();
  });
});

describe("fetchNewspaper", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch the newspaper when it has not been fetched on the same day", () => {
    const userId = "user123";
    const currentDate = new Date("2023-05-31T08:00:00");
    const lastNewspaperFetchTime = new Date("2023-05-30T12:00:00");

    // Mock the loadData function to return the data object
    loadData.mockReturnValue({
      lastNewspaperFetchTime: lastNewspaperFetchTime.toISOString(),
    });

    // Mock the isSameDay function to return false
    isSameDay.mockReturnValue(false);

    // Mock the Date constructor to return the current date
    jest.spyOn(global, "Date").mockImplementation(() => currentDate);

    fetchNewspaper(userId);

    // Expectations
    expect(saveData).toHaveBeenCalledWith(userId, {
      lastNewspaperFetchTime: currentDate.toISOString(),
    });
    expect(console.log).toHaveBeenCalledWith(
      "\x1b[36m%s\x1b[0m",
      "Newspaper fetched!"
    );
    expect(startConversation).toHaveBeenCalledWith(userId);

    // Restore the Date constructor
    global.Date.mockRestore();
  });

  it("should not fetch the newspaper when it has already been fetched on the same day", () => {
    const userId = "user123";
    const currentDate = new Date("2023-05-31T08:00:00");
    const lastNewspaperFetchTime = new Date("2023-05-31T07:00:00");

    // Mock the loadData function to return the data object
    loadData.mockReturnValue({
      lastNewspaperFetchTime: lastNewspaperFetchTime.toISOString(),
    });

    // Mock the isSameDay function to return true
    isSameDay.mockReturnValue(true);

    // Mock the Date constructor to return the current date
    jest.spyOn(global, "Date").mockImplementation(() => currentDate);

    fetchNewspaper(userId);

    // Expectations
    expect(saveData).not.toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith(
      "\x1b[36m%s\x1b[0m",
      "I think you don't get another newspaper the same day."
    );
    expect(startConversation).toHaveBeenCalledWith(userId);

    // Restore the Date constructor
    global.Date.mockRestore();
  });
});
