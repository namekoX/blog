import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './scss/App.scss';
import Const from './common/const';
import PostComponent from './components/PostComponent';
import PostProvider from './provider/PostProvider';
import BreadComponent from './components/BreadComponent';
import NotFoundComponect from './components/NotFoundComponect';
import IndexProvider from './provider/IndexProvider';
import IndexComponent from './components/IndexComponent';
import FooterComponect from './components/FooterComponect';
import HeaderComponect from './components/HeaderComponect';
import { getIdByUrlPrams } from './common/utils';
import MenuComponent from './components/MenuComponent';
import MenuProvider from './provider/MenuProvider';
import FixedProvider from './provider/FixedProvider';
import FixedComponent from './components/FixedComponent';

// 一覧ページ
const IndexComponect = () => {
  return (
    <div id="container" className='wrap'>
      <IndexProvider>
        <IndexComponent />
      </IndexProvider>
      <MenuProvider>
        <MenuComponent />
      </MenuProvider>
    </div>
  );
};

// 記事本文ページ
const PostComponect = () => {
  return (
    <div id="container" className='wrap'>
      <PostProvider>
        <BreadComponent />
        <PostComponent />
      </PostProvider>
      <MenuProvider>
        <MenuComponent />
      </MenuProvider>
    </div>
  );
};

const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        {/* トップページ */}
        <HeaderComponect />
        {/* 一覧ページ */}
        <Switch>
          <Route exact path={Const.SITE_ROOT}
            render={() => {
              return (
                IndexComponect()
              );
            }}
          />
          {/* 固定ページ */}
          <Route
            path={Const.SITE_ROOT + Const.FIXED_PAGE}
            render={() => {
              return (
                <div id="container" className='wrap'>
                  <FixedProvider>
                    <FixedComponent />
                  </FixedProvider>
                  <MenuProvider>
                    <MenuComponent />
                  </MenuProvider>
                </div>
              );
            }}
          />
          {/* 記事本文またはカテゴリ一覧 IDが含まれていなければカテゴリ一覧*/}
          <Route
            path={Const.SITE_ROOT + Const.POST_SLAG}
            render={() => {
              return (
                getIdByUrlPrams() !== "" ? PostComponect() : IndexComponect()
              );
            }}
          />
          <Route component={NotFoundComponect} />
        </Switch>
        <FooterComponect />
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
