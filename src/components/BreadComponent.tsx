import React from "react";
import { Link } from "react-router-dom";
import Const from "../common/const";
import { PostContext } from "../context/PostContext";
import PostState from "../interface/PostState";

// パンくずリスト
const BreadComponent = () => (
  <PostContext.Consumer>
    {(props: PostState | undefined) => {
      return (
        <React.Fragment>
          <div className="breadcrumb">
            <ul>
              <li itemType="//data-vocabulary.org/Breadcrumb">
                <Link to={Const.SITE_ROOT} itemProp="url">
                  <i className="fa fa-home"></i>
                  <span itemProp="title"> ホーム</span></Link></li>
              <li itemType="//data-vocabulary.org/Breadcrumb">
                <Link to={Const.SITE_ROOT + props?.category_name} itemProp="url">
                  <span itemProp="title">{props?.category_name}</span></Link></li><li>{props?.subject}</li></ul>
          </div>
        </React.Fragment>
      );
    }}
  </PostContext.Consumer>
);

export default BreadComponent;