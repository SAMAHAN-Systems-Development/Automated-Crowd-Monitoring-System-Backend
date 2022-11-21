import readline from 'readline'

// UTILITIES
import {
  GenerateIDs,
  Authorize
} from './utilities/UtilitiesIndex.js';

/* = = = = = START HERE = = = = */
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let question = `
What do you want to do?

1 - Generate ID
[ANY KEY] - Exit

CHOICE: `

rl.question(question, (answer) => {
  if (answer === "1") {
    console.log("Hello")
    // GENERATE IDs FOR ALL ROWS IN THE SHEETS EXCEPT THE HEADER ROW
    Authorize().then(GenerateIDs).catch("HELLO");
  }
  else rl.close();
});