const express = require("express");
const app = express();
const PORT = 3001;

app.use(express.json());

let data = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const generateRandomId = () => {
  return Math.floor(Math.random() * 9000 + 1);
};

app.get("/info", (request, response) => {
  response.send(
    `<p>The Phonebook has information for ${data.length} people</p>
     <p>${new Date()}</p>`
  );
});

app.get("/api/persons", (request, response) => {
  response.json(data);
});

app.get("/api/persons/:id", (request, response) => {
  const personId = Number(request.params.id);
  const personInfo = data.find((person) => person.id === personId);
  if (personInfo) {
    response.json(personInfo);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const personId = Number(request.params.id);
  data = data.filter((person) => person.id !== personId);
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  if (!request.body) {
    return response.status(400).json({
      error: "No information sent",
    });
  }

  const newPerson = {
    id: generateRandomId(),
    name: request.body.name,
    number: request.body.number,
  };

  data = data.concat(newPerson);

  response.json(newPerson);
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
