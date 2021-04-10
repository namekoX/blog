import React from "react";
import { Link } from "react-router-dom";
import Const from "../common/const";

// トップページの画像
const HeaderComponect = () => {
  return (
    <React.Fragment>
      <header className="topheader">
        <div id="logo" className="wrap">
          <h1 className="h1 img">
            <Link to={Const.SITE_ROOT}>
              <img src={Const.URLS.SITE_LOGO} alt={Const.SITE_NAME} />
            </Link>
          </h1>
        </div>
      </header>
    </React.Fragment>
  );
};

export default HeaderComponect;