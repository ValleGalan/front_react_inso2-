import React from "react";
import { Button } from "semantic-ui-react";
import "./HeaderPage.scss";

export function HeaderPage(props:any) {
  const { title, btnTitle, btnClick, btnTitleTwo, btnClickTwo } = props;

  return (
    <div className="header-page-admin"  style={{ padding: '30px' }}>
      <h2 className="texto-azul">{title}</h2>

      <div>
        {btnTitle && (
          <Button positive onClick={btnClick}>
            {btnTitle}
          </Button>
        )}
        {btnTitleTwo && (
          <Button negative onClick={btnClickTwo}>
            {btnTitleTwo}
          </Button>
        )}
      </div>
    </div>
  );
}
