const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
require("dotenv").config();
const Person = require("./models/person");

const PORT = process.env.PORT;

morgan.token("request-body", (req) => {
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

app.get("/info", (request, response, next) => {
  Person.count({})
    .then((amountOfPeople) => {
      response.send(
        `<p>The Phonebook has information for ${amountOfPeople} people</p>
       <p>${new Date()}</p>`
      );
    })
    .catch((error) => next(error));
});

app.get("/api/persons", (request, response, next) => {
  Person.find({})
    .then((person) => {
      response.json(person);
    })
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
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

  newPerson
    .save()
    .then(() => {
      console.log(`Added ${newPerson.name} to phonebook`);
      response.json(newPerson);
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const { name, number } = request.body;

  const person = {
    name,
    number,
  };

  const options = {
    new: true,
    runValidators: true,
  };

  Person.findByIdAndUpdate(request.params.id, person, options)
    .then((updatedPerson) => response.json(updatedPerson))
    .catch((error) => next(error));
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response
      .status(400)
      .send({ error: "id is not formatted correctly" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
