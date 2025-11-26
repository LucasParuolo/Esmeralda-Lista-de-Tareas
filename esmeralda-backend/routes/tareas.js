const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.sqlite');

// Crear tabla si no existe
db.run(`
  CREATE TABLE IF NOT EXISTS tareas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    descripcion TEXT,
    fecha TEXT,
    hora TEXT,
    prioridad TEXT,
    completada INTEGER DEFAULT 0
  )
`);

// Obtener todas las tareas
router.get('/', (req, res) => {
  db.all('SELECT * FROM tareas', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Crear nueva tarea
router.post('/', (req, res) => {
  const { titulo, descripcion, fecha, hora, prioridad } = req.body;
  db.run(
    `INSERT INTO tareas (titulo, descripcion, fecha, hora, prioridad) VALUES (?, ?, ?, ?, ?)`,
    [titulo, descripcion, fecha, hora, prioridad],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

// Actualizar tarea
router.put('/:id', (req, res) => {
  const { titulo, descripcion, fecha, hora, prioridad, completada } = req.body;
  db.run(
    `UPDATE tareas SET titulo = ?, descripcion = ?, fecha = ?, hora = ?, prioridad = ?, completada = ? WHERE id = ?`,
    [titulo, descripcion, fecha, hora, prioridad, completada, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes });
    }
  );
});

// Eliminar tarea
router.delete('/:id', (req, res) => {
  db.run(`DELETE FROM tareas WHERE id = ?`, [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

module.exports = router;