// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Important pour les requêtes cross-origin

const app = express();
const port = 3000;

// Connexion à MongoDB (remplacez par votre URI)
mongoose.connect('mongodb://localhost:27017/todolist', { useNewUrlParser: true, useUnifiedTopology: true });

const todoSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
});
const Todo = mongoose.model('Todo', todoSchema);


app.use(cors()); // Activer CORS
app.use(express.json()); // Parser le body des requêtes en JSON

app.get('/api/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post('/api/todos', async (req, res) => {
  const newTodo = new Todo(req.body);
  await newTodo.save();
  res.status(201).json(newTodo);
});


app.put('/api/todos/:id', async (req, res) => {
  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedTodo);
});

app.delete('/api/todos/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});


app.listen(port, () => {
  console.log(`Serveur écoute sur le port ${port}`);
});