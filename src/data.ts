import * as fs from "fs";

// Function to get the user-specific data file path
export function getDataFilePath(userId: string): string {
  return `src/data/${userId}.json`;
}

// Function to load user-specific data from the file or initialize with an empty object
export function loadData(userId: string): { [question: string]: any } {
  const dataFilePath = getDataFilePath(userId);
  let data: { [question: string]: any } = {};
  if (fs.existsSync(dataFilePath)) {
    const dataFile = fs.readFileSync(dataFilePath, "utf8");
    data = JSON.parse(dataFile);
  }
  return data;
}

// Function to save user-specific data to the file
export function saveData(userId: string, data: { [question: string]: any }) {
  const dataFilePath = getDataFilePath(userId);
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf8");
}
