import { PostData } from "./GetPostDataResult";

// 記事一覧取得の戻り値
interface GetIndexDataResult {
  status: number; // HTTPステータス
  data: PostData[]; // 記事データの配列
  headers: {
    'x-wp-total': number;     // 総記事数
    'x-wp-totalpages': number;// 総ページ数（ページャの最終インデックス）
  }
}

export default GetIndexDataResult;