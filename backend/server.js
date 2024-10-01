const express = require('express');
const mysql = require('mysql2');
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

// server.js
app.get('/productos', (req, res) => {
  const query = 'SELECT * FROM productos';
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error al obtener productos:', err);
      res.status(500).send('Error al obtener productos');
    } else {
      res.status(200).json(result);
    }
  });
});

// server.js
app.post('/guardar-pedido', (req, res) => {
  const { mesa, carrito } = req.body;

  if (!mesa || carrito.length === 0) {
    return res.status(400).send('Mesa y carrito son obligatorios');
  }

  // Guardar el pedido en la base de datos
  const query = 'INSERT INTO pedidos (mesa, productos, total) VALUES (?, ?, ?)';
  const productos = JSON.stringify(carrito);
  const total = carrito.reduce((acc, producto) => acc + producto.precio, 0);

  db.query(query, [mesa, productos, total], (err, result) => {
    if (err) {
      console.error('Error al guardar el pedido:', err);
      res.status(500).send('Error al guardar el pedido');
    } else {
      res.status(200).send('Pedido guardado exitosamente');
    }
  });
});

app.post('/agregar-producto', (req, res) => {
  const { nombre, precio } = req.body;

  if (!nombre || !precio) {
    return res.status(400).send('Nombre y precio son obligatorios');
  }

  const query = 'INSERT INTO productos (nombre, precio) VALUES (?, ?)';
  db.query(query, [nombre, precio], (err, result) => {
    if (err) {
      console.error('Error al agregar el producto:', err);
      res.status(500).send('Error al agregar el producto');
    } else {
      res.status(200).send('Producto agregado con éxito');
    }
  });
});

// Iniciar el servidor
app.listen(3001, () => {
  console.log('Servidor corriendo en el puerto 3001');
});
