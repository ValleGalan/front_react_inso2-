/* eslint import/no-webpack-loader-syntax: off */

import { useContext, useEffect, useReducer } from 'react';

//@ts-ignore
import { AnySourceData, LngLatBounds, Map, Marker, Popup } from '!mapbox-gl';

import { MapContext } from './MapContext';
import { mapReducer } from './mapReducer';

import { PlacesContext } from '../';

import { directionsApi } from '../../apis';
import { DirectionsResponse } from '../../interfaces/directions';
import { getDomiciliosHechosEsclarecidosApi } from '../../api/reporte';

import axios from 'axios';

export interface MapState {
    isMapReady: boolean;
    map?: Map;
    markers: Marker[];
}

const INITIAL_STATE: MapState = {
    isMapReady: false,
    map: undefined,
    markers: [],
}

interface Props {
    children: JSX.Element | JSX.Element[];
}


export const MapProvider = ({ children }: Props) => {

    const [state, dispatch] = useReducer( mapReducer, INITIAL_STATE );
    const { places } = useContext( PlacesContext );

    /*useEffect(() => {
        state.markers.forEach( marker => marker.remove() );
        const newMarkers: Marker[] = [];

        for (const place of places) {
            const [ lng, lat ] = place.center;
            const popup = new Popup()
                .setHTML(`
                    <h6>${ place.text_es }</h6>
                    <p>${ place.place_name_es }</p>
                `);
            
            const newMarker = new Marker()
                .setPopup( popup )
                .setLngLat([ lng, lat ])
                .addTo( state.map! );
            
            newMarkers.push( newMarker );
        }

        // Todo: limpiar polyline

        dispatch({ type: 'setMarkers', payload: newMarkers });
        
    }, [ places ])*/
    /// MARCAR LOS DOMICILIOS OBTENIDOS!!

    useEffect(() => {
        state.markers.forEach((marker) => marker.remove());
        const newMarkers: Marker[] = [];
    
        const loadDomiciliosEsclarecidos = async () => {
          try {
            const domicilios = await getDomiciliosHechosEsclarecidosApi();
            for (const domicilio of domicilios) {
              // Debes geocodificar la dirección para obtener las coordenadas
              const [lng, lat] = await obtenerCoordenadasDelDomicilio(domicilio.domicilio_reporte);
              if (lng !== undefined && lat !== undefined) {
                const popup = new Popup().setHTML(`
                  <h6>${domicilio.tipo_reporte}</h6>
                  <p>${domicilio.domicilio_reporte}</p>
                `);
    
                const newMarker = new Marker()
                  .setPopup(popup)
                  .setLngLat([lng, lat])
                  .addTo(state.map!);
    
                newMarkers.push(newMarker);
              }
            }
    
            // Actualiza los marcadores en el mapa
            dispatch({ type: 'setMarkers', payload: newMarkers });
          } catch (error) {
            console.error('Error al cargar los domicilios esclarecidos', error);
          }
        };
    
        // Llama a la función para cargar los domicilios
        loadDomiciliosEsclarecidos();
      }, [state.map]);

    ///



    const setMap = ( map: Map ) => {

        const myLocationPopup = new Popup()
            .setHTML(`
            <h4>Aquí estoy</h4>
            <p>En algún lugar del mundo</p>
        `);

        new Marker({
            color: '#FF0000'
        })
        .setLngLat( map.getCenter() )
        .setPopup( myLocationPopup )
        .addTo( map );


        dispatch({ type: 'setMap', payload: map })

    }


    const getRouteBetweenPoints = async(start: [number, number], end: [number, number] ) => {

        const resp = await directionsApi.get<DirectionsResponse>(`/${ start.join(',') };${ end.join(',') }`);
        const { distance, duration, geometry } = resp.data.routes[0];
        const { coordinates: coords } = geometry;

        let kms = distance / 1000;
            kms = Math.round( kms * 100 );
            kms /= 100;

        const minutes = Math.floor( duration / 60 );
        console.log({ kms, minutes });

        const bounds = new LngLatBounds(
            start,
            start
        );

        for (const coord of coords ) {
            const newCoord: [number, number] = [ coord[0], coord[1] ];
            bounds.extend( newCoord );
        }

        state.map?.fitBounds( bounds, {
            padding: 200
        });

        // Polyline
        const sourceData: AnySourceData = {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'LineString',
                            coordinates: coords
                        }
                    }
                ]
            }
        }

        if ( state.map?.getLayer('RouteString') ) {
            state.map.removeLayer('RouteString');
            state.map.removeSource('RouteString');
        }

        state.map?.addSource('RouteString', sourceData );

        state.map?.addLayer({
            id: 'RouteString',
            type: 'line',
            source: 'RouteString',
            layout: {
                'line-cap': 'round',
                'line-join': 'round'
            },
            paint: {
                'line-color': 'black',
                'line-width': 3
            }
        })


        
    }
    const obtenerCoordenadasDelDomicilio = async (domicilio: string) => {
        try {
          const response = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(domicilio) + '.json', {
            params: {
              access_token: 'pk.eyJ1Ijoia2xlcml0aCIsImEiOiJja3hramV2OWIwbjEwMzFwYzJlZWl6N2g5In0.iKXPpYvo7UPRiiZ-x_lCrw', // Reemplaza con tu token de Mapbox
            },
          });
      
          const data = response.data;
          if (data.features.length > 0) {
            const coordinates = data.features[0].center;
            return coordinates;
          } else {
            console.error('No se pudieron obtener las coordenadas para:', domicilio);
            return [undefined, undefined];
          }
        } catch (error) {
          console.error('Error al obtener las coordenadas', error);
          return [undefined, undefined];
        }
      };

    return (
        <MapContext.Provider value={{
            ...state,

            // Methods
            setMap,
            getRouteBetweenPoints,
        }}>
            { children }
        </MapContext.Provider>
    )
}


