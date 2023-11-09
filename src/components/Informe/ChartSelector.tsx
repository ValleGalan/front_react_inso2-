import React, { useState } from 'react';

export function ChartSelector({ onSelectChart }) {
  const [selectedOption, setSelectedOption] = useState('pie');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    onSelectChart(event.target.value);
  };

  return (
    <div className="chart-selector">
      <label>
        Seleccione el tipo de gráfico estadistico :
        <select value={selectedOption} onChange={handleOptionChange}>
          <option value="pie">Gráfico de Categorias de reportes</option>
          <option value="esclarecidos">Cantidad de Reportes Esclarecidos</option>
          <option value="redes">Red Social Más Utilizada</option>
        </select>
      </label>
    </div>
  );
}
