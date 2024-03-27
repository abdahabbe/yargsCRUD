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

// add new contact
const addContact = (data) => {
  const contacts = loadCurrentData();
  isValid(contacts, data);
};

const readContact = (name) => {
  // show contact by name
  const contacts = loadCurrentData();
  const contact = contacts.find(
    (item) => item.name.toLowerCase() === name.toLowerCase()
  );

  if (contact) {
    console.log(
      `We've found it! Here it is:\n ${contact.name} \n ${contact.mobile} \n ${contact.email}`
    );
  } else {
    console.log("Not found!");
  }
};

const listContacts = () => {
  // show contact list
  const contacts = loadCurrentData();
  console.log("CONTACT LIST: ");
  console.log(`===========================`);
  contacts.forEach((contact) => {
    console.log(`Name: ${contact.name}`);
    console.log(`Mobile: ${contact.mobile}`);
    console.log(`Email: ${contact.email}`);
    console.log(`---------------------------`);
  });
};

// edit contact by name
const editContact = (data) => {
  const contacts = loadCurrentData();
  const contact = contacts.find(
    (item) => item.name.toLowerCase() === data.name.toLowerCase()
  );
  if (contact) {
    //to save edited contact detail based on name
    contact.mobile = data.mobile;
    contact.email = data.email;
    saveContact(contacts);
    console.log(
      `Hi, ${contact.name}! Your data has been updated! ${contact.mobile} ${contact.email}`
    );
  } else {
    console.log(`${data.name} is not found`);
  }
};

// delete contact by name
const deleteContact = (name) => {
  const contacts = loadCurrentData();
  const keepContacts = contacts.filter((contact) => contact.name !== name);
  console.log(keepContacts);
  if (contacts.length > keepContacts.length) {
    saveContact(keepContacts);
    console.log("Data has been deleted!");
  } else {
    console.log("Not found!");
  }
};

// load existing data / reading file
const loadCurrentData = () => {
  const file = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(file);
};

// write contact to file
const saveContact = (currentData) => {
  fs.writeFileSync(dataPath, JSON.stringify(currentData));
};

const isValid = (currentData, newData) => {
  if (currentData.find((item) => item.name.toLowerCase() == newData.name.toLowerCase())) {
    //to decline adding new contact if it has same name
    console.log(`Name "${newData.name}" already exist!`);
  } else if (!validator.isMobilePhone(newData.mobile, "id-ID")) {
    //to check the validity of phone number
    console.log(`Invalid Number!`);
  } else if (newData.email && !validator.isEmail(newData.email)) {
    //to check the validity of email
    console.log(`Invalid Email!`);
  } else {
    currentData.push(newData); // add new contact to last index
    saveContact(currentData);
    console.log(`Hi, ${newData.name}! Your data has been saved!`);
  }
};

module.exports = {
  addContact,
  editContact,
  deleteContact,
  listContacts,
  readContact,
};
