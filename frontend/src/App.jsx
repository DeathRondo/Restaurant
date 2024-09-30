import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [nombre, setNombre] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/add-data', { nombre });
      alert('Datos enviados exitosamente');
      setNombre(''); // Limpiar el input después de enviar
    } catch (error) {
      console.error('Error enviando los datos', error);
    }
  };

  return (
    <div>
      <h1>Ordena Comida</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre del pedido:
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </label>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default App;
