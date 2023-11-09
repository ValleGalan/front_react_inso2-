
import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { HeaderPage, TableReports,  AddEditReportForm,} from "../components";
import { ModalBasic } from "../components/Common";
import { useReport } from "../hooks";

export function ReportePage() {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState<string>();
  const [contentModal, setContentModal] = useState<React.ReactNode>(null);
  const [refetch, setRefetch] = useState(false);
  const { loading, reports, getAllReports, deleteReport } = useReport();

useEffect(() => {
  const fetchData = async () => {
    try {
      await getAllReports(); 
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  fetchData(); // Llama a la función asincrónica fetchData
}, [refetch]);

  const openCloseModal = () => setShowModal((prev) => !prev);
  const onRefetch = () => setRefetch((prev) => !prev);

  const addReport = () => {
    setTitleModal("Nuevo Reporte");
    setContentModal(
      <AddEditReportForm onClose={openCloseModal} onRefetch={onRefetch} />
    );
    openCloseModal();
  };

  const updateReport = (data) => {
    console.log("funcion actualizar: ", data)
    setTitleModal("Actualizar reporte");
    setContentModal(
      <AddEditReportForm
        onClose={openCloseModal}
        onRefetch={onRefetch}
        report={data}
      />
    );
    openCloseModal();
  };

  const onDeleteReport = async (data) => {
    const result = window.confirm(`¿Eliminar reporte ${data.id}?`);
    if (result) {
      try {
        await deleteReport(data.id);
        onRefetch();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
    
      <HeaderPage
        title="Reportes"
        btnTitle="Nuevo reporte"
        btnClick={addReport}
       
      />
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <TableReports
          reports={reports}
          updateReport={updateReport}
          onDeleteReport={onDeleteReport}
        />
      )}

      <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title={titleModal}
        children={contentModal}
      />
    </>
  );
}
