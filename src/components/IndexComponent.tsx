import React from "react";
import { Helmet } from "react-helmet";
import ReactPaginate from "react-paginate";
import Const from "../common/const";
import { formatDate, getKeyByMap, isEnptystr } from "../common/utils";
import { IndexContext } from "../context/IndexContext";
import IndexState, { Post } from "../interface/IndexState";
import { animateScroll } from 'react-scroll';
import { Link } from "react-router-dom";

// 記事の配列からJSXを作成する
function renderPosts(postlist: Post[] | undefined) {
  if (postlist === undefined) {
    return;
  }
  const entrys = postlist.filter(x => x.id !== "")

  if (entrys.length === 0) return;

  entrys.sort(function (a, b) {
    if (a.modified < b.modified) return 1;
    if (a.modified > b.modified) return -1;
    return 0;
  });

  const articlelist = entrys.map((entry) => {
    return (
      <article className='top-post'>
        <Link 
          to={entry.link}
          rel="bookmark"
          title={entry.subject}>
          <figure className="eyecatch">
            <img
              src={entry.eyecatch.source_url}
              alt="" />
          </figure>
          <section className="entry-content">
            <p className="byline">
              <span>{formatDate(entry.modified)}</span>
              <span className="cat-name">{entry.category_name}</span>
            </p>
            <h1 className="h2 entry-title">{entry.subject}</h1>
            <p>{entry.excerpt}</p>
          </section>
        </Link>
      </article>
    );
  });

  return articlelist;
}

// ページャ切替時にトップに戻る
const scrollToTop = () => {
  animateScroll.scrollToTop();
};

// 検索結果の場合、どのような条件で検索したかを画面表示する
const searchResult = (category: string | undefined, keyword: string | undefined) => {
  const cate = (
    <div className="archivettl">
      <h1>
        <span>カテゴリー検索: </span>{getKeyByMap(category, Const.CATEGORYS)}
      </h1>
    </div>
  );
  const word = (
    <div className="archivettl">
      <h1>
        <span>キーワード検索: </span>{keyword ? decodeURI(keyword) : ''}
      </h1>
    </div>
  );
  return !isEnptystr(keyword) ? word : !isEnptystr(category) ? cate : '';
}

// 一覧ページ
const IndexComponent = () => (
  <IndexContext.Consumer>
    {(props: IndexState | undefined) => {
      return (
        <React.Fragment>
          <Helmet>
            <title>{Const.SITE_NAME}</title>
            {(props?.cond.category !== '' || props?.cond.keyword !== '') &&
              <meta name="robots" content="noindex" />
            }
          </Helmet>
          <div className='main'>
            {searchResult(props?.cond.category, props?.cond.keyword)}
            {renderPosts(props?.posts)}
            {props?.errorMsg !== '' && <p className='errorMsg'>{props?.errorMsg}</p>}
            <nav className="pagination">
              <div>
                <ReactPaginate
                  pageCount={props?.totalPage === undefined ? 0 : props.totalPage}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={(selectedItem: { selected: number }) => {
                    props?.getPosts(selectedItem.selected + 1);

                  }}
                  containerClassName="pagination"
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  activeClassName="active"
                  activeLinkClassName="active"
                  previousLinkClassName="previous-link"
                  nextLinkClassName="next-link"
                  previousLabel="<"
                  nextLabel=">"
                  disabledClassName="disabled-button"
                />
              </div>
            </nav>
          </div>
          <div id="page-top" >
            <i className="fa fa-chevron-up" onClick={(e: any) => scrollToTop()}></i>
          </div>
        </React.Fragment>
      );
    }}
  </IndexContext.Consumer>
);

export default IndexComponent;