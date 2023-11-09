import React, { useEffect, useState } from "react";
import { Form, Button, Dropdown, Modal } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useReport } from "../../../hooks";
import {  Prioridad,  Estado,  TipoReporte, } from "../../../utils/enums";


export function AddEditReportForm(props) {
  const { onClose, onRefetch, report } = props;
  const { addReport, updateReport,getAllReports,reports } = useReport();
  const [refetch, setRefetch] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        await getAllReports();
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };
    //if (refetch) {
      fetchData(); 
    //}
  }, [refetch]);
  console.log(reports);

  const prioridadOptions = Object.values(Prioridad).map((prioridad) => ({
    key: prioridad,
    text: prioridad,
    value: prioridad,
  }));
  const estadoOptions = Object.values(Estado).map((estado) => ({
    key: estado,
    text: estado,
    value: estado,
  }));
  const tipo_reporteOptions = Object.values(TipoReporte).map((tipo_reporte) => ({
    key: tipo_reporte,
    text: tipo_reporte,
    value: tipo_reporte,
  }));

  const formik = useFormik({
     initialValues: initialValues(report),
    validationSchema: Yup.object(report ? updateSchame() : newSchame()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        //
        const reportExists = reports.some(
          (existingReport) =>
            existingReport.num_reporte === formValue.num_reporte 
        );
        if (reportExists) { // El usuario ya existe, muestra un mensaje de error o realiza alguna acción
          setError("El reporte ya existe.");
        } else {
        //

        if (report) await updateReport(report?.id, formValue);
        else await addReport(formValue);

        onRefetch();
        onClose();

        }
      } catch (error) {
        console.log( "errror ");
        console.error(error);
      }
    },
  });
 // console.log( "addEditreport2: ",report);

  return (
    <Form className="add-edit-user-form" onSubmit={formik.handleSubmit}>
      <div className="form-row">
      <Form.Input
        name="num_reporte"
        type="number"
        placeholder="Numero de reporte"
        value={formik.values.num_reporte}
        onChange={formik.handleChange}
        error={formik.errors.num_reporte}
      />

      <Form.Input
        name="correo"
        placeholder="Correo electronico"
        value={formik.values.correo}
        onChange={formik.handleChange}
        error={formik.errors.correo}
      />
      <Form.Input
        name="nombre_user"
        placeholder="Nombre de usuario"
        value={formik.values.nombre_user}
        onChange={formik.handleChange}
        error={formik.errors.nombre_user}
      />
      <Form.Input
        name="investigador"
        placeholder="Investigador Asignado"
        value={formik.values.investigador}
        onChange={formik.handleChange}
        error={formik.errors.investigador}
      />
      
       <Dropdown
        placeholder="Tipo reporte"
        fluid
        selection
        search
        options={tipo_reporteOptions}
        value={formik.values.tipo_reporte}
        onChange={(_, data) => formik.setFieldValue("tipo_reporte", data.value)}
        error={formik.errors.tipo_reporte ? true : false}
      />
    <Form.Input
        type="number"
        name="telefono"
        placeholder="Numero de telefono"
        value={formik.values.telefono}
        onChange={formik.handleChange}
        error={formik.errors.telefono}
      />
      <Form.Input
        name="url"
        placeholder="URL del perfil"
        value={formik.values.url}
        onChange={formik.handleChange}
        error={formik.errors.url}
      />
      <Form.Input
        name="ip"
        placeholder="IP del perfil"
        value={formik.values.ip}
        onChange={formik.handleChange}
        error={formik.errors.ip}
      />
      <Form.Input
        name="domicilio_reporte"
        placeholder="Direccion de domicilio del perfil"
        value={formik.values.domicilio_reporte}
        onChange={formik.handleChange}
        error={formik.errors.domicilio_reporte}
      />
      <Form.Input
        type="number"
        name="cant_archivo"
        placeholder="Cantidad de archivos"
        value={formik.values.cant_archivo}
        onChange={formik.handleChange}
        error={formik.errors.cant_archivo}
      />
      <Dropdown
        placeholder="Estado de la investigación"
        fluid
        selection
        search
        options={estadoOptions}
        value={formik.values.estado}
        onChange={(_, data) => formik.setFieldValue("estado", data.value)}
        error={formik.errors.estado ? true : false}
      />
      <Dropdown
        placeholder="Prioridad"
        fluid
        selection
        search
        options={prioridadOptions}
        value={formik.values.prioridad}
        onChange={(_, data) => formik.setFieldValue("prioridad", data.value)}
        error={formik.errors.prioridad ? true : false}
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
        content={report ? "Actualizar" : "Crear"}
      />
      </div>
    </Form>
  );
}

function initialValues(data) {
  return {
    num_reporte: data?.num_reporte || "",
    correo: data?.correo || "",
    nombre_user: data?.nombre_user || "",
    investigador: data?.investigador || "",
    tipo_reporte: data?.tipo_reporte || "",
    telefono: data?.telefono || "",
    url: data?.url || "",
    ip: data?.ip || "",
    cant_archivo: data?.cant_archivo || "",
    estado: data?.estado || "",
    prioridad: data?.prioridad || "",
    domicilio_reporte: data?.domicilio_reporte || "",
  };
}

function newSchame() {
  return {
    num_reporte:  Yup.number().positive("El número debe ser positivo").integer("El número debe ser un entero").required("El N° reporte es requerido"),
    correo: Yup.string().email("Ingresa un correo electrónico válido"),
    nombre_user: Yup.string(),
    investigador: Yup.string().required("El investigador es requerido"),
    tipo_reporte: Yup.string().required("El tipo de reporte es requerido"),
    telefono: Yup.number().positive("El número debe ser positivo").integer("El número debe ser un entero"),
    url: Yup.string(),
    ip: Yup.string(),
    cant_archivo: Yup.number().positive("El número debe ser positivo").integer("El número debe ser un entero").required("La cantidad de archivos es requerido"),
    estado: Yup.string().required("El estado del reporte es requerido"),
    prioridad: Yup.string().required("La prioridad es requerida"),
    domicilio_reporte: Yup.string(),
  };
}

function updateSchame() {
  return {
    num_reporte:  Yup.number().positive("El número debe ser positivo").integer("El número debe ser un entero").required("El N° reporte es requerido"),
    correo: Yup.string().email("Ingresa un correo electrónico válido"),
    nombre_user: Yup.string(),
    investigador: Yup.string().required("El investigador es requerido"),
    tipo_reporte: Yup.string().required("El tipo de reporte es requerido"),
    telefono: Yup.number().positive("El número debe ser positivo").integer("El número debe ser un entero"),
    url: Yup.string(),
    ip: Yup.string(),
    cant_archivo: Yup.number().positive("El número debe ser positivo").integer("El número debe ser un entero").required("La cantidad de archivos es requerido"),
    estado: Yup.string().required("El estado del reporte es requerido"),
    prioridad: Yup.string().required("La prioridad es requerida"),
    domicilio_reporte: Yup.string(),
  };
}
