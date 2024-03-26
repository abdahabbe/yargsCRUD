const yargs = require("yargs");
const { savetoJSON } = require("./functions");

yargs.command({
  command: "add",
  describe: "add new contact",
  builder: {
    name: {
      describe: "Contact Name",
      demandOption: true,
      type: "string",
    },
    email: {
      describe: "Contact Email",
      demandOption: false,
      type: "string",
    },
    mobile: {
      describe: "Contact Phone Number",
      demandOption: true,
      type: "string",
    },
  },

  handler(argv) {
    const contact = {
      name: argv.name,
      mobile: argv.mobile,
      email: argv.email,
    };
    savetoJSON(contact);
    process.exit();
  },
});

yargs.parse();
