import React from "react";
import MenuState from "../interface/MenuState";
import { MenuContext } from "../context/MenuContext";
import Const from "../common/const";
import { Link } from "react-router-dom";

// メニューの配列からJSXを作成する
function renderMenu() {

  const menu = Const.MENU_LIST.map((entry) => {
    const menulist = entry.menulink.map((list) => {
      return (
        <li><Link to={list.link} >{list.title}</Link></li>
      );
    });
    return (
      <div className="menu">
        <h4 className="menutitle">
          <span>{entry.title}</span>
        </h4>
        <ul>
          {menulist}
        </ul>
      </div>
    );
  });

  return menu;
}

// メニュー
const MenuComponent = () => (
  <MenuContext.Consumer>
    {(props: MenuState | undefined) => {

      return (
        <React.Fragment>
          <div className="sidebar">
            <div>
              <div>
                <input
                  type="search"
                  value={props?.keyword}
                  placeholder="サイト内検索"
                  onChange={(e: any) => props?.setKeyword(e.target.value)}
                  onKeyPress={(e: any) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      props?.onSearch();
                    }
                  }}
                />
                <button onClick={props?.onSearch}>
                  <i className="fa fa-search" />
                </button>
              </div>
            </div>
            {renderMenu()}
          </div>
        </React.Fragment>
      );
    }}
  </MenuContext.Consumer>
);

export default MenuComponent;