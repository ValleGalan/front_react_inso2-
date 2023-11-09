import React from 'react'

export  function BasicLogin( props:any ) {
  const { children } =props;
  //const { auth } = useAuth();
  //if (!auth) return <LoginAdmin />;
    return (

    <div>
     { children }
    </div>
  )
}
