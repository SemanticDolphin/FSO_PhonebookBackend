const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
require("dotenv").config();
const Person = require("./models/person");

const PORT = process.env.PORT;

morgan.token("request-body", (req, res) => {
  return req.method === "POST" ? JSON.stringify(req.body) : " ";
});

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :request-body"
  )
);

let data = [
  // {
  //   id: 1,
  //   name: "Arto Hellas",
  //   number: "040-123456",
  // },
  // {
  //   id: 2,
  //   name: "Ada Lovelace",
  //   number: "39-44-5323523",
  // },
  // {
  //   id: 3,
  //   name: "Dan Abramov",
  //   number: "12-43-234345",
  // },
  // {
  //   id: 4,
  //   name: "Mary Poppendieck",
  //   number: "39-23-6423122",
  // },
];

// const generateRandomId = () => {
//   return Math.floor(Math.random() * 9000 + 1);
// };
// const normalizeName = (name) => {
//   return name.toLowerCase().replaceAll(" ", "");
// };
// const NameExists = (name) => {
//   return data.some(
//     (person) => normalizeName(person.name) === normalizeName(name)
//   );
// };

app.get("/info", (request, response) => {
  Person.count({}).then((persons) => {
    response.send(
      `<p>The Phonebook has information for ${persons} people</p>
       <p>${new Date()}</p>`
    );
  });
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((per) => {
    response.json(per);
  });
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((person) => {
    response.json(person);
  });
});

app.delete("/api/persons/:id", (request, response) => {
  const personId = Number(request.params.id);
  data = data.filter((person) => person.id !== personId);
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const { name, number } = request.body;

  if (!request.body) {
    return response.status(400).json({
      error: "No information sent",
    });
  }

  if (!name) {
    return response.status(422).json({
      error: "Name is missing",
    });
  }

  if (!number) {
    return response.status(422).json({
      error: "Number is missing",
    });
  }

  // if (NameExists(name)) {
  //   return response.status(409).json({
  //     error: "Name already exists in phonebook",
  //   });
  // }

  const newPerson = new Person({
    name,
    number,
  });
  newPerson.save().then((result) => {
    console.log(`Added ${newPerson.name} to phonebook`);
    response.json(newPerson);
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
