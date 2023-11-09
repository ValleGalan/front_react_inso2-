import React from "react";
import { Menu, Icon } from "semantic-ui-react";
import { Link, useLocation } from "react-router-dom";
//import { useAuth } from "../../../hooks";
import "./SideMenu.scss";
import logo from '../../utils/images/logo.png';

export function SideMenu(props:any) {
  const { children } = props;
  const { pathname } = useLocation();

  return (
    <div className="side-menu-admin">
      <MenuLeft pathname={pathname} />
      <div className="content">{children}</div>
    </div>
  );
}

function MenuLeft(props:any) {
  const { pathname } = props;
  //const { auth } = useAuth();

  return (
    <Menu fixed="left" borderless className="side" vertical>
      <Menu.Item >
        <img 
          src={logo} 
          alt="Logo del sistema"  
          style={{ width: '65%', height: '65%' }}/> 
      </Menu.Item>
      <h1 className="titulo">CYBERSLEUTH</h1>


      <Menu.Item as={Link} to={"/reporte"} active={pathname === "/reporte"}>
        <Icon name="file outline" /> Reportes
      </Menu.Item>


      <Menu.Item  as={Link}to={"/geolocalizacion"} active={pathname === "/geolocalizacion"} >
        <Icon name="map marker alternate" /> Geolocalización
      </Menu.Item>

      <Menu.Item  as={Link} to={"/usuario"}   active={pathname === "/usuario"} >
        <Icon name="user circle" /> Usuarios
      </Menu.Item>
      <Menu.Item
        as={Link}  to={"/informe"} active={pathname === "/informe"} >
        <Icon name="clipboard outline" /> Informes
      </Menu.Item>
      
    </Menu>
  );
}


/*

      <Menu.Item
        as={Link}  to={"/informe"} active={pathname === "/informe"}
      >
        <Icon name="clipboard outline" /> Informes
      </Menu.Item>



      
{auth.me?.is_staff && (
        <Menu.Item
          as={Link}
          to={"/admin/users"}
          active={pathname === "/admin/users"}
        >
          <Icon name="users" /> Usuarios
        </Menu.Item>
      )}
*/
