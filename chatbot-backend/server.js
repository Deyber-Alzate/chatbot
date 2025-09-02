const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Servir archivos estáticos desde /public
app.use(express.static(path.join(__dirname, 'public')));

// Rutas para archivos JSON
const filosofosPath = path.join(__dirname, 'data', 'filosofos.json');
const quizPath = path.join(__dirname, 'data', 'quiz.json');

// API para filósofos
app.get('/filosofos', (req, res) => {
  fs.readFile(filosofosPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({error: 'Error leyendo filósofos'});
    res.json(JSON.parse(data));
  });
});

app.post('/filosofos', (req, res) => {
  const data = req.body;
  fs.writeFile(filosofosPath, JSON.stringify(data, null, 2), err => {
    if (err) return res.status(500).json({error: 'Error guardando filósofos'});
    res.json({message: 'Filósofos actualizados'});
  });
});

// API para quiz
app.get('/quiz', (req, res) => {
  fs.readFile(quizPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({error: 'Error leyendo quiz'});
    res.json(JSON.parse(data));
  });
});

app.post('/quiz', (req, res) => {
  const data = req.body;
  fs.writeFile(quizPath, JSON.stringify(data, null, 2), err => {
    if (err) return res.status(500).json({error: 'Error guardando quiz'});
    res.json({message: 'Quiz actualizado'});
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});