import React from "react";
import { Link } from "react-router-dom";
import Const from "../common/const";

// フッター
const FooterComponect = () => {
  return (
    <React.Fragment>
      <footer id="footer" className="footer">
        <div className="wrap">
          <p className="copyright">{'©Copyright' + new Date().getFullYear()}
            <Link to={Const.SITE_ROOT}> 
              {Const.SITE_NAME}
            </Link>
            .All Rights Reserved.</p>
        </div> 
      </footer>
    </React.Fragment>
  );
};

export default FooterComponect;