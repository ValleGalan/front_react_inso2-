
import { Error404 } from "../pages";
import {BasicLayout} from "../layouts";
import routesTodos from "./routes.todos";
//Para administrar las rutas juntas --> deviuelve  [ {} , {} ]
const routes = [

    ...routesTodos,
    {
        layout: BasicLayout, 
        component: Error404,
    },
 ];

export default routes;
// sin ... devuelve [ [{}] [{}] ] //const routes = [ routerAdmin, routerClient ] -->devuelve [ [{}] [{}] ]

// con ... devuelve el contenido  [ {} , {} ]

