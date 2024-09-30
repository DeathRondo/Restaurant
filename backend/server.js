const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());  // Para manejar datos JSON
app.use(bodyParser.urlencoded({ extended: true }));  // Para manejar datos de formularios

// Configuración de la conexión a MySQL
const db = mysql.createConnection({
  host: 'localhost',  // Cambia si usas un servidor remoto
  user: 'root',       // Tu usuario de MySQL
  password: 'Congrio#2024',       // Tu contraseña de MySQL
  database: 'restaurante_db'  // Nombre de tu base de datos
});

// Conexión a MySQL
db.connect(err => {
  if (err) {
    console.error('Error conectando a MySQL:', err);
    return;
  }
  console.log('Conectado a MySQL');
});

// Ruta para guardar datos en MySQL
app.post('/add-data', (req, res) => {
  const { nombre } = req.body;
  const query = 'INSERT INTO pedidos (nombre) VALUES (?)';
  db.query(query, [nombre], (err, result) => {
    if (err) {
      console.error('Error al insertar datos:', err);
      res.status(500).send('Error al insertar datos');
    } else {
      res.status(200).send('Datos insertados con éxito');
    }
  });
});

// Iniciar el servidor
app.listen(3001, () => {
  console.log('Servidor corriendo en el puerto 3001');
});
