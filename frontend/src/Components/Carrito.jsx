// src/components/Carrito.js
import React from 'react';

function Carrito({ carrito, removerDelCarrito }) {
  const total = carrito.reduce((acc, producto) => acc + producto.precio, 0);

  return (
    <div>
      <h2>Carrito de Compras</h2>
      <ul>
        {carrito.map((producto, index) => (
          <li key={index}>
            {producto.nombre} - ${producto.precio}
            <button onClick={() => removerDelCarrito(index)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <h3>Total: ${total}</h3>
    </div>
  );
}

export default Carrito;
