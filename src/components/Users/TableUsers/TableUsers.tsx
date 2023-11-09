import React, { useEffect, useState } from "react";
import { Table, Button, Icon, Input, Pagination  } from "semantic-ui-react";
import { map } from "lodash";
import "./TableUsers.scss";

export function TableUsers(props) {
  const { users, updateUser, onDeleteUser } = props;
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda

  if (!users) {
    return <div>Cargando usuarios...</div>;
  }
// Función para manejar cambios en el input de búsqueda
const handleSearch = (e) => {
  setSearchTerm(e.target.value.toLowerCase());
};

// Filtrar usuarios basados en el término de búsqueda
const filteredUsers = users.filter((user) => {
  const dni = user.dni.toString().toLowerCase(); // Convertir a cadena y luego a minúsculas
  return (
    dni.includes(searchTerm) ||
    user.legajo.toLowerCase().includes(searchTerm) ||
    user.apellido.toLowerCase().includes(searchTerm)
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
          placeholder="Busque por DNI, legajo, apellido..."
        />

      </div>
    
    <Table className="table-users-admin">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Numero de Legajo</Table.HeaderCell>
          <Table.HeaderCell>Nombre</Table.HeaderCell>
          <Table.HeaderCell>Apellido</Table.HeaderCell>
          <Table.HeaderCell>DNI</Table.HeaderCell>
          <Table.HeaderCell>Rol</Table.HeaderCell>
          <Table.HeaderCell>N° de contacto</Table.HeaderCell>
          <Table.HeaderCell>Estado</Table.HeaderCell>
          <Table.HeaderCell>Acciones</Table.HeaderCell>

        </Table.Row>
      </Table.Header>

      <Table.Body>
        
        {map(filteredUsers, (user, index) => (
          <Table.Row key={index}>
            <Table.Cell>{user.legajo}</Table.Cell>
            <Table.Cell>{user.nombre}</Table.Cell>
            <Table.Cell>{user.apellido}</Table.Cell>
            <Table.Cell>{user.dni}</Table.Cell>
            <Table.Cell>{user.rol_usuario}</Table.Cell>
            <Table.Cell>{user.num_contacto}</Table.Cell>
            <Table.Cell>{user.estado}</Table.Cell>
            <Actions
              user={user}
              updateUser={updateUser}
             // onDeleteUser={onDeleteUser}
            />
          </Table.Row>
        ))}
      </Table.Body>
    </Table>

    </div>
  );
}

function Actions(props) {
  const { user, updateUser, onDeleteUser } = props;
  return (
    <Table.Cell textAlign="right">
      <Button icon onClick={() => updateUser(user)}>
        <Icon name="pencil" />
      </Button>
      
    </Table.Cell>
  );
}
/*
<Button icon negative onClick={() => onDeleteUser(user)}>
        <Icon name="close" />
      </Button>
*/