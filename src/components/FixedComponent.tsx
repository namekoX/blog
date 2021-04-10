import React from "react";
import { formatDate } from "../common/utils";
import Helmet from "react-helmet"
import { FixedContext } from "../context/FixedContext";
import FixedState from "../interface/FixedState";

// 固定ページ
const FixedComponent = () => (
  <FixedContext.Consumer>
    {(props: FixedState | undefined) => {
      const inputhtml: string = props?.contents!;
      return (
        <React.Fragment>
          <Helmet>
            <title>{props?.subject}</title>
            <meta name="robots" content="noindex" />
          </Helmet>
          <div className='article main'>
            <div className='header'>
              <p className='byline'>
                <span>{'最終更新日：' + formatDate(props?.modified)}</span>
              </p>
              <h1>
                {props?.subject}
              </h1>
            </div>
            <div
              className="entry-content"
              dangerouslySetInnerHTML={{ __html: inputhtml }}
            />
            <hr />
          </div>
        </React.Fragment>
      );
    }}
  </FixedContext.Consumer>
);

export default FixedComponent;