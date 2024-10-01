// src/components/Menu.js
import React from 'react';

function Menu({ productos, agregarAlCarrito }) {
  return (
    <div>
      <h2>Menú del Restaurante</h2>
      <ul>
        {productos.map((producto) => (
          <li key={producto.id}>
            {producto.nombre} - ${producto.precio}
            <button onClick={() => agregarAlCarrito(producto)}>Agregar al carrito</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Menu;
