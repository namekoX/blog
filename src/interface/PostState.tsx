import { Dispatch, SetStateAction } from "react";
import { Reply } from "./GetPostDataResult";

// 記事本文ページ用のstate
export default interface PostState {
  subject: string; // 件名
  contents: string; // 本文
  modified: Date; // 更新日時
  category_name: string; // カテゴリ名
  eyecatch: {
    source_url: string; // アイキャッチ画像のURL
    height: number; // スタイルに設定する高さ
    width: number; // スタイルに設定する横幅
  }
  id: string; // 記事のID
  onComment: (comment: string) => void; // コメント送信用の関数
  setComment: Dispatch<SetStateAction<string>>; // コメント更新用の関数
  comment: string; // コメント
  errorMsg: string; // コメント時のエラーメッセージ
  infoMsg: string; // コメント時の完了メッセージ
  reply: Reply[]; // 既存コメント時の配列
  excerpt: string; // 記事のリード文
}