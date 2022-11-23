import readline from 'readline'

// UTILITIES
import {
  GenerateIDs,
  Authorize,
  GetEmailAndCode,
  MarkPresent
} from './utilities/UtilitiesIndex.js';

/* = = = = = START HERE = = = = */
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let question = `
What do you want to do?

1 - Generate ID
2 - Get Email and Code (ARRAY)
3 - Mark Present
[ANY KEY] - Exit

CHOICE: `

rl.question(question, (answer) => {
  if (answer === "1") {
    // GENERATE IDs FOR ALL ROWS IN THE SHEETS EXCEPT THE HEADER ROW
    Authorize().then(GenerateIDs).catch("ERROR ON GENERATE ID");
  }
  else if (answer === "2") {
    // GET EACH ROW AS OBJECT
    Authorize().then((auth) => GetEmailAndCode(auth).then((result) => console.log(result))).catch("ERROR ON GET EMAIL AND CODE");
  }
  else if (answer === "3") {
    return new Promise(resolve => {
      rl.question(`CODE: `, (code) => {
        resolve(Authorize().then((auth) => MarkPresent(auth, code).then(((result) => console.log(result))).then(() => rl.close())).catch("ERROR ON CONFIRM CODE"));
      });
    });
  }
  else rl.close();
  rl.close(); 
});