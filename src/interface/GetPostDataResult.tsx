// 記事一件取得用の戻り値
interface GetPostDataResult {
  status: number;　// HTTPステータス
  data: PostData;　// 記事データ
}


export interface PostData {
  id: string; // 記事のID
  comment_status: string; // 記事のID
  content: Content; // 記事の本文
  excerpt: Content; // 記事のリード文
  title: Content; // 記事のタイトル
  modified: Date; // 記事の更新日時
  date: Date; // 記事の作成日時
  category_name: string; // 記事のカテゴリ名
  _embedded: {
    author: {
      name: string; // 記事の作成者
    },
    replies: [Reply[]]; // 記事のコメント
    'wp:featuredmedia': Media[];
  },
  link: string; // 記事のURL
}

// アイキャッチの情報
interface Media {
  media_details: {
    sizes: {
      full: {
        source_url: string, // 画像のURL
        height: number, // スタイルに設定する高さ
        width: number, // スタイルに設定する横幅
      }
    }
  }
}

interface Content {
  rendered: string, // 記事の本文
}

export interface Reply {
  id: string, // コメントID
  parent: string, // コメント返信元
  author_name: string, // コメントしたユーザ名
  date: Date,　 // コメントした日時
  content: {
    rendered: string,　 // コメントの本文
  }
}

export default GetPostDataResult;