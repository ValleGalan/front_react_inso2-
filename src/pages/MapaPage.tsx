import React, { useEffect, useState } from 'react'
import { MapProvider, PlacesProvider } from '../context';
import { HomeScreen } from '../screens';
import { useReport } from '../hooks';
import { Loader } from 'semantic-ui-react';
import { TableHechoEsclarecido } from '../components/Reporte/TableHechoEsclarecido';

  
const placesProviderStyle = {
  width: '800px !import',
  height: '700px',
};

export function MapaPage() {
  const [refetch, setRefetch] = useState(false);
const { loading, reports, getAllReports ,getDomiciliosHechosEsclarecidos} = useReport();

useEffect(() => {
  const fetchData = async () => {
    try {
      await getDomiciliosHechosEsclarecidos(); 
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };
  fetchData(); // Llama a la función asincrónica fetchData
}, [refetch]);

  return (
    <div style={{ width: '800px !important', height: '700px !important' }}>
      <p>Ubicaciones de Hechos esclarecidos</p>
      <PlacesProvider >
            <MapProvider>
                <HomeScreen />
            </MapProvider>
        </PlacesProvider>

        {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <TableHechoEsclarecido
          reports={reports}
        />
      )}
    </div>
  )
}
