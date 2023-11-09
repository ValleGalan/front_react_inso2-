import React, { useEffect, useState } from "react";
import { Form, Button, Dropdown, Modal } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useUser } from "../../../hooks";
import "./AddEditUserForm.scss";
import { Jerarquia, Estado_Usuario, Rol } from "../../../utils/enums";



export function AddEditUserForm(props) {
  const { onClose, onRefetch, user } = props;
  var { addUser,  users,updateUser, getUsers } = useUser();
  const [refetch, setRefetch] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        await getUsers();
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };
    //if (refetch) {
      fetchData(); 
    //}
  }, [refetch]);
  console.log(users);

  const estadoOptions = Object.values(Estado_Usuario).map((estado) => ({
    key: estado,
    text: estado,
    value: estado,
  }));
  const jerarquiaOptions = Object.values(Jerarquia).map((jerarquia) => ({
    key: jerarquia,
    text: jerarquia,
    value: jerarquia,
  }));
  const rol_usuarioOptions = Object.values(Rol).map((rol) => ({
    key: rol,
    text: rol,
    value: rol,
  }));

  const formik = useFormik({
    initialValues: initialValues(user),
    validationSchema: Yup.object(user ? updateSchame() : newSchame()),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      try {
        ////
       // setRefetch(true); 
        var userExists = users.some(
          (existingUser) =>
            (existingUser.dni == formValues.dni) && (existingUser.legajo == formValues.legajo)
        );
        if (userExists) { // El usuario ya existe, muestra un mensaje de error o realiza alguna acción
          setError("El usuario ya existe.");
        } else {
          if (user) await updateUser(user?.id, formValues);
          else await addUser(formValues);
    
          onRefetch();
          onClose();
        }
        //
      } catch (error) {
        console.error(error);
      }
    },
    
    
    });

  return (
    <Form className="add-edit-user-form" onSubmit={formik.handleSubmit}>
      <div className="form-row">
        <Form.Input
          name="dni"
          placeholder="Ingresa el dni"
          value={formik.values.dni}
          onChange={formik.handleChange}
          error={formik.errors.dni}
        />
        <Form.Input
          name="nombre"
          placeholder="Ingresa el nombre"
          value={formik.values.nombre}
          onChange={formik.handleChange}
          error={formik.errors.nombre}
        />
        <Form.Input
          name="apellido"
          placeholder="Ingresa el apellido"
          value={formik.values.apellido}
          onChange={formik.handleChange}
          error={formik.errors.apellido}
        />
        <Form.Input
          type="date"
          name="fecha_nacimiento"
          placeholder="Fecha de Nacimiento"
          value={formik.values.fecha_nacimiento}
          onChange={formik.handleChange}
          error={formik.errors.fecha_nacimiento}
        />
        <Form.Input
          name="correo"
          placeholder="Correo electronico"
          value={formik.values.correo}
          onChange={formik.handleChange}
          error={formik.errors.correo}
          autoComplete="off"
        />
        <Form.Input
          name="password"
          placeholder="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.errors.password}
          autoComplete="off"
        />
        <Form.Input
          name="domicilio"
          placeholder="Direccion de domicilio"
          value={formik.values.domicilio}
          onChange={formik.handleChange}
          error={formik.errors.domicilio}
        />
        <Form.Input
          name="num_contacto"
          type="number"
          placeholder="Numero de telefono o celular"
          value={formik.values.num_contacto}
          onChange={formik.handleChange}
          error={formik.errors.num_contacto}
        />
        <Form.Input
          name="legajo"
          type="number"
          placeholder="Numero de legajo"
          value={formik.values.legajo}
          onChange={formik.handleChange}
          error={formik.errors.legajo}
        />
        <Dropdown
          placeholder="Categoria"
          fluid
          selection
          search
          options={estadoOptions}
          value={formik.values.estado}
          onChange={(_, data) => formik.setFieldValue("estado", data.value)}
          error={formik.errors.estado ? true : false}
        />

        <Dropdown
          placeholder="Jerarquia"
          fluid
          selection
          search
          options={jerarquiaOptions}
          value={formik.values.jerarquia}
          onChange={(_, data) => formik.setFieldValue("jerarquia", data.value)}
          error={formik.errors.jerarquia ? true : false}
        />
        <Dropdown
          placeholder="Rol del usuario"
          fluid
          selection
          search
          options={rol_usuarioOptions}
          value={formik.values.rol_usuario}
          onChange={(_, data) => formik.setFieldValue("rol_usuario", data.value)}
          error={formik.errors.rol_usuario ? true : false}
        />

        <Button
          type="button"
          primary
          fluid
          content="Cancelar"
          onClick={onClose}
        />
        <Button
          type="submit"
          primary
          fluid
          content={user ? "Actualizar" : "Crear"}
        />
      </div>

     {/* Modal de error */}
     {error && (
        <Modal open={!!error} size="mini">
          <Modal.Header>Error</Modal.Header>
          <Modal.Content>
            <p>{error}</p>
          </Modal.Content>
          <Modal.Actions>
            <Button
              content="Cerrar"
              onClick={() => setError(null)}
            />
          </Modal.Actions>
        </Modal>
      )}

    </Form>
  );
}

function initialValues(data) {
  return {
    dni: data?.dni || "",
    correo: data?.correo || "",
    nombre: data?.nombre || "",
    apellido: data?.apellido || "",
    fecha_nacimiento: data?.fecha_nacimiento || "",
    password: data?.password || "",
    domicilio: data?.domicilio || "",
    num_contacto: data?.num_contacto || "",
    legajo: data?.legajo || "",
    estado: data?.estado || "",
    jerarquia: data?.jerarquia || "",
    rol_usuario: data?.rol_usuario || "",
  };
}

function newSchame() {
  return {
    dni: Yup.number().positive("El número debe ser positivo")
      .integer("El número debe ser un entero")
      .required("El dni del usuario es requerido")
      .test(
        "len",
        "El dni debe tener exactamente 8 dígitos",
        (val) => val && val.toString().length === 8),
    nombre: Yup.string().required("El nombre es requerido"),
    apellido: Yup.string().required("El apellido es requerido"),
    fecha_nacimiento: Yup.date(),
    correo: Yup.string().email("Ingresa un correo electrónico válido"),
    password: Yup.string().required("La contraseña es requerida, 8 como maximo y 4 como minimo, Mayuscula,minuscula"),
    domicilio: Yup.string(),
    num_contacto: Yup.number().positive("El número debe ser positivo").integer("El número debe ser un entero"),
    legajo: Yup.number().positive("El número debe ser positivo").integer("El número debe ser un entero").required("El legajo es requerido"),
    estado: Yup.string().required("El estado del usuario es requerido"),
    jerarquia: Yup.string(),
    rol_usuario: Yup.string().required("El rol del usuario es requerido"),
  };
}

function updateSchame() {
  return {
    dni: Yup.number().positive("El número debe ser positivo")
      .integer("El número debe ser un entero")
      .required("El dni del usuario es requerido")
      .test(
        "len",
        "El dni debe tener exactamente 8 dígitos",
        (val) => val && val.toString().length === 8),
    nombre: Yup.string().required("El nombre es requerido"),
    apellido: Yup.string().required("El apellido es requerido"),
    fecha_nacimiento: Yup.date(),
    correo: Yup.string().email("Ingresa un correo electrónico válido"),
    password: Yup.string().required("La contraseña es requerida, 8 como maximo y 4 como minimo, Mayuscula,minuscula"),
    domicilio: Yup.string(),
    num_contacto: Yup.number().positive("El número debe ser positivo").integer("El número debe ser un entero"),
    legajo: Yup.number().positive("El número debe ser positivo").integer("El número debe ser un entero").required("El legajo es requerido"),
    estado: Yup.string().required("El estado del usuario es requerido"),
    jerarquia: Yup.string(),
    rol_usuario: Yup.string().required("El rol del usuario es requerido"),
  };
}
