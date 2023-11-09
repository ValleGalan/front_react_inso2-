import React, { useEffect, useState } from "react";
import { Table, Button, Icon, Input } from "semantic-ui-react";
import { map } from "lodash";
import "./TableHechoEsclarecido.scss";

export function TableHechoEsclarecido(props) {
  const { reports} = props;
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda

  if (!reports) {
    return <div>Cargando reportes con estado "Hecho esclarecido"...</div>;
  }
// Función para manejar cambios en el input de búsqueda
const handleSearch = (e) => {
  setSearchTerm(e.target.value.toLowerCase());
};
 // Filtrar usuarios basados en el término de búsqueda
const filteredReports = reports.filter((report) => {
  const num_reporte = report.num_reporte ? report.num_reporte.toString().toLowerCase() : "";
  return num_reporte.includes(searchTerm);
});

// ...

  return (

    <div>
      <div className="form-row"  style={{ marginBottom: "16px" }}>
        <Input
          label="Buscar"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
          placeholder="Busque por N°reporte, tipo de reporte..."

        />

      </div>
    
    <Table className="">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Numero de Reporte</Table.HeaderCell>
          <Table.HeaderCell>Domicilio</Table.HeaderCell>
          <Table.HeaderCell>Tipo Reporte</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        
        {map(filteredReports, (report, index) => (
          <Table.Row key={index}>
            <Table.Cell>{report.num_reporte}</Table.Cell>
            <Table.Cell>{report.domicilio_reporte}</Table.Cell>
            <Table.Cell>{report.tipo_reporte}</Table.Cell>
            <Actions
              report={report}
            />
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
    </div>
  );
}

function Actions(props) {
  const { report  } = props;

  return (
    <Table.Cell textAlign="right">
       
    </Table.Cell>
  );
}
