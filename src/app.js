const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
  const { url, title, techs} = request.body;

  const likes = 0;

  const repository = { id: uuid(), url, title, techs, likes};

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const { url, title, techs} = request.body;
  const repositoryIndex = repositories.findIndex( repo => repo.id === id );

  if(repositoryIndex <0) {
    return response.status(400).json({message: "Repo not found"})
  }
  
  const repository = repositories[repositoryIndex];

  const updatedRepo = {
    id: repository.id,
    url,
    title,
    techs,
    likes: repository.likes,
  }

  repositories[repositoryIndex] = updatedRepo;

  return response.json(updatedRepo);
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex( repo => repo.id === id );
  
  if(repositoryIndex < 0) {
    return response.status(400).json({message: "Repo not found"})
  }
  
  repositories.splice(repositoryIndex, 1);

  return response.status(204).json({message: "Deleted"})
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex( repo => repo.id === id );
  
  if(repositoryIndex < 0) {
    return response.status(400).json({message: "Repo not found"})
  }

  const repository = repositories[repositoryIndex];

  repository.likes = repository.likes + 1;

  repositories[repositoryIndex] = repository;

  return response.json({likes: repository.likes});

});

module.exports = app;
