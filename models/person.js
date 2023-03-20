const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

console.log("Connecting to", url);

mongoose
  .connect(url)
  .then((result) => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Could not connect to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [
      3,
      "Minimum length of a name is 3 characters, {VALUE} is shorter than that",
    ],
    required: true,
  },
  number: {
    type: String,
    validate: {
      validator: function (number) {
        return /^(\d{2}-\d{6,})|(\d{3}-\d{5,})$/.test(number);
      },
      message: (props) => `${props.value} is not a valid phone number`,
    },
    required: true,
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
