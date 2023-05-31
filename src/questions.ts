import { loadData, saveData } from "./data";

// Mapping of questions and answers
const questionAnswerMap: { [question: string]: string } = {
  "Hey. How are you?": "Hello, I am doing great.",
  "How's the weather outside?":
    "It's pleasant outside. You should take a walk.",
};

// Function to handle a question and provide an answer
export function handleQuestion(
  userId: string,
  question: string,
  startConversation: (userId: string) => void
) {
  const data = loadData(userId);
  const answer = questionAnswerMap[question];
  if (answer) {
    console.log("\x1b[36m%s\x1b[0m", `Answer: ${answer}`);
  } else {
    console.log(
      "\x1b[36m%s\x1b[0m",
      "I don't have an answer for that question."
    );
  }
  // Continue prompting for input
  startConversation(userId);
}

// Function to add an item to the shopping list
export function addToShoppingList(
  userId: string,
  item: string,
  startConversation: (userId: string) => void
) {
  const data = loadData(userId);
  const shoppingList = data.shoppingList || [];
  if (shoppingList.includes(item)) {
    console.log(
      "\x1b[36m%s\x1b[0m",
      `You already have "${item}" in your shopping list.`
    );
  } else {
    shoppingList.push(item);
    data.shoppingList = shoppingList;
    saveData(userId, data);
    console.log("\x1b[36m%s\x1b[0m", `"${item}" added to your shopping list.`);
  }
  startConversation(userId);
}

// Function to read the shopping list
export function readShoppingList(
  userId: string,
  startConversation: (userId: string) => void
) {
  const data = loadData(userId);
  const shoppingList = data.shoppingList || [];
  if (shoppingList.length === 0) {
    console.log("\x1b[36m%s\x1b[0m", "Your shopping list is empty.");
  } else {
    console.log("\x1b[36m%s\x1b[0m", "Here is your shopping list:");
    shoppingList.forEach((item: any) => console.log("\x1b[36m%s\x1b[0m", item));
  }
  startConversation(userId);
}
