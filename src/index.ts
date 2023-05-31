import { createCLI } from "./cli";
import {
  addToShoppingList,
  handleQuestion,
  readShoppingList,
} from "./questions";
import { cleanRoom, fetchNewspaper } from "./Actions/actions";
import * as os from "os";
import { Interface } from "readline";

// Function to get the current username
function getCurrentUsername(): string {
  return os.userInfo().username;
}

function comparable(question: string, arg?: string | RegExp, start?: boolean) {
  if (start) {
    return question.toLowerCase().startsWith("add");
  } else {
    return question.toLowerCase().match(arg as RegExp);
  }
}

let cli: Interface | undefined;

// Start asking questions
export function startConversation(userId: string) {
  if (!cli) {
    // Create the cli instance if it doesn't exist
    cli = createCLI();
  }
  cli.question("Ask me a question (Type 'exit' to quit): ", (question) => {
    if (question.toLowerCase() === "exit") {
      cli?.close();
    } else if (comparable(question, undefined, true)) {
      const item = question.split(" ")[1];
      addToShoppingList(userId, item, startConversation);
    } else if (comparable(question, /clean\s+my\s+room/i)) {
      cleanRoom(userId);
    } else if (comparable(question, /fetch\s+my\s+newspaper/i)) {
      fetchNewspaper(userId);
    } else if (comparable(question, /read\s+my\s+shopping\s+list/i)) {
      readShoppingList(userId, startConversation);
    } else {
      handleQuestion(userId, question, startConversation);
    }
  });
}

// Start the conversation with the current user
startConversation(getCurrentUsername());
