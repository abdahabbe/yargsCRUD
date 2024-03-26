const validator = require("validator");
const readline = require("readline");
const fs = require("fs");
const dirPath = "./data";
const dataPath = `${dirPath}/contacts.js`;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

if (!fs.existsSync(dirPath)) {
  // create folder if it doesn't exist
  fs.mkdirSync(dirPath);
}
if (!fs.existsSync(dataPath)) {
  // create file if it doesn't exist
  fs.writeFileSync(dataPath, "[]", "utf-8");
}


// add data to the file "contacts" with JSON format
const savetoJSON = (data) => {
  const file = fs.readFileSync(dataPath, "utf-8");
  const contacts = JSON.parse(file);
  if (contacts.find((item) => item.name == data.name)) { //to decline if it has same name
    console.log(`Nama "${data.name}" sudah ada!`); 
  } else if (!validator.isMobilePhone(data.mobile, "id-ID")) { //to check the validity of phone number
    console.log(`Invalid Number!`); 
  } else if (data.email && !validator.isEmail(data.email)) { //to check the validity of email
    console.log(`Invalid Email!`);
  } else {
    contacts.push(data);
    fs.writeFileSync(dataPath, JSON.stringify(contacts));
    console.log(`Hi, ${data.name}! Your data has been saved!`);
  }
};

module.exports = { savetoJSON };
