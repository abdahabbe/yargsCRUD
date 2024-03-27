const yargs = require("yargs");
const { addContact, readContact, listContacts, deleteContact, editContact } = require("./functions");

const contactData = {
  name: {
    describe: "Contact Name",
    demandOption: true,
    type: "string",
  },
  mobile: {
    describe: "Contact Phone Number",
    demandOption: true,
    type: "string",
  },
  email: {
    describe: "Contact Email",
    demandOption: false,
    type: "string",
  },
};

// add/create contact
yargs.command({
  command: "add",
  describe: "add new contact",
  builder: {
    name: contactData.name,
    mobile: contactData.mobile,
    email: contactData.email,
  },

  handler(argv) {
    const contact = {
      name: argv.name,
      mobile: argv.mobile,
      email: argv.email,
    };
    addContact(contact);
    process.exit();
  },
});

// read contact
yargs.command({
  command: "read",
  describe: "show a contact",
  builder: {
    name: contactData.name,
  },
  handler(argv) {
    readContact(argv.name);
    process.exit();
  },
});

// contact list
yargs.command({
  command: "list",
  describe: "show contact list",
  handler() {
    listContacts();
    process.exit();
  },
});

// update contact
yargs.command({
  command: "update",
  describe: "update a contact",
  builder: {
    name: contactData.name,
  //  mobile: contactData.mobile,
    //email: contactData.email,
    },
  handler(argv) {
    const contact = {
      name: argv.name,
      mobile: argv.mobile,
      email: argv.email,
    };
    editContact(contact);
    process.exit();
  },
});

// delete contact
yargs.command({
  command: "remove",
  describe: "delete a contact",
  builder: {
    name: contactData.name,
  },
  handler(argv) {
    deleteContact(argv.name);
    process.exit();
  },
});

yargs.parse();
