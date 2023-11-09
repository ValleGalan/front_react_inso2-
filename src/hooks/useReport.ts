import { useState } from "react";
import {
  getAllReportsApi,
  addReportApi,
  updateReportApi,
  deleteReportApi,
  getDomiciliosHechosEsclarecidosApi,
} from "../api/reporte";

export function useReport() {
  const [loading, setLoading] = useState(true);
  //const [error, setError] = useState(null);
  const [reports, setReports] = useState(null);
 // const { auth } = useAuth();

  const getAllReports = async () => {
    try {
      setLoading(true);
      const response = await getAllReportsApi();//auth.token
      setLoading(false);
      setReports(response);
    } catch (error) {
      setLoading(false);
      //setError(error);
    }
  };

  const addReport = async (data) => {
    try {
      console.log("Entro a userReport")

      setLoading(true);
      await addReportApi(data); //auth.token
      setLoading(false);
    } catch (error) {
      setLoading(false);
     // setError(error);
    }
  };
 
  const updateReport = async (id, data) => {
    try {
      setLoading(true);
      await updateReportApi(id, data); //auth.token
      setLoading(false);
    } catch (error) {
      setLoading(false);
      //setError(error);
    }
  };

  const deleteReport = async (id) => {
    try {
      setLoading(true);
      await deleteReportApi(id); //auth.token
      setLoading(false);
    } catch (error) {
      setLoading(false);
      //setError(error);
    }
  };


  const getDomiciliosHechosEsclarecidos = async () => {
    try {
      setLoading(true);
      const response = await getDomiciliosHechosEsclarecidosApi();//auth.token
      setLoading(false);
      setReports(response);
    } catch (error) {
      setLoading(false);
      //setError(error);
    }
  };

  return {
    loading,
    //error,
    reports,
    getAllReports,
    addReport,
    updateReport,
    deleteReport,
    getDomiciliosHechosEsclarecidos,
  };
}
