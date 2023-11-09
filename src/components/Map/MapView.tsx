/* eslint import/no-webpack-loader-syntax: off */

import { useContext, useLayoutEffect, useRef } from 'react';

//@ts-ignore
import { Map } from '!mapbox-gl';

import { PlacesContext, MapContext } from '../../context';
import { Loading } from '.';



export const MapView = () => {

    const { isLoading, userLocation } = useContext( PlacesContext );
    const { setMap } = useContext( MapContext)

    const mapDiv = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        //ESTILOS DEL MAPA MAPBOX proporciona varios estilos
        if ( !isLoading ) {
            const map = new Map({
                container: mapDiv.current! , // container ID
                style: 'mapbox://styles/mapbox/streets-v11', // style URL
                center: userLocation, // starting position [lng, lat]
                zoom: 14 // starting zoom
            });

            setMap( map );
        }
    }, [ isLoading ])


    if ( isLoading ) {
        return ( <Loading /> )
    }


    return (
        <div ref={ mapDiv }
            style={{
                height: '500px',
                left: '200px',
                top: 0,
                width: '1000px',
            }}
        >
            { userLocation?.join(',') }
        </div>
    )
}
