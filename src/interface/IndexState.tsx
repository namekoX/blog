// 記事一覧用のstate
export default interface IndexState {
  posts: Post[]; // 記事の配列
  errorMsg: string; // API実行エラー時の文言
  totalPage: number; // ページャの最終ページ
  curPage: number; // ページャの現在のページ
  getPosts: (pageCount: number) => Promise<void>;  // 記事一覧取得関数
  cond: Cond; // 記事一覧取得の条件
}

export interface Cond {
  category: string; // カテゴリ名
  keyword: string; // 検索キーワード
}

export interface Post {
  subject: string; //件名
  contents: string; //本文
  modified: Date; //更新日時
  category_name: string; //カテゴリ名
  eyecatch: {
    source_url: string;  // アイキャッチ画像のURL
    height: number;　// スタイルに設定する高さ
    width: number;　 // スタイルに設定する横幅
  }
  id: string, // 記事のID
  excerpt: string; // 記事のリード文
  link: string; // 記事のID
}