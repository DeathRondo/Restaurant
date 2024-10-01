// src/App.js
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Menu from './components/Menu';
import Carrito from './components/Carrito';
import AgregarProducto from './Components/AgregarProducto';

function App() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [mesa, setMesa] = useState('');

  // Cargar los productos desde el backend
  useEffect(() => {
    async function fetchProductos() {
      try {
        const response = await axios.get('http://localhost:3001/productos');
        setProductos(response.data);
      } catch (error) {
        console.error('Error al cargar el menú:', error);
      }
    }
    fetchProductos();
  }, []);

  // Agregar un producto al carrito
  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };

  // Remover un producto del carrito
  const removerDelCarrito = (index) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito.splice(index, 1);
    setCarrito(nuevoCarrito);
  };

  // Guardar el pedido en la base de datos
  const enviarPedido = async () => {
    if (!mesa || carrito.length === 0) {
      alert('Por favor, ingresa un número de mesa y agrega productos al carrito');
      return;
    }

    try {
      await axios.post('http://localhost:3001/guardar-pedido', { mesa, carrito });
      alert('Pedido guardado con éxito');
      setCarrito([]);
      setMesa('');
    } catch (error) {
      console.error('Error al guardar el pedido:', error);
    }
  };

  return (
    <div>
      
      <h1>Aplicación de Pedidos para Restaurantes</h1>

      <label>
        Número de Mesa:
        <input
          type="text"
          value={mesa}
          onChange={(e) => setMesa(e.target.value)}
        />
      </label>

      <Menu productos={productos} agregarAlCarrito={agregarAlCarrito} />
      <Carrito carrito={carrito} removerDelCarrito={removerDelCarrito} />

      <button onClick={enviarPedido}>Enviar Pedido</button>
      <AgregarProducto/>
    </div>
    
  );
}

export default App;
