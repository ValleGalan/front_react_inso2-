import React from 'react'
import { TopMenu, SideMenu } from "../components";


export  function BasicLayout( props:any ) {
  const { children } =props;
  //const { auth } = useAuth();
  //if (!auth) return <LoginAdmin />;
    return (
      <div className='basic-layout'>
        
        <div className='basic-layout__menu'> 
          <TopMenu />         
        </div>
        <div className='basic-layout__main-content'>
          <SideMenu>{children}</SideMenu>
        </div>

    </div>
  )
}

/*
 <div>
        <TopMenu />
      </div>
      <h2>BasictLayout en layouts</h2>

      <div>
        <SideMenu>{children}</SideMenu>
      </div>
*/