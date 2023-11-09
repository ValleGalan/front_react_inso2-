import React, { useEffect, useState } from 'react'
import { Informe } from '../components/Informe'
import { useReport } from '../hooks';

export function InformePage() {
  const [refetch, setRefetch] = useState(false);
  const { loading, reports, getAllReports } = useReport();

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

  if (!reports) {
    return <div>Cargando reportes...</div>;
  }
 
  return (
    <div>
      <Informe  reports={reports}></Informe>
    </div>
  )
}
