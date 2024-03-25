const validator = require("validator");
const readline = require("readline");
const fs = require("fs");
const dirPath = "./data";
const dataPath = `${dirPath}/contacts.js`

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

if (!fs.existsSync(dirPath)){ // create folder if it doesn't exist
  fs.mkdirSync(dirPath);
}
if (!fs.existsSync(dataPath)){ // create file if it doesn't exist
  fs.writeFileSync(dataPath,"[]","utf-8")
}

// function that promises to ask a question and keep the answer
function questions(type, questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, (ans) => {
      // do {
      //   resolve(questions(type, questionText));
      // } while (isValid(type, ans) == false);
      
      // to check validity of input
      if (isValid(type, ans) && ans != null ) { 
        resolve(ans); // keep the answer if it's true
      } else {
        resolve(questions(type, questionText)); // repeat the question if it's false
      }
    });
  });
}

// "async function" to ask several questions and assign each answer to a variable and save it to file
async function start() {
  let name = await questions("name", "What's your name? ");
  let phone = await questions("phone", "What's your number? ");
  let email = await questions("email", "What's your email? ");
  
  // add data to the file "contacts" with JSON format
  const data = {name, phone, email}
  const file = fs.readFileSync(dataPath,"utf-8") 
  const contacts = JSON.parse(file);
  contacts.push(data)
  fs.writeFileSync(dataPath, JSON.stringify(contacts))
  console.log(`Hi, ${name}! Your data has been saved!`);
  process.exit();
}

// Validation by input type
function isValid(type, answer) {
  if (type == "name") {
    return true, answer; // There are people use numbers in their names nowadays :D
  } else if (type == "phone") {
    return validator.isMobilePhone(answer, "id-ID");
  } else {
    // type == "email"
    return validator.isEmail(answer);
  }
}

module.exports = start;
