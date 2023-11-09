import React, { useEffect, useState } from 'react';
import { Pie , Bar} from 'react-chartjs-2';
import "./Informe.scss";
import { ChartSelector } from './ChartSelector';

import {
  ArcElement,
  BarElement,
  BarController,
  CategoryScale,
  Chart as ChartJS,
  Legend as ChartjsLegend,
  LinearScale, 
  Tooltip,
  TooltipItem,
  TooltipModel,
} from 'chart.js';
ChartJS.register(ArcElement, BarElement, BarController, CategoryScale, LinearScale, Tooltip,ChartjsLegend);


export function Informe(props) {
  const { reports } = props;  
  const [chartType, setChartType] = useState('pie'); // Valor predeterminado: gráfico de pastel


   if (Array.isArray(reports)) {
  //REPORTE POR TIPO
    let reportTypes = reports?.map((report) => report.tipo_reporte);
    let reportTypeCounts = reportTypes.reduce((acc, type) => {
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    let labels = Object.keys(reportTypeCounts);
    let data = Object.values(reportTypeCounts);

    var setPieChartData = {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(75, 192, 192, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

  }
// REPORTE POR HECHO ESCLARECIDO

let countEsclarecidos = reports.filter(report => report.estado == "HECHO_ESCLARECIDO").length;
let countNoEsclarecidos = reports.length - countEsclarecidos;

const setBarChartData = {
  labels: ['Hechos Esclarecidos', 'Hechos no Esclarecidos'],
  datasets: [
    {
      label: 'Cantidad de Informes',
      data: [countEsclarecidos, countNoEsclarecidos],
      backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
      borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
      borderWidth: 1,
    },
  ],
};


  //Para la red social mas usada
const socialMediaData = {
  facebook: 0,
  instagram: 0,
  twitter: 0,
  other: 0, // Para URLs que no son de Facebook, Instagram ni Twitter
};

reports.forEach((report) => {
  const url = report.url.toLowerCase(); // Convierte la URL a minúsculas para una comparación sin distinción entre mayúsculas y minúsculas
  
  if (url.includes('facebook.com')) {
    socialMediaData.facebook += 1;
  } else if (url.includes('instagram.com')) {
    socialMediaData.instagram += 1;
  } else if (url.includes('twitter.com')) {
    socialMediaData.twitter += 1;
  } else {
    socialMediaData.other += 1;
  }
});

let socialMediaLabels = Object.keys(socialMediaData);
let socialMediaValues = Object.values(socialMediaData);

let setSocialMediaChartData = {
  labels: socialMediaLabels,
  datasets: [
    {
      label: 'Cantidad de Informes',
      data: socialMediaValues,
      backgroundColor: [
        'rgba(59, 89, 152, 0.5)',  
        'rgba(216, 72, 155, 0.5)',  
        'rgba(0, 172, 237, 0.5)',  
        'rgba(169, 169, 169, 0.5)',  
      ],
      borderColor: [
        'rgba(59, 89, 152, 1)',  
        'rgba(216, 72, 155, 1)',  
        'rgba(0, 172, 237, 1)', 
        'rgba(169, 169, 169, 1)', 
      ],
      borderWidth: 1,
    },
  ],
};
//
var options = {
  responsive: true,
  maintainAspectRatio: false,
  title: {
    display: true,
    text: 'Reportes por Tipo'
  },
  legend: {
    display: true,
    position: 'left' // Opciones: top, bottom, left, right
  },
};

//componente para renderizar los graficos
const renderContent = () => {
  if (chartType === 'pie') {
    return (
      <div className='Informe'>
        <Pie data={setPieChartData} options={options} />
      </div>
    );
  } else if (chartType === 'esclarecidos') {
    return (
      <div className='Informe'>
        <Bar data={setBarChartData} options={options} />
      </div>
    );
   

  } else if (chartType === 'redes') {
    return (
      <div className='Informe'>
        <Bar data={setSocialMediaChartData} options={options} />
      </div>
    );
  }
};

return (
  <div className='Informe'>
    <ChartSelector onSelectChart={setChartType} />
    {renderContent()}
  </div>
);
}