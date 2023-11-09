import { BasicLayout,BasicLogin } from "../layouts";

//import { LoginAdmin } from "../pages/Admin";
import {Home, ReportePage, UsuarioPage,InformePage,MapaPage} from "../pages";
//import {GeolocalizacionPage} from "../pages/GeolocalizacionPage.tsx";

 const routesTodos =[
    //todas las funcionalidades
    /*
    {
        path:"/login",  // CAMBIAR PARA QUE SEA "/" PARA QUE SEA LO PRIMERO QUE APARECE
        layout: BasicLogin, 
        component:LoginAdmin
    },*/
    {
        path:"/", //despues cambiar por home
        layout: BasicLayout, 
        component:Home,
        exact: true,
    },
    {
        path:"/reporte", 
        layout: BasicLayout, 
        component: ReportePage,
        exact: true,
    },
    {
        path:"/informe", 
        layout: BasicLayout, 
        component: InformePage,
        exact: true,
    },
    {
        path:"/geolocalizacion", 
        layout: BasicLayout, 
        component: MapaPage,
        exact: true,
    },

    // funcionalidad del admin - usuarios
    {
        path:"/usuario", 
        layout: BasicLayout, 
        component: UsuarioPage,
        exact: true,
    }
];

export default routesTodos;
