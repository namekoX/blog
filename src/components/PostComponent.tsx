import React from "react";
import { formatDate, formatDateYYYYMMhhmmss } from "../common/utils";
import { PostContext } from "../context/PostContext";
import { Reply } from "../interface/GetPostDataResult";
import PostState from "../interface/PostState";
import Helmet from "react-helmet"
import Const from "../common/const";
import AdsComponent from "./AdsComponent";

// コメントの配列からJSXを作成する
function renderComents(comentlist: Reply[]) {
  if (comentlist === undefined) {
    return;
  }
  const entrys = comentlist.filter(x => x.id !== "")

  if (entrys.length === 0) return;

  entrys.sort(function (a, b) {
    if (a.date < b.date) return -1;
    if (a.date > b.date) return 1;
    return 0;
  });

  const commentlist = entrys.map((entry) => {
    return (
      <span>
        <div className="comment-author">
          <b>{entry.author_name + 'より：'}</b>
        </div>
        <div className="comment-time">
          <b>{formatDateYYYYMMhhmmss(new Date(entry.date))}</b>
        </div>
        <div
          className="comment-content"
          dangerouslySetInnerHTML={{ __html: entry.content.rendered }}
        >
        </div>
        <hr />
      </span>
    );
  });

  return <section className="commentlist">{commentlist}</section>;
}

// 記事本文ページ
const PostComponent = () => (
  <PostContext.Consumer>
    {(props: PostState | undefined) => {
      const inputhtml: string = props?.contents!;
      return (
        <React.Fragment>
          <Helmet>
            <title>{props?.subject}</title>
            <meta property="og:description" content={props?.excerpt} />
            <meta property="og:type" content="website" />
            <meta property="og:image" content={props?.eyecatch.source_url} />
            <meta property="og:url" content={window.location.href} />
            <meta property="og:site_name" content={Const.SITE_NAME + '-' + props?.subject} />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content={props?.subject} />
            <meta name="twitter:description" content={props?.excerpt}></meta>
            <meta name="twitter:image" content={props?.eyecatch.source_url} />
          </Helmet>
          <div className='article main'>
            <div className='header'>
              <p className='byline'>
                <span>{'最終更新日：' + formatDate(props?.modified)}</span>
                <span className='cat-name'>{props?.category_name}</span>
              </p>
              <h1>
                {props?.subject}
              </h1>
            </div>
            <figure className='eyecatch'>
              <img
                width={props?.eyecatch.width}
                height={props?.eyecatch.height}
                src={props?.eyecatch.source_url}
                className='attachment-single-thum size-single-thum wp-post-image'
                alt=''
                sizes={'(max-width: ' + props?.eyecatch.width + 'px) 100vw, ' + props?.eyecatch.width + 'px'} />
            </figure>
            <div
              className="entry-content"
              dangerouslySetInnerHTML={{ __html: inputhtml }}
            />
            <AdsComponent />
            <hr />
            {props?.reply !== undefined ? renderComents(props?.reply) : ''}
            <div className="entry-content">
              <h3 id="reply-title">コメントを残す </h3>
              <div id="comment">コメント</div>
              <textarea
                id="comment"
                cols={45}
                rows={8}
                maxLength={65525}
                value={props?.comment}
                onChange={(e: any) => props?.setComment(e.target.value)}
              >
              </textarea>
              <input
                type="submit"
                value="コメントを送信"
                id="commentBtn"
                onClick={(e: any) => props?.onComment(props?.comment)}
              >
              </input>
              {props?.errorMsg !== '' && <p className='errorMsg'>{props?.errorMsg}</p>}
              {props?.infoMsg !== '' && <p className='infoMsg'>{props?.infoMsg}</p>}
              <p>日本語が含まれない投稿は無視されますのでご注意ください。（スパム対策）</p>
              <AdsComponent />
            </div>
          </div>
        </React.Fragment>
      );
    }}
  </PostContext.Consumer>
);

export default PostComponent;