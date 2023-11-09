import React, { useEffect, useState } from "react";
import { Table, Button, Icon, Input } from "semantic-ui-react";
import { map } from "lodash";
import "./TableReports.scss";

export function TableReports(props) {
  const { reports, updateReport, onDeleteReport} = props;
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda

  if (!reports) {
    return <div>Cargando reportes...</div>;
  }
// Función para manejar cambios en el input de búsqueda
const handleSearch = (e) => {
  setSearchTerm(e.target.value.toLowerCase());
};
 // Filtrar usuarios basados en el término de búsqueda
const filteredReports = reports.filter((report) => {
  const num_reporte = report.num_reporte.toString().toLowerCase(); // Convertir a cadena y luego a minúsculas
  return (
    num_reporte.includes(searchTerm) ||
    report.tipo_reporte.toLowerCase().includes(searchTerm) 
  );
}); 

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
          <Table.HeaderCell>Prioridad</Table.HeaderCell>
          <Table.HeaderCell>Tipo Reporte</Table.HeaderCell>
          <Table.HeaderCell>Investigador</Table.HeaderCell>
          <Table.HeaderCell>Estado</Table.HeaderCell>
          <Table.HeaderCell>Acciones</Table.HeaderCell>

        </Table.Row>
      </Table.Header>

      <Table.Body>
        
        {map(filteredReports, (report, index) => (
          <Table.Row key={index}>
            <Table.Cell>{report.num_reporte}</Table.Cell>
            <Table.Cell>{report.prioridad}</Table.Cell>
            <Table.Cell>{report.tipo_reporte}</Table.Cell>
            <Table.Cell>{report.investigador}</Table.Cell>
            <Table.Cell>{report.estado}</Table.Cell>
            <Actions
              report={report}
              updateReport={updateReport}
              onDeleteReport={onDeleteReport}
            />
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
    </div>
  );
}

function Actions(props) {
  const { report, updateReport, onDeleteReport } = props;

  return (
    <Table.Cell textAlign="right">
      <Button icon onClick={() => updateReport(report)}>
        <Icon name="pencil" />
      </Button>
      <Button icon negative onClick={() => onDeleteReport(report)}>
        <Icon name="close" />
      </Button>
    </Table.Cell>
  );
}
