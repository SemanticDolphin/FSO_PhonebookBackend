const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("Password is missing");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://eandersen:${password}@fsophone.pvtiyfl.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person);
    });
    mongoose.connection.close();
  });
}

if (process.argv.length === 4) {
  console.log("Name or number is missing");
  process.exit(2);
}

if (process.argv.length === 5) {
  const entry = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });

  entry.save().then((result) => {
    console.log(`added ${entry.name} number ${entry.number} to phonebook`);
    mongoose.connection.close();
  });
}

if (process.argv.length > 5) {
  console.log("Too many arguments");
  process.exit(3);
}
